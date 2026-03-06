"use client";
export default function Dashboard() {
  const menus = [
    { title: "Absensi Mahasiswa", desc: "Konfirmasi kehadiran kuliah", icon: "✅", color: "from-green-500 to-emerald-600", link: "/" },
    { title: "Pengumpulan Tugas", desc: "Upload tugas format PDF/Gambar", icon: "📁", color: "from-blue-500 to-indigo-600", link: "/tugas" },
    { title: "Kumpulan Materi", desc: "Simpan & buat folder materimu", icon: "📚", color: "from-purple-500 to-pink-600", link: "/materi" },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 flex flex-col items-center">
      <div className="w-full max-w-md pt-10">
        <div className="text-center mb-10">
          <p className="text-green-400 font-bold text-xs tracking-[0.2em] uppercase">UPN "VETERAN" JATIM</p>
          <h1 className="text-3xl font-black mt-2 tracking-tight italic text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">STUDENT HUB</h1>
          <div className="h-1 w-12 bg-green-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="space-y-4">
          {menus.map((item, i) => (
            <button
              key={i}
              onClick={() => window.location.href = item.link}
              className="w-full group relative overflow-hidden rounded-3xl bg-[#1e293b] p-1 transition-all hover:scale-[1.02] active:scale-95 border border-white/5 shadow-xl"
            >
              <div className={`absolute inset-0 opacity-10 bg-gradient-to-r ${item.color}`}></div>
              <div className="relative flex items-center p-5 space-x-4">
                <div className={`text-2xl p-4 rounded-2xl bg-gradient-to-br ${item.color} shadow-lg`}>{item.icon}</div>
                <div className="text-left">
                  <h3 className="font-extrabold text-lg">{item.title}</h3>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{item.desc}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-20 text-center border-t border-white/5 pt-6">
          <p className="text-gray-600 text-[9px] tracking-[0.3em] font-mono uppercase">SYSTEM INTEGRATION V.3.1</p>
          <p className="text-gray-500 text-xs mt-2 font-medium italic">by Ahmat Choyrul Ferdyansyah</p>
        </div>
      </div>
    </div>
  );
}