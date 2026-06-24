import Header from '@/components/Header';
import UserProfile from '@/components/UserProfile';
import WeatherWidget from '@/components/WeatherWidget';
import NewsWidget from '@/components/NewsWidget';
import NotesWidget from '@/components/NotesWidget';
import TimerWidget from '@/components/TimerWidget';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#111111]" data-testid="page-dashboard">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

          {/* Column 1: Profile + Weather */}
          <div className="flex flex-col gap-5">
            {/* Profile Card */}
            <div className="rounded-2xl bg-gradient-to-br from-[#6B21A8] via-[#7C3AED] to-[#4C1D95] p-5 flex items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white/10 border-2 border-white/20 overflow-hidden">
                <img
                  src="https://api.dicebear.com/7.x/adventurer/svg?seed=superapp&backgroundColor=b6e3f4"
                  alt="Avatar"
                  className="h-full w-full object-cover"
                />
              </div>
              <UserProfile />
            </div>

            {/* Weather Card */}
            <div className="rounded-2xl overflow-hidden">
              <WeatherWidget />
            </div>
          </div>

          {/* Column 2: Notes + Timer */}
          <div className="flex flex-col gap-5">
            {/* Notes Card — yellow */}
            <div className="rounded-2xl bg-[#f5c842] p-5 flex-1">
              <h3 className="text-[#1a1a1a] font-bold text-base mb-3">All notes</h3>
              <NotesWidget />
            </div>

            {/* Timer Card */}
            <div className="rounded-2xl bg-[#1a1a2e] border border-white/5 p-5">
              <TimerWidget />
            </div>
          </div>

          {/* Column 3: News (full height) */}
          <div className="rounded-2xl overflow-hidden bg-[#1e1e2e] border border-white/5 row-span-1 lg:row-span-2">
            <NewsWidget />
          </div>

        </div>
      </main>
    </div>
  );
}
