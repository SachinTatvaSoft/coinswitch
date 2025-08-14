import { TrendingUp, Search, Menu, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState, useCallback, useRef } from "react";
import type { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { API_ROUTE, FE_ROUTE } from "../config/app-routes";
import type { CoinSearchResult } from "../types";
import apiService from "../config/api";
import Loader from "./Loader";

const Header = () => {
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<CoinSearchResult[]>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    dispatch(logout());
    navigate(FE_ROUTE.HOME);
  };

  const fetchSearchResults = async (query: string) => {
    setLoading(true);
    try {
      const response = await apiService.get<{ coins: CoinSearchResult[] }>(
        `${API_ROUTE.SEARCH_COINS}?query=${query}`
      );
      if (response.status === 200) {
        setResults(response.data.coins);
        setIsPopoverOpen(
          response.data.coins.length > 0 || query.trim().length > 0
        );
      }
    } catch {
      setResults([]);
      setIsPopoverOpen(query.trim().length > 0);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchTerm(value);

      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      if (value.trim().length > 1) {
        searchTimeoutRef.current = setTimeout(() => {
          fetchSearchResults(value);
        }, 500);
      } else {
        setResults([]);
        setIsPopoverOpen(false);
      }
    },
    []
  );

  const handleSelectCoin = (coinId: string) => {
    setIsPopoverOpen(false);
    setSearchTerm("");
    navigate(`/coin/${coinId}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4 max-w-[1440px] mx-auto">
        <Link to={FE_ROUTE.HOME} className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-lg">
            <TrendingUp className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            CoinSwitch
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to={FE_ROUTE.DASHBOARD}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive(FE_ROUTE.DASHBOARD) ? "text-primary" : "text-foreground"
            }`}
          >
            Markets
          </Link>
          <Link
            to={FE_ROUTE.WATCHLIST}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive(FE_ROUTE.WATCHLIST) ? "text-primary" : "text-foreground"
            }`}
          >
            Watchlist
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          <div className="hidden sm:block relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search coins..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-md pl-10 bg-muted/50 border border-border/50 focus:border-primary rounded-xl shadow-inner"
              />
            </div>

            {isPopoverOpen && (
              <div className="absolute mt-4 w-md max-w-full max-h-72 p-0 rounded-xl shadow-xl border border-border/50 bg-background/95 backdrop-blur z-50">
                {loading ? (
                  <div className="p-4 flex justify-center items-center">
                    <Loader />
                  </div>
                ) : results.length > 0 ? (
                  <ul className="max-h-72 overflow-y-auto">
                    {results.map((coin) => (
                      <li
                        key={coin.id}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-muted/60 transition-colors cursor-pointer"
                        onClick={() => handleSelectCoin(coin.id)}
                      >
                        <img
                          src={coin.thumb}
                          alt={coin.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold">
                            {coin.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {coin.symbol.toUpperCase()}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : searchTerm.trim().length > 0 ? (
                  <p className="p-4 text-sm text-muted-foreground text-center">
                    No results found
                  </p>
                ) : null}
              </div>
            )}
          </div>

          <Button variant="ghost" size="icon" onClick={handleLogout}>
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
            <div className="flex flex-col space-y-3 relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search coins..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-10 bg-muted/50 border-border/50"
                />
              </div>

              {isPopoverOpen && (
                <div className="absolute top-14 left-0 right-0 p-0 rounded-xl shadow-xl border border-border/50 bg-background/95 backdrop-blur z-50">
                  {loading ? (
                    <div className="p-4 flex justify-center items-center">
                      <Loader />
                    </div>
                  ) : results.length > 0 ? (
                    <ul className="max-h-72 overflow-y-auto">
                      {results.map((coin) => (
                        <li
                          key={coin.id}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-muted/60 transition-colors cursor-pointer"
                          onClick={() => {
                            handleSelectCoin(coin.id);
                            setIsMenuOpen(false);
                          }}
                        >
                          <img
                            src={coin.thumb}
                            alt={coin.name}
                            className="w-6 h-6 rounded-full"
                          />
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold">
                              {coin.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {coin.symbol.toUpperCase()}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : searchTerm.trim().length > 0 ? (
                    <p className="p-4 text-sm text-muted-foreground text-center">
                      No results found
                    </p>
                  ) : null}
                </div>
              )}
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
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
