import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="bg-white shadow px-8 py-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Task Management</h1>
        <p className="text-sm text-gray-500">
          Welcome, <span className="font-semibold">{user?.name || "User"}</span>
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
