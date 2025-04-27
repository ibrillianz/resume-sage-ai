// Neuro-Inclusive Resume App Controller
document.addEventListener('DOMContentLoaded', () => {
  const uploadModal = document.getElementById('upload-modal');
  const entrySection = document.getElementById('entry-section');
  const formSection = document.getElementById('form-section');
  const outputSection = document.getElementById('output-section');
  const motivationalMessage = document.getElementById('motivational-message');
  const downloadBtn = document.getElementById('download-resume-btn');

  const moodMessages = {
    low: [
      "Feeling heavy doesn't make you wrong — it makes you human.",
      "Existing today is enough. That’s it. You’re enough.",
      "Some days the win is just breathing through it."
    ],
    neutral: [
      "Neutral is not boring — it’s powerful calm.",
      "Nothing needs to change for you to be worthy.",
      "Your pace is the perfect pace."
    ],
    high: [
      "Your joy is revolutionary in a world that demands hustle.",
      "Your sparkle isn’t too much; it’s medicine.",
      "Celebrate every authentic moment — even if it looks different from others'."
    ]
  };

  // Show upload modal first
  if (!localStorage.getItem('cvUploaded')) {
    uploadModal.classList.remove('hidden');
  }

  document.getElementById('skip-upload').addEventListener('click', () => {
    uploadModal.classList.add('hidden');
  });

  // Handle Mood Selection
  document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const mood = e.currentTarget.dataset.mood;
      showMotivation(mood);
    });
  });

  // Show motivational text
  function showMotivation(mood) {
    const lines = moodMessages[mood];
    const randomLine = lines[Math.floor(Math.random() * lines.length)];
    motivationalMessage.innerText = randomLine;
  }

  // Thinking Style Path
  document.querySelectorAll('.flow-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const style = e.currentTarget.dataset.flow;
      localStorage.setItem('thinkingStyle', style);
      entrySection.classList.add('hidden');
      formSection.classList.remove('hidden');
      loadQuestions(style);
    });
  });

  // Load questions dynamically
  function loadQuestions(style) {
    const questionsContainer = document.getElementById('questions-container');
    questionsContainer.innerHTML = '';
    const questions = style === 'structured' 
      ? [
        "What are your most measurable accomplishments?",
        "List your technical skills in order of proficiency:",
        "Describe your ideal work environment:"
      ] 
      : [
        "What work makes you lose track of time?",
        "Describe a project that excited you:",
        "What unique perspectives do you bring?"
      ];

    questions.forEach((q, i) => {
      const group = document.createElement('div');
      group.className = 'form-group';
      group.innerHTML = `
        <label>${q}</label>
        <textarea id="answer-${i}" data-question-id="${i}"></textarea>
      `;
      questionsContainer.appendChild(group);
    });
  }

  // Generate Resume Handler
  document.getElementById('generate-btn').addEventListener('click', () => {
    const answers = [];
    document.querySelectorAll('textarea').forEach(t => {
      answers.push(t.value.trim());
    });

    const resumeText = answers.join('\n\n');

    // Display in output
    outputSection.classList.remove('hidden');
    document.getElementById('resume-output').innerText = resumeText;

    // Save for download
    localStorage.setItem('generatedResume', resumeText);
  });

  // Download Resume
  downloadBtn.addEventListener('click', () => {
    const resume = localStorage.getItem('generatedResume') || '';
    const blob = new Blob([resume], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'MindCrafted_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

});
