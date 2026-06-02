import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, RotateCcw, Check, AlertCircle, ArrowRight, X } from "lucide-react";
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
    <div className="min-h-screen w-full bg-background text-slate-950 antialiased selection:bg-slate-100">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-6">

        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Pilih Gejala Anda
          </h1>
          <p className="text-sm text-slate-500">
            Centang gejala yang sedang Anda rasakan saat ini untuk memulai diagnosa.
          </p>
        </div>

        {/* Disclaimer / Alert (Warning Style) */}
        <div className="flex items-start gap-3 p-4 rounded-lg border border-amber-200 bg-amber-50/50 text-amber-900">
          <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
          <p className="text-sm leading-normal font-medium">
            Hasil diagnosa hanya sebagai panduan awal dan{" "}
            <span className="underline underline-offset-4 font-semibold text-amber-950">bukan pengganti konsultasi dokter</span>.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* Left — Symptom Selection (Card) */}
          <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white text-slate-950 overflow-hidden">

            {/* Search Input */}
            <div className="p-4 border-b border-slate-100">
              <div className="relative flex items-center">
                <Search className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Cari gejala..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-slate-200 bg-white pl-9 pr-9 py-2 text-sm ring-offset-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 p-1 rounded-sm text-slate-400 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Symptom List */}
            <div className="p-4 max-h-[50vh] overflow-y-auto scrollbar-thin">
              {filteredGejala.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {filteredGejala.map((g) => {
                    const isSelected = gejalaDipilih.includes(g.id);
                    return (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => handleToggleGejala(g.id)}
                        className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 ${isSelected
                          ? "bg-slate-100 text-slate-900 font-medium"
                          : "hover:bg-slate-50 text-slate-600 hover:text-slate-900"
                          }`}
                      >
                        {/* Checkbox Mimic */}
                        <div
                          className={`flex items-center justify-center h-4 w-4 shrink-0 rounded-sm border transition-all ${isSelected
                            ? "border-slate-900 bg-slate-900 text-white"
                            : "border-slate-300 bg-white"
                            }`}
                        >
                          {isSelected && <Check className="w-3 h-3" strokeWidth={3} />}
                        </div>
                        <span className="leading-none">{g.nama}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center text-sm text-slate-400 font-medium">
                  Tidak ada gejala yang cocok dengan pencarian.
                </div>
              )}
            </div>
          </div>

          {/* Right — Sidebar Summary (Card) */}
          <div className="rounded-xl border border-slate-200 bg-white text-slate-950 p-4 space-y-4 lg:sticky lg:top-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm font-semibold tracking-tight">
                Gejala Dipilih
              </h2>
              <span className="inline-flex items-center justify-center rounded-full bg-slate-900 px-2.5 py-0.5 text-xs font-semibold text-white transition-colors">
                {gejalaDipilih.length}
              </span>
            </div>

            {selectedNames.length > 0 ? (
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {selectedNames.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between gap-2 px-2.5 py-2 bg-slate-50 border border-slate-100 rounded-md"
                  >
                    <span className="text-xs font-medium text-slate-700 truncate">
                      {s.nama}
                    </span>
                    <button
                      onClick={() => handleToggleGejala(s.id)}
                      className="text-slate-400 hover:text-slate-900 rounded p-0.5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 py-6 text-center font-medium">
                Belum ada gejala yang dipilih.
              </p>
            )}

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleSubmit}
                disabled={gejalaDipilih.length === 0}
                className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium w-full h-10 bg-slate-900 text-white hover:bg-slate-900/90 disabled:pointer-events-none disabled:opacity-50 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 transition-colors"
              >
                Lihat Hasil
                <ArrowRight className="w-4 h-4" />
              </button>

              {gejalaDipilih.length > 0 && (
                <button
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-1.5 rounded-md text-xs font-medium w-full h-9 border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 transition-colors"
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
  );
}