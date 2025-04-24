export default async (req, res) => {
  const { role } = req.body;
  const prompt = `Generate a 4-bullet resume for a ${role}. Focus on skills and achievements.`;
  
  const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }]
    })
  });
  
  const data = await openaiResponse.json();
  res.status(200).json({ text: data.choices[0].message.content });
};
