import { useWishlistStore } from "../store/useWishlistStore";
import ProductCard from "../components/ProductCard";
import { HeartOffIcon, ShoppingBagIcon } from "lucide-react";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  const { wishlist } = useWishlistStore();

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-[70vh]">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-red-500/10 p-3 rounded-2xl">
          <HeartOffIcon className="text-red-500" size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <p className="opacity-70">Items you've saved for later.</p>
        </div>
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-base-200/50 rounded-3xl border-2 border-dashed border-base-300">
          <h3 className="text-xl font-bold mb-2">Your wishlist is empty</h3>
          <p className="text-base-content/60 mb-6">
            See something you like? Tap the heart icon to save it here.
          </p>
          <Link to="/" className="btn btn-primary gap-2">
            <ShoppingBagIcon size={18} /> Browse Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
