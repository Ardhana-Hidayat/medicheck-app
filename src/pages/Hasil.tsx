import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Info,
  RotateCcw,
  ChevronDown,
  SearchX,
  HeartPulse,
} from "lucide-react";
import { gejala } from "../data/gejala";

export default function Hasil() {
  const [hasilDiagnosa, setHasilDiagnosa] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = sessionStorage.getItem("hasilDiagnosa");
    if (!data) {
      navigate("/");
      return;
    }
    try {
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) {
        navigate("/");
        return;
      }
      setHasilDiagnosa(parsed);
      if (parsed.length > 0) {
        setExpandedId(parsed[0].penyakit.id);
      }
    } catch {
      navigate("/");
    }
  }, [navigate]);

  const handleReset = () => {
    sessionStorage.removeItem("hasilDiagnosa");
    navigate("/");
  };

  /**
   * Indikator visual berdasarkan jumlah gejala cocok — bukan persentase.
   * Digunakan hanya untuk membedakan tampilan secara visual, bukan sebagai
   * nilai kepastian/confidence yang diklaim secara medis.
   */
  const getMatchStyle = (gejalaCocok) => {
    if (gejalaCocok >= 5)
      return {
        badge: "text-rose-700 bg-rose-50 ring-rose-200",
        bar: "bg-rose-400",
        dot: "bg-rose-400",
      };
    if (gejalaCocok >= 3)
      return {
        badge: "text-amber-700 bg-amber-50 ring-amber-200",
        bar: "bg-amber-400",
        dot: "bg-amber-400",
      };
    return {
      badge: "text-slate-600 bg-slate-100 ring-slate-200",
      bar: "bg-slate-400",
      dot: "bg-slate-400",
    };
  };

  const getGejalaName = (id) => {
    const g = gejala.find((item) => item.id === id);
    return g ? g.nama : id;
  };

  if (!hasilDiagnosa) return null;

  return (
    <div className="min-h-screen w-full bg-background text-slate-950 antialiased selection:bg-slate-100">
      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Hasil Diagnosa
          </h1>
          <p className="text-sm text-slate-500">
            Berikut kemungkinan penyakit berdasarkan gejala yang Anda pilih, diurutkan dari kecocokan terbanyak.
          </p>
        </div>

        {/* Disclaimer / Alert (Warning Style - Amber) */}
        <div className="flex items-start gap-3 p-4 rounded-lg border border-amber-200 bg-amber-50/50 text-amber-900">
          <Info className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
          <p className="text-sm leading-normal font-medium">
            Hasil ini adalah panduan awal berbasis sistem pakar.{" "}
            <span className="underline underline-offset-4 font-semibold text-amber-950">Konsultasikan dengan dokter</span> untuk diagnosis dan penanganan yang tepat.
          </p>
        </div>

        {/* Results */}
        {hasilDiagnosa.length > 0 ? (
          <div className="space-y-4">
            {hasilDiagnosa.map((hasil, index) => {
              const { penyakit, gejalaCocok, totalGejala, gejalaCocokList } = hasil;
              const isExpanded = expandedId === penyakit.id;
              const isTop = index === 0;

              return (
                <div
                  key={penyakit.id}
                  className={`rounded-xl border bg-white text-slate-950 overflow-hidden transition-all ${isTop ? "ring-1 ring-slate-950 border-slate-950" : "border-slate-200"
                    }`}
                >
                  {/* Label paling cocok untuk hasil pertama (Top Match Header tanpa bintang & tanpa teks kanan) */}
                  {isTop && (
                    <div className="bg-slate-900 px-4 py-1.5 flex items-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                        Kecocokan Tertinggi
                      </span>
                    </div>
                  )}

                  {/* Header — always visible (Accordion Trigger) */}
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : penyakit.id)}
                    className="w-full text-left p-5 hover:bg-slate-50/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base font-bold tracking-tight text-slate-900">
                            {penyakit.namaLengkap || penyakit.nama}
                          </h3>
                          <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 border border-slate-200/50">
                            {penyakit.kode}
                          </span>
                        </div>

                        {/* Gejala cocok — informasi utama */}
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span className="inline-flex items-center rounded-full bg-slate-100 border border-slate-200 px-2 py-0.5 font-semibold text-slate-900">
                            {gejalaCocok} gejala cocok
                          </span>
                          <span>dari {totalGejala} gejala terdaftar</span>
                        </div>
                      </div>

                      {/* Kanan — Hanya Arrow Trigger (titik indikator dihapus) */}
                      <div className="flex items-center shrink-0 mt-0.5">
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isExpanded ? "rotate-180 text-slate-900" : ""
                            }`}
                        />
                      </div>
                    </div>

                    {/* Progress bar — Monokrom standar shadcn */}
                    <div className="mt-4 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-slate-900 transition-all duration-500 ease-in-out"
                        style={{
                          width: `${Math.round((gejalaCocok / totalGejala) * 100)}%`,
                        }}
                      />
                    </div>
                  </button>

                  {/* Expandable detail (Accordion Content) */}
                  {isExpanded && (
                    <div className="px-5 pb-5 space-y-5 border-t border-slate-100 bg-white">
                      {/* Deskripsi */}
                      <div className="pt-4 space-y-1">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Deskripsi
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {penyakit.deskripsi}
                        </p>
                      </div>

                      {/* Gejala yang cocok (Tanpa icon HeartPulse) */}
                      {gejalaCocokList && gejalaCocokList.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Gejala yang Cocok
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {gejalaCocokList.map((gId) => (
                              <span
                                key={gId}
                                className="inline-flex items-center text-xs font-medium text-slate-900 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md"
                              >
                                {getGejalaName(gId)}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Penanganan */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Saran Penanganan
                        </h4>
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
                          <p className="text-sm text-slate-700 leading-relaxed font-medium">
                            {penyakit.penanganan}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty state */
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-3">
            <div className="mx-auto w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200">
              <SearchX className="w-5 h-5 text-slate-400" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold tracking-tight text-slate-900">
                Tidak Ada Kecocokan
              </h3>
              <p className="text-xs text-slate-500 leading-normal">
                Gejala yang Anda pilih tidak cocok dengan penyakit dalam basis pengetahuan kami. Silakan coba kembali dengan gejala lain.
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-center pt-2">
          <button
            onClick={handleReset}
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-10 border border-slate-200 bg-white px-4 py-2 hover:bg-slate-100 hover:text-slate-900 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Diagnosa Ulang
          </button>
        </div>
      </div>
    </div>
  );
}