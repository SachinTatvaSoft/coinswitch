import { TrendingUp, Search, Menu, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import type { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 max-w-[1440px] mx-auto">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
            <TrendingUp className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            CoinSwitch
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/dashboard") ? "text-primary" : "text-foreground"
            }`}
          >
            Markets
          </Link>
          <Link
            to="/watchlist"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/watchlist") ? "text-primary" : "text-foreground"
            }`}
          >
            Watchlist
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          <div className="hidden sm:block relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search coins..."
              className="w-64 pl-10 bg-muted/50 border-border/50 focus:border-primary"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="flex"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
          <div className="container px-4 py-4">
            <div className="flex flex-col space-y-3">
              <Input
                type="search"
                placeholder="Search coins..."
                className="w-full bg-muted/50 border-border/50"
              />
              <nav className="flex flex-col space-y-2">
                <Link
                  to="/"
                  className={`text-sm font-medium py-2 transition-colors hover:text-primary ${
                    isActive("/") ? "text-primary" : "text-foreground"
                  }`}
                >
                  Markets
                </Link>
                <Link
                  to="/watchlist"
                  className={`text-sm font-medium py-2 transition-colors hover:text-primary ${
                    isActive("/watchlist") ? "text-primary" : "text-foreground"
                  }`}
                >
                  Watchlist
                </Link>
                <a
                  href="/portfolio"
                  className="text-sm font-medium py-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  Portfolio
                </a>
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
