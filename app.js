// Neuro-Inclusive Resume Generator
class ResumeSage {
  constructor() {
    this.user = {
      neuroFlow: null,
      preferences: {},
      answers: []
    };
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.checkSavedSession();
  }

  setupEventListeners() {
    // Thinking style selection
    document.querySelectorAll('.flow-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.setFlow(e.currentTarget.dataset.flow);
      });
    });

    // Accessibility toggles
    document.getElementById('dyslexia-toggle').addEventListener('click', this.toggleDyslexiaMode);
    document.getElementById('voice-input').addEventListener('click', this.startVoiceInput);

    // Form submission
    document.getElementById('generate-btn').addEventListener('click', this.generateResume.bind(this));
  }

  checkSavedSession() {
    const savedData = localStorage.getItem('resumeSageData');
    if (savedData) {
      this.user = JSON.parse(savedData);
      this.showSection('form-section');
      this.loadQuestions();
    }
  }

  setFlow(style) {
    this.user.neuroFlow = style;
    this.showSection('form-section');
    this.loadQuestions();
    
    // Apply UI adaptations
    document.body.classList.toggle('structured-mode', style === 'structured');
    document.body.classList.toggle('explorative-mode', style === 'explorative');
  }

  loadQuestions() {
    const questions = this.getQuestionsForFlow();
    const container = document.getElementById('questions-container');
    container.innerHTML = '';

    questions.forEach((q, i) => {
      const group = document.createElement('div');
      group.className = 'form-group';
      group.innerHTML = `
        <label>${q}</label>
        <textarea id="answer-${i}" data-question-id="${i}"></textarea>
        ${this.user.neuroFlow === 'explorative' ? 
          '<button class="voice-btn" data-for="answer-'+i+'">🎤</button>' : ''}
      `;
      container.appendChild(group);
    });

    // Add voice input handlers for explorative flow
    if (this.user.neuroFlow === 'explorative') {
      document.querySelectorAll('.voice-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          this.captureVoiceInput(e.target.dataset.for);
        });
      });
    }
  }

  getQuestionsForFlow() {
    return {
      structured: [
        "What are your most measurable accomplishments?",
        "List your technical skills in order of proficiency:",
        "Describe your ideal work environment:"
      ],
      explorative: [
        "What work makes you lose track of time?",
        "Describe a project that excited you:",
        "What unique perspectives do you bring?"
      ]
    }[this.user.neuroFlow];
  }

  async generateResume() {
    this.collectAnswers();
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...this.user,
          tier: this.getUserTier()
        })
      });

      const result = await response.json();
      this.displayResult(result);
      this.saveSession();
    } catch (error) {
      this.showError(error);
    }
  }

  // ... (other methods from previous implementation)
}

// Initialize app
new ResumeSage();
