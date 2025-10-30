import { useMemo, useState } from 'react';
import { Calendar, Flag, Plus } from 'lucide-react';

export default function TaskInput({ onAdd }) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('normal');

  const isValid = useMemo(() => title.trim().length > 0, [title]);

  const submit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    onAdd({ title: title.trim(), dueDate: dueDate || null, priority });
    setTitle('');
    setDueDate('');
    setPriority('normal');
  };

  return (
    <form onSubmit={submit} className="rounded-xl border border-neutral-800 bg-neutral-900/60 backdrop-blur p-3 sm:p-4 mb-4">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Quick add a task..."
          className="flex-1 bg-neutral-950/40 border border-neutral-800 rounded-lg px-3 py-2 text-neutral-100 placeholder:text-neutral-500 outline-none focus:ring-2 focus:ring-yellow-400/40"
        />
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-neutral-400">
              <Calendar className="h-4 w-4" />
            </div>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="appearance-none bg-neutral-950/40 border border-neutral-800 rounded-lg pl-8 pr-3 py-2 text-neutral-100 outline-none focus:ring-2 focus:ring-yellow-400/40"
            />
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-neutral-400">
              <Flag className="h-4 w-4" />
            </div>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="bg-neutral-950/40 border border-neutral-800 rounded-lg pl-8 pr-8 py-2 text-neutral-100 outline-none focus:ring-2 focus:ring-yellow-400/40"
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={!isValid}
            className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 text-black font-medium px-3 py-2 hover:bg-yellow-300 disabled:opacity-50"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
      </div>
    </form>
  );
}
