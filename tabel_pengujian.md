# Tabel Pengujian Keakuratan Engine Forward Chaining

Dokumen ini berisi skenario pengujian untuk memvalidasi keakuratan keputusan sistem pakar MediCheck.

> [!NOTE]
> **Cara Pengujian:** Buka halaman `/diagnosa`, centang gejala sesuai kolom **Gejala Input**, klik **Lihat Hasil**, lalu bandingkan output dengan kolom **Hasil yang Diharapkan**. Isi kolom **Hasil Aktual** dan **Status** saat pengujian.

---

## Tabel 1 — Pengujian Per Penyakit (Skenario Ideal)

Setiap test case memasukkan gejala-gejala yang **dominan milik satu penyakit** untuk memastikan penyakit tersebut muncul di posisi pertama dengan skor tertinggi.

| No | Kode | Penyakit Target | Gejala Input | Cocok/Total | Skor Harapan | Hasil Aktual | Status |
|----|------|-----------------|-------------|-------------|-------------|-------------|--------|
| 1 | TC01 | P01 — ISPA | G004 (Batuk), G009 (Bersin-bersin), G010 (Demam), G017 (Hidung meler), G050 (Pilek), G053 (Sakit kepala), G056 (Sakit tenggorokan) | 7/12 | 58% | | ⬜ |
| 2 | TC02 | P02 — Demam Tifoid | G003 (BAB berdarah), G010 (Demam), G018 (Hilang nafsu makan), G025 (Linglung), G031 (Mual), G055 (Sakit perut), G057 (Sembelit), G063 (Suhu tinggi) | 8/18 | 44% | | ⬜ |
| 3 | TC03 | P03 — Diare | G010 (Demam), G022 (Kulit kering), G024 (Lelah), G031 (Mual), G055 (Sakit perut) | 5/5 | 100% | | ⬜ |
| 4 | TC04 | P04 — Anemia | G011 (Detak jantung tak teratur), G013 (Dingin tangan kaki), G023 (Kulit pucat), G024 (Lelah), G036 (Napas pendek), G053 (Sakit kepala) | 6/8 | 75% | | ⬜ |
| 5 | TC05 | P05 — DBD | G010 (Demam), G018 (Hilang nafsu makan), G038 (Nyeri belakang mata), G040 (Nyeri sendi), G052 (Ruam kulit), G053 (Sakit kepala), G062 (Sesak napas), G063 (Suhu tinggi) | 8/10 | 80% | | ⬜ |
| 6 | TC06 | P06 — Hipertensi | G001 (Darah urine), G002 (Aritmia), G029 (Cemas), G030 (Mimisan), G037 (Nyeri dada), G045 (Penglihatan kabur), G053 (Sakit kepala), G065 (Telinga berdengung) | 8/11 | 73% | | ⬜ |
| 7 | TC07 | P07 — Malaria | G004 (Batuk), G010 (Demam), G027 (Menggigil), G042 (Panas dingin), G048 (Malaise), G049 (Napas cepat), G053 (Sakit kepala), G055 (Sakit perut) | 8/14 | 57% | | ⬜ |
| 8 | TC08 | P08 — Asam Lambung | G005 (Batuk kering), G006 (Bau mulut), G031 (Mual), G032 (Mudah kenyang), G034 (Mulut kering), G056 (Sakit tenggorokan), G058 (Bersendawa) | 7/9 | 78% | | ⬜ |
| 9 | TC09 | P09 — Diabetes | G008 (Bercak hitam), G015 (Gatal kulit), G026 (Luka sulit sembuh), G046 (BB turun), G059 (Sering kencing malam), G060 (Mengantuk setelah makan), G061 (Haus/lapar), G066 (Keton urine) | 8/14 | 57% | | ⬜ |
| 10 | TC10 | P10 — Flu | G010 (Demam), G017 (Hidung meler), G020 (Kelelahan), G027 (Menggigil), G040 (Nyeri sendi), G041 (Otot sakit), G053 (Sakit kepala), G056 (Sakit tenggorokan) | 8/13 | 62% | | ⬜ |

---

## Tabel 2 — Pengujian Edge Case

| No | Kode | Skenario | Gejala Input | Hasil yang Diharapkan | Hasil Aktual | Status |
|----|------|----------|-------------|----------------------|-------------|--------|
| 11 | TC11 | Input kosong | _(tidak ada gejala dipilih)_ | Tombol "Lihat Hasil" disabled, tidak bisa submit | | ⬜ |
| 12 | TC12 | Hanya 1 gejala umum | G053 (Sakit kepala) | Menampilkan beberapa penyakit dengan skor rendah (<20%) karena G053 muncul di banyak penyakit | | ⬜ |
| 13 | TC13 | Akses langsung /hasil | _(ketik URL /hasil langsung di browser)_ | Redirect otomatis ke `/diagnosa` | | ⬜ |

---

## Tabel 3 — Pengujian Ambiguitas & Overlap

Skenario di mana gejala yang dipilih bisa cocok dengan lebih dari satu penyakit. Tujuan: memastikan engine mengurutkan dengan benar.

| No | Kode | Skenario | Gejala Input | Penyakit yang Diharapkan Muncul (urutan) | Hasil Aktual | Status |
|----|------|----------|-------------|----------------------------------------|-------------|--------|
| 14 | TC14 | Gejala umum multi-penyakit | G010 (Demam), G024 (Lelah), G053 (Sakit kepala) | Banyak penyakit muncul; P01 ISPA dan P02 Tifoid keduanya 17%, P03 Diare 40%, P05 DBD 20% — P03 tertinggi karena hanya punya 5 gejala (2 cocok) | | ⬜ |
| 15 | TC15 | Overlap DBD vs Tifoid | G010 (Demam), G018 (Hilang nafsu makan), G031 (Mual), G052 (Ruam kulit), G053 (Sakit kepala), G063 (Suhu tinggi) | P05 DBD (60%) > P02 Tifoid (33%) — keduanya harus muncul, DBD lebih tinggi | | ⬜ |
| 16 | TC16 | Overlap Malaria vs Flu | G010 (Demam), G020 (Kelelahan), G027 (Menggigil), G040 (Nyeri sendi), G041 (Otot sakit), G053 (Sakit kepala) | P10 Flu (46%) vs P07 Malaria (36%) — keduanya muncul, Flu lebih tinggi karena 6/13 vs 5/14 | | ⬜ |
| 17 | TC17 | Overlap Asam Lambung vs Diabetes | G033 (Infeksi berulang), G034 (Mulut kering), G057 (Sembelit) | P08 Asam Lambung (33%) vs P09 Diabetes (14%) — Asam Lambung lebih tinggi | | ⬜ |

---

## Tabel 4 — Pengujian Skor Maksimal (100%)

Memasukkan **semua** gejala milik satu penyakit.

| No | Kode | Penyakit | Semua Gejala | Total | Skor Harapan | Hasil Aktual | Status |
|----|------|----------|-------------|-------|-------------|-------------|--------|
| 18 | TC18 | P03 — Diare | G010, G022, G024, G031, G055 | 5/5 | **100%** | | ⬜ |
| 19 | TC19 | P04 — Anemia | G011, G013, G023, G024, G036, G037, G053, G059 | 8/8 | **100%** | | ⬜ |
| 20 | TC20 | P08 — Asam Lambung | G005, G006, G031, G032, G033, G034, G056, G057, G058 | 9/9 | **100%** | | ⬜ |

---

## Keterangan Label Status

| Simbol | Arti |
|--------|------|
| ⬜ | Belum diuji |
| ✅ | Lolos (sesuai harapan) |
| ❌ | Gagal (tidak sesuai harapan) |

---

## Ringkasan Pengujian

| Kategori | Jumlah | Lolos | Gagal |
|----------|--------|-------|-------|
| Per Penyakit (TC01–TC10) | 10 | | |
| Edge Case (TC11–TC13) | 3 | | |
| Ambiguitas & Overlap (TC14–TC17) | 4 | | |
| Skor Maksimal (TC18–TC20) | 3 | | |
| **Total** | **20** | | |

> [!TIP]
> Untuk TC14–TC17, yang penting bukan hanya penyakit mana yang muncul di posisi pertama, tapi juga **apakah semua penyakit yang relevan muncul** dan **apakah urutannya logis** (skor lebih tinggi = lebih banyak proporsi gejala cocok).
