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
      options: { redirectTo: typeof window !== 'undefined' ? window.location.origin : '' }
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
      .insert([{ npm: npmUser, nama: namaClean, email: emailUser }]);

    if (error) { setStatus('error'); } else { setStatus('success'); }
    setLoading(false);
  };

  if (status === 'success') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a101e', padding: '20px', fontFamily: 'sans-serif' }}>
        <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(255,255,255,0.03)', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
          <div style={{ fontSize: '70px' }}>⭐</div>
          <h1 style={{ color: '#4ade80', fontSize: '24px', fontWeight: '900', marginTop: '20px' }}>PRESENSI BERHASIL</h1>
          <button onClick={() => setStatus('idle')} style={{ marginTop: '30px', padding: '12px 30px', borderRadius: '15px', background: '#4ade80', color: '#0a101e', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>KEMBALI</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0a101e', fontFamily: 'sans-serif', padding: '20px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '10%', left: '10%', width: '300px', height: '300px', background: '#16a34a', filter: 'blur(120px)', opacity: '0.2', borderRadius: '50%' }}></div>
      <div style={{ zIndex: 10, width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <p style={{ color: '#4ade80', fontWeight: '800', fontSize: '11px' }}>UPN "VETERAN" JAWA TIMUR</p>
            <h1 style={{ color: 'white', fontSize: '30px', fontWeight: '900' }}>Sistem Presensi</h1>
        </div>
        <div style={{ background: 'rgba(23, 31, 48, 0.6)', backdropFilter: 'blur(20px)', padding: '40px 30px', borderRadius: '35px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          {!user ? (
            <button onClick={handleLogin} style={{ width: '100%', padding: '16px', background: 'white', color: '#0a101e', border: 'none', borderRadius: '18px', fontWeight: '800', cursor: 'pointer' }}>Login Akun Google</button>
          ) : (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <div style={{ width: '70px', height: '70px', background: 'linear-gradient(135deg, #22c55e, #3b82f6)', borderRadius: '20px', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🎓</div>
                <div style={{ color: 'white', fontWeight: '800', fontSize: '18px' }}>{user.user_metadata?.full_name?.replace(/[0-9]/g, '').trim()}</div>
                <div style={{ color: '#4ade80', fontWeight: '700' }}>{user.email?.split('@')[0]}</div>
              </div>
              {pesan && <div style={{ color: '#4ade80', textAlign: 'center', marginBottom: '15px', fontWeight: 'bold' }}>{pesan}</div>}
              <button onClick={handleHadir} disabled={loading} style={{ width: '100%', padding: '18px', background: 'linear-gradient(90deg, #22c55e, #16a34a)', color: 'white', border: 'none', borderRadius: '18px', fontWeight: '900', cursor: 'pointer' }}>
                {loading ? 'MENGECEK...' : 'KONFIRMASI HADIR'}
              </button>
            </div>
          )}
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px', color: '#475569', fontSize: '10px' }}>ADMIN PANEL V.2.1 | by Ahmat Choyrul Ferdyansyah</div>
      </div>
    </div>
  );
}