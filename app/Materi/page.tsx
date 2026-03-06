"use client";
import { useState } from "react";

export default function MateriPage() {
  const [folders, setFolders] = useState(["Materi Pemrograman", "Materi Desain"]);

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', padding: '20px', color: 'white', fontFamily: 'sans-serif' }}>
      <button onClick={() => window.location.href='/'} style={{ color: '#94a3b8', background: 'none', border: 'none', marginBottom: '20px', cursor: 'pointer' }}>← Kembali</button>
      <h2 style={{ color: '#a855f7' }}>KUMPULAN MATERI</h2>
      <button onClick={() => { const n = prompt("Nama Folder:"); if(n) setFolders([...folders, n]) }} style={{ background: '#a855f7', border: 'none', color: 'white', padding: '10px', borderRadius: '10px', marginBottom: '20px', width: '100%', fontWeight: 'bold' }}>+ BUAT FOLDER BARU</button>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        {folders.map((f, i) => (
          <div key={i} style={{ background: '#1e293b', padding: '20px', borderRadius: '15px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '40px' }}>📂</div>
            <p style={{ fontSize: '12px', marginTop: '10px' }}>{f}</p>
          </div>
        ))}
      </div>
    </div>
  );
}