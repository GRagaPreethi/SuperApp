import { useState, useRef, useCallback } from 'react';

export function useTimer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const totalSecondsRef = useRef(0);

  const playBeep = useCallback(() => {
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.frequency.value = 880;
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.8);
    } catch {
      // ignore
    }
  }, []);

  const tick = useCallback(() => {
    if (totalSecondsRef.current <= 0) {
      setIsRunning(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
      playBeep();
      alert('Timer finished!');
      return;
    }
    totalSecondsRef.current -= 1;
    const s = totalSecondsRef.current;
    setHours(Math.floor(s / 3600));
    setMinutes(Math.floor((s % 3600) / 60));
    setSeconds(s % 60);
  }, [playBeep]);

  const start = useCallback((h: number, m: number, s: number) => {
    const total = h * 3600 + m * 60 + s;
    if (total <= 0) return;
    totalSecondsRef.current = total;
    setHours(h);
    setMinutes(m);
    setSeconds(s);
    setIsRunning(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(tick, 1000);
  }, [tick]);

  const pause = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const resume = useCallback(() => {
    if (totalSecondsRef.current <= 0) return;
    setIsRunning(true);
    intervalRef.current = setInterval(tick, 1000);
  }, [tick]);

  const reset = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    totalSecondsRef.current = 0;
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  }, []);

  return { hours, minutes, seconds, isRunning, start, pause, resume, reset };
}
