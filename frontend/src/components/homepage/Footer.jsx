import { Facebook, Instagram, Youtube } from "lucide-react"; // Or use react-icons instead

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-800 via-blue-900 to-blue-800 text-yellow-200 rounded-t-xl shadow-inner pt-8 pb-6 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-yellow-300">
            © 2025{" "}
            <a href="#" className="hover:underline">
              NS-NRW
            </a>
          </h2>
          <p className="text-sm mt-1">
            All rights reserved. Designed by Aashish.
          </p>
        </div>
        {/* Links */}
        <ul className="flex justify-center flex-wrap gap-4 text-sm font-medium">
          <li>
            <a href="/about" className="hover:text-yellow-400 transition">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-yellow-400 transition">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-yellow-400 transition">
              Licensing
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:text-yellow-400 transition">
              Contact
            </a>
          </li>
        </ul>
        {/* Social Icons */}
        <div className="flex justify-center md:justify-end space-x-6 text-sm">
          <a
            href="https://www.facebook.com/NepaleseStarsNRW"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-yellow-400"
          >
            <Facebook size={18} /> Facebook
          </a>
          <a
            href="https://www.instagram.com/nepalese_stars_nrw/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-yellow-400"
          >
            <Instagram size={18} /> Instagram
          </a>
          <a
            href="https://www.youtube.com/@Nepalese_Star-NRW"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-yellow-400"
          >
            <Youtube size={18} /> YouTube
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
