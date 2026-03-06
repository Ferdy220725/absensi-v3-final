"use client";
import { useState } from "react";

export default function TugasPage() {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = () => {
    if (!file) return alert("Pilih filenya dulu, Fer!");
    alert("Fitur upload sedang kita hubungkan ke Supabase Storage!");
  };

  return (
    <div className="p-8 font-sans">
      <h1 className="text-2xl font-bold mb-4">Pengumpulan Tugas UPN</h1>
      <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center">
        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-4"
        />
        <br />
        <button 
          onClick={handleUpload}
          className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700"
        >
          Kirim Tugas
        </button>
      </div>
    </div>
  );
}