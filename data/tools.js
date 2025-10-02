// data/tools.js

export const toolsData = {
  "tools-ytdown": {
    "title": "YouTube Downloader",
    "deskripsi": "Download video atau audio dari YouTube dengan mudah",
    // Gunakan URL eksternal lengkap
    "link": "/vortools-ytdl",
    "category": "Downloader",
    "icon": "Youtube"
  },
  "tools-tiktokdl": {
    "title": "TikTok Downloader",
    "deskripsi": "Tools berfungsi untuk mendownload video TikTok tanpa watermark",
    "link": "https://halaman.zone.id/vortools-tiktok", // Contoh link eksternal lainnya
    "category": "Downloader",
    "icon": "Video"
  },
  "tools-text2img": {
    "title": "Text to Image AI",
    "deskripsi": "Generate gambar dari teks menggunakan AI",
    "link": "https://halaman.zone.id/vortools-text2img", // Contoh link eksternal lainnya
    "category": "AI Tools",
    "icon": "Image"
  }
  // ... tambahkan tools lainnya dengan link eksternal
};

// Fungsi-fungsi helper tetap sama, tidak perlu diubah
export const getAllTools = () => {
  return Object.entries(toolsData).map(([id, tool]) => ({
    id,
    ...tool
  }));
};

export const getToolById = (id) => {
  return toolsData[id] ? { id, ...toolsData[id] } : null;
};

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
