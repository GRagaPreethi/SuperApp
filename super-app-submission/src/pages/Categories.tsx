import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { CATEGORIES, MIN_CATEGORIES } from '@/utils/constants';
import CategoryCard from '@/components/CategoryCard';
import { AlertTriangle, Zap, X } from 'lucide-react';

export default function Categories() {
  const setCategories = useStore((s) => s.setCategories);
  const existingCats = useStore((s) => s.categories);
  const [selected, setSelected] = useState<string[]>(existingCats);
  const navigate = useNavigate();

  const toggle = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  const handleContinue = () => {
    setCategories(selected);
    navigate('/dashboard');
  };

  const tooFew = selected.length < MIN_CATEGORIES;

  return (
    <div className="min-h-screen bg-black flex flex-col lg:flex-row">
      {/* Left side */}
      <div className="flex flex-col justify-center px-6 py-8 w-full lg:max-w-sm shrink-0">
        <div className="flex items-center gap-2 mb-12">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-4 w-4 text-black" />
          </div>
          <span className="text-xl font-bold text-primary">Super app</span>
        </div>

        <h1 className="text-3xl font-bold text-white leading-tight mb-8">
          Choose your entertainment category
        </h1>

        {/* Selected chips */}
        {selected.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selected.map((cat) => (
              <button
                key={cat}
                onClick={() => toggle(cat)}
                data-testid={`chip-${cat}`}
                className="flex items-center gap-1.5 rounded-full bg-primary/20 border border-primary/40 px-3 py-1 text-xs font-semibold text-primary hover:bg-primary/30 transition-colors"
              >
                {cat}
                <X className="h-3 w-3" />
              </button>
            ))}
          </div>
        )}

        {tooFew && selected.length > 0 && (
          <div className="flex items-center gap-2 text-red-400 text-sm" data-testid="error-min-categories">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span>Minimum {MIN_CATEGORIES} category required</span>
          </div>
        )}

        <div className="mt-auto pt-12">
          <button
            onClick={handleContinue}
            disabled={tooFew}
            data-testid="button-continue"
            className="rounded-full border border-primary/50 bg-transparent px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-primary hover:text-black disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next Page
          </button>
        </div>
      </div>

      {/* Right side — 3-column grid */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-2xl">
          {CATEGORIES.map(({ name, image, color }) => (
            <CategoryCard
              key={name}
              name={name}
              image={image}
              color={color}
              selected={selected.includes(name)}
              onToggle={() => toggle(name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
