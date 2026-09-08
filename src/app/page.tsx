import Panggung from "@/components/Panggung";
import TautanPanel from "@/components/Tautan";

export default function Home() {
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
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 22V9M12 9c0-3.5-2-6-5-7 0 3.6 1.8 6.2 5 7Zm0 0c0-3.5 2-6 5-7 0 3.6-1.8 6.2-5 7Zm0 5c0-3 2-4.8 5-5.4-.3 3.2-2 5-5 5.4Zm0 0c0-3-2-4.8-5-5.4.3 3.2 2 5 5 5.4Z"
                  stroke="#3A2208"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>
              <b>CWS Way Kanan</b>
              <span>Co Working Space Penyuluhan Pertanian</span>
            </span>
          </a>

          <nav className="menu" id="menu" aria-label="Menu utama">
            <a href="#">Profil</a>
            <a href="#">Layanan</a>
            <a href="#">Agenda</a>
            <a href="#">Data & Peta</a>
            <a className="tombol-kepala" href="#">
              Pesan ruang
            </a>
          </nav>

          <button
            className="tombol-menu"
            id="tombolMenu"
            aria-controls="menu"
            aria-expanded="false"
            aria-label="Buka menu"
          >
            <span></span>
            <span></span>
          </button>
        </header>

        <main className="isi">
          <div>
            <span className="status">
              <span className="titik" aria-hidden="true"></span> Buka Senin–Jumat, 08.00–16.00
              WIB
            </span>

            <h1>
              <span className="baris">
                <i>Tempat penyuluh,</i>
              </span>
              <span className="baris">
                <i>petani, dan data</i>
              </span>
              <span className="baris">
                <i className="surya">bertemu di sini.</i>
              </span>
            </h1>

            <p className="ringkas">
              Co Working Space Way Kanan adalah kelembagaan penyuluhan tingkat kabupaten: ruang
              kerja bersama, pendampingan usaha tani, dan pusat data pertanian untuk 15 kecamatan
              di Bumi Ramik Ragom.
            </p>

            <div className="aksi">
              <a className="utama" href="#">
                Lihat agenda minggu ini
              </a>
              <a className="kedua" href="#">
                Konsultasi dengan penyuluh
              </a>
            </div>

            <div className="angka">
              <div>
                <strong data-hitung="15">0</strong>
                <span>Kecamatan terlayani</span>
              </div>
              <div>
                <strong data-hitung="227">0</strong>
                <span>Kampung binaan</span>
              </div>
              <div>
                <strong data-hitung="96" data-akhir="+">
                  0
                </strong>
                <span>Penyuluh & POPT</span>
              </div>
              <div>
                <strong data-hitung="1240" data-akhir="+">
                  0
                </strong>
                <span>Kelompok tani terdata</span>
              </div>
            </div>
          </div>

          <TautanPanel />
        </main>
      </div>

      <div className="pita">
        <div className="jalan">
          <span>Pendaftaran kartu tani gelombang III dibuka sampai 20 September</span>
          <span>Harga gabah kering panen minggu ini: Rp6.100/kg</span>
          <span>Peta sebaran alsintan bantuan tahun 2026 sudah dapat diakses</span>
          <span>Laporan e-RDKK wilayah binaan ditutup setiap tanggal 25</span>
          <span>Layanan konsultasi daring tersedia setiap hari kerja</span>
        </div>
      </div>
    </>
  );
}
