import { useState } from 'react';
import { useTimer } from '@/hooks/useTimer';
import { pad } from '@/utils/helpers';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';

export default function TimerWidget() {
  const { hours, minutes, seconds, isRunning, start, pause, resume, reset } = useTimer();
  const [inputH, setInputH] = useState(0);
  const [inputM, setInputM] = useState(5);
  const [inputS, setInputS] = useState(0);
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);
    start(inputH, inputM, inputS);
  };

  const handleReset = () => {
    setStarted(false);
    reset();
  };

  return (
    <div className="flex flex-col items-center gap-5 animate-fadeIn" data-testid="timer-widget">
      <div
        className="flex items-center justify-center gap-1 font-mono text-5xl font-bold tracking-tight"
        data-testid="text-timer-display"
      >
        <span className={isRunning ? 'text-primary' : 'text-foreground'}>{pad(hours)}</span>
        <span className="text-muted-foreground">:</span>
        <span className={isRunning ? 'text-primary' : 'text-foreground'}>{pad(minutes)}</span>
        <span className="text-muted-foreground">:</span>
        <span className={isRunning ? 'text-primary animate-pulse' : 'text-foreground'}>{pad(seconds)}</span>
      </div>

      {!started && (
        <div className="grid grid-cols-3 gap-2 w-full">
          {[
            { label: 'H', value: inputH, setter: setInputH, testid: 'input-timer-hours' },
            { label: 'M', value: inputM, setter: setInputM, testid: 'input-timer-minutes' },
            { label: 'S', value: inputS, setter: setInputS, testid: 'input-timer-seconds' },
          ].map(({ label, value, setter, testid }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <label className="text-xs text-muted-foreground">{label}</label>
              <input
                type="number"
                value={value}
                min={0}
                max={label === 'H' ? 23 : 59}
                onChange={(e) => setter(Math.max(0, Math.min(Number(e.target.value), label === 'H' ? 23 : 59)))}
                data-testid={testid}
                className="w-full rounded-lg border border-border bg-muted/50 px-2 py-2 text-center text-sm font-mono font-bold text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
              />
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        {!started && (
          <button
            onClick={handleStart}
            data-testid="button-timer-start"
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 active:scale-95"
          >
            <Play className="h-4 w-4" />
            Start
          </button>
        )}

        {started && isRunning && (
          <button
            onClick={pause}
            data-testid="button-timer-pause"
            className="flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-amber-500/90 active:scale-95"
          >
            <Pause className="h-4 w-4" />
            Pause
          </button>
        )}

        {started && !isRunning && (hours > 0 || minutes > 0 || seconds > 0) && (
          <button
            onClick={resume}
            data-testid="button-timer-resume"
            className="flex items-center gap-2 rounded-xl bg-green-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-green-500/90 active:scale-95"
          >
            <SkipForward className="h-4 w-4" />
            Resume
          </button>
        )}

        {started && (
          <button
            onClick={handleReset}
            data-testid="button-timer-reset"
            className="flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-muted active:scale-95"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        )}
      </div>

      {isRunning && (
        <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary animate-pulse" style={{ width: '100%' }} />
        </div>
      )}
    </div>
  );
}
