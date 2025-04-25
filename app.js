async function generateResume() {
  const role = document.getElementById("role-input").value;
  const loadingMsg = "<p class='text-gray-500'>Generating your resume...</p>";
  document.getElementById("resume-output").innerHTML = loadingMsg;
  document.getElementById("result-section").classList.remove("hidden");

  try {
    // Try OpenAI first
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role })
    });
    
    if (!response.ok) throw new Error("API limit reached");
    const data = await response.json();
    document.getElementById("resume-output").innerHTML = data.text.replace(/\n/g, "<br>");
  
  } catch (error) {
    // Fallback to Hugging Face or mock data
    const fallbackResume = `
      <h3 class="font-bold">${role} Resume</h3>
      <ul class="list-disc pl-5">
        <li>Strong experience in ${role.split(' ')[0]}</li>
        <li>Proven track record of leadership</li>
        <li>Skilled in cross-functional collaboration</li>
      </ul>
      <p class="mt-4 text-sm text-red-500">Premium feature: JD-tailored bullets</p>
    `;
    document.getElementById("resume-output").innerHTML = fallbackResume;
  }
}
