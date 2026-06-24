import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { Zap, LayoutDashboard, Film, LogOut } from 'lucide-react';

export default function Header() {
  const clearUser = useStore((s) => s.clearUser);
  const user = useStore((s) => s.user);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    clearUser();
    navigate('/');
  };

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/movies', label: 'Movies', icon: Film },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#1a1a1a]/90 backdrop-blur-md border-b border-white/5">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/dashboard" className="flex items-center gap-2" data-testid="link-home">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-4 w-4 text-black" />
          </div>
          <span className="text-lg font-bold text-primary">Super app</span>
        </Link>

        <nav className="flex items-center gap-1" data-testid="nav-links">
          {navLinks.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              data-testid={`link-${label.toLowerCase()}`}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === path
                  ? 'text-primary'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
          {/* User avatar */}
          {user && (
            <button
              onClick={handleLogout}
              data-testid="button-logout"
              title="Logout"
              className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-xs font-bold text-white hover:opacity-80 transition-opacity overflow-hidden"
            >
              <img
                src="https://api.dicebear.com/7.x/adventurer/svg?seed=superapp"
                alt="avatar"
                className="h-full w-full object-cover"
              />
            </button>
          )}
          {!user && (
            <button
              onClick={handleLogout}
              data-testid="button-logout"
              className="ml-2 flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
