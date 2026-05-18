import React from 'react';
import { ArrowLeft, Mail, Linkedin, MessageCircle, Globe, Heart } from 'lucide-react';
import Navbar from './Navbar';
import AccessibilityToolbar from './AccessibilityToolbar';

interface KontakProps {
  onBack: () => void;
  onGoForum: () => void;
}

const Kontak: React.FC<KontakProps> = ({ onBack, onGoForum }) => {
  return (
    <div className="min-h-screen selection:bg-yellow-200 flex flex-col bg-[#FFFBF7]">
      <Navbar />

      <main id="main-content" className="flex-1">

        {/* ── HERO ── */}
        <header className="relative min-h-[50vh] flex items-center overflow-hidden px-6 bg-[#FFFBF7] border-b-4 border-stone-900">
          {/* Cutout decorations */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div className="absolute bottom-0 left-0 right-0 h-28 overflow-hidden select-none opacity-5">
              <p className="text-[9rem] font-black uppercase tracking-tighter text-stone-900 whitespace-nowrap leading-none">
                HUBUNGI KAMI HUBUNGI KAMI
              </p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-10 pt-28 pb-16 grid lg:grid-cols-2 gap-12 items-center animate-in fade-in duration-700">
            {/* Kiri — Teks */}
            <div className="space-y-8 animate-in slide-in-from-left duration-700">
              <button
                onClick={onBack}
                className="inline-flex items-center gap-2 font-black uppercase text-sm tracking-widest text-stone-500 hover:text-red-500 transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Kembali ke Beranda
              </button>

              <div className="inline-flex items-center gap-2 bg-red-500 text-white border-4 border-stone-900 px-5 py-2 rounded-full font-black text-sm uppercase tracking-widest neo-brutalism-shadow">
                Kontak
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-stone-900 leading-[1] tracking-tight">
                Mari{' '}
                <span className="text-red-500 underline decoration-yellow-400 decoration-8 underline-offset-8">
                  Terhubung
                </span>{' '}
                Bersama
              </h1>

              <p className="text-xl text-stone-600 font-medium leading-relaxed">
                Kami terbuka untuk kolaborasi, kontribusi narasi, koreksi faktual, dan segala bentuk keterlibatan yang bermakna.
              </p>
            </div>

            {/* Kanan — Gambar */}
            <div className="flex justify-end items-end animate-in slide-in-from-right duration-700">
              <img
                src="assets/gambar_kontak.png"
                alt="Ilustrasi Kontak"
                className="w-full max-w-md object-contain"
              />
            </div>
          </div>
        </header>

        {/* ── KONTAK CARDS ── */}
        <section className="py-24 px-6 bg-white border-b-4 border-stone-900">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">

            {/* Email */}
            <a
              href="mailto:Info@krisisiklimkita.com"
              className="group flex flex-col gap-6 bg-[#FFFBF7] border-4 border-stone-900 rounded-[2.5rem] p-10 neo-brutalism-shadow neo-brutalism-shadow-hover transition-all"
            >
              <div className="w-16 h-16 bg-red-500 border-4 border-stone-900 rounded-2xl flex items-center justify-center neo-brutalism-shadow group-hover:-rotate-6 transition-transform duration-300">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-stone-900 uppercase tracking-tight">Email</h2>
                <p className="text-stone-500 font-medium text-sm uppercase tracking-widest">Hubungi langsung</p>
              </div>
              <p className="text-xl font-black text-stone-900 group-hover:text-red-500 transition-colors break-all">
                Info@krisisiklimkita.com
              </p>
              <div className="pt-4 border-t-4 border-stone-200 flex items-center gap-2 font-black text-xs uppercase tracking-widest text-stone-400 group-hover:text-red-500 transition-colors">
                Kirim Email <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-6 bg-[#FFFBF7] border-4 border-stone-900 rounded-[2.5rem] p-10 neo-brutalism-shadow neo-brutalism-shadow-hover transition-all"
            >
              <div className="w-16 h-16 bg-blue-600 border-4 border-stone-900 rounded-2xl flex items-center justify-center neo-brutalism-shadow group-hover:-rotate-6 transition-transform duration-300">
                <Linkedin className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-stone-900 uppercase tracking-tight">LinkedIn</h2>
                <p className="text-stone-500 font-medium text-sm uppercase tracking-widest">Kenali kami lebih dekat</p>
              </div>
              <p className="text-xl font-black text-stone-900 group-hover:text-blue-600 transition-colors">
                Giorgio & Citra
              </p>
              <div className="pt-4 border-t-4 border-stone-200 flex items-center gap-2 font-black text-xs uppercase tracking-widest text-stone-400 group-hover:text-blue-600 transition-colors">
                Lihat Profil <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            {/* Forum */}
            <button
              onClick={onGoForum}
              className="group flex flex-col gap-6 bg-[#FFFBF7] border-4 border-stone-900 rounded-[2.5rem] p-10 neo-brutalism-shadow neo-brutalism-shadow-hover transition-all text-left"
            >
              <div className="w-16 h-16 bg-yellow-400 border-4 border-stone-900 rounded-2xl flex items-center justify-center neo-brutalism-shadow group-hover:-rotate-6 transition-transform duration-300">
                <MessageCircle className="w-8 h-8 text-stone-900" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-stone-900 uppercase tracking-tight">Forum Komunitas</h2>
                <p className="text-stone-500 font-medium text-sm uppercase tracking-widest">Suarakan aspirasimu</p>
              </div>
              <p className="text-lg font-medium text-stone-600 leading-relaxed">
                Sampaikan cerita, perspektif, dan aspirasimu langsung di forum publik kami.
              </p>
              <div className="pt-4 border-t-4 border-stone-200 flex items-center gap-2 font-black text-xs uppercase tracking-widest text-stone-400 group-hover:text-yellow-600 transition-colors">
                Buka Forum <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Kolaborasi */}
            <div className="flex flex-col gap-6 bg-stone-900 text-white border-4 border-stone-900 rounded-[2.5rem] p-10 neo-brutalism-shadow">
              <div className="w-16 h-16 bg-green-500 border-4 border-white/30 rounded-2xl flex items-center justify-center neo-brutalism-shadow">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black uppercase tracking-tight">Kolaborasi</h2>
                <p className="text-stone-400 font-medium text-sm uppercase tracking-widest">Bersama lebih kuat</p>
              </div>
              <p className="text-stone-300 font-medium leading-relaxed">
                Apakah lembaga atau komunitas Anda ingin terlibat? Kami terbuka untuk kolaborasi selama ada keberpihakan yang jelas terhadap keadilan iklim.
              </p>
              <a
                href="mailto:Info@krisisiklimkita.com?subject=Kolaborasi%20KIK"
                className="mt-auto inline-flex items-center gap-2 bg-white text-stone-900 border-4 border-white/30 px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-yellow-400 transition-all"
              >
                <Mail className="w-4 h-4" /> Ajukan Kolaborasi
              </a>
            </div>
          </div>
        </section>

        {/* ── CATATAN KETERBUKAAN ── */}
        <section className="py-24 px-6 bg-yellow-300 border-b-4 border-stone-900">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="w-24 h-24 shrink-0 bg-red-500 border-4 border-stone-900 rounded-full flex items-center justify-center neo-brutalism-shadow">
              <Heart className="w-12 h-12 text-white" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-black text-stone-900 leading-tight uppercase tracking-tight">
                Kami Terbuka untuk Koreksi
              </h2>
              <p className="text-xl text-stone-800 font-medium leading-relaxed">
                Tidak setuju dengan sesuatu di situs ini? Kirim koreksi faktual atau perspektif yang berbeda ke{' '}
                <a href="mailto:Info@krisisiklimkita.com" className="font-black underline decoration-stone-900 decoration-4 hover:text-red-700 transition-colors">
                  Info@krisisiklimkita.com
                </a>
                . Yang tidak akan kami lakukan adalah menghapus fakta karena itu tidak nyaman bagi pihak tertentu.
              </p>
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

export default Kontak;
