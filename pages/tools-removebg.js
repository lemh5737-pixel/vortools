// pages/tools-removebg.js

import React, { useState, useRef } from 'react';
import axios from 'axios';

export default function RemoveBgToolPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleRemoveBackground = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError("Silakan pilih sebuah gambar terlebih dahulu.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await axios.post("/api/remove-bg", formData);
      let data = res.data?.data;
      if (data) {
        setResult(data);
      } else {
        throw new Error("Tidak ada data yang dikembalikan dari API.");
      }
    } catch (e) {
      console.error("❌ Gagal:", e);
      const errorMessage = e.response?.data?.error || e.message || "Terjadi kesalahan yang tidak diketahui.";
      setError(`Gagal menghapus background: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Komponen untuk animasi loading
  const LoadingSpinner = () => (
    <div style={styles.loadingContainer}>
      <div style={styles.spinner}></div>
      <p style={styles.loadingText}>Sedang menghapus background...</p>
      <div style={styles.shimmer}></div>
    </div>
  );

  return (
    <main style={styles.container}>
      <header style={styles.header}>
        <h1>Remove Background Tool</h1>
        <p>Unggah gambar Anda dan kami akan menghapus latar belakangnya secara otomatis dalam hitungan detik.</p>
      </header>

      <section style={styles.uploadSection}>
        <div 
          style={styles.dropzone}
          onClick={() => fileInputRef.current.click()}
          onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const droppedFile = e.dataTransfer.files[0];
            if (droppedFile) {
              handleFileChange({ target: { files: [droppedFile] } });
            }
          }}
        >
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange} 
            accept="image/*" 
            style={{ display: 'none' }}
          />
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" style={styles.previewImage} />
          ) : (
            <div style={styles.dropzoneText}>
              <span style={styles.uploadIcon}>📤</span>
              <p>Klik atau seret gambar ke sini</p>
              <p style={styles.dropzoneSubtext}>PNG, JPG, GIF hingga 10MB</p>
            </div>
          )}
        </div>

        {selectedFile && !isLoading && (
          <button onClick={handleRemoveBackground} style={styles.button}>
            Hapus Background Sekarang
          </button>
        )}
      </section>

      {error && <p style={styles.errorText}>{error}</p>}

      {isLoading && <LoadingSpinner />}

      {result && (
        <section style={styles.resultContainer}>
          <h2>Hasil</h2>
          <div style={styles.imageGrid}>
            <div style={styles.imageCard}>
              <h3>Gambar Asli</h3>
              <img src={result.url} alt="Original" style={styles.resultImage} />
            </div>
            <div style={styles.imageCard}>
              <h3>Tanpa Background</h3>
              <img src={result.cutoutUrl} alt="Cutout" style={styles.resultImage} />
              <a href={result.cutoutUrl} download="cutout.png" style={styles.downloadLink}>
                Unduh Gambar
              </a>
            </div>
            <div style={styles.imageCard}>
              <h3>Mask</h3>
              <img src={result.maskUrl} alt="Mask" style={styles.resultImage} />
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

// --- STYLES & ANIMATIONS ---
const styles = {
  container: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    backgroundColor: '#0f0f23',
    color: '#e0e0e0',
    minHeight: '100vh',
    padding: '40px 20px',
  },
  header: {
    textAlign: 'center',
    maxWidth: '600px',
    margin: '0 auto 40px auto',
  },
  header: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: '700',
      background: 'linear-gradient(to right, #a855f7, #3b82f6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    p: {
      fontSize: '1.1rem',
      color: '#9ca3af',
      marginTop: '10px',
    }
  },
  uploadSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '25px',
  },
  dropzone: {
    width: '100%',
    maxWidth: '500px',
    height: '300px',
    border: '2px dashed #4b5563',
    borderRadius: '12px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    overflow: 'hidden',
    position: 'relative',
  },
  dropzoneText: {
    textAlign: 'center',
  },
  uploadIcon: {
    fontSize: '3rem',
    display: 'block',
    marginBottom: '15px',
  },
  dropzoneSubtext: {
    fontSize: '0.9rem',
    color: '#6b7280',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  button: {
    padding: '15px 40px',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#ffffff',
    backgroundColor: '#8b5cf6',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
  },
  errorText: {
    color: '#ef4444',
    backgroundColor: '#991b1b',
    padding: '15px',
    borderRadius: '8px',
    textAlign: 'center',
    marginTop: '20px',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '40px',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '5px solid #1f2937',
    borderTop: '5px solid #8b5cf6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    marginTop: '20px',
    fontSize: '1.1rem',
    color: '#9ca3af',
  },
  shimmer: {
    width: '300px',
    height: '200px',
    marginTop: '20px',
    background: 'linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
    borderRadius: '8px',
  },
  resultContainer: {
    marginTop: '60px',
    animation: 'fadeIn 0.8s ease-out',
  },
  resultContainer: {
    h2: {
      textAlign: 'center',
      fontSize: '2rem',
      marginBottom: '30px',
    }
  },
  imageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
  },
  imageCard: {
    backgroundColor: '#1f2937',
    border: '1px solid #374151',
    padding: '20px',
    borderRadius: '12px',
    textAlign: 'center',
  },
  resultImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    marginTop: '15px',
  },
  downloadLink: {
    display: 'inline-block',
    marginTop: '15px',
    padding: '10px 20px',
    backgroundColor: '#10b981',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '6px',
    fontWeight: '600',
  }
};

// Inject keyframes into the document head
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
}
