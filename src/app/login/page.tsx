"use client";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function pesanKesalahan(pesan: string) {
  if (/invalid login credentials/i.test(pesan)) {
    return "Email atau password salah.";
  }
  if (/email not confirmed/i.test(pesan)) {
    return "Email belum dikonfirmasi.";
  }
  return "Gagal masuk. Silakan coba lagi.";
}

export default function HalamanMasuk() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mengirim, setMengirim] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) router.replace("/admin");
    });
  }, [supabase, router]);

  async function masuk(e: FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) return;

    setMengirim(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setMengirim(false);

    if (error) {
      setError(pesanKesalahan(error.message));
      return;
    }

    router.replace("/admin");
  }

  return (
    <div className="halaman-auth">
      <form className="kartu-auth" onSubmit={masuk}>
        <h1>Masuk Admin</h1>
        <p>CWS Way Kanan — kelola tautan landing page</p>

        <label>
          Email
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {error && <p className="form-error">{error}</p>}

        <button type="submit" disabled={mengirim}>
          {mengirim ? "Memproses…" : "Masuk"}
        </button>
      </form>
    </div>
  );
}
