import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchNews, NewsArticle } from '@/services/newsService';
import { formatNewsDate, truncate } from '@/utils/helpers';
import { ExternalLink } from 'lucide-react';

export default function NewsWidget() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCycle = useCallback((count: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % count);
    }, 2000);
  }, []);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchNews();
      setArticles(data);
      if (data.length > 0) startCycle(data.length);
    } finally {
      setLoading(false);
    }
  }, [startCycle]);

  useEffect(() => {
    load();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [load]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    );
  }

  if (articles.length === 0) return null;

  const article = articles[index];

  return (
    <div className="flex flex-col h-full" data-testid="news-widget">
      {/* Image */}
      {article.urlToImage && (
        <div className="relative h-44 shrink-0 overflow-hidden">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="h-full w-full object-cover"
            data-testid="img-news"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e2e]/80 to-transparent" />
        </div>
      )}

      <div className="flex flex-col gap-2 p-4 flex-1">
        <h4
          className="text-white text-base font-bold leading-snug line-clamp-2"
          data-testid="text-news-title"
        >
          {article.title}
        </h4>

        <p className="text-xs text-white/50" data-testid="text-news-date">
          {formatNewsDate(article.publishedAt)}
        </p>

        {article.description && (
          <p className="text-xs text-white/70 leading-relaxed line-clamp-4" data-testid="text-news-description">
            {truncate(article.description, 200)}
          </p>
        )}

        {article.url && article.url !== '#' && (
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-news-read"
            className="mt-auto inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary hover:bg-primary hover:text-black transition-colors self-start"
          >
            Browse <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>

      {/* Dots */}
      <div className="flex gap-1 px-4 pb-3">
        {articles.slice(0, 8).map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            data-testid={`dot-news-${i}`}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === index ? 'bg-primary w-5' : 'bg-white/20 w-1'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
