"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function TugasPage() {
  const [nama, setNama] = useState("");
  const [file, setFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const upload = async () => {
    if (!nama || !file) return alert("Isi data dulu Fer!");
    setLoading(true);
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage.from('tugas-mahasiswa').upload(fileName, file);
    if (error) { alert("Gagal: " + error.message); setLoading(false); return; }
    
    const { data: url } = supabase.storage.from('tugas-mahasiswa').getPublicUrl(fileName);
    await supabase.from('pengumpulan_tugas').insert([{ nama_mahasiswa: nama, file_url: url.publicUrl }]);
    
    alert("GOKIL! Tugas Berhasil Dikirim.");
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', padding: '20px', color: 'white' }}>
       <button onClick={() => window.location.href='/'} style={{ color: '#94a3b8', background: 'none', border: 'none', marginBottom: '20px' }}>← Kembali</button>
       <h2 style={{ textAlign: 'center', color: '#3b82f6' }}>UPLOAD TUGAS</h2>
       <div style={{ background: '#1e293b', padding: '25px', borderRadius: '20px', maxWidth: '400px', margin: '0 auto' }}>
          <input placeholder="Nama Lengkap" onChange={(e) => setNama(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '10px', border: 'none', background: '#0f172a', color: 'white' }} />
          <input type="file" onChange={(e) => setFile(e.target.files?.[0])} style={{ marginBottom: '20px', color: '#94a3b8' }} />
          <button onClick={upload} disabled={loading} style={{ width: '100%', padding: '15px', borderRadius: '15px', background: '#2563eb', border: 'none', color: 'white', fontWeight: 'bold' }}>
            {loading ? "LAGI PROSES..." : "KIRIM TUGAS SEKARANG"}
          </button>
       </div>
    </div>
  );
}