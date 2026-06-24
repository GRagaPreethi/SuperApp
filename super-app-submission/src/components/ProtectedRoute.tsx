import { Navigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireCategories?: boolean;
}

export default function ProtectedRoute({ children, requireCategories }: ProtectedRouteProps) {
  const user = useStore((s) => s.user);
  const categories = useStore((s) => s.categories);

  if (!user) return <Navigate to="/" replace />;
  if (requireCategories && categories.length < 3) return <Navigate to="/categories" replace />;

  return <>{children}</>;
}
