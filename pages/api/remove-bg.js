// pages/api/remove-bg.js

import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import formidable from "formidable";

// Nonaktifkan body parser bawaan Next.js agar formidable bisa bekerja
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  try {
    const data = await new Promise((resolve, reject) => {
      const form = formidable({});
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    // Pastikan file ada
    if (!data.files.file) {
        return res.status(400).json({ error: "No file uploaded." });
    }

    const filePath = data.files.file.filepath;

    const form = new FormData();
    form.append("file", fs.createReadStream(filePath));

    const apiRes = await axios.post("https://removebg.one/api/predict/v2", form, {
      headers: {
        ...form.getHeaders(),
        "accept": "application/json, text/plain, */*",
        "locale": "en-US",
        "platform": "PC",
        "product": "REMOVEBG",
        "sec-ch-ua": "\"Chromium\";v=\"127\", \"Not)A;Brand\";v=\"99\", \"Microsoft Edge Simulate\";v=\"127\", \"Lemur\";v=\"127\"",
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": "\"Android\"",
        "Referer": "https://removebg.one/upload"
      }
    });

    res.status(200).json(apiRes.data);

  } catch (error) {
    console.error("❌ Gagal di API Route:", error.message);
    res.status(500).json({ error: "Terjadi kesalahan pada server saat memproses gambar." });
  }
}
