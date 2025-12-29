import { Link, useResolvedPath, useLocation } from "react-router-dom";
import { ShoppingBagIcon, ShoppingCartIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import { useProductStore } from "../store/useProductStore";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import { useCartStore } from "../store/useCartStore";

function Navbar() {
  // At the top of your Navbar function
  const { fetchProducts } = useProductStore();

  const { cart } = useCartStore();
  // Calculate total items (e.g., 2 apples + 1 orange = 3)
  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  /* const handleSearch = (e) => {
    const value = e.target.search;
    setSearchTerm(search);
    // Now this will work because it is defined from the store
    fetchProducts(search);
  }; */

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
              <div className="relative hidden sm:block">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  /* onChange={handleSearch} */
                  className="input input-sm input-bordered w-40 lg:w-64 focus:w-80 transition-all duration-300"
                />
                <span className="absolute right-2 top-1.5 opacity-50">🔍</span>
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
                <div className="p-2 rounded-full hover:bg-base-200 transition-colors">
                  <ShoppingBagIcon className="size-5" />
                  {cartCount > 0 && (
                    <span className="badge badge-sm badge-success absolute -top-2 -right-2">
                      {cartCount}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
