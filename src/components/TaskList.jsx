import { Calendar, CheckCircle2, Circle, Flag, Trash2 } from 'lucide-react';

function formatDate(iso) {
  if (!iso) return 'No due date';
  try {
    const d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  } catch {
    return iso;
  }
}

function PriorityBadge({ value }) {
  const styles = {
    low: 'bg-emerald-500/15 text-emerald-300 border-emerald-600/40',
    normal: 'bg-sky-500/15 text-sky-300 border-sky-600/40',
    high: 'bg-rose-500/15 text-rose-300 border-rose-600/40',
  };
  const label = value?.charAt(0).toUpperCase() + value?.slice(1);
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded border ${styles[value] || ''}`}>
      <Flag className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}

export default function TaskList({ tasks, onToggle, onDelete, onUpdate }) {
  if (!tasks.length) {
    return (
      <div className="text-center py-12 text-neutral-400 border border-dashed border-neutral-800 rounded-xl">
        No tasks match your filters.
      </div>
    );
  }

  return (
    <ul className="divide-y divide-neutral-800 rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950/40">
      {tasks.map((t) => (
        <li key={t.id} className="group grid grid-cols-[auto_1fr_auto] items-center gap-3 px-3 sm:px-4 py-3 hover:bg-neutral-900/40">
          <button
            onClick={() => onToggle(t.id)}
            aria-label={t.completed ? 'Mark as active' : 'Mark as completed'}
            className="text-neutral-400 hover:text-yellow-300 p-1 rounded-full"
          >
            {t.completed ? <CheckCircle2 className="h-5 w-5 text-yellow-400" /> : <Circle className="h-5 w-5" />}
          </button>

          <div className="min-w-0">
            <div className={`flex items-center gap-2 ${t.completed ? 'line-through text-neutral-500' : 'text-neutral-100'}`}>
              <p className="truncate font-medium">{t.title}</p>
              <PriorityBadge value={t.priority} />
            </div>
            <div className="mt-1 flex items-center gap-3 text-xs text-neutral-400">
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> {formatDate(t.dueDate)}
              </span>
              <span className="opacity-70">Created {new Date(t.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={t.priority}
              onChange={(e) => onUpdate(t.id, { priority: e.target.value })}
              className="bg-neutral-950/40 border border-neutral-800 rounded-md text-xs px-2 py-1 text-neutral-200"
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
            <input
              type="date"
              value={t.dueDate || ''}
              onChange={(e) => onUpdate(t.id, { dueDate: e.target.value })}
              className="bg-neutral-950/40 border border-neutral-800 rounded-md text-xs px-2 py-1 text-neutral-200"
            />
            <button
              onClick={() => onDelete(t.id)}
              className="opacity-70 hover:opacity-100 text-rose-300 hover:text-rose-200 p-2"
              aria-label="Delete task"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
