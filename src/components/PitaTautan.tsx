"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Tautan = {
  id: string;
  title: string;
  url: string;
};

let sudahDihitung = false;

export default function PitaTautan() {
  const [tautan, setTautan] = useState<Tautan[]>([]);
  const [totalPengunjung, setTotalPengunjung] = useState<number | null>(null);

  useEffect(() => {
    supabase
      .from("links")
      .select("id,title,url")
      .order("title", { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) setTautan(data as Tautan[]);
      });

    if (!sudahDihitung) {
      sudahDihitung = true;
      supabase.rpc("increment_page_views").then(({ data, error }) => {
        if (!error && typeof data === "number") setTotalPengunjung(data);
      });
    }
  }, []);

  if (tautan.length === 0 && totalPengunjung === null) return null;

  return (
    <div className="pita">
      <div className="jalan">
        {totalPengunjung !== null && (
          <span>Total pengunjung: {totalPengunjung.toLocaleString("id-ID")}</span>
        )}
        {tautan.map((item) => (
          <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer">
            {item.title}
          </a>
        ))}
      </div>
    </div>
  );
}
