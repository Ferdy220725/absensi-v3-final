"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Ambil URL dan KEY dari file .env (yang sudah kamu set di Vercel)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function TugasPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [nama, setNama] = useState("");

  const handleUpload = async () => {
    if (!file || !nama) return alert("Pilih file dan isi nama dulu, Fer!");
    setLoading(true);

    try {
      // 1. Upload file ke Storage Bucket 'tugas-mahasiswa'
      // Pakai timestamp biar nama filenya unik
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${nama.replace(/\s+/g, '-').toLowerCase()}.${fileExt}`;
      
      const { data, error: uploadError } = await supabase.storage
        .from('tugas-mahasiswa')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2. Ambil URL file yang baru diupload
      const { data: { publicUrl } } = supabase.storage
        .from('tugas-mahasiswa')
        .getPublicUrl(fileName);

      // 3. Simpan info ke database tabel pengumpulan_tugas
      const { error: dbError } = await supabase
        .from('pengumpulan_tugas')
        .insert([{ nama_mahasiswa: nama, file_url: publicUrl }]);

      if (dbError) throw dbError;

      alert("BERHASIL! Tugas " + nama + " sudah masuk ke Supabase.");
      // Reset form
      setFile(null);
      setNama("");
      const fileInput = document.getElementById('fileInput') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error: any) {
      alert("Error pas upload: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 flex flex-col items-center">
      
      {/* Tombol Back */}
      <div className="w-full max-w-md mb-8">
        <button 
          onClick={() => window.location.href = '/'}
          className="text-gray-400 hover:text-white transition-all text-sm flex items-center gap-2"
        >
          <span>←</span> Kembali ke Menu Utama
        </button>
      </div>

      {/* Header Ala UPN */}
      <div className="text-center mb-10">
        <p className="text-green-400 font-bold text-xs tracking-[0.2em] uppercase">UPN "VETERAN" JAWA TIMUR</p>
        <h1 className="text-3xl font-black mt-2 tracking-tight">Upload Tugas</h1>
        <div className="h-1 w-12 bg-green-500 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Card Form Utama */}
      <div className="w-full max-w-md bg-[#1e293b] rounded-3xl p-8 shadow-2xl border border-white/5 relative overflow-hidden">
        {/* Efek Glow di Background */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-green-600/20 rounded-full blur-3xl"></div>
        
        <div className="space-y-6 relative z-10">
          
          {/* Input Nama */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-400">Nama Lengkap Mahasiswa</label>
            <input 
              type="text"
              placeholder="Sesuai KTM ya..."
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full bg-[#0f172a] border border-white/10 rounded-xl p-4 focus:outline-none focus:border-green-500 transition-all text-white placeholder:text-gray-600"
            />
          </div>

          {/* Input File - Custom Desain */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-400">File Tugas (PDF/Gambar)</label>
            <div className="relative">
              <input 
                id="fileInput"
                type="file" 
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full bg-[#0f172a] border border-dashed border-white/20 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500 transition-all text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-500/10 file:text-blue-400 hover:file:bg-blue-500/20"
              />
              <p className="text-xs text-gray-500 mt-2 text-center">
                {file ? `File terpilih: ${file.name}` : "Maksimal file 5MB, format umum"}
              </p>
            </div>
          </div>

          {/* Tombol Kirim - Pakai Gradasi */}
          <button 
            onClick={handleUpload}
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-3 ${
              loading 
              ? 'bg-gray-600 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 active:scale-95'
            }`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Sabar, Lagi Ngirim...
              </>
            ) : (
              <>
                <span>🚀</span> KIRIM TUGAS SEKARANG
              </>
            )}
          </button>
        </div>
      </div>

      {/* Footer Wajib: BY AHMAT CHOYRUL FERDYANSYAH */}
      <div className="mt-16 text-center border-t border-white/5 pt-6 w-full max-w-sm">
        <p className="text-gray-600 text-[10px] tracking-[0.3em] font-mono">
          STUDENT HUB V.3.1
        </p>
        <p className="text-gray-500 text-xs mt-2 font-medium">
          Built with ❤️ by <span className="text-green-400">Ahmat Choyrul Ferdyansyah</span>
        </p>
        <p className="text-gray-700 text-[9px] mt-1">
          25025010100 | UPN "VETERAN" JAWA TIMUR
        </p>
      </div>

    </div>
  );
}