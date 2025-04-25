// app.js

// 1. Entry Point Logic
function setFlow(style) {
  localStorage.setItem('neuroFlow', style);
  document.querySelector('.neuro-prompt').classList.add('hidden');
  document.getElementById('free-tier-form').classList.remove('hidden');
  loadQuestions();
}

// 2. Free Tier Questions
const freeQuestions = [
  "What task makes you hyperfocus?",
  "Describe a project you're proud of:",
  "What feedback do you repeatedly get?"
];

function loadQuestions() {
  const container = document.getElementById('strength-questions');
  freeQuestions.forEach(q => {
    const div = document.createElement('div');
    div.innerHTML = `
      <label>${q}</label>
      <textarea rows="2"></textarea>
    `;
    container.appendChild(div);
  });
}

// 3. Generate Resume (Mock)
async function generateResume() {
  const answers = Array.from(document.querySelectorAll('textarea')).map(t => t.value);
  const response = await fetch('/api/generate', {
    method: 'POST',
    body: JSON.stringify({ answers })
  });
  const resume = await response.json();
  
  document.getElementById('free-tier-form').classList.add('hidden');
  const output = document.getElementById('resume-output');
  output.innerHTML = resume.html;
  output.classList.remove('hidden');
}
