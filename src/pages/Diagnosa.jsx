import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, RotateCcw, Check, Info, ArrowRight, X } from "lucide-react";
import { gejala } from "../data/gejala";
import { forwardChaining } from "../engine/forwardChaining";

export default function Diagnosa() {
  const [gejalaDipilih, setGejalaDipilih] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleToggleGejala = (id) => {
    setGejalaDipilih((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const handleReset = () => {
    setGejalaDipilih([]);
    setSearchQuery("");
  };

  const handleSubmit = () => {
    if (gejalaDipilih.length === 0) return;
    const hasil = forwardChaining(gejalaDipilih);
    sessionStorage.setItem("hasilDiagnosa", JSON.stringify(hasil));
    navigate("/hasil");
  };

  const filteredGejala = useMemo(
    () =>
      gejala.filter((g) =>
        g.nama.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  );

  const selectedNames = useMemo(
    () =>
      gejala
        .filter((g) => gejalaDipilih.includes(g.id))
        .map((g) => ({ id: g.id, nama: g.nama })),
    [gejalaDipilih]
  );

  return (
    <div className="flex-1 bg-slate-50/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">
            Pilih Gejala Anda
          </h1>
          <p className="text-sm text-slate-500">
            Centang gejala yang sedang Anda rasakan saat ini.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-50/70 border border-amber-200/60 mb-6">
          <Info className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 leading-relaxed">
            Hasil diagnosa hanya sebagai panduan awal dan{" "}
            <strong>bukan pengganti konsultasi dokter</strong>.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left — Symptom List */}
          <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Search + Controls */}
            <div className="p-4 border-b border-slate-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari gejala..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white outline-none transition-all placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Symptom Grid */}
            <div className="p-4 max-h-[55vh] overflow-y-auto custom-scrollbar">
              {filteredGejala.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {filteredGejala.map((g) => {
                    const isSelected = gejalaDipilih.includes(g.id);
                    return (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => handleToggleGejala(g.id)}
                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left text-sm transition-all ${
                          isSelected
                            ? "bg-blue-50 text-blue-700 font-medium ring-1 ring-blue-200"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <div
                          className={`flex-shrink-0 w-4.5 h-4.5 rounded flex items-center justify-center transition-colors ${
                            isSelected
                              ? "bg-blue-500 text-white"
                              : "border border-slate-300"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" strokeWidth={3} />}
                        </div>
                        <span className="leading-snug">{g.nama}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center text-sm text-slate-400">
                  Tidak ada gejala yang cocok dengan pencarian.
                </div>
              )}
            </div>
          </div>

          {/* Right — Selection Summary */}
          <div className="w-full lg:w-72 shrink-0 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-4 lg:sticky lg:top-20">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-800">
                  Gejala Dipilih
                </h2>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                  {gejalaDipilih.length}
                </span>
              </div>

              {selectedNames.length > 0 ? (
                <div className="space-y-1.5 max-h-48 overflow-y-auto custom-scrollbar">
                  {selectedNames.map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center justify-between gap-2 px-2.5 py-1.5 bg-slate-50 rounded-lg group"
                    >
                      <span className="text-xs text-slate-600 leading-snug truncate">
                        {s.nama}
                      </span>
                      <button
                        onClick={() => handleToggleGejala(s.id)}
                        className="flex-shrink-0 text-slate-400 hover:text-rose-500 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 py-4 text-center">
                  Belum ada gejala yang dipilih.
                </p>
              )}

              <div className="pt-2 space-y-2">
                <button
                  onClick={handleSubmit}
                  disabled={gejalaDipilih.length === 0}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Lihat Hasil
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                {gejalaDipilih.length > 0 && (
                  <button
                    onClick={handleReset}
                    className="w-full flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-medium text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset Pilihan
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
