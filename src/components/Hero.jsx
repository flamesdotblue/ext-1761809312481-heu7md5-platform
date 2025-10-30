import Spline from '@splinetool/react-spline';
import { Search } from 'lucide-react';

export default function Hero({ query, onQueryChange }) {
  return (
    <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/qMOKV671Z1CM9yS7/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-neutral-950 pointer-events-none" />

      <div className="relative z-10 h-full flex items-end">
        <div className="mx-auto w-full max-w-5xl px-4 pb-10">
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white drop-shadow-md">Focus on what matters</h1>
          <p className="mt-2 text-neutral-200 max-w-2xl">Plan your day, prioritize tasks, and keep momentum. Minimal friction, maximum clarity.</p>

          <div className="mt-6 max-w-xl">
            <div className="flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900/70 backdrop-blur px-3 py-2">
              <Search className="h-5 w-5 text-neutral-400" />
              <input
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                className="w-full bg-transparent outline-none text-neutral-100 placeholder:text-neutral-500"
                placeholder="Search your tasks..."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
