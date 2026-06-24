import { useState, useEffect, useRef, useCallback } from 'react';
import { useStore } from '@/store/useStore';
import { Trash2, Check } from 'lucide-react';

export default function NotesWidget() {
  const notes = useStore((s) => s.notes);
  const setNotes = useStore((s) => s.setNotes);
  const [localNotes, setLocalNotes] = useState(notes);
  const [saved, setSaved] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = useCallback((value: string) => {
    setLocalNotes(value);
    setSaved(false);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setNotes(value);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 500);
  }, [setNotes]);

  const handleClear = useCallback(() => {
    setLocalNotes('');
    setNotes('');
    setSaved(false);
  }, [setNotes]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);

  return (
    <div className="flex flex-col gap-3 animate-fadeIn" data-testid="notes-widget">
      <div className="flex items-center justify-between">
        {saved && (
          <span className="flex items-center gap-1 text-xs text-green-700 font-medium animate-fadeIn" data-testid="status-saved">
            <Check className="h-3 w-3" /> Saved
          </span>
        )}
        {!saved && <span />}
        <button
          onClick={handleClear}
          data-testid="button-clear-notes"
          className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors"
        >
          <Trash2 className="h-3 w-3" />
          Clear
        </button>
      </div>

      <textarea
        value={localNotes}
        onChange={(e) => handleChange(e.target.value)}
        data-testid="textarea-notes"
        placeholder="Start typing your notes... They're saved automatically."
        className="resize-none rounded-xl border border-[#1a1a1a]/20 bg-transparent p-3 text-sm text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a]/40 overflow-y-auto transition-colors"
        rows={6}
      />
    </div>
  );
}
