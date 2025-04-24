document.getElementById('resumeForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const dreamJob = document.getElementById('dreamJob').value.trim();
  const strengths = document.getElementById('strengths').value.trim();
  const weaknesses = document.getElementById('weaknesses').value.trim();
  const jd = document.getElementById('jd').value.trim();

  const output = `
  Resume Pack

  Name: ${name}

  Dream Job: ${dreamJob}

  Strengths: ${strengths}

  Weaknesses: ${weaknesses || "Not shared"}

  Based on Job Description:
  ${jd}

  ➡️ Output will be emailed (simulated in this MVP).
  `;

  document.getElementById('output').innerText = output;
});
