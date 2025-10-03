// pages/tools-removebg.js

import React, { useState } from 'react';
import axios from 'axios';

export default function RemoveBgToolPage() {
  // State untuk menyimpan file yang dipilih oleh user
  const [selectedFile, setSelectedFile] = useState(null);
  // State untuk menampilkan indikator loading
  const [isLoading, setIsLoading] = useState(false);
  // State untuk menyimpan hasil dari API
  const [result, setResult] = useState(null);
  // State untuk menampilkan pesan error
  const [error, setError] = useState(null);

  // Fungsi ini dipanggil saat user memilih file
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Reset hasil dan error saat file baru dipilih
      setResult(null);
      setError(null);
    }
  };

  // Fungsi ini dipanggil saat form dikirim
  const handleRemoveBackground = async (event) => {
    event.preventDefault(); // Mencegah reload halaman
    if (!selectedFile) {
      setError("Silakan pilih sebuah gambar terlebih dahulu.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    // Membuat objek FormData untuk dikirim ke API
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Melakukan request POST ke API menggunakan axios
      const res = await axios.post("https://removebg.one/api/predict/v2", formData, {
        headers: {
          // ...formData.getHeaders() tidak diperlukan di browser,
          // browser akan otomatis men-set 'Content-Type': 'multipart/form-data'
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

      // Mengambil data dari response
      let data = res.data?.data;
      if (data) {
        setResult(data);
        console.log("✅ Background Removed");
        console.log("Original :", data.url);
        console.log("Cutout   :", data.cutoutUrl);
        console.log("Mask     :", data.maskUrl);
      } else {
        throw new Error("Tidak ada data yang dikembalikan dari API.");
      }

    } catch (e) {
      console.error("❌ Gagal:", e);
      // Menampilkan pesan error yang lebih ramah
      const errorMessage = e.response?.data?.message || e.message || "Terjadi kesalahan yang tidak diketahui.";
      setError(`Gagal menghapus background: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main style={styles.container}>
      <h1>Tools Remove Background</h1>
      <p>Unggah gambar untuk menghapus background secara otomatis.</p>

      <form onSubmit={handleRemoveBackground} style={styles.form}>
        <input 
          type="file" 
          onChange={handleFileChange} 
          accept="image/*" 
          style={styles.fileInput}
        />
        <button type="submit" disabled={!selectedFile || isLoading} style={styles.button}>
          {isLoading ? 'Sedang Diproses...' : 'Hapus Background'}
        </button>
      </form>

      {/* Menampilkan pesan error jika ada */}
      {error && <p style={styles.errorText}>{error}</p>}

      {/* Menampilkan hasil jika proses berhasil */}
      {result && (
        <div style={styles.resultContainer}>
          <h2>Hasil:</h2>
          <div style={styles.imageGrid}>
            <div style={styles.imageCard}>
              <h3>Gambar Asli</h3>
              <img src={result.url} alt="Original" style={styles.image} />
            </div>
            <div style={styles.imageCard}>
              <h3>Hasil Cutout (Tanpa Background)</h3>
              <img src={result.cutoutUrl} alt="Cutout" style={styles.image} />
              <a href={result.cutoutUrl} download="cutout.png" style={styles.downloadLink}>
                Unduh Gambar
              </a>
            </div>
            <div style={styles.imageCard}>
              <h3>Mask</h3>
              <img src={result.maskUrl} alt="Mask" style={styles.image} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// Beberapa gaya dasar agar tampilan lebih rapi
const styles = {
  container: {
    fontFamily: 'sans-serif',
    maxWidth: '900px',
    margin: '40px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    marginTop: '20px',
  },
  fileInput: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#0070f3',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  errorText: {
    color: 'red',
    marginTop: '15px',
  },
  resultContainer: {
    marginTop: '40px',
  },
  imageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  imageCard: {
    border: '1px solid #eee',
    padding: '10px',
    borderRadius: '8px',
    textAlign: 'center',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '4px',
  },
  downloadLink: {
    display: 'inline-block',
    marginTop: '10px',
    padding: '8px 15px',
    backgroundColor: '#28a745',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
  }
};
