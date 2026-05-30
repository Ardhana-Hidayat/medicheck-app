import { penyakit } from "../data/penyakit";
import { gejala } from "../data/gejala";
import { rules } from "../data/rules";

export const getGejalaDariPenyakit = (penyakitId) => {
  const gejalaIds = rules
    .filter((rule) => rule.penyakitId === penyakitId)
    .map((rule) => rule.gejalaId);

  return gejala.filter((g) => gejalaIds.includes(g.id));
};

export const getStatistik = () => {
  return {
    totalPenyakit: penyakit.length,
    totalGejala: gejala.length,
    totalRules: rules.length,
  };
};

export const forwardChaining = (gejalaDipilih) => {
  if (!gejalaDipilih || gejalaDipilih.length === 0) {
    return [];
  }

  const workingMemory = new Set(gejalaDipilih);
  const hasil = [];

  penyakit.forEach((p) => {
    const rulesPenyakit = rules.filter((r) => r.penyakitId === p.id);

    const gejalaCocokList = rulesPenyakit
      .filter((r) => workingMemory.has(r.gejalaId))
      .map((r) => r.gejalaId);

    const gejalaCocok = gejalaCocokList.length;

    // Jika minimal 1 rule terpicu (IF terpenuhi) → THEN: penyakit ini teridentifikasi
    if (gejalaCocok > 0) {
      hasil.push({
        penyakit: p,
        gejalaCocok,
        totalGejala: rulesPenyakit.length,
        gejalaCocokList,
      });
    }
  });

  // Urutkan descending berdasarkan jumlah gejala cocok
  hasil.sort((a, b) => b.gejalaCocok - a.gejalaCocok);

  return hasil;
};