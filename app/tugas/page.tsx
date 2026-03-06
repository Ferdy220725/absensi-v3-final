"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Ini otomatis mengambil data dari file .env kamu
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function TugasPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [nama, setNama] = useState("");

  const handleUpload = async () => {
    if (!file || !nama) return alert("Isi nama dan pilih file dulu, Fer!");
    setLoading(true);

    try {
      // 1. Upload file ke Storage Bucket 'tugas-mahasiswa'
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${nama}.${fileExt}`;
      
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

      alert("GOKIL! Tugas " + nama + " berhasil terkirim!");
      setFile(null);
      setNama("");
    } catch (error: any) {
      alert("Waduh Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 font-sans max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Upload Tugas UPN</h1>
      <div className="bg-white shadow-2xl border-t-4 border-blue-600 p-8 rounded-2xl">
        <input 
          type="text"
          placeholder="Nama Lengkap Kamu"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-blue-500"
        />
        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-6 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700"
        />
        <button 
          onClick={handleUpload}
          disabled={loading}
          className={`w-full py-3 rounded-xl font-bold text-white transition-all ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 shadow-lg'}`}
        >
          {loading ? "Sabar, lagi ngirim..." : "KIRIM TUGAS SEKARANG"}
        </button>
      </div>
    </div>
  );
}