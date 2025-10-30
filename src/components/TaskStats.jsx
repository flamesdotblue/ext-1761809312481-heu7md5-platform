export default function TaskStats({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const active = total - completed;
  const todayStr = new Date().toISOString().slice(0, 10);
  const dueToday = tasks.filter(t => t.dueDate === todayStr && !t.completed).length;
  const highPriority = tasks.filter(t => t.priority === 'high' && !t.completed).length;

  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
      <StatCard label="Active" value={active} accent="from-sky-500/30 to-sky-400/10" />
      <StatCard label="Completed" value={completed} accent="from-emerald-500/30 to-emerald-400/10" />
      <StatCard label="Due Today" value={dueToday} accent="from-yellow-500/30 to-yellow-400/10" />
      <StatCard label="High Priority" value={highPriority} accent="from-rose-500/30 to-rose-400/10" />
    </div>
  );
}

function StatCard({ label, value, accent }) {
  return (
    <div className={`rounded-xl border border-neutral-800 bg-gradient-to-br ${accent} px-4 py-3 text-center`}> 
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="text-xs text-neutral-400">{label}</div>
    </div>
  );
}
