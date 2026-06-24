import { useStore } from '@/store/useStore';

export default function UserProfile() {
  const user = useStore((s) => s.user);
  const categories = useStore((s) => s.categories);

  if (!user) return null;

  return (
    <div className="flex flex-col gap-2 animate-fadeIn">
      <p className="text-white text-lg font-bold leading-tight" data-testid="text-username">
        {user.name}
      </p>
      <p className="text-white/70 text-sm" data-testid="text-email">{user.email}</p>
      <p className="text-white font-bold text-lg" data-testid="text-handle">@{user.username}</p>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2" data-testid="categories-list">
          {categories.map((cat) => (
            <span
              key={cat}
              data-testid={`badge-category-${cat}`}
              className="rounded-full bg-white/15 border border-white/20 px-3 py-1 text-xs font-medium text-white"
            >
              {cat}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
