import axios from 'axios';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: string;
}

const FALLBACK_ARTICLES: NewsArticle[] = [
  {
    title: 'Want to climb Mount Everest?',
    description: 'In the years since human beings first reached the summit of Mount Everest in 1953, climbing the world\'s highest mountain has changed dramatically. Today, hundreds of mountaineers manage the feat each year thanks to improvements in knowledge, technology, and the significant infrastructure provided by commercially guided expeditions that provide a veritable highway up the mountain for those willing to accept both the...',
    url: '#',
    urlToImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    publishedAt: '2023-02-20T19:35:00Z',
    source: 'National Geographic',
  },
  {
    title: 'The Future of Artificial Intelligence in Healthcare',
    description: 'AI-powered diagnostic tools are transforming medicine, enabling doctors to detect diseases earlier and with greater accuracy than ever before. From analyzing medical images to predicting patient outcomes, the applications are vast.',
    url: '#',
    urlToImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
    publishedAt: '2023-06-15T10:00:00Z',
    source: 'Tech Today',
  },
  {
    title: 'SpaceX Starship Completes Historic Orbital Test Flight',
    description: 'SpaceX\'s Starship rocket successfully completed its first full orbital test flight, marking a major milestone in the company\'s mission to send humans to Mars. The massive vehicle performed flawlessly throughout the mission.',
    url: '#',
    urlToImage: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=800&q=80',
    publishedAt: '2023-11-18T14:20:00Z',
    source: 'Space News',
  },
  {
    title: 'Global Climate Summit Reaches Landmark Agreement',
    description: 'World leaders gathered in Dubai have reached a groundbreaking agreement to triple renewable energy capacity by 2030, signaling a major shift away from fossil fuels in the global energy mix.',
    url: '#',
    urlToImage: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&q=80',
    publishedAt: '2023-12-12T09:00:00Z',
    source: 'World Report',
  },
  {
    title: 'New Study Reveals Deep Ocean Secrets',
    description: 'Scientists have discovered hundreds of previously unknown species in the depths of the Pacific Ocean, shedding light on the incredible biodiversity that exists in Earth\'s most unexplored environment.',
    url: '#',
    urlToImage: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&q=80',
    publishedAt: '2024-01-05T16:45:00Z',
    source: 'Science Daily',
  },
];

export async function fetchNews(): Promise<NewsArticle[]> {
  try {
    if (!API_KEY) throw new Error('No API key');
    const { data } = await axios.get(BASE_URL, {
      params: { country: 'us', pageSize: 10, apiKey: API_KEY },
      headers: { 'X-Api-Key': API_KEY },
    });
    const articles = (data.articles || [])
      .filter((a: Record<string, unknown>) => a.title && a.title !== '[Removed]')
      .map((a: Record<string, unknown>) => ({
        title: a.title as string,
        description: (a.description as string) || '',
        url: (a.url as string) || '',
        urlToImage: (a.urlToImage as string | null) || null,
        publishedAt: (a.publishedAt as string) || '',
        source: ((a.source as Record<string, unknown>)?.name as string) || '',
      }));
    if (articles.length === 0) return FALLBACK_ARTICLES;
    return articles;
  } catch {
    return FALLBACK_ARTICLES;
  }
}
