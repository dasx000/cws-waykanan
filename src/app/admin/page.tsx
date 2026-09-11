"use client";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Tautan = {
  id: string;
  title: string;
  url: string;
  created_at: string;
};

const PESAN_UMUM = "Gagal menyimpan. Silakan coba lagi.";
const PESAN_TOLAK = "Aksi ditolak — akun ini tidak memiliki izin admin untuk melakukan perubahan.";

function normalkanUrl(nilai: string) {
  const bersih = nilai.trim();
  return /^https?:\/\//i.test(bersih) ? bersih : `https://${bersih}`;
}

function urlValid(nilai: string) {
  try {
    new URL(normalkanUrl(nilai));
    return true;
  } catch {
    return false;
  }
}

function formatTanggal(nilai: string) {
  return new Date(nilai).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function HalamanAdmin() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());

  const [tautan, setTautan] = useState<Tautan[]>([]);
  const [memuat, setMemuat] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [keluarSedangProses, setKeluarSedangProses] = useState(false);

  const [judul, setJudul] = useState("");
  const [url, setUrl] = useState("");
  const [mengirim, setMengirim] = useState(false);
  const [error, setError] = useState("");

  const [sedangEdit, setSedangEdit] = useState<string | null>(null);
  const [judulEdit, setJudulEdit] = useState("");
  const [urlEdit, setUrlEdit] = useState("");
  const [menyimpanEdit, setMenyimpanEdit] = useState(false);
  const [errorEdit, setErrorEdit] = useState("");

  const [konfirmasiHapus, setKonfirmasiHapus] = useState<string | null>(null);
  const [menghapus, setMenghapus] = useState<string | null>(null);
  const [errorHapus, setErrorHapus] = useState("");

  useEffect(() => {
    supabase
      .from("links")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setTautan(data as Tautan[]);
        setMemuat(false);
      });

    supabase.rpc("is_admin").then(({ data, error }) => {
      if (!error) setIsAdmin(Boolean(data));
    });
  }, [supabase]);

  async function keluar() {
    setKeluarSedangProses(true);
    await supabase.auth.signOut();
    router.replace("/login");
  }

  async function tambahTautan(e: FormEvent) {
    e.preventDefault();
    const judulBersih = judul.trim();
    if (!judulBersih) {
      setError("Judul wajib diisi.");
      return;
    }
    if (!urlValid(url)) {
      setError("URL tidak valid.");
      return;
    }

    setMengirim(true);
    setError("");

    const idSementara = `sementara-${Date.now()}`;
    const urlBersih = normalkanUrl(url);
    const itemSementara: Tautan = {
      id: idSementara,
      title: judulBersih,
      url: urlBersih,
      created_at: new Date().toISOString(),
    };
    setTautan((prev) => [itemSementara, ...prev]);

    const { data, error: gagal } = await supabase
      .from("links")
      .insert({ title: judulBersih, url: urlBersih })
      .select()
      .maybeSingle();
    setMengirim(false);

    if (gagal || !data) {
      setTautan((prev) => prev.filter((t) => t.id !== idSementara));
      setError(gagal ? PESAN_UMUM : PESAN_TOLAK);
      return;
    }

    setTautan((prev) => prev.map((t) => (t.id === idSementara ? (data as Tautan) : t)));
    setJudul("");
    setUrl("");
  }

  function mulaiEdit(item: Tautan) {
    setSedangEdit(item.id);
    setJudulEdit(item.title);
    setUrlEdit(item.url);
    setErrorEdit("");
  }

  function batalEdit() {
    setSedangEdit(null);
  }

  async function simpanEdit(e: FormEvent, item: Tautan) {
    e.preventDefault();
    const judulBersih = judulEdit.trim();
    if (!judulBersih) {
      setErrorEdit("Judul wajib diisi.");
      return;
    }
    if (!urlValid(urlEdit)) {
      setErrorEdit("URL tidak valid.");
      return;
    }

    setMenyimpanEdit(true);
    setErrorEdit("");

    const sebelum = item;
    const urlBersih = normalkanUrl(urlEdit);
    setTautan((prev) =>
      prev.map((t) => (t.id === item.id ? { ...t, title: judulBersih, url: urlBersih } : t))
    );

    const { data, error: gagal } = await supabase
      .from("links")
      .update({ title: judulBersih, url: urlBersih })
      .eq("id", item.id)
      .select()
      .maybeSingle();
    setMenyimpanEdit(false);

    if (gagal || !data) {
      setTautan((prev) => prev.map((t) => (t.id === item.id ? sebelum : t)));
      setErrorEdit(gagal ? PESAN_UMUM : PESAN_TOLAK);
      return;
    }

    setTautan((prev) => prev.map((t) => (t.id === item.id ? (data as Tautan) : t)));
    setSedangEdit(null);
  }

  async function hapusTautan(item: Tautan) {
    setKonfirmasiHapus(null);
    setMenghapus(item.id);
    setErrorHapus("");
    setTautan((prev) => prev.filter((t) => t.id !== item.id));

    const { data, error: gagal } = await supabase
      .from("links")
      .delete()
      .eq("id", item.id)
      .select()
      .maybeSingle();
    setMenghapus(null);

    if (gagal || !data) {
      setTautan((prev) => [...prev, item].sort((a, b) => b.created_at.localeCompare(a.created_at)));
      setErrorHapus(gagal ? PESAN_UMUM : PESAN_TOLAK);
    }
  }

  return (
    <div className="halaman-admin">
      <header className="kepala-admin">
        <div>
          <b>Admin CWS Way Kanan</b>
          <span>Kelola tautan landing page</span>
        </div>
        <button type="button" className="tombol-keluar" onClick={keluar} disabled={keluarSedangProses}>
          {keluarSedangProses ? "Keluar…" : "Keluar"}
        </button>
      </header>

      {isAdmin === false && (
        <p className="banner-peringatan">
          Akun ini belum terdaftar sebagai admin. Anda bisa melihat daftar tautan, tapi tidak bisa
          menambah, mengubah, atau menghapus.
        </p>
      )}

      <section className="kartu-admin">
        <h2>Tambah tautan</h2>
        <form className="form-tautan form-admin" onSubmit={tambahTautan}>
          <input
            type="text"
            placeholder="Judul link"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            disabled={isAdmin === false}
            required
          />
          <input
            type="text"
            placeholder="https://"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isAdmin === false}
            required
          />
          {error && <p className="form-error">{error}</p>}
          <div className="aksi-form">
            <button type="submit" disabled={mengirim || isAdmin === false}>
              {mengirim ? "Menyimpan…" : "Tambah"}
            </button>
          </div>
        </form>
      </section>

      <section className="kartu-admin">
        <h2>Daftar tautan</h2>
        {errorHapus && <p className="form-error">{errorHapus}</p>}
        <div className="tabel-bungkus">
          <table className="tabel-admin">
            <thead>
              <tr>
                <th>Judul</th>
                <th>URL</th>
                <th>Dibuat</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {memuat && (
                <tr>
                  <td colSpan={4}>Memuat tautan…</td>
                </tr>
              )}
              {!memuat && tautan.length === 0 && (
                <tr>
                  <td colSpan={4}>Belum ada tautan.</td>
                </tr>
              )}
              {tautan.map((item) => {
                if (sedangEdit === item.id) {
                  return (
                    <tr key={item.id}>
                      <td colSpan={4}>
                        <form className="form-tautan form-tautan-inline" onSubmit={(e) => simpanEdit(e, item)}>
                          <input
                            type="text"
                            value={judulEdit}
                            onChange={(e) => setJudulEdit(e.target.value)}
                            required
                          />
                          <input
                            type="text"
                            value={urlEdit}
                            onChange={(e) => setUrlEdit(e.target.value)}
                            required
                          />
                          {errorEdit && <p className="form-error">{errorEdit}</p>}
                          <div className="aksi-form">
                            <button type="submit" disabled={menyimpanEdit}>
                              {menyimpanEdit ? "Menyimpan…" : "Simpan"}
                            </button>
                            <button type="button" onClick={batalEdit}>
                              Batal
                            </button>
                          </div>
                        </form>
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        {item.url}
                      </a>
                    </td>
                    <td>{formatTanggal(item.created_at)}</td>
                    <td className="kolom-aksi">
                      {konfirmasiHapus === item.id ? (
                        <div className="aksi-item">
                          <span>Yakin hapus?</span>
                          <button type="button" className="hapus" onClick={() => hapusTautan(item)}>
                            Ya
                          </button>
                          <button type="button" onClick={() => setKonfirmasiHapus(null)}>
                            Batal
                          </button>
                        </div>
                      ) : (
                        <div className="aksi-item">
                          <button type="button" onClick={() => mulaiEdit(item)} disabled={isAdmin === false}>
                            Edit
                          </button>
                          <button
                            type="button"
                            className="hapus"
                            disabled={isAdmin === false || menghapus === item.id}
                            onClick={() => setKonfirmasiHapus(item.id)}
                          >
                            {menghapus === item.id ? "…" : "Hapus"}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
