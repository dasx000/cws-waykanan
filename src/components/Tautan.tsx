"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Tautan = {
  id: string;
  title: string;
  url: string;
  created_at: string;
};

export default function TautanPanel() {
  const [supabase] = useState(() => createClient());
  const [tautan, setTautan] = useState<Tautan[]>([]);
  const [memuat, setMemuat] = useState(true);
  const [pencarian, setPencarian] = useState("");

  useEffect(() => {
    supabase
      .from("links")
      .select("*")
      .order("title", { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) setTautan(data as Tautan[]);
        setMemuat(false);
      });
  }, [supabase]);

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
            {pencarian ? `Tidak ada tautan untuk "${pencarian}".` : "Belum ada tautan."}
          </li>
        )}
        {tautanTertampil.map((item) => (
          <li key={item.id}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <span className="tautan-judul">{item.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
