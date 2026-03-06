"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Absensi() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [pesan, setPesan] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser(data.user);
    });
  }, []);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    });
  };

  const handleHadir = async () => {
    setLoading(true);
    setPesan(null);
    const emailUser = user?.email;
    const npmUser = emailUser?.split('@')[0];
    const namaClean = (user?.user_metadata?.full_name || 'Mahasiswa').replace(/[0-9]/g, '').trim(); 

    const { data: existingUser } = await supabase
      .from('kehadiran')
      .select('npm')
      .eq('npm', npmUser)
      .maybeSingle();

    if (existingUser) {
      setPesan("Presensimu telah sukses, tidak perlu absen lagi!");
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from('kehadiran')
      .insert([{ npm: npmUser, nama: namaClean, email: emailUser }])
      .select();

    if (error) {
      setStatus('error'); 
    } else {
      setStatus('success');
    }
    setLoading(false);
  };

  if (status === 'success') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0f1e', fontFamily: 'sans-serif', padding: '20px' }}>
        <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(23, 31, 48, 0.8)', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
          <div style={{ fontSize: '70px', marginBottom: '20px' }}>⭐</div>
          <h1 style={{ color: '#34d399', fontSize: '2rem', fontWeight: '900' }}>PRESENSI BERHASIL</h1>
          <p style={{ color: '#a7f3d0', marginTop: '10px' }}>Selamat Belajar, Pejuang Muda!</p>
          <button onClick={() => setStatus('idle')} style={{ marginTop: '30px', padding: '12px 25px', borderRadius: '15px', background: '#34d399', color: '#064e3b', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>KEMBALI</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
      background: '#0a0f1e', fontFamily: 'sans-serif', padding: '20px', position: 'relative', overflow: 'hidden'
    }}>
      
      {/* Glow Background */}
      <div style={{ position: 'absolute', top: '5%', left: '5%', width: '350px', height: '350px', background: '#15803d', filter: 'blur(130px)', opacity: '0.3', borderRadius: '50%' }}></div>
      <div style={{ position: 'absolute', bottom: '5%', right: '5%', width: '300px', height: '300px', background: '#1d4ed8', filter: 'blur(130px)', opacity: '0.2', borderRadius: '50%' }}></div>

      <div style={{ zIndex: 10, width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '35px' }}>
            <div style={{ color: '#4ade80', fontWeight: '800', letterSpacing: '2px', fontSize: '13px', textTransform: 'uppercase' }}>UPN "VETERAN" JAWA TIMUR</div>
            <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '900', margin: '8px 0' }}>Sistem Presensi</h1>
            <div style={{ height: '3px', width: '40px', background: '#4ade80', margin: '15px auto', borderRadius: '10px' }}></div>
        </div>

        <div style={{ 
          background: 'rgba(23, 31, 48, 0.7)', backdropFilter: 'blur(20px)',
          padding: '45px 35px', borderRadius: '35px', border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5)' 
        }}>
          {!user ? (
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#94a3b8', marginBottom: '35px' }}>Login dengan email student untuk presensi.</p>
              <button onClick={handleLogin} style={{ width: '100%', padding: '18px', background: 'white', color: '#0a0f1e', borderRadius: '20px', fontWeight: '800', cursor: 'pointer', border: 'none' }}>Login Akun Google</button>
            </div>
          ) : (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #22c55e, #3b82f6)', borderRadius: '25px', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px' }}>🎓</div>
                <div style={{ color: 'white', fontWeight: '800', fontSize: '20px' }}>{user.user_metadata?.full_name?.replace(/[0-9]/g, '').trim()}</div>
                <div style={{ color: '#4ade80', fontWeight: '700', marginTop: '5px' }}>{user.email?.split('@')[0]}</div>
              </div>
              {pesan && <div style={{ color: '#34d399', textAlign: 'center', marginBottom: '15px', fontSize: '13px', fontWeight: 'bold' }}>{pesan}</div>}
              <button onClick={handleHadir} disabled={loading} style={{ width: '100%', padding: '20px', background: 'linear-gradient(90deg, #22c55e, #16a34a)', color: 'white', borderRadius: '20px', fontWeight: '900', cursor: 'pointer', border: 'none', textTransform: 'uppercase' }}>
                {loading ? 'MENGECEK...' : 'KONFIRMASI HADIR'}
              </button>
              <button onClick={() => supabase.auth.signOut().then(() => window.location.reload())} style={{ width: '100%', background: 'none', border: 'none', color: '#475569', marginTop: '20px', cursor: 'pointer', fontWeight: '700' }}>Ganti Akun Mahasiswa</button>
            </div>
          )}
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <div style={{ color: '#94a3b8', fontSize: '10px', fontWeight: '800', letterSpacing: '2px' }}>ADMIN PANEL V.2.1</div>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px', marginTop: '5px' }}>by Ahmat Choyrul Ferdyansyah</div>
        </div>
      </div>
    </div>
  );
}