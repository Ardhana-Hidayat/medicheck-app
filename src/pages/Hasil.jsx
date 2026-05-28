import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Info,
  RotateCcw,
  ChevronDown,
  SearchX,
  Stethoscope,
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
      navigate("/diagnosa");
      return;
    }
    try {
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) {
        navigate("/diagnosa");
        return;
      }
      setHasilDiagnosa(parsed);
      // auto-expand first result if available
      if (parsed.length > 0) {
        setExpandedId(parsed[0].penyakit.id);
      }
    } catch {
      navigate("/diagnosa");
    }
  }, [navigate]);

  const handleReset = () => {
    sessionStorage.removeItem("hasilDiagnosa");
    navigate("/diagnosa");
  };

  const getScoreStyle = (score) => {
    if (score >= 70)
      return {
        label: "Kemungkinan Tinggi",
        badge: "text-rose-700 bg-rose-50 ring-rose-200",
        bar: "from-rose-500 to-rose-400",
      };
    if (score >= 40)
      return {
        label: "Kemungkinan Sedang",
        badge: "text-amber-700 bg-amber-50 ring-amber-200",
        bar: "from-amber-500 to-amber-400",
      };
    return {
      label: "Kemungkinan Rendah",
      badge: "text-slate-600 bg-slate-100 ring-slate-200",
      bar: "from-slate-400 to-slate-300",
    };
  };

  const getGejalaName = (id) => {
    const g = gejala.find((item) => item.id === id);
    return g ? g.nama : id;
  };

  if (!hasilDiagnosa) return null;

  return (
    <div className="flex-1 bg-slate-50/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">
            Hasil Diagnosa
          </h1>
          <p className="text-sm text-slate-500">
            Berikut kemungkinan penyakit berdasarkan gejala yang Anda pilih.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-50/70 border border-amber-200/60 mb-6">
          <Info className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 leading-relaxed">
            Hasil ini adalah panduan awal. Selalu{" "}
            <strong>konsultasikan dengan dokter</strong> untuk diagnosis dan
            penanganan yang tepat.
          </p>
        </div>

        {/* Results */}
        {hasilDiagnosa.length > 0 ? (
          <div className="space-y-3">
            {hasilDiagnosa.map((hasil, index) => {
              const { penyakit, score, gejalaCocok, totalGejala, gejalaCocokList } =
                hasil;
              const style = getScoreStyle(score);
              const isExpanded = expandedId === penyakit.id;

              return (
                <div
                  key={penyakit.id}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
                >
                  {/* Header — always visible */}
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedId(isExpanded ? null : penyakit.id)
                    }
                    className="w-full text-left p-4 sm:p-5 hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <h3 className="text-base font-bold text-slate-900">
                            {penyakit.namaLengkap || penyakit.nama}
                          </h3>
                          <span className="text-[10px] font-semibold tracking-wide text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                            {penyakit.kode}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ring-1 ${style.badge}`}
                          >
                            {style.label}
                          </span>
                          <span className="text-xs text-slate-400">
                            {gejalaCocok}/{totalGejala} gejala cocok
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-2xl font-extrabold text-slate-800 tabular-nums">
                          {score}
                          <span className="text-base font-bold text-slate-400">
                            %
                          </span>
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${style.bar} transition-all duration-700 ease-out`}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </button>

                  {/* Expandable detail */}
                  {isExpanded && (
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 space-y-4 border-t border-slate-100">
                      {/* Deskripsi */}
                      <div className="pt-4">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                          Deskripsi
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {penyakit.deskripsi}
                        </p>
                      </div>

                      {/* Gejala yang cocok */}
                      {gejalaCocokList && gejalaCocokList.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                            Gejala yang Cocok
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {gejalaCocokList.map((gId) => (
                              <span
                                key={gId}
                                className="inline-flex items-center gap-1 text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded-md"
                              >
                                <HeartPulse className="w-3 h-3" />
                                {getGejalaName(gId)}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Penanganan */}
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                          Saran Penanganan
                        </h4>
                        <div className="bg-emerald-50/60 border border-emerald-100 rounded-lg p-3">
                          <p className="text-sm text-emerald-800 leading-relaxed">
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
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-10 text-center">
            <SearchX className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-800 mb-1">
              Tidak Ada Kecocokan
            </h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              Gejala yang Anda pilih tidak cocok dengan penyakit dalam basis data
              kami. Silakan coba kembali dengan gejala lain.
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-center pt-6">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-800 transition-colors shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Diagnosa Ulang
          </button>
        </div>
      </div>
    </div>
  );
}
