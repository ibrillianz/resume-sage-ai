document.getElementById("resumeForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = this.name.value;
  const email = this.email.value;
  const jd = this.jd.value;
  const strengths = this.strengths.value;
  const dream = this.dream.value;
  const weaknesses = this.weaknesses.value;

  const summary = `
    <h2>Resume Pack</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Dream Job:</strong> ${dream}</p>
    <p><strong>Strengths:</strong> ${strengths}</p>
    <p><strong>Weaknesses:</strong> ${weaknesses}</p>
    <p><strong>Based on Job Description:</strong><br>${jd}</p>
    <p><em>Output will be emailed (simulated in this MVP).</em></p>
  `;
  document.getElementById("output").innerHTML = summary;
});
