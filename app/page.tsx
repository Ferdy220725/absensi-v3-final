"use client";
import React, { useState } from 'react';

export default function Home() {
  const [showMenu, setShowMenu] = useState(false);

  const menu = [
    { nama: "IZIN KULIAH", desc: "Sakit atau Urusan Keluarga", icon: "📝", link: "/izin" },
    { nama: "MATERI KULIAH", desc: "Download Materi Kuliah", icon: "📚", link: "/materi" },
    { nama: "KUMPUL TUGAS", desc: "Upload Tugas Aman", icon: "📤", link: "/tugas" },
    { nama: "ADMIN PANEL", desc: "Khusus Komting", icon: "👑", link: "/admin-tugas" },
  ];

  if (!showMenu) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a120b', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px', fontFamily: 'sans-serif', position: 'relative' }}>
        
        {/* IDENTITAS KAMPUS & BENDERA */}
        <div style={{ position: 'absolute', top: '40px', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            <div style={{ width: '30px', height: '20px', background: 'white', border: '1px solid #ddd', overflow: 'hidden', borderRadius: '2px' }}>
              <div style={{ background: '#ff0000', height: '50%' }}></div>
            </div>
          </div>
          <p style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '2px', color: '#4ade80', margin: 0 }}>
            UPN "VETERAN" JAWA TIMUR
          </p>
        </div>

        <div style={{ textAlign: 'center', maxWidth: '600px' }}>
          <p style={{ color: '#94a3b8', fontWeight: 'bold', letterSpacing: '4px', fontSize: '12px', marginBottom: '15px' }}>
            SELAMAT DATANG DI
          </p>
          
          <h1 style={{ fontSize: '56px', fontWeight: '900', margin: '0', background: 'linear-gradient(to right, #4ade80, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: '1.1' }}>
            PORTAL KELAS C
          </h1>

          <p style={{ color: '#f59e0b', marginTop: '10px', fontSize: '14px', fontWeight: '500', letterSpacing: '1px' }}>
            by Ahmat Choyrul Ferdyansyah
          </p>
          
          <p style={{ color: '#94a3b8', marginTop: '25px', lineHeight: '1.6', fontSize: '16px' }}>
            Pusat informasi dan manajemen akademik mahasiswa Agroteknologi kelas C. <br/>
            Semua kebutuhan kuliahmu dalam satu pintu.
          </p>
          
          <div style={{ height: '2px', width: '40px', background: '#3d5a3e', margin: '40px auto' }}></div>

          <button 
            onClick={() => setShowMenu(true)}
            style={{ 
              background: '#4ade80', color: '#0a120b', padding: '18px 45px', borderRadius: '50px', 
              fontSize: '16px', fontWeight: 'bold', border: 'none', cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(74, 222, 128, 0.2)', transition: '0.3s'
            }}>
            MULAI JELAJAHI 🚀
          </button>
        </div>
        
        {/* FOOTER */}
        <div style={{ position: 'absolute', bottom: '30px', textAlign: 'center' }}>
            <p style={{ fontSize: '10px', color: '#3d5a3e', letterSpacing: '2px', margin: '0' }}>
              FAKULTAS PERTANIAN | AGROTEKNOLOGI 2026
            </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a120b', color: 'white', padding: '60px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Pilih Layanan</h2>
            <button onClick={() => setShowMenu(false)} style={{ background: 'none', border: '1px solid #3d5a3e', color: '#94a3b8', padding: '8px 15px', borderRadius: '10px', fontSize: '12px', cursor: 'pointer' }}>Kembali</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          {menu.map((m, i) => (
            <div key={i} onClick={() => window.location.href = m.link} style={{ 
              background: '#162217', padding: '30px 15px', borderRadius: '24px', 
              border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>{m.icon}</div>
              <h3 style={{ margin: '0', fontSize: '14px', fontWeight: 'bold' }}>{m.nama}</h3>
              <p style={{ margin: '5px 0 0 0', fontSize: '10px', color: '#94a3b8' }}>{m.desc}</p>
            </div>
          ))}
        </div>
        
        <p style={{ marginTop: '50px', fontSize: '10px', color: '#3d5a3e' }}>MANAGEMENT SYSTEM V1.0 | by Ahmat Choyrul Ferdyansyah</p>
      </div>
    </div>
  );
}