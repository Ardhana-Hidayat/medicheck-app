// Tabel Rule/Keputusan
// Sumber utama : Matondang (2023), Jurnal Remik Vol.7 No.3
// Revisi       : Review dr. Arif Fatah Hidayat (Owner Klinik AMC), 22 Mei 2026
//
// Perubahan dari review dokter:
//   P02 — G052 (Ruam kemerahan) DIHAPUS: tidak relevan untuk Demam Tifoid
//   P03 — G012 (Diare) DITAMBAH: gejala utama yang seharusnya ada
//   P05 — G030 (Mimisan) dan G003 (BAB berdarah) DITAMBAH: gejala khas DBD
//   P06 — G067 (Rasa berat di tangan atau kaki) DITAMBAH: gejala baru dari dokter
//   P08 — G068 (Perut kembung) DITAMBAH: gejala baru dari dokter

export const rules = [
  // P01 — ISPA
  { penyakitId: "P01", gejalaId: "G004" },
  { penyakitId: "P01", gejalaId: "G009" },
  { penyakitId: "P01", gejalaId: "G010" },
  { penyakitId: "P01", gejalaId: "G017" },
  { penyakitId: "P01", gejalaId: "G024" },
  { penyakitId: "P01", gejalaId: "G028" },
  { penyakitId: "P01", gejalaId: "G039" },
  { penyakitId: "P01", gejalaId: "G044" },
  { penyakitId: "P01", gejalaId: "G050" },
  { penyakitId: "P01", gejalaId: "G053" },
  { penyakitId: "P01", gejalaId: "G056" },
  { penyakitId: "P01", gejalaId: "G062" },

  // P02 — Demam Tifoid
  // [REVISI] G052 dihapus atas rekomendasi dokter ("merah dihilangkan")
  { penyakitId: "P02", gejalaId: "G003" },
  { penyakitId: "P02", gejalaId: "G005" },
  { penyakitId: "P02", gejalaId: "G007" },
  { penyakitId: "P02", gejalaId: "G010" },
  { penyakitId: "P02", gejalaId: "G012" },
  { penyakitId: "P02", gejalaId: "G016" },
  { penyakitId: "P02", gejalaId: "G018" },
  { penyakitId: "P02", gejalaId: "G021" },
  { penyakitId: "P02", gejalaId: "G024" },
  { penyakitId: "P02", gejalaId: "G025" },
  { penyakitId: "P02", gejalaId: "G031" },
  { penyakitId: "P02", gejalaId: "G043" },
  { penyakitId: "P02", gejalaId: "G053" },
  { penyakitId: "P02", gejalaId: "G055" },
  { penyakitId: "P02", gejalaId: "G057" },
  { penyakitId: "P02", gejalaId: "G063" },
  { penyakitId: "P02", gejalaId: "G064" },

  // P03 — Diare
  // [REVISI] G012 ditambah atas rekomendasi dokter ("murus")
  { penyakitId: "P03", gejalaId: "G010" },
  { penyakitId: "P03", gejalaId: "G012" },
  { penyakitId: "P03", gejalaId: "G022" },
  { penyakitId: "P03", gejalaId: "G024" },
  { penyakitId: "P03", gejalaId: "G031" },
  { penyakitId: "P03", gejalaId: "G055" },

  // P04 — Anemia
  { penyakitId: "P04", gejalaId: "G011" },
  { penyakitId: "P04", gejalaId: "G013" },
  { penyakitId: "P04", gejalaId: "G023" },
  { penyakitId: "P04", gejalaId: "G024" },
  { penyakitId: "P04", gejalaId: "G036" },
  { penyakitId: "P04", gejalaId: "G037" },
  { penyakitId: "P04", gejalaId: "G053" },
  { penyakitId: "P04", gejalaId: "G059" },

  // P05 — DBD
  // [REVISI] G030 (Mimisan) dan G003 (BAB berdarah) ditambah atas rekomendasi dokter
  { penyakitId: "P05", gejalaId: "G003" },
  { penyakitId: "P05", gejalaId: "G010" },
  { penyakitId: "P05", gejalaId: "G018" },
  { penyakitId: "P05", gejalaId: "G024" },
  { penyakitId: "P05", gejalaId: "G030" },
  { penyakitId: "P05", gejalaId: "G031" },
  { penyakitId: "P05", gejalaId: "G038" },
  { penyakitId: "P05", gejalaId: "G040" },
  { penyakitId: "P05", gejalaId: "G052" },
  { penyakitId: "P05", gejalaId: "G053" },
  { penyakitId: "P05", gejalaId: "G062" },
  { penyakitId: "P05", gejalaId: "G063" },

  // P06 — Hipertensi
  // [REVISI] G067 (Rasa berat di tangan atau kaki) ditambah — gejala baru
  { penyakitId: "P06", gejalaId: "G001" },
  { penyakitId: "P06", gejalaId: "G002" },
  { penyakitId: "P06", gejalaId: "G019" },
  { penyakitId: "P06", gejalaId: "G029" },
  { penyakitId: "P06", gejalaId: "G030" },
  { penyakitId: "P06", gejalaId: "G031" },
  { penyakitId: "P06", gejalaId: "G037" },
  { penyakitId: "P06", gejalaId: "G041" },
  { penyakitId: "P06", gejalaId: "G045" },
  { penyakitId: "P06", gejalaId: "G053" },
  { penyakitId: "P06", gejalaId: "G065" },
  { penyakitId: "P06", gejalaId: "G067" },

  // P07 — Malaria
  { penyakitId: "P07", gejalaId: "G004" },
  { penyakitId: "P07", gejalaId: "G010" },
  { penyakitId: "P07", gejalaId: "G011" },
  { penyakitId: "P07", gejalaId: "G012" },
  { penyakitId: "P07", gejalaId: "G020" },
  { penyakitId: "P07", gejalaId: "G027" },
  { penyakitId: "P07", gejalaId: "G040" },
  { penyakitId: "P07", gejalaId: "G041" },
  { penyakitId: "P07", gejalaId: "G042" },
  { penyakitId: "P07", gejalaId: "G045" },
  { penyakitId: "P07", gejalaId: "G048" },
  { penyakitId: "P07", gejalaId: "G049" },
  { penyakitId: "P07", gejalaId: "G053" },
  { penyakitId: "P07", gejalaId: "G055" },

  // P08 — Asam Lambung / GERD
  // [REVISI] G068 (Perut kembung) ditambah — gejala baru
  { penyakitId: "P08", gejalaId: "G005" },
  { penyakitId: "P08", gejalaId: "G006" },
  { penyakitId: "P08", gejalaId: "G031" },
  { penyakitId: "P08", gejalaId: "G032" },
  { penyakitId: "P08", gejalaId: "G033" },
  { penyakitId: "P08", gejalaId: "G034" },
  { penyakitId: "P08", gejalaId: "G056" },
  { penyakitId: "P08", gejalaId: "G057" },
  { penyakitId: "P08", gejalaId: "G058" },
  { penyakitId: "P08", gejalaId: "G068" },

  // P09 — Diabetes
  { penyakitId: "P09", gejalaId: "G008" },
  { penyakitId: "P09", gejalaId: "G014" },
  { penyakitId: "P09", gejalaId: "G015" },
  { penyakitId: "P09", gejalaId: "G026" },
  { penyakitId: "P09", gejalaId: "G033" },
  { penyakitId: "P09", gejalaId: "G034" },
  { penyakitId: "P09", gejalaId: "G045" },
  { penyakitId: "P09", gejalaId: "G046" },
  { penyakitId: "P09", gejalaId: "G047" },
  { penyakitId: "P09", gejalaId: "G051" },
  { penyakitId: "P09", gejalaId: "G059" },
  { penyakitId: "P09", gejalaId: "G060" },
  { penyakitId: "P09", gejalaId: "G061" },
  { penyakitId: "P09", gejalaId: "G066" },

  // P10 — Flu Influenza
  { penyakitId: "P10", gejalaId: "G010" },
  { penyakitId: "P10", gejalaId: "G012" },
  { penyakitId: "P10", gejalaId: "G017" },
  { penyakitId: "P10", gejalaId: "G020" },
  { penyakitId: "P10", gejalaId: "G024" },
  { penyakitId: "P10", gejalaId: "G027" },
  { penyakitId: "P10", gejalaId: "G035" },
  { penyakitId: "P10", gejalaId: "G040" },
  { penyakitId: "P10", gejalaId: "G041" },
  { penyakitId: "P10", gejalaId: "G053" },
  { penyakitId: "P10", gejalaId: "G054" },
  { penyakitId: "P10", gejalaId: "G056" },
  { penyakitId: "P10", gejalaId: "G062" },
];