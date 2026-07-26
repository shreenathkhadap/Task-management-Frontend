import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-8">Task Manager</h1>

      <nav className="space-y-4">
        <Link to="/dashboard" className="block hover:text-blue-400">
          Dashboard
        </Link>

        {/* <Link to="/tasks" className="block hover:text-blue-400">
          Tasks
        </Link> */}

        <Link to="/profile" className="block hover:text-blue-400">
          Profile
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
