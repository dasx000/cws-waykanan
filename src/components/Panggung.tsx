"use client";
import { useEffect } from "react";

export default function Panggung() {
  useEffect(() => {
    const diamSaja = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pembersih: Array<() => void> = [];

    /* rumpun padi di garis depan */
    (function () {
      const g = document.getElementById("padi");
      if (!g) return;
      let isi = "";
      const jarak = innerWidth < 700 ? 38 : 17; // lebih sedikit rumpun di HP
      for (let x = -10; x < 1450; x += jarak) {
        const t = 24 + Math.random() * 26;
        const d = (Math.random() * 3).toFixed(2);
        const l = (4 + Math.random() * 1.6).toFixed(2);
        isi += `<g class="rumpun" style="animation-delay:-${d}s;animation-duration:${l}s" transform="translate(${x} 300)">
          <path d="M0 0v-${t}" stroke="#3E8A50" stroke-width="2.2"/>
          <path d="M0 -${t}c5-4 8-9 8-14" stroke="#5FAE68" stroke-width="2.2" fill="none"/>
          <path d="M0 -${t - 8}c-5-3-8-7-9-12" stroke="#357C46" stroke-width="2" fill="none"/>
        </g>`;
      }
      g.innerHTML = isi;
    })();

    /* serbuk beterbangan */
    if (!diamSaja) {
      const p = document.getElementById("panggung");
      const jumlah = innerWidth < 700 ? 10 : 26;
      const debu: HTMLSpanElement[] = [];
      if (p) {
        for (let i = 0; i < jumlah; i++) {
          const d = document.createElement("span");
          const s = 2 + Math.random() * 4;
          d.className = "debu";
          d.style.left = Math.random() * 100 + "%";
          d.style.width = d.style.height = s + "px";
          d.style.setProperty("--geser", Math.random() * 160 - 80 + "px");
          d.style.animation = `naik ${14 + Math.random() * 16}s linear ${Math.random() * 18}s infinite`;
          p.appendChild(d);
          debu.push(d);
        }
      }
      pembersih.push(() => debu.forEach((d) => d.remove()));
    }

    /* parallax mengikuti kursor */
    if (!diamSaja && window.matchMedia("(pointer:fine)").matches) {
      const lapisan = document.querySelectorAll<HTMLElement>("[data-dalam]");
      let x = 0,
        y = 0,
        tx = 0,
        ty = 0;
      let rafId = 0;
      const gerakMouse = (e: MouseEvent) => {
        tx = (e.clientX / innerWidth - 0.5) * 2;
        ty = (e.clientY / innerHeight - 0.5) * 2;
      };
      addEventListener("mousemove", gerakMouse);
      (function gerak() {
        x += (tx - x) * 0.06;
        y += (ty - y) * 0.06;
        lapisan.forEach((el) => {
          const d = +el.dataset.dalam!;
          el.style.transform = `translate3d(${-x * d}px, ${-y * d * 0.4}px, 0)`;
        });
        rafId = requestAnimationFrame(gerak);
      })();
      pembersih.push(() => {
        removeEventListener("mousemove", gerakMouse);
        cancelAnimationFrame(rafId);
      });
    }

    /* angka berjalan naik */
    document.querySelectorAll<HTMLElement>("[data-hitung]").forEach((el, i) => {
      const tujuan = +el.dataset.hitung!,
        akhir = el.dataset.akhir || "";
      if (diamSaja) {
        el.textContent = tujuan.toLocaleString("id-ID") + akhir;
        return;
      }
      const mulai = performance.now() + 900 + i * 130;
      let rafId = 0;
      (function hitung(t: number) {
        const p = Math.min(Math.max((t - mulai) / 1500, 0), 1);
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(tujuan * e).toLocaleString("id-ID") + (p === 1 ? akhir : "");
        if (p < 1) rafId = requestAnimationFrame(hitung);
      })(performance.now());
      pembersih.push(() => cancelAnimationFrame(rafId));
    });

    return () => pembersih.forEach((bersihkan) => bersihkan());
  }, []);

  return null;
}
