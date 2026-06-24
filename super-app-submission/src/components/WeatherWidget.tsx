import { useState, useEffect, useCallback } from 'react';
import { fetchWeather, WeatherData } from '@/services/weatherService';
import { formatDate, formatTime } from '@/utils/helpers';
import { Wind, Droplets, Gauge } from 'lucide-react';

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [now, setNow] = useState(new Date());

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeather();
      setWeather(data);
    } catch {
      setError('Could not load weather data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const clock = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(clock);
  }, [load]);

  if (loading) {
    return (
      <div className="rounded-2xl bg-[#1a1a2e] p-5">
        <div className="h-10 w-40 animate-pulse rounded-lg bg-white/10 mb-4" />
        <div className="h-16 w-24 animate-pulse rounded-lg bg-white/10" />
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="rounded-2xl bg-[#1a1a2e]" data-testid="weather-error">
        {/* Pink date bar */}
        <div className="bg-[#e91e8c] rounded-t-2xl px-5 py-3 flex items-center justify-between">
          <span className="text-white font-bold text-sm" data-testid="text-date">
            {formatDate(now)}
          </span>
          <span className="text-white font-bold text-sm" data-testid="text-time">
            {formatTime(now)}
          </span>
        </div>
        <div className="p-5 flex flex-col items-center justify-center gap-2 min-h-24">
          <p className="text-white/50 text-sm">{error || 'Weather unavailable'}</p>
          <button onClick={load} className="text-xs text-primary hover:underline">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden bg-[#1a1a2e]" data-testid="weather-widget">
      {/* Pink date bar */}
      <div className="bg-[#e91e8c] px-5 py-3 flex items-center justify-between">
        <span className="text-white font-bold text-sm" data-testid="text-date">
          {formatDate(now)}
        </span>
        <span className="text-white font-bold text-sm" data-testid="text-time">
          {formatTime(now)}
        </span>
      </div>

      {/* Weather info */}
      <div className="p-5 flex items-center gap-4">
        {weather.iconUrl && (
          <img src={weather.iconUrl} alt={weather.condition} className="h-14 w-14" data-testid="img-weather-icon" />
        )}
        <div className="flex-1">
          <div className="flex items-end gap-1">
            <span className="text-4xl font-bold text-white" data-testid="text-temperature">
              {weather.temp}°C
            </span>
          </div>
          <p className="text-white/60 text-sm capitalize" data-testid="text-condition">
            {weather.description}
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 grid grid-cols-3 gap-3">
        <div className="flex flex-col gap-1">
          <Gauge className="h-4 w-4 text-white/40" />
          <p className="text-xs text-white/40">Pressure</p>
          <p className="text-xs font-semibold text-white" data-testid="text-pressure">
            {weather.pressure} mbar
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <Wind className="h-4 w-4 text-white/40" />
          <p className="text-xs text-white/40">Wind</p>
          <p className="text-xs font-semibold text-white" data-testid="text-wind">
            {weather.windSpeed} km/h
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <Droplets className="h-4 w-4 text-white/40" />
          <p className="text-xs text-white/40">Humidity</p>
          <p className="text-xs font-semibold text-white" data-testid="text-humidity">
            {weather.humidity}%
          </p>
        </div>
      </div>
    </div>
  );
}
