import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { registerSchema, RegisterFormData } from '@/utils/validations';
import { Zap } from 'lucide-react';

export default function Register() {
  const setUser = useStore((s) => s.setUser);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { shareData: false },
  });

  const onSubmit = (data: RegisterFormData) => {
    setUser({
      name: data.name,
      username: data.username,
      email: data.email,
      mobile: data.mobile,
    });
    navigate('/categories');
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side — concert background */}
      <div className="relative hidden lg:flex lg:w-1/2 flex-col items-start justify-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1280&q=80"
          alt="Concert"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative z-10 px-12 pb-16">
          <h1 className="text-4xl font-bold text-white leading-tight">
            Discover new things on<br />Superapp
          </h1>
        </div>
      </div>

      {/* Right side */}
      <div className="flex flex-1 flex-col items-center justify-center px-8 py-12 bg-[#111111]">
        <div className="w-full max-w-sm animate-fadeIn">
          {/* Logo */}
          <div className="mb-6 flex items-center justify-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-4 w-4 text-black" />
            </div>
            <span className="text-xl font-bold text-primary">Super app</span>
          </div>

          <h2 className="text-lg font-semibold text-white text-center mb-6">
            Create your new account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
            {/* Name */}
            <div className="space-y-1">
              <input
                {...register('name')}
                id="name"
                type="text"
                data-testid="input-name"
                placeholder="Name"
                className="w-full rounded border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-primary focus:outline-none transition-colors"
              />
              {errors.name && (
                <p className="text-xs text-red-500" data-testid="error-name">{errors.name.message}</p>
              )}
            </div>

            {/* Username */}
            <div className="space-y-1">
              <input
                {...register('username')}
                id="username"
                type="text"
                data-testid="input-username"
                placeholder="UserName"
                className="w-full rounded border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-primary focus:outline-none transition-colors"
              />
              {errors.username && (
                <p className="text-xs text-red-500" data-testid="error-username">{errors.username.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <input
                {...register('email')}
                id="email"
                type="email"
                data-testid="input-email"
                placeholder="Email"
                className="w-full rounded border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-primary focus:outline-none transition-colors"
              />
              {errors.email && (
                <p className="text-xs text-red-500" data-testid="error-email">{errors.email.message}</p>
              )}
            </div>

            {/* Mobile */}
            <div className="space-y-1">
              <input
                {...register('mobile')}
                id="mobile"
                type="tel"
                data-testid="input-mobile"
                placeholder="Mobile"
                className="w-full rounded border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-primary focus:outline-none transition-colors"
              />
              {errors.mobile && (
                <p className="text-xs text-red-500" data-testid="error-mobile">{errors.mobile.message}</p>
              )}
            </div>

            {/* Checkbox */}
            <div className="space-y-1">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  {...register('shareData')}
                  type="checkbox"
                  data-testid="checkbox-share-data"
                  className="mt-0.5 h-4 w-4 rounded border-zinc-600 accent-primary cursor-pointer"
                />
                <span className="text-xs text-zinc-400">
                  Share my registration data with Superapp
                </span>
              </label>
              {errors.shareData && (
                <p className="text-xs text-red-500" data-testid="error-share-data">{errors.shareData.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              data-testid="button-submit"
              className="mt-2 w-full rounded bg-primary py-2.5 text-sm font-bold uppercase tracking-wider text-black transition-all hover:bg-primary/90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-4 space-y-1 text-center">
            <p className="text-xs text-zinc-500">
              By clicking on Sign up, you agree to Superapp{' '}
              <a href="#" className="text-primary hover:underline">Terms and Conditions of Use</a>
            </p>
            <p className="text-xs text-zinc-500">
              To learn more about how Superapp collects, uses, shares and protects your personal data please read Superapp{' '}
              <a href="#" className="text-primary hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
