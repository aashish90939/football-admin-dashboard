import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", to: "/" },

  { name: "Team", to: "/team" },
  { name: "Achievements", to: "/achievements" },
  { name: "Gallery", to: "/gallery" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 shadow-lg ${
        isScrolled
          ? "backdrop-blur-md bg-blue-800/10"
          : "bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800"
      } text-white`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo + Name */}
        <Link to="/" className="flex items-center space-x-4">
          <img
            src="/src/assets/clublogo.png"
            alt="Club Logo"
            className="h-14 w-14 rounded-full border-4 border-yellow-400 shadow-lg"
          />
          <span className="text-3xl font-extrabold tracking-wide text-yellow-300">
            Nepalese Stars NRW{" "}
            <span className="text-yellow-300 text-lg">e.v</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-10 text-lg font-medium">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className={`relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-yellow-300 after:transition-all after:duration-300 hover:after:w-full ${
                location.pathname === item.to
                  ? "text-yellow-300 after:w-full"
                  : "text-white hover:text-yellow-300"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Login Button */}
        <Link
          to="/login"
          className="hidden md:inline-block bg-yellow-400 text-blue-900 px-6 py-2 rounded-full font-semibold shadow hover:bg-yellow-300 transition"
        >
          Player Login
        </Link>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-yellow-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 space-y-4 text-lg font-medium">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className={`block ${
                location.pathname === item.to
                  ? "text-yellow-300"
                  : "text-white hover:text-yellow-300"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="block bg-yellow-400 text-blue-900 px-4 py-2 rounded-full text-center font-semibold hover:bg-yellow-300 transition"
          >
            Player Login
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
