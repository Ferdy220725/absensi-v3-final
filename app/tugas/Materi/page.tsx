"use client";
import { useState } from "react";

export default function MateriPage() {
  const [folders, setFolders] = useState(["Materi Semester 1", "Referensi Jurnal"]);

  const addFolder = () => {
    const name = prompt("Nama Folder Baru:");
    if (name) setFolders([...folders, name]);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="max-w-md mx-auto">
        <button onClick={() => window.location.href = '/'} className="text-gray-400 text-sm mb-6">← Kembali</button>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-purple-400">My Materi</h1>
          <button onClick={addFolder} className="bg-purple-600 px-4 py-2 rounded-lg text-sm font-bold">+ Folder</button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {folders.map((f, i) => (
            <div key={i} className="bg-[#1e293b] p-6 rounded-2xl border border-white/5 text-center flex flex-col items-center">
              <span className="text-4xl mb-3">📂</span>
              <p className="text-sm font-semibold truncate w-full">{f}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}