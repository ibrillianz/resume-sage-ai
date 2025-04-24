async function generateResume() {
  const role = document.getElementById("user-input").value;
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role })
  });
  const data = await response.json();
  document.getElementById("resume-output").innerHTML = data.text.replace(/\n/g, "<br>");
}
