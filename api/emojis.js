// /api/emojis.js

export default async function handler(req, res) {
  const { group } = req.query; // Read ?group= from the query

  if (!group) {
    return res.status(400).json({ error: "Missing group parameter" });
  }

  const apiUrl = `https://www.emoji.family/api/emojis?group=${encodeURIComponent(
    group
  )}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Allow all origins or set your production domain here
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch emojis" });
  }
}
