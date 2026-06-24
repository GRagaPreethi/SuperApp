import { memo } from 'react';
import { Check } from 'lucide-react';

interface CategoryCardProps {
  name: string;
  image: string;
  color: string;
  selected: boolean;
  onToggle: () => void;
}

const CategoryCard = memo(function CategoryCard({ name, image, color, selected, onToggle }: CategoryCardProps) {
  return (
    <button
      onClick={onToggle}
      data-testid={`card-category-${name}`}
      className={`relative overflow-hidden rounded-2xl cursor-pointer select-none transition-all duration-200
        ${selected
          ? 'ring-4 ring-orange-400 ring-offset-2 ring-offset-black scale-105 shadow-2xl'
          : 'hover:scale-105 hover:shadow-xl'
        }`}
      style={{ aspectRatio: '1 / 1' }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-90`} />
      <img
        src={image}
        alt={name}
        className="absolute inset-0 h-full w-full object-cover mix-blend-overlay opacity-60"
        loading="lazy"
        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      <div className="absolute inset-0 flex flex-col">
        <div className="flex items-start justify-between p-3">
          <span className="text-sm font-bold text-white drop-shadow-md leading-tight">
            {name}
          </span>
          {selected && (
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-400 shrink-0">
              <Check className="h-3 w-3 text-white" />
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-3/4 h-3/4">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover rounded-tl-xl opacity-90"
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      </div>
    </button>
  );
});

export default CategoryCard;
