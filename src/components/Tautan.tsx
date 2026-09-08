"use client";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/lib/supabase";

type Tautan = {
  id: string;
  title: string;
  url: string;
  created_at: string;
};

function normalkanUrl(nilai: string) {
  const bersih = nilai.trim();
  return /^https?:\/\//i.test(bersih) ? bersih : `https://${bersih}`;
}

export default function TautanPanel() {
  const [tautan, setTautan] = useState<Tautan[]>([]);
  const [memuat, setMemuat] = useState(true);
  const [pencarian, setPencarian] = useState("");
  const [modeEdit, setModeEdit] = useState(false);
  const [aksiTerbuka, setAksiTerbuka] = useState(false);

  const [formTerbuka, setFormTerbuka] = useState(false);
  const [judul, setJudul] = useState("");
  const [url, setUrl] = useState("");
  const [mengirim, setMengirim] = useState(false);
  const [error, setError] = useState("");

  const [sedangEdit, setSedangEdit] = useState<string | null>(null);
  const [judulEdit, setJudulEdit] = useState("");
  const [urlEdit, setUrlEdit] = useState("");
  const [menyimpanEdit, setMenyimpanEdit] = useState(false);
  const [errorEdit, setErrorEdit] = useState("");
  const [menghapus, setMenghapus] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("links")
      .select("*")
      .order("title", { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) setTautan(data as Tautan[]);
        setMemuat(false);
      });
  }, []);

  async function tambahTautan(e: FormEvent) {
    e.preventDefault();
    if (!judul.trim() || !url.trim()) return;

    setMengirim(true);
    setError("");
    const { data, error } = await supabase
      .from("links")
      .insert({ title: judul.trim(), url: normalkanUrl(url) })
      .select()
      .single();
    setMengirim(false);

    if (error) {
      setError("Gagal menambah link. Coba lagi.");
      return;
    }

    setTautan((prev) =>
      [...prev, data as Tautan].sort((a, b) => a.title.localeCompare(b.title))
    );
    setJudul("");
    setUrl("");
    setFormTerbuka(false);
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

  async function simpanEdit(e: FormEvent, id: string) {
    e.preventDefault();
    if (!judulEdit.trim() || !urlEdit.trim()) return;

    setMenyimpanEdit(true);
    setErrorEdit("");
    const { data, error } = await supabase
      .from("links")
      .update({ title: judulEdit.trim(), url: normalkanUrl(urlEdit) })
      .eq("id", id)
      .select()
      .single();
    setMenyimpanEdit(false);

    if (error) {
      setErrorEdit("Gagal menyimpan perubahan.");
      return;
    }

    setTautan((prev) =>
      prev
        .map((t) => (t.id === id ? (data as Tautan) : t))
        .sort((a, b) => a.title.localeCompare(b.title))
    );
    setSedangEdit(null);
  }

  async function hapusTautan(id: string) {
    setMenghapus(id);
    const { error } = await supabase.from("links").delete().eq("id", id);
    setMenghapus(null);
    if (!error) setTautan((prev) => prev.filter((t) => t.id !== id));
  }

  const tautanTertampil = tautan.filter((item) =>
    item.title.toLowerCase().includes(pencarian.trim().toLowerCase())
  );

  return (
    <aside className="panel" aria-label="Tautan">
      <div className="panel-atas">
        <div>
          <h2>Tautan kami</h2>
          <p>Semua link penting CWS Way Kanan</p>
        </div>
        <input
          type="search"
          className="cari-tautan"
          placeholder="Cari tautan…"
          value={pencarian}
          onChange={(e) => setPencarian(e.target.value)}
          aria-label="Cari tautan"
        />
      </div>

      <ul className="daftar">
        {memuat && <li className="daftar-kosong">Memuat tautan…</li>}
        {!memuat && tautanTertampil.length === 0 && (
          <li className="daftar-kosong">
            {pencarian ? `Tidak ada tautan untuk "${pencarian}".` : "Belum ada tautan. Tambahkan yang pertama!"}
          </li>
        )}
        {tautanTertampil.map((item) => {
          if (!modeEdit) {
            return (
              <li key={item.id}>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <span className="tautan-judul">{item.title}</span>
                </a>
              </li>
            );
          }

          if (sedangEdit === item.id) {
            return (
              <li key={item.id}>
                <form
                  className="form-tautan form-tautan-inline"
                  onSubmit={(e) => simpanEdit(e, item.id)}
                >
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
              </li>
            );
          }

          return (
            <li key={item.id}>
              <div className="tautan-baris">
                <span className="tautan-judul">{item.title}</span>
                <div className="aksi-item">
                  <button type="button" onClick={() => mulaiEdit(item)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="hapus"
                    disabled={menghapus === item.id}
                    onClick={() => hapusTautan(item.id)}
                  >
                    {menghapus === item.id ? "…" : "Hapus"}
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="accordion-aksi">
        <button
          type="button"
          className={`tombol-panah ${aksiTerbuka ? "putar" : ""}`}
          aria-expanded={aksiTerbuka}
          aria-label={aksiTerbuka ? "Sembunyikan aksi" : "Tampilkan aksi"}
          onClick={() => {
            setAksiTerbuka((v) => !v);
            setFormTerbuka(false);
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {aksiTerbuka &&
          (formTerbuka ? (
            <form className="form-tautan" onSubmit={tambahTautan}>
              <input
                type="text"
                placeholder="Judul link"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="https://"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
              {error && <p className="form-error">{error}</p>}
              <div className="aksi-form">
                <button type="submit" disabled={mengirim}>
                  {mengirim ? "Menyimpan…" : "Simpan"}
                </button>
                <button type="button" onClick={() => setFormTerbuka(false)}>
                  Batal
                </button>
              </div>
            </form>
          ) : (
            <div className="panel-bawah">
              <button className="tombol-tautan" onClick={() => setFormTerbuka(true)}>
                + Tambah link
              </button>
              <button
                className={`tombol-edit ${modeEdit ? "aktif" : ""}`}
                onClick={() => {
                  setModeEdit((v) => !v);
                  setSedangEdit(null);
                }}
              >
                {modeEdit ? "Selesai" : "Edit"}
              </button>
            </div>
          ))}
      </div>
    </aside>
  );
}
