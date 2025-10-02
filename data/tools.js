export const toolsData = {
  "tools-tiktokdl": {
    "title": "TikTok Downloader",
    "deskripsi": "Tools berfungsi untuk mendownload video TikTok tanpa watermark",
    "link": "/tools/tiktokdl",
    "category": "Downloader",
    "icon": "Video"
  },
  "tools-ytdown": {
    "title": "YouTube Downloader",
    "deskripsi": "Download video atau audio dari YouTube dengan mudah",
    "link": "/tools/ytdown",
    "category": "Downloader",
    "icon": "Youtube"
  },
  "tools-text2img": {
    "title": "Text to Image AI",
    "deskripsi": "Generate gambar dari teks menggunakan AI",
    "link": "/tools/text2img",
    "category": "AI Tools",
    "icon": "Image"
  },
  "tools-qrcode": {
    "title": "QR Code Generator",
    "deskripsi": "Buat QR Code secara instan untuk berbagai keperluan",
    "link": "/tools/qrcode",
    "category": "Generator",
    "icon": "QrCode"
  },
  "tools-pdfmerge": {
    "title": "PDF Merger",
    "deskripsi": "Gabungkan beberapa file PDF menjadi satu dokumen",
    "link": "/tools/pdfmerge",
    "category": "Converter",
    "icon": "FileText"
  },
  "tools-colorpicker": {
    "title": "Color Picker",
    "deskripsi": "Pilih dan konversi warna untuk kebutuhan desain",
    "link": "/tools/colorpicker",
    "category": "Design",
    "icon": "Palette"
  },
  "tools-passwordgen": {
    "title": "Password Generator",
    "deskripsi": "Generate password aman dan acak dengan satu klik",
    "link": "/tools/passwordgen",
    "category": "Security",
    "icon": "Key"
  },
  "tools-urlshort": {
    "title": "URL Shortener",
    "deskripsi": "Perpendek URL panjang menjadi link yang lebih singkat",
    "link": "/tools/urlshort",
    "category": "Utility",
    "icon": "Link"
  }
};

// Fungsi untuk mendapatkan semua tools
export const getAllTools = () => {
  return Object.entries(toolsData).map(([id, tool]) => ({
    id,
    ...tool
  }));
};

// Fungsi untuk mendapatkan tool berdasarkan ID
export const getToolById = (id) => {
  return toolsData[id] ? { id, ...toolsData[id] } : null;
};

// Fungsi untuk filter tools berdasarkan keyword
export const filterTools = (keyword) => {
  const allTools = getAllTools();
  if (!keyword) return allTools;
  
  const lowerKeyword = keyword.toLowerCase();
  return allTools.filter(tool => 
    tool.title.toLowerCase().includes(lowerKeyword) ||
    tool.deskripsi.toLowerCase().includes(lowerKeyword) ||
    tool.category.toLowerCase().includes(lowerKeyword)
  );
};
