import { useState, useEffect, useCallback } from 'react';
import { useStore } from '@/store/useStore';
import { fetchMoviesByCategory, Movie } from '@/services/movieService';
import Header from '@/components/Header';
import MovieModal from '@/components/MovieModal';

interface CategoryMovies {
  category: string;
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

function MoviePosterCard({ movie, onClick }: { movie: Movie; onClick: (m: Movie) => void }) {
  const hasPoster = movie.Poster && movie.Poster !== 'N/A';
  return (
    <button
      onClick={() => onClick(movie)}
      data-testid={`card-movie-${movie.imdbID}`}
      className="group relative flex-shrink-0 w-36 sm:w-44 overflow-hidden rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-black/60"
    >
      <div className="relative aspect-[2/3] bg-zinc-800">
        {hasPoster ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            data-testid={`img-movie-${movie.imdbID}`}
            loading="lazy"
            onError={(e) => {
              const el = e.target as HTMLImageElement;
              el.style.display = 'none';
            }}
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-zinc-800">
            <span className="text-xs text-zinc-500 text-center px-2">{movie.Title}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white text-xs font-semibold leading-tight line-clamp-2">{movie.Title}</p>
          <p className="text-zinc-300 text-xs mt-0.5">{movie.Year}</p>
        </div>
      </div>
    </button>
  );
}

export default function Movies() {
  const categories = useStore((s) => s.categories);
  const [data, setData] = useState<CategoryMovies[]>(() =>
    categories.map((cat) => ({ category: cat, movies: [], loading: true, error: null }))
  );
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const loadAll = useCallback(async () => {
    setData(categories.map((cat) => ({ category: cat, movies: [], loading: true, error: null })));
    await Promise.all(
      categories.map(async (cat, i) => {
        try {
          const movies = await fetchMoviesByCategory(cat);
          setData((prev) => {
            const next = [...prev];
            next[i] = { category: cat, movies, loading: false, error: null };
            return next;
          });
        } catch {
          setData((prev) => {
            const next = [...prev];
            next[i] = { category: cat, movies: [], loading: false, error: 'Could not load movies' };
            return next;
          });
        }
      })
    );
  }, [categories]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  return (
    <div className="min-h-screen bg-[#1a1a1a]" data-testid="page-movies">
      <Header />

      <main className="px-6 py-8 max-w-7xl mx-auto">
        <p className="text-white/70 text-sm mb-8">Entertainment according to your choice</p>

        <div className="space-y-10">
          {data.map(({ category, movies, loading }) => (
            <section key={category} data-testid={`section-${category}`}>
              <h2 className="text-white text-base font-medium mb-4">{category}</h2>

              {loading && (
                <div className="flex gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="animate-pulse flex-shrink-0 w-36 sm:w-44">
                      <div className="aspect-[2/3] rounded-xl bg-zinc-700" />
                    </div>
                  ))}
                </div>
              )}

              {!loading && movies.length > 0 && (
                <div
                  className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
                  data-testid={`movies-grid-${category}`}
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {movies.map((movie) => (
                    <MoviePosterCard
                      key={movie.imdbID}
                      movie={movie}
                      onClick={setSelectedMovie}
                    />
                  ))}
                </div>
              )}

              {!loading && movies.length === 0 && (
                <p className="text-zinc-500 text-sm">No movies found</p>
              )}
            </section>
          ))}
        </div>
      </main>

      <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </div>
  );
}
