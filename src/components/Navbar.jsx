import { Link, useLocation } from "react-router-dom";
import { Stethoscope } from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Beranda" },
    { to: "/diagnosa", label: "Diagnosa" },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between h-14 items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-sm">
              <Stethoscope className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-base font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
              MediCheck
            </span>
          </Link>
          <div className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}