import { Link, useLocation } from "react-router-dom";
import { GraduationCap, Home, User } from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-mantra-primary">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-mantra-dark-text">Mantraa</span>
        </Link>

        <div className="flex items-center gap-1">
          <Link
            to="/"
            className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/")
                ? "bg-mantra-light-blue text-mantra-primary"
                : "text-mantra-light-text hover:bg-mantra-light-blue hover:text-mantra-primary"
            }`}
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
          <Link
            to="/profile"
            className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/profile")
                ? "bg-mantra-light-blue text-mantra-primary"
                : "text-mantra-light-text hover:bg-mantra-light-blue hover:text-mantra-primary"
            }`}
          >
            <User className="h-4 w-4" />
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}
