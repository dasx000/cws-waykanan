"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Tautan = {
  id: string;
  title: string;
  url: string;
};

export default function PitaTautan() {
  const [tautan, setTautan] = useState<Tautan[]>([]);

  useEffect(() => {
    supabase
      .from("links")
      .select("id,title,url")
      .order("title", { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) setTautan(data as Tautan[]);
      });
  }, []);

  if (tautan.length === 0) return null;

  return (
    <div className="pita">
      <div className="jalan">
        {tautan.map((item) => (
          <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer">
            {item.title}
          </a>
        ))}
      </div>
    </div>
  );
}
