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

  const setGejalaDipilih = new Set(gejalaDipilih);
  const hasil = [];

  penyakit.forEach((p) => {
    // a. Filter rules untuk penyakit ini
    const rulesPenyakit = rules.filter((r) => r.penyakitId === p.id);
    const gejalaPenyakit = rulesPenyakit.map((r) => r.gejalaId);
    
    // Total gejala penyakit ini di rules
    const totalGejala = gejalaPenyakit.length;

    // b. Hitung irisan antara gejalaPenyakit dan gejalaDipilih
    const gejalaCocokList = gejalaPenyakit.filter((g) => setGejalaDipilih.has(g));
    const gejalaCocok = gejalaCocokList.length;

    // c. Hitung score = (cocok / total) * 100
    if (gejalaCocok > 0) {
      const score = Math.round((gejalaCocok / totalGejala) * 100);
      
      // d. Masukkan ke hasil
      hasil.push({
        penyakit: p,
        gejalaCocok,
        totalGejala,
        score,
        gejalaCocokList,
      });
    }
  });

  // 3. Sort hasil descending by score
  hasil.sort((a, b) => b.score - a.score);

  // 4. Return hasil
  return hasil;
};
