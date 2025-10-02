import { useState } from "react";

export default function ToolsYTDL() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!url) return alert("Masukkan URL YouTube terlebih dahulu!");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/ytdl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Gagal fetch video!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-6">VorTools - YTDL</h1>

      <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-6">
        <input
          type="text"
          placeholder="Masukkan URL YouTube..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 mb-4"
        />
        <button
          onClick={handleDownload}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
        >
          {loading ? "Memproses..." : "Ambil Video"}
        </button>
      </div>

      {result && (
        <div className="mt-6 w-full max-w-2xl bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-3">Hasil:</h2>
          <pre className="bg-gray-100 p-3 rounded-lg text-sm overflow-x-auto">
            {JSON.stringify(result, null, 2)}
          </pre>

          {Array.isArray(result) && (
            <div className="mt-4 space-y-2">
              {result.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-2 border rounded-lg"
                >
                  <span>
                    {item.fquality} ({item.fps || "N/A"})
                  </span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Download
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
  }
