import { Link, useResolvedPath, useLocation } from "react-router-dom";
import {
  ShoppingBagIcon,
  ShoppingCartIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import { useProductStore } from "../store/useProductStore";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import { useCartStore } from "../store/useCartStore";

function Navbar() {
  // At the top of your Navbar function
  const { fetchProducts } = useProductStore();
  const { searchQuery, setSearchQuery } = useProductStore();

  const { cart } = useCartStore();
  // Calculate total items (e.g., 2 apples + 1 orange = 3)
  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const { pathname } = useResolvedPath();
  const isHomePage = pathname === "/";
  const { products } = useProductStore();
  const { user, logout } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation(); // Get the current path

  // Check if the current path is /login or /signup
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="bg-base-100/80 backdrop-blur-lg border-b border-base-content/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="navbar px-4 min-h-[4rem] justify-between">
          {/* LOGO */}
          <div className="flex-1 lg:flex-none">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <div className="flex items-center gap-2">
                <ShoppingCartIcon className="size-9 text-primary" />
                <span
                  className="font-semibold font-mono tracking-widest text-2xl 
                    bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
                >
                  POSGRESTORE
                </span>
              </div>
            </Link>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-4">
            {/* SEARCH BAR SECTION */}
            {isHomePage && (
              <div className="flex-1 max-w-md mx-4 hidden sm:block">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="input input-bordered w-full pl-10 pr-10 bg-base-200 focus:bg-base-100 transition-all"
                    // 2. Bind the value to the store state
                    value={searchQuery}
                    // 3. Update the store on every keystroke
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />

                  {/* 1. Only show the 'X' button if there is text in the search bar */}
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-base-300 rounded-full transition-colors"
                      aria-label="Clear search"
                    >
                      <XIcon className="size-4 text-base-content/70" />
                    </button>
                  )}

                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-base-content/50" />
                </div>
              </div>
            )}
            <ThemeSelector />

            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium hidden md:block">
                  Hi, {user.name}
                </span>
                <button
                  onClick={logout}
                  className="btn btn-ghost btn-sm text-error hover:bg-error/10"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn btn-ghost btn-sm">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary btn-sm">
                  Sign Up
                </Link>
              </div>
            )}

            {isHomePage && (
              <div className="indicator">
                <Link to="/cart" className="btn btn-ghost btn-circle">
                  <div className="p-2 rounded-full hover:bg-base-200 transition-colors">
                    <ShoppingBagIcon className="size-5" />
                    {cartCount > 0 && (
                      <span className="badge badge-sm badge-success absolute -top-2 -right-2">
                        {cartCount}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
