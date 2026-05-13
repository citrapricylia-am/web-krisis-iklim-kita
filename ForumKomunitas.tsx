import React, { useState, useEffect, useCallback } from 'react';
import {
  ArrowLeft,
  MessageCircle,
  ThumbsUp,
  Send,
  Clock,
  Loader2,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import Navbar from './Navbar';
import AccessibilityToolbar from './AccessibilityToolbar';

// ─────────────────────────────────────────────────────────────
// 🔧 GANTI dengan Web App URL kamu dari Google Apps Script
// ─────────────────────────────────────────────────────────────
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwwNP5_QpVB3lrvJi61iitoiG9s2BCudxgiBfzWFpU8JUO6xsg15xv9JnTebh9SKq1ccg/exec';
// ─────────────────────────────────────────────────────────────

const LIKED_IDS_KEY = 'forum_krisis_iklim_liked';

interface Comment {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  likes: number;
}

interface ForumKomunitasProps {
  onBack: () => void;
}

const ForumKomunitas: React.FC<ForumKomunitasProps> = ({ onBack }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [likingId, setLikingId] = useState<string | null>(null);

  // Load liked IDs dari localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LIKED_IDS_KEY);
      if (stored) setLikedIds(new Set(JSON.parse(stored)));
    } catch { /* ignore */ }
  }, []);

  // Fetch komentar dari Google Sheets
  const fetchComments = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const res = await fetch(`${APPS_SCRIPT_URL}?action=getComments`, {
        redirect: 'follow',
      });
      const json = await res.json();
      if (json.success) {
        setComments(json.data);
      } else {
        setFetchError('Gagal memuat komentar dari server.');
      }
    } catch {
      setFetchError('Tidak dapat terhubung ke server. Periksa koneksi internet kamu.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // Submit komentar baru
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const params = new URLSearchParams({
      action: 'addComment',
      name: name.trim(),
      message: message.trim(),
    });

    try {
      const res = await fetch(`${APPS_SCRIPT_URL}?${params.toString()}`, {
        redirect: 'follow',
      });
      const json = await res.json();

      if (json.success) {
        setName('');
        setMessage('');
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        // Refresh list setelah delay singkat (beri waktu sheet update)
        setTimeout(() => fetchComments(), 1200);
      } else {
        setSubmitError(json.error || 'Gagal mengirim komentar.');
      }
    } catch {
      setSubmitError('Gagal terhubung ke server. Coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle like — update lokal dulu, lalu kirim ke sheet
  const toggleLike = async (comment: Comment) => {
    if (likingId === comment.id) return; // prevent double-click

    const isLiked = likedIds.has(comment.id);
    const newLikes = isLiked ? comment.likes - 1 : comment.likes + 1;

    // Update lokal (optimistic)
    setComments((prev) =>
      prev.map((c) => (c.id === comment.id ? { ...c, likes: newLikes } : c))
    );

    // Update liked set & localStorage
    const newLikedIds = new Set(likedIds);
    if (isLiked) {
      newLikedIds.delete(comment.id);
    } else {
      newLikedIds.add(comment.id);
    }
    setLikedIds(newLikedIds);
    localStorage.setItem(LIKED_IDS_KEY, JSON.stringify([...newLikedIds]));

    // Kirim ke Google Sheets
    setLikingId(comment.id);
    const params = new URLSearchParams({
      action: 'updateLike',
      id: comment.id,
      likes: String(newLikes),
    });

    try {
      await fetch(`${APPS_SCRIPT_URL}?${params.toString()}`, { redirect: 'follow' });
    } catch {
      // Revert jika gagal
      setComments((prev) =>
        prev.map((c) => (c.id === comment.id ? { ...c, likes: comment.likes } : c))
      );
      const revert = new Set(likedIds);
      setLikedIds(revert);
      localStorage.setItem(LIKED_IDS_KEY, JSON.stringify([...revert]));
    } finally {
      setLikingId(null);
    }
  };

  return (
    <div className="min-h-screen selection:bg-yellow-200 flex flex-col bg-[#FFFBF7]">
      <Navbar />

      <main id="main-content" className="flex-1 pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Back button */}
          <button
            onClick={onBack}
            className="mb-10 flex items-center gap-3 font-black uppercase text-sm tracking-widest text-stone-500 hover:text-red-500 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Beranda
          </button>

          {/* Page Header */}
          <div className="mb-14">
            <div className="inline-flex items-center gap-3 bg-red-500 text-white border-4 border-stone-900 px-5 py-2.5 rounded-full font-black text-sm uppercase tracking-widest neo-brutalism-shadow mb-6">
              <MessageCircle className="w-4 h-4" /> Forum Komunitas
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-stone-900 leading-tight tracking-tight mb-4">
              Sampaikan{' '}
              <span className="text-red-500 underline decoration-yellow-400 decoration-8 underline-offset-8">
                Saranmu
              </span>
            </h1>
            <p className="text-lg md:text-xl text-stone-600 font-medium leading-relaxed">
              Aspirasi dan saran dari kamu akan menjadi referensi dalam penyusunan Naskah Akademis dan RUU Iklim Indonesia.
            </p>
          </div>

          {/* ── Form Input ── */}
          <div className="bg-white border-4 border-stone-900 rounded-3xl neo-brutalism-shadow p-8 mb-14">
            <h2 className="text-xl font-black uppercase tracking-widest text-stone-900 mb-6">
              Tulis Saranmu
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="forum-name"
                  className="block font-black text-stone-700 text-sm uppercase tracking-widest mb-2"
                >
                  Nama *
                </label>
                <input
                  id="forum-name"
                  type="text"
                  required
                  disabled={isSubmitting}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama kamu..."
                  className="w-full px-5 py-4 bg-[#FFFBF7] border-4 border-stone-900 rounded-2xl font-bold text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-4 focus:ring-yellow-400 disabled:opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="forum-message"
                  className="block font-black text-stone-700 text-sm uppercase tracking-widest mb-2"
                >
                  Saran / Komentar *
                </label>
                <textarea
                  id="forum-message"
                  required
                  rows={4}
                  disabled={isSubmitting}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tulis aspirasi, saran, atau komentarmu tentang keadilan iklim dan RUU Iklim..."
                  className="w-full px-5 py-4 bg-[#FFFBF7] border-4 border-stone-900 rounded-2xl font-bold text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-4 focus:ring-yellow-400 resize-none disabled:opacity-50"
                />
              </div>

              {submitError && (
                <div className="flex items-center gap-3 bg-red-50 border-2 border-red-300 rounded-2xl px-5 py-4 text-red-700 font-bold text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  {submitError}
                </div>
              )}

              <div className="flex items-center gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-red-500 text-white border-4 border-stone-900 px-8 py-4 rounded-2xl font-black text-base uppercase tracking-widest neo-brutalism-shadow neo-brutalism-shadow-hover transition-all flex items-center gap-3 group disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      Kirim
                    </>
                  )}
                </button>
                {submitted && (
                  <span className="font-black text-green-600 uppercase text-sm tracking-wider">
                    ✓ Saran terkirim!
                  </span>
                )}
              </div>
            </form>
          </div>

          {/* ── Comment Count + Refresh ── */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-6 h-6 text-stone-400" />
              <span className="font-black text-stone-900 text-lg uppercase tracking-widest">
                {isLoading ? '...' : `${comments.length} Saran & Komentar`}
              </span>
            </div>
            <button
              onClick={fetchComments}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-stone-900 rounded-xl font-black text-sm uppercase tracking-wider text-stone-700 hover:bg-yellow-300 transition-all disabled:opacity-50"
              aria-label="Muat ulang komentar"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {/* ── Loading State ── */}
          {isLoading && (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white border-4 border-stone-900 rounded-3xl p-7 animate-pulse"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 bg-stone-200 rounded-xl" />
                    <div className="space-y-2">
                      <div className="h-4 bg-stone-200 rounded w-24" />
                      <div className="h-3 bg-stone-100 rounded w-16" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-stone-100 rounded w-full" />
                    <div className="h-4 bg-stone-100 rounded w-4/5" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Error State ── */}
          {!isLoading && fetchError && (
            <div className="bg-red-50 border-4 border-red-400 rounded-3xl p-8 text-center space-y-4">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
              <p className="font-black text-red-700 text-lg">{fetchError}</p>
              <button
                onClick={fetchComments}
                className="bg-red-500 text-white border-4 border-stone-900 px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest neo-brutalism-shadow hover:bg-red-600 transition-all"
              >
                Coba Lagi
              </button>
            </div>
          )}

          {/* ── Empty State ── */}
          {!isLoading && !fetchError && comments.length === 0 && (
            <div className="text-center py-20 border-4 border-dashed border-stone-300 rounded-3xl space-y-4">
              <MessageCircle className="w-16 h-16 text-stone-300 mx-auto" />
              <p className="font-black text-stone-400 text-xl uppercase tracking-wide">
                Belum ada saran.
              </p>
              <p className="text-stone-400 font-medium">Jadilah yang pertama berbagi!</p>
            </div>
          )}

          {/* ── Comments List ── */}
          {!isLoading && !fetchError && comments.length > 0 && (
            <div className="space-y-6">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-white border-4 border-stone-900 rounded-3xl neo-brutalism-shadow p-7 hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1c1917] transition-all duration-200"
                >
                  {/* Author row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 bg-stone-900 text-white border-2 border-stone-900 rounded-xl flex items-center justify-center font-black text-sm shrink-0">
                        {comment.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-black text-stone-900">{comment.name}</p>
                        <p className="text-stone-400 text-xs font-bold flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {comment.timestamp}
                        </p>
                      </div>
                    </div>

                    {/* Like button */}
                    <button
                      onClick={() => toggleLike(comment)}
                      disabled={likingId === comment.id}
                      className={`flex items-center gap-2 px-4 py-2 border-2 border-stone-900 rounded-xl font-black text-sm transition-all ${
                        likedIds.has(comment.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white text-stone-600 hover:bg-red-50'
                      } disabled:opacity-60 disabled:cursor-not-allowed`}
                      aria-label={`Suka komentar dari ${comment.name}`}
                    >
                      {likingId === comment.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <ThumbsUp className="w-4 h-4" />
                      )}
                      {comment.likes}
                    </button>
                  </div>

                  {/* Message */}
                  <p className="text-stone-700 font-medium text-base leading-relaxed">
                    {comment.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-stone-50 py-10 px-6 border-t-4 border-stone-200">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-stone-400 font-black text-xs uppercase tracking-[0.3em]">
          <p>© 2025 Krisis Iklim Kita</p>
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

export default ForumKomunitas;
