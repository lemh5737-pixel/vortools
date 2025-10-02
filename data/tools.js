export const toolsData = {
  "tools-ytdown": {
    "title": "YouTube Downloader",
    "deskripsi": "Download video atau audio dari YouTube dengan mudah",
    "link": "/vortools-ytdl",
    "category": "Downloader",
    "icon": "Youtube"
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
