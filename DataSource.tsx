
import React from 'react';
import { ArrowLeft, BookOpen, ExternalLink, FileText, Database, Users } from 'lucide-react';

interface DataSourceProps {
  onBack: () => void;
}

const DataSource: React.FC<DataSourceProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#FFFBF7] py-20 px-6 animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b-8 border-stone-900 pb-10">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Basis Data & <span className="text-red-500">Metodologi</span></h1>
            <p className="text-xl text-stone-600 font-bold">Transparansi informasi di balik angka krisis iklim.</p>
          </div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 bg-white border-4 border-stone-900 px-6 py-3 rounded-2xl font-black uppercase tracking-widest neo-brutalism-shadow neo-brutalism-shadow-hover transition-all"
          >
            <ArrowLeft className="w-5 h-5" /> Kembali
          </button>
        </div>

        {/* Introduction */}
        <div className="bg-white border-4 border-stone-900 p-8 rounded-[2rem] neo-brutalism-shadow">
          <p className="text-lg leading-relaxed text-stone-700 font-medium italic">
            "Halaman ini menyajikan rincian teknis, catatan metodologi, dan sumber primer yang digunakan untuk memformulasikan data dalam landing page ini. Kami berkomitmen pada kedaulatan informasi yang berbasis bukti ilmiah."
          </p>
        </div>

        {/* Data Sections */}
        <div className="grid gap-10">
          {/* 79% Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 shrink-0 bg-blue-500 text-white border-4 border-stone-900 rounded-2xl flex items-center justify-center text-2xl font-black neo-brutalism-shadow">79%</div>
              <h2 className="text-3xl font-black uppercase">Emisi Historis</h2>
            </div>
            <div className="bg-white border-4 border-stone-900 p-8 rounded-[2rem] space-y-4">
              <p className="font-bold text-stone-800">Catatan Data:</p>
              <p className="text-stone-600 leading-relaxed">
                Angka 79% merujuk pada kontribusi kumulatif emisi gas rumah kaca dari negara-negara maju dan ekonomi berkembang dengan pendapatan tinggi dalam periode 1850–2011, berdasarkan analisis Center for Global Development dan Oxfam yang merujuk pada data IPCC AR5 serta Global Carbon Project.
              </p>
              <div className="bg-blue-50 p-6 rounded-xl border-2 border-stone-900 border-dashed">
                <p className="text-sm font-bold text-blue-900 leading-relaxed">
                  <span className="bg-blue-200 px-1 rounded">Penting:</span> Laporan IPCC AR6 (2022) menggunakan angka yang berbeda tergantung metodologi: 57% untuk emisi CO₂ dari bahan bakar fosil dan industri (1850–2019), atau 61–76% jika memasukkan perubahan penggunaan lahan (LULUCF). Perbedaan angka disebabkan oleh variasi periode waktu, jenis emisi yang dihitung (CO₂ saja vs. semua GRK), dan klasifikasi negara maju yang digunakan.
                </p>
              </div>
            </div>
          </section>

          {/* 48% & 12% Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 shrink-0 bg-red-500 text-white border-4 border-stone-900 rounded-2xl flex items-center justify-center text-2xl font-black neo-brutalism-shadow">48%</div>
              <h2 className="text-3xl font-black uppercase">Kesenjangan Emisi</h2>
            </div>
            <div className="bg-white border-4 border-stone-900 p-8 rounded-[2rem] space-y-6">
              <div className="space-y-2">
                <p className="font-bold text-stone-800">Sumber Data:</p>
                <p className="text-stone-600">Angka spesifik 48% (top 10%) dan 12% (bottom 50%) berasal dari studi Chancel (2022) yang direview dan dikutip dalam IPCC AR6 Working Group III, Chapter 2 (halaman 2-32, Figure 2.7).</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="font-bold text-stone-800 flex items-center gap-2"><Database className="w-4 h-4" /> Metodologi:</p>
                  <p className="text-sm text-stone-600 leading-relaxed">Menggunakan pendekatan akuntansi konsumsi (consumption-based accounting), yang memperhitungkan jejak karbon dari konsumsi rumah tangga termasuk emisi yang "tertanam" dalam barang dan jasa impor.</p>
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-stone-800 flex items-center gap-2"><Users className="w-4 h-4" /> Definisi Populasi:</p>
                  <p className="text-sm text-stone-600 leading-relaxed">Diukur berdasarkan pendapatan/kekayaan per kapita rumah tangga. Threshold masuk kategori top 10% global adalah sekitar $38.000/tahun (purchasing power parity) atau setara dengan kelas menengah atas di negara maju.</p>
                </div>
              </div>

              <div className="bg-red-50 p-6 rounded-xl border-2 border-stone-900">
                <p className="text-sm font-bold text-red-900 leading-relaxed">
                  Rentang estimasi IPCC: Laporan resmi IPCC mencatat rentang yang lebih luas: top 10% populasi bertanggung jawab atas 34–45% emisi global, sementara 50% termiskin menyumbang 13–15%. Angka 48% dan 12% merupakan estimasi dalam rentang tersebut yang sering digunakan dalam komunikasi publik.
                </p>
              </div>
            </div>
          </section>

          {/* 3-6x Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              {/* Penyesuaian ukuran font text-xl agar '3-6x' (4 karakter) terlihat sejajar & proposional dengan badge 2 digit lainnya */}
              <div className="w-16 h-16 shrink-0 bg-yellow-400 text-stone-900 border-4 border-stone-900 rounded-2xl flex items-center justify-center text-xl font-black neo-brutalism-shadow">3-6x</div>
              <h2 className="text-3xl font-black uppercase">Kerentanan Masyarakat Adat</h2>
            </div>
            <div className="bg-white border-4 border-stone-900 p-8 rounded-[2rem] space-y-4">
              <p className="font-bold text-stone-800">Catatan Khusus:</p>
              <p className="text-stone-600 leading-relaxed">
                Angka "3–6 kali lebih tinggi" merupakan agregasi dari berbagai indikator kerentanan spesifik, bukan multiplier universal untuk semua dampak iklim.
              </p>
              <ul className="grid md:grid-cols-3 gap-4">
                <li className="bg-stone-50 border-2 border-stone-900 p-5 rounded-xl flex flex-col h-full">
                  <p className="text-xs font-black uppercase text-stone-400 mb-2">Mortalitas</p>
                  <p className="font-bold text-stone-800 text-sm leading-relaxed">3-8x lebih tinggi saat pandemi/kekeringan (IPCC AR6 WGII).</p>
                </li>
                <li className="bg-stone-50 border-2 border-stone-900 p-5 rounded-xl flex flex-col h-full">
                  <p className="text-xs font-black uppercase text-stone-400 mb-2">Risiko Perpindahan</p>
                  <p className="font-bold text-stone-800 text-sm leading-relaxed">7x lebih tinggi akibat risiko iklim (WEF, 2024).</p>
                </li>
                <li className="bg-stone-50 border-2 border-stone-900 p-5 rounded-xl flex flex-col h-full">
                  <p className="text-xs font-black uppercase text-stone-400 mb-2">Kesehatan</p>
                  <p className="font-bold text-stone-800 text-sm leading-relaxed">6x lebih tinggi risiko kematian saat melahirkan (Panama; World Bank).</p>
                </li>
              </ul>
              <div className="bg-yellow-50 p-6 rounded-xl border-2 border-stone-900 border-dashed">
                <p className="text-sm font-bold text-stone-800 italic leading-relaxed">
                  Referensi IPCC: IPCC AR6 WGII (2022) menyatakan dengan keyakinan sangat tinggi (very high confidence) bahwa masyarakat adat mengalami dampak iklim yang "tidak proporsional" (disproportionate harm).
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Main References */}
        <div className="space-y-8 pt-10">
          <h2 className="text-4xl font-black uppercase tracking-tight flex items-center gap-4">
            <BookOpen className="w-10 h-10 text-red-500" /> Daftar Rujukan Utama
          </h2>
          <div className="grid gap-4">
            {[
              { 
                title: "IPCC AR6 WGIII (2022)", 
                desc: "Climate Change 2022: Mitigation of Climate Change. Chapter 2 & SPM B.3.4.",
                link: "https://www.ipcc.ch/report/ar6/wg3/"
              },
              { 
                title: "Chancel, L. (2022)", 
                desc: "Global Carbon Inequality 1990–2019. World Inequality Lab. Research Square.",
                link: "https://www.researchsquare.com/article/rs-1404683/v1"
              },
              { 
                title: "IPCC AR6 WGII (2022)", 
                desc: "Impacts, Adaptation and Vulnerability. Chapter 14 & Cross-Chapter Paper 6.",
                link: "https://www.ipcc.ch/report/ar6/wg2/"
              },
              { 
                title: "Oxfam International (2023)", 
                desc: "Climate Equality: A Planet for the 99%. Contextualization of historical emissions.",
                link: "https://www.oxfam.org/en/research/climate-equality-planet-99"
              },
              { 
                title: "CGD (2015)", 
                desc: "Climate Finance and the $100 Billion Goal. Historical emission methodology 1850–2011.",
                link: "https://www.cgdev.org/"
              },
              { 
                title: "WID.world", 
                desc: "World Inequality Database. Primary source for consumption-based emission distribution.",
                link: "https://wid.world/"
              }
            ].map((ref, idx) => (
              <a 
                key={idx}
                href={ref.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-white border-2 border-stone-900 rounded-2xl hover:bg-stone-50 transition-colors neo-brutalism-shadow neo-brutalism-shadow-hover"
              >
                <div className="space-y-1">
                  <h4 className="font-black text-lg group-hover:text-red-500 transition-colors flex items-center gap-2">
                    <FileText className="w-5 h-5" /> {ref.title}
                  </h4>
                  <p className="text-sm text-stone-500 font-medium">{ref.desc}</p>
                </div>
                <ExternalLink className="w-5 h-5 text-stone-300 group-hover:text-stone-900 transition-colors self-end md:self-center mt-4 md:mt-0" />
              </a>
            ))}
          </div>
        </div>

        {/* Footer Back Button */}
        <div className="pt-20 pb-10 flex justify-center">
          <button 
            onClick={onBack}
            className="group flex items-center gap-4 bg-stone-900 text-white border-4 border-stone-900 px-12 py-6 rounded-3xl font-black text-xl uppercase tracking-widest neo-brutalism-shadow neo-brutalism-shadow-hover transition-all"
          >
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform" /> Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataSource;
