import { useEffect, useState, useCallback } from 'react';
import { Movie, MovieDetail, fetchMovieDetail } from '@/services/movieService';
import { X, Star, Clock, Calendar, Users, Clapperboard, Globe } from 'lucide-react';

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  const [detail, setDetail] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const load = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMovieDetail(id);
      setDetail(data);
    } catch {
      setError('Could not load movie details');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (movie) {
      setDetail(null);
      setError(null);
      load(movie.imdbID);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else {
      setVisible(false);
    }
  }, [movie, load]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (movie) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [movie]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 260);
  };

  if (!movie) return null;

  const poster = detail?.Poster && detail.Poster !== 'N/A' ? detail.Poster : movie.Poster;
  const hasPoster = poster && poster !== 'N/A';
  const rating = detail?.imdbRating && detail.imdbRating !== 'N/A' ? detail.imdbRating : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      data-testid="modal-movie"
      style={{
        transition: 'opacity 260ms ease',
        opacity: visible ? 1 : 0,
      }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={handleClose}
        data-testid="modal-backdrop"
      />

      {/* Modal Panel */}
      <div
        className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl bg-[#18181b] shadow-2xl border border-white/8"
        style={{
          transition: 'transform 260ms cubic-bezier(0.34, 1.3, 0.64, 1), opacity 260ms ease',
          transform: visible ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(20px)',
          opacity: visible ? 1 : 0,
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          data-testid="button-close-modal"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition-all hover:bg-white/20 hover:text-white hover:scale-110 active:scale-95"
        >
          <X className="h-4 w-4" />
        </button>

        {/* LOADING STATE */}
        {loading && (
          <div className="flex h-72 flex-col items-center justify-center gap-4">
            <div className="relative h-14 w-14">
              <div className="absolute inset-0 rounded-full border-2 border-white/10" />
              <div
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin"
                style={{ animationDuration: '0.8s' }}
              />
            </div>
            <p className="text-sm text-white/40">Loading details…</p>
          </div>
        )}

        {/* ERROR STATE */}
        {!loading && error && (
          <div
            className="flex h-72 flex-col items-center justify-center gap-3 p-8 text-center"
            data-testid="modal-error"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/15">
              <Clapperboard className="h-7 w-7 text-red-400" />
            </div>
            <p className="text-base font-semibold text-white">{movie.Title}</p>
            <p className="text-sm text-white/40">{error}</p>
            <button
              onClick={() => load(movie.imdbID)}
              className="mt-1 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white hover:bg-white/20 transition-colors"
            >
              Try again
            </button>
          </div>
        )}

        {/* DETAIL VIEW */}
        {!loading && !error && detail && (
          <div className="flex flex-col sm:flex-row overflow-y-auto" style={{ maxHeight: '90vh' }}>
            {/* Left — poster */}
            <div className="relative sm:w-56 shrink-0">
              {hasPoster ? (
                <>
                  <img
                    src={poster}
                    alt={detail.Title}
                    className="h-56 sm:h-full w-full object-cover"
                    data-testid="img-modal-poster"
                    style={{ minHeight: '280px' }}
                  />
                  {/* Gradient overlay for poster → content bleed */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#18181b]/60 hidden sm:block" />
                </>
              ) : (
                <div
                  className="h-56 sm:h-full w-full flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900"
                  style={{ minHeight: '280px' }}
                >
                  <Clapperboard className="h-16 w-16 text-zinc-600" />
                </div>
              )}

              {/* Rating badge over poster */}
              {rating && (
                <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-sm px-2.5 py-1 border border-white/10">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-white" data-testid="text-modal-rating">
                    {rating}
                  </span>
                  <span className="text-xs text-white/50">/10</span>
                </div>
              )}
            </div>

            {/* Right — details */}
            <div className="flex flex-col gap-5 p-6 flex-1 min-w-0">
              {/* Title + genre */}
              <div>
                <h2
                  className="text-xl font-bold text-white leading-tight pr-8"
                  data-testid="text-modal-title"
                >
                  {detail.Title}
                </h2>
                {detail.Genre && detail.Genre !== 'N/A' && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {detail.Genre.split(', ').map((g) => (
                      <span
                        key={g}
                        className="rounded-full bg-primary/15 border border-primary/25 px-2.5 py-0.5 text-xs font-medium text-primary"
                        data-testid="text-modal-genre"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Metadata pills */}
              <div className="flex flex-wrap gap-2">
                {detail.Runtime && detail.Runtime !== 'N/A' && (
                  <div className="flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/8 px-3 py-2">
                    <Clock className="h-3.5 w-3.5 text-white/40 shrink-0" />
                    <div>
                      <p className="text-xs text-white/40">Runtime</p>
                      <p className="text-xs font-semibold text-white" data-testid="text-modal-runtime">
                        {detail.Runtime}
                      </p>
                    </div>
                  </div>
                )}
                {detail.Released && detail.Released !== 'N/A' && (
                  <div className="flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/8 px-3 py-2">
                    <Calendar className="h-3.5 w-3.5 text-white/40 shrink-0" />
                    <div>
                      <p className="text-xs text-white/40">Released</p>
                      <p className="text-xs font-semibold text-white" data-testid="text-modal-released">
                        {detail.Released}
                      </p>
                    </div>
                  </div>
                )}
                {detail.Language && detail.Language !== 'N/A' && (
                  <div className="flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/8 px-3 py-2">
                    <Globe className="h-3.5 w-3.5 text-white/40 shrink-0" />
                    <div>
                      <p className="text-xs text-white/40">Language</p>
                      <p className="text-xs font-semibold text-white">
                        {detail.Language.split(',')[0]}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="h-px bg-white/8" />

              {/* Plot */}
              {detail.Plot && detail.Plot !== 'N/A' && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-2">
                    Plot
                  </p>
                  <p
                    className="text-sm text-white/75 leading-relaxed"
                    data-testid="text-modal-plot"
                  >
                    {detail.Plot}
                  </p>
                </div>
              )}

              {/* Director */}
              {detail.Director && detail.Director !== 'N/A' && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-1">
                    Director
                  </p>
                  <p className="text-sm text-white/70">{detail.Director}</p>
                </div>
              )}

              {/* Cast */}
              {detail.Actors && detail.Actors !== 'N/A' && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-2 flex items-center gap-1.5">
                    <Users className="h-3 w-3" />
                    Cast
                  </p>
                  <div className="flex flex-wrap gap-2" data-testid="text-modal-cast">
                    {detail.Actors.split(', ').map((actor) => (
                      <span
                        key={actor}
                        className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-white/70"
                      >
                        {actor}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
