import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname));

app.get("/download", async (req, res) => {
  const videoUrl = req.query.url;

  if (!videoUrl) {
    return res.send("No video URL provided");
  }

  try {
    const response = await fetch(videoUrl);
    const contentType = response.headers.get("content-type");

    if (!contentType || !contentType.includes("video")) {
      return res.send("Invalid video link (must be direct .mp4 link)");
    }

    res.setHeader("Content-Disposition", "attachment; filename=video.mp4");
    response.body.pipe(res);
  } catch (err) {
    res.send("Error downloading video");
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});