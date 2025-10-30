import { useEffect, useMemo, useState } from 'react';
import Hero from './components/Hero';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import TaskStats from './components/TaskStats';

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem('tasks');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState('all'); // all | active | completed | today | high
  const [query, setQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks((prev) => [
      { id: crypto.randomUUID(), createdAt: Date.now(), completed: false, ...task },
      ...prev,
    ]);
  };

  const toggleTask = (id) => {
    setTasks((prev) => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter(t => t.id !== id));
  };

  const updateTask = (id, updates) => {
    setTasks((prev) => prev.map(t => (t.id === id ? { ...t, ...updates } : t)));
  };

  const filteredTasks = useMemo(() => {
    const todayStr = new Date().toISOString().slice(0, 10);
    return tasks.filter((t) => {
      const matchesQuery = t.title.toLowerCase().includes(query.toLowerCase());
      if (!matchesQuery) return false;
      if (filter === 'active') return !t.completed;
      if (filter === 'completed') return t.completed;
      if (filter === 'today') return t.dueDate === todayStr;
      if (filter === 'high') return t.priority === 'high';
      return true;
    });
  }, [tasks, filter, query]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Hero query={query} onQueryChange={setQuery} />
      <main className="mx-auto max-w-5xl px-4 pb-24 -mt-24 relative z-10">
        <div className="bg-neutral-900/60 backdrop-blur-md border border-neutral-800 rounded-2xl shadow-xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">Your Tasks</h2>
            <div className="flex items-center gap-2 text-sm">
              <button onClick={() => setFilter('all')} className={`px-3 py-1.5 rounded-md border ${filter==='all'?'border-yellow-400 text-yellow-300 bg-yellow-400/10':'border-neutral-700 text-neutral-300 hover:bg-neutral-800'}`}>All</button>
              <button onClick={() => setFilter('active')} className={`px-3 py-1.5 rounded-md border ${filter==='active'?'border-yellow-400 text-yellow-300 bg-yellow-400/10':'border-neutral-700 text-neutral-300 hover:bg-neutral-800'}`}>Active</button>
              <button onClick={() => setFilter('today')} className={`px-3 py-1.5 rounded-md border ${filter==='today'?'border-yellow-400 text-yellow-300 bg-yellow-400/10':'border-neutral-700 text-neutral-300 hover:bg-neutral-800'}`}>Today</button>
              <button onClick={() => setFilter('completed')} className={`px-3 py-1.5 rounded-md border ${filter==='completed'?'border-yellow-400 text-yellow-300 bg-yellow-400/10':'border-neutral-700 text-neutral-300 hover:bg-neutral-800'}`}>Done</button>
              <button onClick={() => setFilter('high')} className={`px-3 py-1.5 rounded-md border ${filter==='high'?'border-yellow-400 text-yellow-300 bg-yellow-400/10':'border-neutral-700 text-neutral-300 hover:bg-neutral-800'}`}>High</button>
            </div>
          </div>

          <TaskInput onAdd={addTask} />

          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onUpdate={updateTask}
          />

          <TaskStats tasks={tasks} />
        </div>
      </main>
      <footer className="text-center text-neutral-400 text-xs py-8">
        Built for a calming, focused workflow.
      </footer>
    </div>
  );
}

export default App;
