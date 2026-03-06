
import React, { useEffect, useRef } from 'react';
import { X, ArrowRight, Shield, TrendingDown, Map, ShoppingBag } from 'lucide-react';
import { HelpContent, HelpType } from '../types';

interface ModalProps {
  content: HelpContent | null;
  onClose: () => void;
  onNext?: () => void;
  onNavigate?: (id: HelpType) => void;
}

const Modal: React.FC<ModalProps> = ({ content, onClose, onNext, onNavigate }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Reset scroll position to top whenever the content changes (based on its ID)
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [content?.id]);

  if (!content) return null;

  const getIcon = (id: string) => {
    switch (id) {
      case 'human': return <Shield className="w-8 h-8" />;
      case 'ecological': return <TrendingDown className="w-8 h-8" />;
      case 'land': return <Map className="w-8 h-8" />;
      case 'production': return <ShoppingBag className="w-8 h-8" />;
      default: return null;
    }
  };

  const renderDescription = () => {
    const descToRender = content.modalDescription || content.description;
    if (typeof descToRender === 'function') {
      return descToRender(onNavigate || (() => {}));
    }
    return descToRender;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#FFFBF7] border-4 border-stone-900 rounded-[2rem] neo-brutalism-shadow overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className={`p-8 ${content.bgColor} border-b-4 border-stone-900 flex justify-between items-center shrink-0`}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white border-2 border-stone-900 rounded-xl flex items-center justify-center neo-brutalism-shadow">
              <span className="text-2xl font-black text-stone-900">{content.letter}</span>
            </div>
            <div className="text-white">
              <h3 className="text-2xl font-black uppercase tracking-tight">{content.title}</h3>
              <p className="font-bold opacity-90">{content.subtitle}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-white border-2 border-stone-900 rounded-full hover:bg-stone-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div ref={scrollContainerRef} className="p-8 md:p-10 space-y-6 overflow-y-auto">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className={`p-3 rounded-2xl border-2 border-stone-900 ${content.bgColor} text-white neo-brutalism-shadow shrink-0 hidden md:block`}>
              {getIcon(content.id)}
            </div>
            <div className="text-xl leading-relaxed text-stone-800 font-medium">
              {renderDescription()}
            </div>
          </div>

          <div className="bg-stone-100 p-6 rounded-2xl border-2 border-stone-900 border-dashed">
            <p className="italic text-stone-600">
              "Ketimpangan struktural ini tidak akan hilang dengan sendirinya. Kita butuh kebijakan yang berpihak pada keselamatan manusia di atas keuntungan ekonomi semata."
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {onNext && (
              <button 
                onClick={onNext}
                className="flex-1 bg-red-500 text-white border-2 border-stone-900 px-6 py-4 rounded-xl font-black uppercase tracking-wide flex items-center justify-center gap-2 neo-brutalism-shadow neo-brutalism-shadow-hover transition-all"
              >
                Pilar Berikutnya <ArrowRight className="w-5 h-5" />
              </button>
            )}
            <button 
              onClick={onClose}
              className="flex-1 bg-white border-2 border-stone-900 px-6 py-4 rounded-xl font-black uppercase tracking-wide neo-brutalism-shadow neo-brutalism-shadow-hover transition-all"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
