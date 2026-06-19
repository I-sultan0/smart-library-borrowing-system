import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Smart Library</h1>

        <div className="flex gap-6 items-center">
          <Link to="/books" className="hover:text-blue-400 cursor-pointer">
            Books
          </Link>
          <Link to="/profile" className="hover:text-blue-400 cursor-pointer">
            Profile
          </Link>
          <Link to="/dashboard" className="hover:text-blue-400 cursor-pointer">
            Dashboard
          </Link>

          <button
            onClick={logout}
            className="
          bg-red-600
          hover:bg-red-700
          px-4
          py-2
          rounded-lg
          cursor-pointer
        "
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
