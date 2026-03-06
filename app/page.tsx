"use client";
export default function Dashboard() {
  const menus = [
    { title: "ABSENSI MAHASISWA", desc: "Konfirmasi Kehadiran Kuliah", icon: "✅", color: "linear-gradient(135deg, #10b981, #059669)", link: "/" }, 
    { title: "PENGUMPULAN TUGAS", desc: "Upload Tugas PDF/Gambar", icon: "📁", color: "linear-gradient(135deg, #3b82f6, #2563eb)", link: "/tugas" },
    { title: "KUMPULAN MATERI", desc: "Simpan & Kelola File Materi", icon: "📚", color: "linear-gradient(135deg, #a855f7, #7c3aed)", link: "/materi" },
  ];

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', padding: '20px', color: 'white', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ color: '#34d399', fontWeight: 'bold', fontSize: '10px', letterSpacing: '4px', marginBottom: '8px' }}>UPN "VETERAN" JATIM</p>
        <h1 style={{ fontSize: '32px', fontWeight: '900', margin: '0', color: '#ffffff' }}>STUDENT HUB</h1>
        <div style={{ height: '4px', width: '60px', background: '#10b981', margin: '15px auto', borderRadius: '10px' }}></div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>
          {menus.map((m, i) => (
            <button key={i} onClick={() => window.location.href = m.link} style={{ width: '100%', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '25px', padding: '20px', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ background: m.color, padding: '12px', borderRadius: '18px', fontSize: '24px' }}>{m.icon}</div>
              <div>
                <h3 style={{ margin: '0', color: '#ffffff', fontSize: '16px', fontWeight: '800' }}>{m.title}</h3>
                <p style={{ margin: '3px 0 0 0', color: '#94a3b8', fontSize: '10px', fontWeight: 'bold' }}>{m.desc}</p>
              </div>
            </button>
          ))}
        </div>
        <p style={{ marginTop: '50px', color: '#94a3b8', fontSize: '12px' }}>by Ahmat Choyrul Ferdyansyah</p>
      </div>
    </div>
  );
}