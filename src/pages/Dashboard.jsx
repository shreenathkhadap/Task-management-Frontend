import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";
import TaskTable from "../components/TaskTable";
import AddTaskModal from "../components/AddTaskModal";
import { getTasks, deleteTask } from "../services/taskService";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [showAddTask, setShowAddTask] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  // ---------------- Fetch Tasks ----------------
  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ---------------- Delete Task ----------------
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmDelete) return;

    try {
      await deleteTask(id);
      await fetchTasks();

      alert("Task deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete task.");
    }
  };

  // ---------------- Dashboard Stats ----------------
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed",
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress",
  ).length;

  const pendingTasks = tasks.filter((task) => task.status === "Pending").length;

  // ---------------- Search & Filter ----------------
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-br from-slate-50 to-gray-100">
        <Navbar />

        <div className="max-w-7xl mx-auto px-8 py-6">
          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Task Management Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Manage, assign and track your team's tasks efficiently.
            </p>
          </div>

          {/* Dashboard Cards */}
          <div className="mb-6">
            <DashboardCards
              totalTasks={totalTasks}
              pendingTasks={pendingTasks}
              completedTasks={completedTasks}
              inProgressTasks={inProgressTasks}
            />
          </div>

          {/* Search & Filters */}
          <div className="bg-white rounded-xl shadow-md p-5 mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-3">
              <input
                type="text"
                placeholder="🔍 Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-72 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <button
              onClick={() => {
                setEditingTask(null);
                setShowAddTask(true);
              }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              + Add Task
            </button>
          </div>

          {/* Task Table */}
          <TaskTable
            tasks={filteredTasks}
            onEdit={(task) => {
              setEditingTask(task);
              setShowAddTask(true);
            }}
            onDelete={handleDelete}
          />

          {/* Modal */}
          {showAddTask && (
            <AddTaskModal
              editingTask={editingTask}
              fetchTasks={fetchTasks}
              onClose={() => {
                setShowAddTask(false);
                setEditingTask(null);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
