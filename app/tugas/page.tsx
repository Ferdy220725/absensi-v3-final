"use client";
export default function Dashboard() {
  const menus = [
    { title: "Absensi Mahasiswa", desc: "Konfirmasi kehadiran kuliah", icon: "✅", color: "from-green-500 to-emerald-600", link: "/absensi" },
    { title: "Pengumpulan Tugas", desc: "Upload tugas format PDF/Gambar", icon: "📁", color: "from-blue-500 to-indigo-600", link: "/tugas" },
    { title: "Kumpulan Materi", desc: "Simpan & buat folder materimu", icon: "📚", color: "from-purple-500 to-pink-600", link: "/materi" },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="max-w-md mx-auto pt-10">
        <div className="text-center mb-10">
          <p className="text-green-400 font-bold text-xs tracking-[0.2em] uppercase">UPN "VETERAN" JATIM</p>
          <h1 className="text-3xl font-black mt-2 tracking-tight">STUDENT HUB</h1>
          <div className="h-1 w-12 bg-green-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="space-y-4">
          {menus.map((item, i) => (
            <button
              key={i}
              onClick={() => window.location.href = item.link}
              className="w-full group relative overflow-hidden rounded-2xl bg-[#1e293b] p-1 transition-all hover:scale-[1.02] active:scale-95 border border-white/5"
            >
              <div className={`absolute inset-0 opacity-10 bg-gradient-to-r ${item.color}`}></div>
              <div className="relative flex items-center p-5 space-x-4">
                <div className={`text-3xl p-3 rounded-xl bg-gradient-to-br ${item.color} shadow-lg`}>
                  {item.icon}
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <p className="text-center mt-20 text-gray-600 text-[10px] tracking-widest font-mono">
          SYSTEM INTEGRATION V.3.0
        </p>
      </div>
    </div>
  );
}