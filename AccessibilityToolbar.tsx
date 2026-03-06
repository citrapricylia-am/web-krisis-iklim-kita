
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Accessibility, 
  Type, 
  Contrast, 
  Volume2, 
  VolumeX, 
  Eye, 
  X,
  MousePointer2,
  Maximize,
  Sun,
  Moon,
  RotateCcw
} from 'lucide-react';

interface AccessibilitySettings {
  fontSize: 'normal' | 'large' | 'extra-large';
  highContrast: boolean;
  grayscale: boolean;
  dyslexicFont: boolean;
  highlightLinks: boolean;
  bigCursor: boolean;
  darkMode: boolean;
}

const AccessibilityToolbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 'normal',
    highContrast: false,
    grayscale: false,
    dyslexicFont: false,
    highlightLinks: false,
    bigCursor: false,
    darkMode: false
  });

  // Apply settings to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Font Size
    root.classList.remove('text-large', 'text-extra-large');
    if (settings.fontSize === 'large') root.classList.add('text-large');
    if (settings.fontSize === 'extra-large') root.classList.add('text-extra-large');

    // Visual Filters
    root.style.filter = settings.grayscale ? 'grayscale(100%)' : 'none';
    
    if (settings.highContrast) {
      root.classList.add('high-contrast');
      root.classList.remove('dark-mode');
    } else if (settings.darkMode) {
      root.classList.add('dark-mode');
      root.classList.remove('high-contrast');
    } else {
      root.classList.remove('high-contrast', 'dark-mode');
    }

    if (settings.dyslexicFont) {
      root.style.setProperty('--font-family-base', '"Comic Sans MS", "Comic Sans", cursive');
      document.body.style.fontFamily = '"Comic Sans MS", "Comic Sans", cursive';
    } else {
      root.style.removeProperty('--font-family-base');
      document.body.style.fontFamily = '';
    }

    if (settings.highlightLinks) {
      root.classList.add('highlight-links');
    } else {
      root.classList.remove('highlight-links');
    }

    if (settings.bigCursor) {
      root.classList.add('big-cursor');
    } else {
      root.classList.remove('big-cursor');
    }
  }, [settings]);

  // Handle voices loading (SpeechSynthesis voices are loaded asynchronously in many browsers)
  useEffect(() => {
    const loadVoices = () => {
      let voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setAvailableVoices(voices);
      }
    };

    loadVoices();
    // Chrome and others might fire this event when voices are actually ready
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const toggleSetting = (key: keyof AccessibilitySettings) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: !prev[key] };
      // Ensure exclusive modes
      if (key === 'highContrast' && newSettings.highContrast) newSettings.darkMode = false;
      if (key === 'darkMode' && newSettings.darkMode) newSettings.highContrast = false;
      return newSettings;
    });
  };

  const cycleFontSize = () => {
    const sizes: AccessibilitySettings['fontSize'][] = ['normal', 'large', 'extra-large'];
    const currentIndex = sizes.indexOf(settings.fontSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    setSettings(prev => ({ ...prev, fontSize: sizes[nextIndex] }));
  };

  const handleReadAloud = useCallback(() => {
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
    } else {
      const mainContent = document.getElementById('main-content');
      const textToRead = mainContent?.innerText || document.body.innerText;
      
      const utterance = new SpeechSynthesisUtterance(textToRead);
      
      // 1. Set explicit language code
      utterance.lang = 'id-ID';
      
      // 2. Find the best Indonesian voice available
      // Priority: id-ID exact match -> Google ID -> Microsoft ID -> Any ID
      const voices = availableVoices.length > 0 ? availableVoices : window.speechSynthesis.getVoices();
      
      const indonesianVoice = 
        voices.find(v => v.lang === 'id-ID' && v.name.includes('Google')) ||
        voices.find(v => v.lang === 'id-ID' && (v.name.includes('Ardi') || v.name.includes('Gadis'))) ||
        voices.find(v => v.lang === 'id-ID') || 
        voices.find(v => v.lang.toLowerCase().replace('_', '-').startsWith('id')) ||
        voices.find(v => v.name.toLowerCase().includes('indonesia'));
      
      if (indonesianVoice) {
        utterance.voice = indonesianVoice;
      }
      
      // Adjust parameters for more natural Indonesian flow
      utterance.rate = 1.0; 
      utterance.pitch = 1.0;

      utterance.onstart = () => setIsReading(true);
      utterance.onend = () => setIsReading(false);
      utterance.onerror = (event) => {
        console.error('Speech Synthesis Error:', event);
        setIsReading(false);
      };

      // Always cancel existing speech to ensure the new one starts immediately
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  }, [isReading, availableVoices]);

  const resetSettings = () => {
    setSettings({
      fontSize: 'normal',
      highContrast: false,
      grayscale: false,
      dyslexicFont: false,
      highlightLinks: false,
      bigCursor: false,
      darkMode: false
    });
    window.speechSynthesis.cancel();
    setIsReading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end">
      {/* Skip to Content Link */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[2000] bg-yellow-400 border-4 border-stone-900 px-6 py-3 font-black text-stone-900 neo-brutalism-shadow">
        Lanjut ke Konten Utama
      </a>

      {isOpen && (
        <div className="mb-4 w-80 bg-white border-4 border-stone-900 p-6 rounded-[2.5rem] neo-brutalism-shadow animate-in slide-in-from-bottom duration-300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black uppercase tracking-tight flex items-center gap-2 text-stone-900">
              <Accessibility className="w-6 h-6 text-red-500" /> Aksesibilitas
            </h3>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-2 hover:bg-stone-100 rounded-full border-2 border-transparent hover:border-stone-900 transition-all"
              aria-label="Tutup Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={cycleFontSize}
              className={`p-4 border-2 border-stone-900 rounded-2xl flex flex-col items-center gap-2 transition-all hover:scale-[1.02] active:scale-95 ${settings.fontSize !== 'normal' ? 'bg-yellow-300' : 'bg-stone-50'}`}
              aria-label="Ubah Ukuran Teks"
            >
              <Type className="w-6 h-6" />
              <span className="text-[10px] font-black uppercase tracking-widest text-center">Ukuran Teks</span>
            </button>

            <button 
              onClick={() => toggleSetting('highContrast')}
              className={`p-4 border-2 border-stone-900 rounded-2xl flex flex-col items-center gap-2 transition-all hover:scale-[1.02] active:scale-95 ${settings.highContrast ? 'bg-yellow-300 text-stone-900' : 'bg-stone-50'}`}
              aria-label="Mode Kontras Tinggi"
            >
              <Contrast className="w-6 h-6" />
              <span className="text-[10px] font-black uppercase tracking-widest text-center">Kontras Tinggi</span>
            </button>

            <button 
              onClick={handleReadAloud}
              className={`p-4 border-2 border-stone-900 rounded-2xl flex flex-col items-center gap-2 transition-all hover:scale-[1.02] active:scale-95 ${isReading ? 'bg-red-500 text-white' : 'bg-stone-50'}`}
              aria-label={isReading ? "Hentikan Suara" : "Baca Halaman (Bahasa Indonesia)"}
            >
              {isReading ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              <span className="text-[10px] font-black uppercase tracking-widest text-center font-bold">Aksen Indonesia</span>
            </button>

            <button 
              onClick={() => toggleSetting('darkMode')}
              className={`p-4 border-2 border-stone-900 rounded-2xl flex flex-col items-center gap-2 transition-all hover:scale-[1.02] active:scale-95 ${settings.darkMode ? 'bg-stone-900 text-white' : 'bg-stone-50'}`}
              aria-label="Mode Gelap"
            >
              {settings.darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              <span className="text-[10px] font-black uppercase tracking-widest text-center">Mode Gelap</span>
            </button>

            <button 
              onClick={() => toggleSetting('highlightLinks')}
              className={`p-4 border-2 border-stone-900 rounded-2xl flex flex-col items-center gap-2 transition-all hover:scale-[1.02] active:scale-95 ${settings.highlightLinks ? 'bg-yellow-300' : 'bg-stone-50'}`}
              aria-label="Sorot Tautan"
            >
              <Maximize className="w-6 h-6" />
              <span className="text-[10px] font-black uppercase tracking-widest text-center">Sorot Link</span>
            </button>

            <button 
              onClick={() => toggleSetting('bigCursor')}
              className={`p-4 border-2 border-stone-900 rounded-2xl flex flex-col items-center gap-2 transition-all hover:scale-[1.02] active:scale-95 ${settings.bigCursor ? 'bg-yellow-300' : 'bg-stone-50'}`}
              aria-label="Gunakan Kursor Besar"
            >
              <MousePointer2 className="w-6 h-6" />
              <span className="text-[10px] font-black uppercase tracking-widest text-center">Kursor Besar</span>
            </button>
          </div>

          <button 
            onClick={resetSettings}
            className="w-full mt-6 py-4 border-4 border-stone-900 bg-stone-100 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Reset Semua
          </button>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 border-4 border-stone-900 rounded-full flex items-center justify-center neo-brutalism-shadow neo-brutalism-shadow-hover transition-all ${isOpen ? 'bg-stone-900 text-white' : 'bg-yellow-400 text-stone-900'}`}
        aria-label="Menu Aksesibilitas"
        aria-expanded={isOpen}
      >
        <Accessibility className="w-8 h-8" />
      </button>
    </div>
  );
};

export default AccessibilityToolbar;
