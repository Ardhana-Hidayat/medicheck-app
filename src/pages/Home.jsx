import { Link } from "react-router-dom";
import { ArrowRight, Shield, Zap, BookOpen } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Zap,
      title: "Cepat & Akurat",
      desc: "Diagnosis awal dalam hitungan detik menggunakan algoritma Forward Chaining.",
    },
    {
      icon: Shield,
      title: "Privasi Terjaga",
      desc: "Semua proses berjalan di perangkat Anda. Tidak ada data yang dikirim ke server.",
    },
    {
      icon: BookOpen,
      title: "Berbasis Jurnal",
      desc: "Data gejala dan penyakit disusun berdasarkan referensi jurnal ilmiah terpercaya.",
    },
  ];

  return (
    <div className="flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 py-16 sm:py-24">
        <div className="max-w-2xl text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Sistem Pakar Berbasis Web
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Kenali Gejala,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">
              Pahami Kesehatan
            </span>
          </h1>

          <p className="text-lg text-slate-500 max-w-lg mx-auto leading-relaxed">
            Pilih gejala yang Anda rasakan, dan sistem kami akan membantu
            mengidentifikasi kemungkinan penyakit beserta saran penanganannya.
          </p>

          <div className="pt-2">
            <Link
              to="/diagnosa"
              className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
            >
              Mulai Diagnosa
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-slate-100 bg-white px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 text-slate-600">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-slate-800">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}