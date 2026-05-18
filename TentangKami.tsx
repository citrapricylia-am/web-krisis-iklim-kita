import React, { useState } from 'react';
import { ArrowLeft, Heart, Globe, ShieldCheck, Zap, ChevronDown, Mail, Linkedin } from 'lucide-react';
import Navbar from './Navbar';
import AccessibilityToolbar from './AccessibilityToolbar';

interface TentangKamiProps {
  onBack: () => void;
}

const faqData = [
  {
    category: 'Tentang Situs Ini',
    items: [
      {
        q: 'Apa itu Krisis Iklim Kita?',
        a: 'Ini adalah ruang informasi publik tentang keadilan iklim di Indonesia. Tempat dimana fakta, narasi, dan perspektif yang sering absen dari perbincangan arus utama disajikan. Siapa yang paling terdampak krisis iklim? Mengapa, dan apa yang bisa berubah?',
      },
      {
        q: 'Siapa yang membuat situs ini?',
        a: 'Situs ini lahir dari inisiatif individu yang gerah akan ketimpangan dan krisis iklim. Ingin tahu siapa orangnya? Lihat halaman LinkedIn kami — Giorgio dan Citra. Tidak ada satu organisasi tunggal di baliknya. Kami memilih untuk tidak bermerek supaya situs ini bisa menjadi milik siapa saja yang peduli pada isu ini. Termasuk Anda semua — hubungi kami apabila Anda ingin terlibat.',
      },
      {
        q: 'Apa bedanya dengan situs iklim lain?',
        a: 'Banyak situs iklim berfokus pada sains atau kebijakan global. Kami berfokus pada keadilan — menelisik soal siapa menanggung beban terberat, siapa yang membuat keputusan, dan seberapa jauh jarak antara keduanya. Konteks Indonesia adalah titik berangkat kami. Karena ketidakadilan iklim terjadi setiap hari di depan mata kita semua.',
      },
      {
        q: 'Apakah situs ini berpihak?',
        a: 'Ya, secara eksplisit. Kami berpihak pada manusia yang paling terdampak dan paling sedikit didengar. Tapi kami tidak berpihak pada partai, organisasi, atau kepentingan donor tertentu.',
      },
      {
        q: 'Apakah lembaga saya bisa terlibat dalam situs ini?',
        a: 'Tentu, siapapun Anda bisa ikut terlibat. Selama Anda memiliki keberpihakan yang jelas untuk mewujudkan keadilan iklim dan mempersempit celah ketidakadilan iklim.',
      },
    ],
  },
  {
    category: 'Tentang Keadilan Iklim',
    items: [
      {
        q: 'Apa itu keadilan iklim?',
        a: 'Keadilan iklim adalah prinsip bahwa dampak krisis iklim tidak jatuh merata. Komunitas yang paling sedikit berkontribusi pada emisi global — seperti petani kecil, nelayan, dan warga pesisir — justru paling keras menanggung akibatnya. Keadilan iklim menuntut pengakuan atas ketimpangan itu dan perubahan yang nyata.',
      },
      {
        q: 'Mengapa ini relevan untuk Indonesia?',
        a: 'Indonesia adalah salah satu negara yang paling rentan terhadap dampak iklim: kenaikan muka air laut, banjir ekstrem, kekeringan, dan kebakaran hutan. Pada saat yang sama, jutaan warga Indonesia bergantung langsung pada alam untuk hidup. Ketidakadilan iklim bukan ancaman masa depan di sini. Ia sudah berlangsung.',
      },
      {
        q: 'Apa bedanya "krisis iklim" dengan "perubahan iklim"?',
        a: '"Perubahan iklim" terdengar netral, seolah ini proses alami yang berjalan pelan. "Krisis iklim" lebih jujur: ini darurat yang dipicu oleh pilihan manusia dan sistem ekonomi tertentu, dan dampaknya sudah kritis bagi banyak komunitas hari ini.',
      },
    ],
  },
  {
    category: 'Cara Berkontribusi',
    items: [
      {
        q: 'Saya bukan aktivis. Apakah situs ini untuk saya?',
        a: 'Justru situs ini untuk Anda. Perubahan tidak datang hanya dari aktivis. Ia datang ketika lebih banyak orang biasa mulai paham, bicara, dan menuntut akuntabilitas dari orang-orang yang membuat keputusan atas nama mereka.',
      },
      {
        q: 'Bagaimana cara saya berkontribusi?',
        a: 'Ada beberapa cara, sesuai kapasitas Anda:\n• Baca dan bagikan konten yang relevan ke lingkaran Anda.\n• Bicarakan isu ini: di keluarga, di kantor, di komunitas.\n• Kirim cerita atau perspektif dari wilayah atau komunitas Anda. Kami terbuka untuk kontribusi narasi dari seluruh Indonesia.\n• Replikasi semangat ini di platform atau ruang Anda sendiri. Situs ini tidak butuh kredit.',
      },
      {
        q: 'Apakah saya perlu mendaftar atau bergabung dengan organisasi tertentu?',
        a: 'Tidak. Tidak ada keanggotaan, tidak ada formulir, tidak ada hierarki. Anda cukup mulai dari yang bisa Anda lakukan sekarang.',
      },
    ],
  },
  {
    category: 'Untuk Jurnalis & Peneliti',
    items: [
      {
        q: 'Bolehkah saya mengutip atau menggunakan konten dari situs ini?',
        a: 'Boleh. Semua konten di situs ini bebas digunakan untuk kepentingan publik, pendidikan, dan jurnalisme. Atribusi ke Krisis Iklim Kita diapresiasi tapi tidak diwajibkan.',
      },
      {
        q: 'Apakah ada narasumber yang bisa saya hubungi?',
        a: 'Kami tidak menyediakan juru bicara tunggal, sesuai dengan sifat situs ini yang tidak bermerek. Tapi jika Anda butuh koneksi ke komunitas atau pakar terkait isu spesifik, Anda bisa menghubungi kami melalui Info@krisisiklimkita.com dan kami akan berusaha membantu.',
      },
    ],
  },
  {
    category: 'Lain-Lain',
    items: [
      {
        q: 'Saya tidak setuju dengan sesuatu di situs ini. Ke mana saya bisa menyampaikan itu?',
        a: 'Kami terbuka untuk koreksi faktual dan perspektif yang berbeda. Kirim masukan, saran dan kritik Anda kepada kami melalui Info@krisisiklimkita.com. Yang tidak akan kami lakukan adalah menghapus fakta karena itu tidak nyaman bagi pihak tertentu.',
      },
      {
        q: 'Bagaimana situs ini dibiayai?',
        a: 'Situs ini dijalankan secara swadaya. Kami tidak menerima iklan dan tidak terikat pada kepentingan korporasi atau donor yang mempengaruhi arah konten. Ini bukti bahwa pada era sekarang, inisiatif bisa dikerjakan semua orang selama ada kemauan.',
      },
    ],
  },
];

const pillars = [
  {
    icon: <Globe className="w-8 h-8" />,
    label: 'Inklusif',
    color: 'bg-blue-500',
    desc: 'Kami percaya setiap orang punya kapasitas untuk memahami krisis iklim dan berkontribusi pada solusinya. Konten kami dirancang untuk berbagai latar belakang dan tingkat pengetahuan.',
  },
  {
    icon: <Heart className="w-8 h-8" />,
    label: 'Unbranded',
    color: 'bg-red-500',
    desc: 'Kami tidak mewakili organisasi atau agenda tertentu. Ruang ini adalah milik bersama. Kami hanya membuka ruang dialog untuk keadilan iklim, bukan pionir dalam gerakan.',
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    label: 'Berbasis Bukti',
    color: 'bg-green-600',
    desc: 'Setiap klaim yang kami sampaikan bersumber dari riset kredibel, laporan ilmiah, dan data yang dapat diverifikasi.',
  },
  {
    icon: <Zap className="w-8 h-8" />,
    label: 'Berorientasi Aksi',
    color: 'bg-yellow-400',
    desc: 'Pemahaman tanpa aksi adalah tidak lengkap. Kami mengajak Anda tidak hanya untuk belajar, tetapi untuk bertindak.',
  },
];

const FaqItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-4 border-stone-900 rounded-2xl bg-white overflow-hidden transition-all duration-300 neo-brutalism-shadow`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left gap-4 group focus:outline-none focus:ring-4 focus:ring-yellow-400"
        aria-expanded={open}
      >
        <span className="font-black text-stone-900 text-base md:text-lg leading-snug">{q}</span>
        <ChevronDown className={`w-6 h-6 shrink-0 text-red-500 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-6 pb-6 border-t-4 border-stone-900 pt-5 bg-stone-50">
          <p className="text-stone-700 font-medium leading-relaxed whitespace-pre-line">{a}</p>
        </div>
      )}
    </div>
  );
};

const TentangKami: React.FC<TentangKamiProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen selection:bg-yellow-200 flex flex-col bg-[#FFFBF7]">
      <Navbar />

      <main id="main-content" className="flex-1">

        {/* ── HERO SECTION with cutout animation ── */}
        <header className="relative min-h-[70vh] flex items-center overflow-hidden px-6 bg-[#FFFBF7] border-b-4 border-stone-900">
          {/* Animated cutout shapes — same style as hero section */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-red-500 border-8 border-stone-900 rounded-full opacity-10 animate-float" />
            <div className="absolute bottom-20 -left-12 w-48 h-48 bg-yellow-400 border-8 border-stone-900 rotate-12 opacity-15" style={{ animation: 'float 8s ease-in-out infinite', animationDelay: '2s' }} />
            <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-stone-900 border-4 border-stone-900 rounded-3xl opacity-5 rotate-45" style={{ animation: 'float 10s ease-in-out infinite', animationDelay: '1s' }} />
            {/* Cutout text behind */}
            <div className="absolute bottom-0 left-0 right-0 overflow-hidden h-32 opacity-5 select-none">
              <p className="text-[9rem] font-black uppercase tracking-tighter text-stone-900 whitespace-nowrap leading-none">
                KEADILAN IKLIM KEADILAN IKLIM
              </p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-10 pt-28 pb-16 grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
              {/* Back button */}
              <button
                onClick={onBack}
                className="inline-flex items-center gap-2 font-black uppercase text-sm tracking-widest text-stone-500 hover:text-red-500 transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Kembali ke Beranda
              </button>

              <div className="inline-flex items-center gap-2 bg-red-500 text-white border-4 border-stone-900 px-5 py-2 rounded-full font-black text-sm uppercase tracking-widest neo-brutalism-shadow">
                Tentang Kami
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-stone-900 leading-[1] tracking-tight">
                Sebuah{' '}
                <span className="text-red-500 underline decoration-yellow-400 decoration-8 underline-offset-8">
                  Inisiatif
                </span>{' '}
                Kolektif
              </h1>

              <p className="text-xl md:text-2xl text-stone-600 leading-relaxed font-medium max-w-xl">
                untuk Kesadaran Bersama
              </p>
            </div>

            {/* Right — decorative cutout card */}
            <div className="relative flex justify-center lg:justify-end animate-in fade-in slide-in-from-right duration-700">
              <div className="relative w-full max-w-md">
                {/* Shadow layer */}
                <div className="absolute inset-0 bg-stone-900 rounded-[3rem] translate-x-3 translate-y-3" />
                <div className="relative bg-yellow-400 border-4 border-stone-900 rounded-[3rem] p-10 space-y-6">
                  <div className="w-16 h-16 bg-stone-900 border-4 border-stone-900 rounded-2xl flex items-center justify-center -rotate-6 neo-brutalism-shadow">
                    <Heart className="w-8 h-8 text-yellow-400" />
                  </div>
                  <p className="text-2xl font-black text-stone-900 leading-tight">
                    "Perubahan iklim bukan hanya krisis lingkungan, tetapi{' '}
                    <span className="text-red-600 underline decoration-stone-900 decoration-4">krisis kemanusiaan</span>{' '}
                    yang menuntut keadilan."
                  </p>
                  <div className="pt-4 border-t-4 border-stone-900">
                    <p className="font-black uppercase text-sm tracking-widest text-stone-700">Krisis Iklim Kita</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ── TENTANG KAMI NARRATIVE ── */}
        <section className="py-32 px-6 bg-white border-b-4 border-stone-900">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-start">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black text-stone-900 leading-tight">
                Dari mana kami{' '}
                <span className="text-red-500 underline decoration-yellow-400 decoration-4">berangkat</span>?
              </h2>
              <div className="space-y-6 text-lg text-stone-600 font-medium leading-relaxed">
                <p>
                  <strong className="text-stone-900">Krisis Iklim Kita</strong> berangkat dari sebuah kepercayaan sederhana: perubahan iklim bukan hanya krisis lingkungan, tetapi krisis kemanusiaan yang menuntut keadilan.
                </p>
                <p>
                  Kami adalah sekelompok individu dari berbagai latar belakang dan organisasi masyarakat sipil yang merasa panggilan yang sama — mengamplifikasi pemahaman tentang keadilan iklim ke seluas-luasnya.
                </p>
                <p>
                  Kami percaya bahwa pemahaman yang luas dan mendalam adalah fondasi dari <strong className="text-stone-900 border-b-4 border-red-200">perubahan sosial yang nyata</strong>.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black text-stone-900 leading-tight">
                Mengapa KIK{' '}
                <span className="text-red-500 underline decoration-yellow-400 decoration-4">ada</span>?
              </h2>
              <p className="text-lg text-stone-600 font-medium leading-relaxed">
                Ketidakadilan iklim bukan masalah abstrak. Ini adalah masalah kita bersama, tetapi dampaknya tidak merata. Sementara sebagian kecil populasi telah berkontribusi paling besar terhadap emisi historis, jutaan orang yang paling sedikit berkontribusi justru menjadi yang paling rentan.
              </p>
              <div className="space-y-4">
                {[
                  'Informasi harus dapat diakses oleh semua orang, tidak terbatas pada akademisi atau aktivis profesional',
                  'Kesadaran kolektif adalah awal dari tindakan kolektif — dan keadilan membutuhkan gerakan yang terorganisir dari bawah',
                  'Gerakan organik membutuhkan fondasi yang kuat: pemahaman yang sama tentang masalah bersama kita',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 bg-red-50 border-4 border-stone-900 rounded-2xl p-5 neo-brutalism-shadow">
                    <div className="w-8 h-8 bg-red-500 border-2 border-stone-900 rounded-lg flex items-center justify-center shrink-0 text-white font-black text-sm">
                      {i + 1}
                    </div>
                    <p className="text-stone-700 font-medium leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── BAGAIMANA KIK BEROPERASI ── */}
        <section className="py-32 px-6 bg-[#FFFBF7] border-b-4 border-stone-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
              <h2 className="text-4xl md:text-6xl font-black text-stone-900 leading-tight">
                Bagaimana KIK{' '}
                <span className="text-red-500">Beroperasi</span>
              </h2>
              <p className="text-xl text-stone-600 font-medium leading-relaxed">
                Empat prinsip yang menjadi landasan cara kami bekerja dan bergerak bersama.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {pillars.map((p, i) => (
                <div
                  key={i}
                  className="group bg-white border-4 border-stone-900 rounded-[2.5rem] p-8 neo-brutalism-shadow neo-brutalism-shadow-hover transition-all flex flex-col gap-6"
                >
                  <div className={`w-16 h-16 ${p.color} border-4 border-stone-900 rounded-2xl flex items-center justify-center text-white neo-brutalism-shadow group-hover:-rotate-12 transition-transform duration-300`}>
                    {p.icon}
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-black text-stone-900 uppercase tracking-tight">{p.label}</h3>
                    <p className="text-stone-600 font-medium leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── AJAKAN BERGABUNG ── */}
        <section className="py-32 px-6 bg-stone-900 text-white relative overflow-hidden border-b-4 border-stone-900">
          {/* Cutout decoration */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10" aria-hidden="true">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-red-500 rounded-full" />
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-yellow-400 rounded-full" />
            <div className="absolute bottom-0 left-0 right-0 overflow-hidden h-40 select-none">
              <p className="text-[10rem] font-black uppercase tracking-tighter text-white whitespace-nowrap leading-none opacity-20">
                BERGABUNG BERGABUNG
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-7xl font-black leading-tight uppercase tracking-tighter">
                Ajakan untuk{' '}
                <span className="text-yellow-400 drop-shadow-[4px_4px_0px_rgba(239,68,68,0.5)]">Bergabung</span>
              </h2>
              <p className="text-xl md:text-2xl text-stone-300 font-medium leading-relaxed max-w-2xl mx-auto">
                Krisis iklim tidak akan diselesaikan oleh segelintir orang. Keadilan akan datang melalui kesadaran dan tindakan kolektif dari Anda, dari kami, dari semua kita.
              </p>
              <p className="text-xl text-stone-300 font-medium leading-relaxed max-w-2xl mx-auto">
                Anda tidak perlu menjadi ahli untuk berkontribusi. Anda hanya perlu peduli, ingin belajar, dan siap untuk berbuat sesuatu.
              </p>
            </div>
            <div className="bg-stone-800/60 backdrop-blur-xl border-4 border-stone-700 rounded-[3rem] p-10 neo-brutalism-shadow space-y-6 text-left">
              <p className="text-2xl font-black text-stone-100 leading-relaxed italic">
                "Bergabunglah dengan gerakan ini. Mulai dari sini, dari pemahaman, menuju aksi nyata untuk keadilan iklim."
              </p>
              <div className="pt-6 border-t-2 border-stone-700 flex flex-wrap gap-4">
                <a
                  href="mailto:Info@krisisiklimkita.com"
                  className="inline-flex items-center gap-3 bg-yellow-400 text-stone-900 border-4 border-stone-900 px-8 py-4 rounded-2xl font-black uppercase tracking-widest neo-brutalism-shadow hover:bg-yellow-300 transition-all text-sm"
                >
                  <Mail className="w-5 h-5" /> Hubungi Kami
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white text-stone-900 border-4 border-stone-900 px-8 py-4 rounded-2xl font-black uppercase tracking-widest neo-brutalism-shadow hover:bg-stone-100 transition-all text-sm"
                >
                  <Linkedin className="w-5 h-5" /> LinkedIn Kami
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-32 px-6 bg-[#FFFBF7]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20 space-y-4">
              <div className="inline-flex items-center gap-2 bg-stone-900 text-white border-4 border-stone-900 px-5 py-2 rounded-full font-black text-sm uppercase tracking-widest neo-brutalism-shadow mb-4">
                FAQ
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-stone-900 leading-tight">
                Pertanyaan yang{' '}
                <span className="text-red-500 underline decoration-yellow-400 decoration-8 underline-offset-8">
                  Sering Diajukan
                </span>
              </h2>
            </div>

            <div className="space-y-12">
              {faqData.map((section, si) => (
                <div key={si} className="space-y-4">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-1 w-10 bg-red-500 rounded-full" />
                    <h3 className="font-black text-sm uppercase tracking-[0.3em] text-stone-400">{section.category}</h3>
                    <div className="flex-1 h-1 bg-stone-200 rounded-full" />
                  </div>
                  <div className="space-y-4">
                    {section.items.map((item, ii) => (
                      <FaqItem key={ii} q={item.q} a={item.a} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="mt-20 bg-red-500 border-4 border-stone-900 rounded-[2.5rem] p-10 neo-brutalism-shadow text-center space-y-6">
              <h3 className="text-3xl font-black text-white uppercase tracking-tight">Masih ada pertanyaan?</h3>
              <p className="text-red-100 font-medium text-lg">Hubungi kami langsung, kami senang mendengar dari Anda.</p>
              <a
                href="mailto:Info@krisisiklimkita.com"
                className="inline-flex items-center gap-3 bg-white text-stone-900 border-4 border-stone-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest neo-brutalism-shadow hover:bg-yellow-300 transition-all"
              >
                <Mail className="w-5 h-5" /> Info@krisisiklimkita.com
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-stone-50 py-10 px-6 border-t-4 border-stone-200">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-stone-400 font-black text-xs uppercase tracking-[0.3em]">
          <p>© 2025 Krisis Iklim Kita. Memperjuangkan Kedaulatan Kolektif.</p>
          <button
            onClick={onBack}
            className="hover:text-stone-900 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
          </button>
        </div>
      </footer>

      <AccessibilityToolbar />
    </div>
  );
};

export default TentangKami;
