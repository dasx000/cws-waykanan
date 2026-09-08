import Image from "next/image";
import Panggung from "@/components/Panggung";
import TautanPanel from "@/components/Tautan";
import PitaTautan from "@/components/PitaTautan";

export default function Home() {
  const badgeKatimker = (
    <>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 2l2.4 4.86L20 7.64l-4 3.9.94 5.46L12 14.77l-4.94 2.23L8 11.54l-4-3.9 5.6-.78L12 2Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
      Ketua Tim Kerja: Forensy Galenica, S.P., M.P.
    </>
  );

  return (
    <>
      <Panggung />

      <div className="panggung" id="panggung">
        <div className="langit"></div>
        <div className="matahari" data-dalam="6"></div>

        <svg className="burung" viewBox="0 0 60 20" fill="none" aria-hidden="true">
          <path
            className="kepak"
            d="M2 10c6-7 11-7 16 0 5-7 10-7 16 0"
            stroke="#0E2A24"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <svg className="burung dua" viewBox="0 0 60 20" fill="none" aria-hidden="true">
          <path
            className="kepak"
            d="M2 10c6-7 11-7 16 0 5-7 10-7 16 0"
            stroke="#0E2A24"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        <div className="kabut a"></div>

        <div className="lapis bukit-jauh" data-dalam="14">
          <svg viewBox="0 0 1440 200" preserveAspectRatio="none" aria-hidden="true">
            <path
              d="M0 200V128c120-46 210 22 330-6s186-92 318-64 196 96 330 62 258-64 462-38v118z"
              fill="#12414A"
            />
          </svg>
        </div>

        <div className="lapis bukit-dekat" data-dalam="26">
          <svg viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden="true">
            <path
              d="M0 220V150c150-70 250 30 390 6s210-96 356-70 224 104 372 76 210-56 322-30v88z"
              fill="#124233"
            />
          </svg>
        </div>

        <div className="kabut b"></div>

        <div className="lapis sawah" data-dalam="42">
          <svg viewBox="0 0 1440 300" preserveAspectRatio="none" aria-hidden="true">
            {/* petak sawah */}
            <path
              d="M0 300V116c180-40 300 34 470 12s250-70 430-44 250 84 540 40v176z"
              fill="#1F4E33"
            />
            <path
              d="M0 300V176c210-30 330 26 520 8s290-52 480-28 260 56 440 24v120z"
              fill="#173D28"
            />
            <g opacity=".55" stroke="#3E8A50" strokeWidth="2">
              <path d="M0 214c320 26 700 26 1440-6" />
              <path d="M0 246c360 22 760 22 1440-10" />
            </g>
            {/* rumpun padi */}
            <g id="padi" fill="#3E8A50"></g>
          </svg>
        </div>
      </div>

      <div className="bingkai">
        <header className="kepala">
          <a className="merek" href="#">
            <span className="tanda" aria-hidden="true">
              <Image src="/logo-kementan.png" alt="" width={42} height={42} priority />
            </span>
            <span>
              <b>CWS Way Kanan</b>
              <span>Co Working Space Penyuluhan Pertanian</span>
            </span>
          </a>
        </header>

        <main className="isi">
          <div>
            <span className="status status-katimker katimker-desktop">{badgeKatimker}</span>

            <h1>
              <span className="judul-desktop">
                <span className="baris">
                  <i>Tempat penyuluh,</i>
                </span>
                <span className="baris">
                  <i>petani, dan data</i>
                </span>
                <span className="baris">
                  <i className="surya">bertemu di sini.</i>
                </span>
              </span>
              <span className="judul-mobile">CWS Way Kanan</span>
            </h1>

            <span className="status status-katimker katimker-mobile">{badgeKatimker}</span>

            <p className="ringkas">
              Co Working Space Way Kanan adalah kelembagaan penyuluhan tingkat kabupaten: ruang
              kerja bersama, pendampingan usaha tani, dan pusat data pertanian untuk 15 kecamatan
              di Bumi Ramik Ragom.
            </p>

            <div className="aksi">
              <a
                className="utama"
                href="https://maps.app.goo.gl/1TovA3BUChfuPZPJ7?g_st=ic"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="ikon-pin" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.8" />
                </svg>
                Lokasi CWS
                <svg className="ikon-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M9 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>

            <div className="angka">
              <div className="kartu-angka">
                <strong data-hitung="15">0</strong>
                <span>Kecamatan terlayani</span>
              </div>
              <div className="kartu-angka">
                <strong data-hitung="227">0</strong>
                <span>Desa Binaan</span>
              </div>
              <div className="kartu-angka">
                <strong data-hitung="94" data-akhir="+">
                  0
                </strong>
                <span>Penyuluh</span>
              </div>
              <div className="kartu-angka">
                <strong data-hitung="2944" data-akhir="+">
                  0
                </strong>
                <span>Kelompok yang terbina</span>
              </div>
            </div>
          </div>

          <TautanPanel />
        </main>
      </div>

      <PitaTautan />
    </>
  );
}
