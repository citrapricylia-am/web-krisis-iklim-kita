
import React, { useState, useEffect } from 'react';
import { 
  ArrowDown, 
  ArrowRight, 
  ChevronDown, 
  ExternalLink, 
  Megaphone, 
  Share2, 
  ShieldCheck, 
  Quote,
  Loader2,
  Instagram,
  Twitter,
  Linkedin,
  Globe,
  Thermometer,
  Waves,
  Wind,
  AlertTriangle,
  Info
} from 'lucide-react';
import Navbar from './Navbar';
import Modal from './Modal';
import DataSource from './DataSource';
import AccessibilityToolbar from './AccessibilityToolbar';
import { HELP_DATA, FACTS } from './constants';
import { HelpContent, HelpType } from './types';

const App: React.FC = () => {
  const [activeModal, setActiveModal] = useState<HelpContent | null>(null);
  const [isLoadingPortal, setIsLoadingPortal] = useState(false);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [currentView, setCurrentView] = useState<'home' | 'data-source'>('home');

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollWidth((winScroll / height) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Ensure scroll to top when switching views
    window.scrollTo(0, 0);
  }, [currentView]);

  const handleOpenModal = (id: HelpType) => {
    const content = HELP_DATA.find(h => h.id === id) || null;
    setActiveModal(content);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    document.body.style.overflow = 'auto';
  };

  const handleNextModal = () => {
    if (!activeModal) return;
    const currentIndex = HELP_DATA.findIndex(h => h.id === activeModal.id);
    const nextIndex = (currentIndex + 1) % HELP_DATA.length;
    setActiveModal(HELP_DATA[nextIndex]);
  };

  const scrollToNext = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('narrative');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const openConsultation = () => {
    setIsLoadingPortal(true);
    // Memberikan feedback visual sebentar sebelum diarahkan ke portal
    setTimeout(() => {
      window.location.href = 'https://konsultasi-iklim-terbuka.vercel.app/';
    }, 800);
  };

  const shareContent = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Krisis Iklim Kita - Memahami Keadilan Iklim',
        text: 'Keadilan tidak hadir with sendirinya. Mari kita perjuangkan kedaulatan kita di tengah krisis iklim.',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link disalin ke clipboard!');
    }
  };

  // Render Data Source page if active
  if (currentView === 'data-source') {
    return (
      <>
        <DataSource onBack={() => setCurrentView('home')} />
        <AccessibilityToolbar />
      </>
    );
  }

  return (
    <div className="min-h-screen selection:bg-yellow-200 flex flex-col">
      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 h-1 bg-red-500 z-[100] transition-all duration-100" style={{ width: `${scrollWidth}%` }} />

      <Navbar />

      <main id="main-content">
        {/* Hero Section - FULL SCREEN HEIGHT */}
        <header className="relative min-h-screen flex items-center overflow-hidden px-6 bg-[#FFFBF7]">
          <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-2 gap-16 items-center pt-20">
            <div className="space-y-10 animate-in fade-in slide-in-from-left duration-1000">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-stone-900 leading-[1] tracking-tight">
                Kenapa harus <span className="text-red-500 underline decoration-yellow-400 decoration-8 underline-offset-8">Keadilan Iklim</span>?
              </h1>

              <p className="text-xl md:text-3xl text-stone-600 leading-relaxed max-w-2xl font-medium">
                <span className="text-red-600 font-black">Karena ini adalah soal keselamatan manusia</span>. Karena semua manusia berhak untuk selamat, hidup, dan bertahan di tengah krisis iklim.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <button 
                  onClick={scrollToNext}
                  className="bg-red-500 text-white border-4 border-stone-900 px-10 py-6 rounded-2xl font-black text-xl uppercase tracking-widest neo-brutalism-shadow neo-brutalism-shadow-hover transition-all flex items-center justify-center gap-3 group"
                >
                  Mulai Memahami <ArrowDown className="w-6 h-6 group-hover:translate-y-2 transition-transform" />
                </button>
              </div>
            </div>

            <div className="relative hidden lg:block animate-in fade-in slide-in-from-right duration-1000">
              <div className="absolute inset-0 bg-stone-200 rounded-[3rem] rotate-3 -z-10" />
              <div className="relative overflow-hidden rounded-[3rem] border-4 border-stone-900 neo-brutalism-shadow aspect-[4/5] md:aspect-square">
                <img 
                  src="assets/forest.jpg" 
                  alt="Dampak Perubahan Iklim di Wilayah Pesisir" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent pointer-events-none" />
              </div>
              
              <div className="absolute bottom-12 -left-10 bg-white border-4 border-stone-900 p-8 rounded-3xl neo-brutalism-shadow max-w-sm z-20 animate-float">
                 <div className="flex items-start gap-4">
                   <p className="text-lg font-bold text-stone-800 leading-snug">
                     "Kerentanan lebih tinggi dialami Masyarakat Adat & Petani Kecil."
                   </p>
                 </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce cursor-pointer opacity-50 hover:opacity-100 transition-opacity" onClick={scrollToNext} role="button" aria-label="Gulir ke bagian selanjutnya">
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Scroll</span>
            <ChevronDown className="w-8 h-8" />
          </div>
        </header>

       {/* Narrative Section */}
<section
  id="narrative"
  className="py-32 px-6 bg-white border-y-4 border-stone-900 scroll-mt-24"
>
  <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-20 items-center">
    
    {/* KIRI — TEKS */}
    <div className="lg:col-span-7 space-y-10">
      <h2 className="text-4xl md:text-6xl font-black text-stone-900 leading-tight">
        Ada ketimpangan yang nyata, dan kita butuh{" "}
        <span className="text-red-500 underline decoration-yellow-400 decoration-4">
          keadilan
        </span>.
      </h2>

      <div className="space-y-8 text-xl text-stone-600 leading-relaxed font-medium">
        <p>
          Dalam krisis iklim, rasio keselamatan manusia tidaklah sama. Mereka yang
          paling sedikit berkontribusi pada emisi, justru yang paling awal dan
          paling parah menanggung dampaknya.
        </p>

        <p>
          Ini mencakup kita semua: pekerja korporat, Gen Z, kelas menengah, hingga
          pekerja informal. Kita semua berhak atas{" "}
          <span className="text-stone-900 font-black italic border-b-4 border-red-200">
            kemampuan yang setara untuk selamat
          </span>.
        </p>

        <div className="bg-red-50 p-10 rounded-[2.5rem] border-4 border-stone-900 neo-brutalism-shadow flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
          <Quote
            className="w-16 h-16 text-red-500 shrink-0 opacity-20"
            aria-hidden="true"
          />
          <p className="text-3xl font-black italic text-stone-900 leading-tight">
            "Keadilan tidak hadir dengan sendirinya. Keadilan harus diperjuangkan
            secara kolektif oleh kita semua."
          </p>
        </div>
      </div>
    </div>

    {/* KANAN — GAMBAR */}
    <div className="lg:col-span-5 flex justify-end relative">
      <img
        src="/assets/edit_law.png"
        alt="Ilustrasi keadilan iklim"
        className="w-full max-w-lg translate-y-[-2rem]"
      />
    </div>
  </div>
</section>

        {/* HELP Framework Grid - Empat Pilar */}
        <section id="framework" className="py-40 px-6 bg-[#FFFBF7] scroll-mt-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-4xl mx-auto mb-24 space-y-8">
              <h2 className="text-5xl md:text-7xl font-black text-stone-900 leading-[1.1]">Empat Pilar <span className="text-red-500">H.E.L.P</span></h2>
              <p className="text-2xl text-stone-600 font-medium leading-relaxed">
                Dalam kondisi darurat, kita berseru <i><b>"HELP!"</b></i>. Ini adalah empat fondasi untuk memahami dan memperjuangkan keadilan iklim.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {HELP_DATA.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => handleOpenModal(item.id)}
                  className={`group text-left bg-white border-4 border-stone-900 p-10 rounded-[3rem] neo-brutalism-shadow neo-brutalism-shadow-hover transition-all flex flex-col items-start gap-8 h-full min-h-[420px] focus:outline-none focus:ring-4 focus:ring-yellow-400`}
                  aria-label={`Pelajari lebih lanjut tentang ${item.title}: ${item.subtitle}`}
                >
                  <div className={`w-20 h-20 ${item.bgColor} border-4 border-stone-900 rounded-3xl flex items-center justify-center text-white text-4xl font-black neo-brutalism-shadow group-hover:-rotate-12 transition-transform duration-300`} aria-hidden="true">
                    {item.letter}
                  </div>
                  <div className="w-full flex-grow">
                    <h3 className="text-3xl font-black uppercase mb-2 tracking-tight">{item.title}</h3>
                    <p className={`font-black text-lg ${item.color} mb-6`}>{item.subtitle}</p>
                    <div className="text-stone-600 text-lg font-medium leading-relaxed">
                      {item.description}
                    </div>
                  </div>
                  <div className="w-full pt-8 border-t-2 border-stone-100 flex items-center justify-between font-black text-stone-900 uppercase text-xs tracking-widest group-hover:text-red-500 transition-colors">
                    <span>Pelajari Lebih Jauh</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Facts & Figures - Fakta */}
        <section id="facts" className="py-40 px-6 bg-stone-900 text-white overflow-hidden relative scroll-mt-24">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-1/4 left-0 w-[800px] h-[800px] bg-red-600 rounded-full blur-[200px] -translate-x-1/2" />
            <div className="absolute bottom-1/4 right-0 w-[800px] h-[800px] bg-blue-600 rounded-full blur-[200px] translate-x-1/2" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-32 items-center">
              <div className="space-y-16">
                <div className="space-y-6">
                  <span className="text-red-500 font-black uppercase tracking-[0.3em] text-sm">Data & Realita</span>
                  <h2 className="text-5xl md:text-7xl font-black leading-tight">Ini Bukan Angka, Ini <span className="text-red-500">Masa Depan</span> Kita.</h2>
                </div>
                <div className="grid gap-16">
                  {FACTS.map((fact, idx) => (
                    <div key={idx} className="flex items-center gap-10 group relative">
                      <div className="relative">
                        <div className="text-7xl md:text-9xl font-black text-white/10 group-hover:text-red-500 transition-colors duration-500 cursor-help" tabIndex={0} aria-label={`${fact.value} - ${fact.label}`}>
                          {fact.value}
                        </div>
                        <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute bottom-full left-0 mb-6 w-72 p-5 bg-white border-2 border-stone-900 rounded-2xl neo-brutalism-shadow z-50 transition-all duration-300">
                          <div className="flex items-start gap-3">
                            <Info className="w-6 h-6 text-red-500 shrink-0" aria-hidden="true" />
                            <p className="text-stone-900 text-[13px] font-bold leading-relaxed">
                              Beberapa angka dalam infografis ini merupakan agregasi dari berbagai metrik dalam laporan IPCC AR6 (2022) untuk memudahkan pemahaman publik. Untuk rincian metodologi lengkap dan rentang estimasi, silakan merujuk ke dokumen asli IPCC yang tercantum dalam daftar referensi.
                            </p>
                          </div>
                          <div className="absolute top-full left-10 -mt-[2px] w-4 h-4 bg-white border-r-2 border-b-2 border-stone-900 rotate-45"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-2xl font-black uppercase tracking-tight">{fact.label}</h4>
                        <p className="text-stone-400 text-lg font-medium max-w-sm leading-relaxed">{fact.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-stone-800/50 backdrop-blur-xl border-4 border-stone-700 p-12 md:p-16 rounded-[4rem] space-y-12 neo-brutalism-shadow">
                <div className="w-20 h-20 bg-yellow-400 border-4 border-stone-900 rounded-3xl flex items-center justify-center neo-brutalism-shadow -rotate-6" aria-hidden="true">
                  <Quote className="w-10 h-10 text-stone-900" />
                </div>
                <p className="text-3xl md:text-4xl font-bold leading-relaxed italic text-stone-100">
                  "10% populasi dengan emisi per kapita tertinggi bertanggung jawab atas sekitar 48% emisi global, sementara 50% populasi dengan emisi terendah hanya menyumbang sekitar 12%."
                </p>
                
                <div className="pt-12 border-t-2 border-stone-700/50 flex flex-col items-start gap-8">
                  <button 
                    onClick={() => setCurrentView('data-source')}
                    className="w-full md:w-auto bg-white text-stone-900 border-4 border-stone-900 px-8 py-4 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-red-500 hover:text-white transition-all neo-brutalism-shadow focus:ring-4 focus:ring-yellow-400"
                  >
                    Lihat Sumber Data
                  </button>
                  
                  <div className="w-full">
                    <p className="text-stone-400 text-[10px] md:text-[11px] leading-relaxed italic font-medium">
                      Keterangan: Data kesenjangan emisi (48% vs 12%) berdasarkan Chancel (2022) dalam IPCC AR6 WGIII. Metode: Consumption-based accounting, periode 1990-2019. IPCC mencatat rentang: Top 10% (34-45%), Bottom 50% (13-15%). 
                      <span className="block mt-1">
                        Lihat: <a href="https://www.ipcc.ch/report/ar6/wg3/chapter/chapter-2/" target="_blank" rel="noopener noreferrer" className="underline hover:text-red-400 transition-colors break-all">Rujukan IPCC</a>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Aksi */}
        <section id="action" className="py-40 px-6 bg-yellow-300 border-y-8 border-stone-900 relative overflow-hidden scroll-mt-24">
          <div className="absolute top-10 left-10 w-32 h-32 border-8 border-stone-900/10 rounded-full animate-pulse" />
          <div className="absolute bottom-10 right-10 w-48 h-48 border-8 border-stone-900/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

          <div className="max-w-5xl mx-auto text-center space-y-16 relative z-10">
            <div className="w-28 h-28 bg-red-500 border-4 border-stone-900 rounded-full flex items-center justify-center mx-auto neo-brutalism-shadow animate-bounce">
              <Megaphone className="w-14 h-14 text-white" aria-hidden="true" />
            </div>
            <div className="space-y-6">
              <h2 className="text-5xl md:text-8xl font-black text-stone-900 leading-[1.1] uppercase tracking-tighter">
                Keadilan Dimulai <br/>dari <span className="text-white drop-shadow-[4px_4px_0px_#1c1917]">Kesadaran</span>
              </h2>
              <p className="text-2xl md:text-3xl font-bold text-stone-800 leading-relaxed max-w-3xl mx-auto">
                Anda telah memahami fondasi perjuangan ini. Kini saatnya mengubah pemahaman menjadi aksi nyata. Libatkan diri anda dalam berpartisipasi dalam pembentukan Naskah Akademis dan RUU Iklim.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-8">
              <button 
                onClick={openConsultation}
                disabled={isLoadingPortal}
                className="w-full sm:w-auto bg-red-500 text-white border-4 border-stone-900 px-12 py-8 rounded-[2rem] font-black text-2xl uppercase tracking-widest neo-brutalism-shadow neo-brutalism-shadow-hover transition-all flex items-center justify-center gap-4 disabled:opacity-70 group focus:ring-4 focus:ring-stone-900"
              >
                {isLoadingPortal ? (
                  <>
                    <Loader2 className="w-8 h-8 animate-spin" /> 
                    Membuka Portal...
                  </>
                ) : (
                  <>
                    Portal Konsultasi <ExternalLink className="w-8 h-8 group-hover:rotate-12 transition-transform" />
                  </>
                )}
              </button>
              <button 
                onClick={shareContent}
                className="w-full sm:w-auto bg-white text-stone-900 border-4 border-stone-900 px-12 py-8 rounded-[2rem] font-black text-2xl uppercase tracking-widest neo-brutalism-shadow neo-brutalism-shadow-hover transition-all flex items-center justify-center gap-4 group focus:ring-4 focus:ring-red-500"
              >
                Bagikan <Share2 className="w-8 h-8 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-stone-50 pt-32 pb-16 px-6 border-t-4 border-stone-200">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-20">
          <div className="lg:col-span-2 space-y-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white border-4 border-stone-900 rounded-2xl flex items-center justify-center neo-brutalism-shadow p-2 overflow-hidden">
                <img 
                  src="https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/climate-3d-earth.png" 
                  alt="Logo Krisis Iklim Kita" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://cdn-icons-png.flaticon.com/512/2847/2847306.png";
                  }}
                />
              </div>
              <span className="text-3xl font-black uppercase tracking-tighter text-stone-900">Krisis Iklim Kita</span>
            </div>
            <p className="text-xl text-stone-600 font-medium leading-relaxed max-w-md">
              Inisiatif pendidikan publik untuk membangun kedaulatan informasi dan kesadaran kolektif tentang keadilan iklim di Indonesia.
            </p>
            <div className="flex gap-6">
              {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-14 h-14 bg-white border-4 border-stone-900 rounded-2xl flex items-center justify-center neo-brutalism-shadow neo-brutalism-shadow-hover transition-all group focus:ring-4 focus:ring-yellow-400">
                  <Icon className="w-7 h-7 group-hover:text-red-500 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            <h4 className="font-black uppercase tracking-[0.2em] text-stone-400 text-sm">Eksplorasi</h4>
            <ul className="space-y-5 font-bold text-xl text-stone-700">
              <li><a href="#framework" className="hover:text-red-500 transition-colors flex items-center gap-2 group"><ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /> Empat Pilar</a></li>
              <li><a href="#facts" className="hover:text-red-500 transition-colors flex items-center gap-2 group"><ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /> Fakta Krisis</a></li>
              <li><a href="#action" className="hover:text-red-500 transition-colors flex items-center gap-2 group"><ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /> Ambil Aksi</a></li>
            </ul>
          </div>

          <div className="space-y-10">
            <h4 className="font-black uppercase tracking-[0.2em] text-stone-400 text-sm">Informasi</h4>
            <ul className="space-y-5 font-bold text-xl text-stone-700">
              <li><a href="#" className="hover:text-red-500 transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">RUU Iklim</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Kontak</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Kebijakan</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-32 pt-16 border-t-4 border-stone-200 flex flex-col md:flex-row justify-between items-center gap-10 text-stone-400 font-black text-xs uppercase tracking-[0.3em]">
          <p>© 2025 KRISIS IKLIM KITA. MEMPERJUANGKAN KEDAULATAN KOLEKTIF.</p>
          <div className="flex gap-12">
            <a href="#" className="hover:text-stone-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-stone-900 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Active Modal */}
      {activeModal && (
        <Modal 
          content={activeModal} 
          onClose={handleCloseModal} 
          onNext={activeModal.id !== 'production' ? handleNextModal : undefined}
          onNavigate={handleOpenModal}
        />
      )}

      {/* Accessibility Toolbar */}
      <AccessibilityToolbar />
    </div>
  );
};

export default App;

