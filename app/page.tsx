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
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <p className="text-green-400 font-bold text-[10px] tracking-[0.3em] uppercase mb-2">UPN "VETERAN" JATIM</p>
          <h1 className="text-4xl font-black tracking-tighter text-white">STUDENT HUB</h1>
          <div className="h-1.5 w-16 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Menu Buttons */}
        <div className="space-y-5">
          {menus.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                if (item.link === "/materi") {
                  alert("Sabar Fer, menu Materi lagi diproses!");
                } else {
                  window.location.href = item.link;
                }
              }}
              className="w-full group relative overflow-hidden rounded-[2rem] bg-[#1e293b] p-6 transition-all hover:scale-[1.02] active:scale-95 border border-white/10 shadow-2xl text-left"
            >
              {/* Overlay Gradasi Tipis */}
              <div className={`absolute inset-0 opacity-20 bg-gradient-to-r ${item.color}`}></div>
              
              <div className="relative flex items-center space-x-5">
                {/* Ikon Box */}
                <div className={`text-3xl p-4 rounded-2xl bg-gradient-to-br ${item.color} shadow-lg shadow-black/50`}>
                  {item.icon}
                </div>
                
                {/* Text Content - Dipaksa Putih Pakai text-white */}
                <div className="flex flex-col">
                  <h3 className="font-extrabold text-xl text-white leading-tight tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Footer Watermark */}
        <div className="mt-24 text-center border-t border-white/5 pt-8">
          <p className="text-gray-600 text-[9px] tracking-[0.5em] font-mono uppercase mb-3">SYSTEM INTEGRATION V.3.1</p>
          <div className="bg-[#1e293b] py-2 px-4 rounded-full inline-block border border-white/5">
            <p className="text-gray-300 text-[11px] font-semibold italic">
              by <span className="text-green-400 not-italic font-bold">Ahmat Choyrul Ferdyansyah</span>
            </p>
          </div>
          <p className="text-gray-700 text-[10px] mt-4 font-bold tracking-tighter uppercase">25025010100 | UPN "VETERAN" JAWA TIMUR</p>
        </div>

      </div>
    </div>
  );
}