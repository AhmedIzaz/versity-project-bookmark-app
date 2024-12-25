// pages/api/serve-file.ts
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("i am hit")
  const { filePath } = req.query;

  if (!filePath || typeof filePath !== "string") {
    return res.status(400).json({ error: "Invalid file path" });
  }

  const absolutePath = path.resolve(filePath);

  // Check if the file exists
  if (!fs.existsSync(absolutePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  // Serve the file to the browser
  res.setHeader(
    "Content-Disposition",
    `inline; filename="${path.basename(filePath)}"`
  );
  res.setHeader("Content-Type", "application/octet-stream");
  fs.createReadStream(absolutePath).pipe(res);
}
