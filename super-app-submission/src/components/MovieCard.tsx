import { memo } from 'react';
import { Movie } from '@/services/movieService';
import { Star } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const MovieCard = memo(function MovieCard({ movie, onClick }: MovieCardProps) {
  const hasPoster = movie.Poster && movie.Poster !== 'N/A';

  return (
    <button
      onClick={() => onClick(movie)}
      data-testid={`card-movie-${movie.imdbID}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-left transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 cursor-pointer"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-muted">
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
              el.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <div className={`${hasPoster ? 'hidden' : 'flex'} h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-muted to-card`}>
          <span className="text-4xl">🎬</span>
          <span className="text-xs text-muted-foreground text-center px-2">{movie.Title}</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="inline-flex items-center gap-1 rounded-md bg-primary/90 px-2 py-0.5 text-xs font-medium text-white">
            <Star className="h-3 w-3" />
            View Details
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-0.5 p-3">
        <h4 className="text-xs font-semibold text-foreground line-clamp-2 leading-tight" data-testid={`text-movie-title-${movie.imdbID}`}>
          {movie.Title}
        </h4>
        <p className="text-xs text-muted-foreground" data-testid={`text-movie-year-${movie.imdbID}`}>
          {movie.Year}
        </p>
      </div>
    </button>
  );
});

export default MovieCard;
