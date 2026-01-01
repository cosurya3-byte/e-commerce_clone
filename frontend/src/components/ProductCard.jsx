import { HeartIcon } from "lucide-react";
import { useWishlistStore } from "../store/useWishlistStore";
import { EditIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useCartStore } from "../store/useCartStore";
import { ShoppingCartIcon } from "lucide-react";
import toast from "react-hot-toast";
import { StarIcon } from "lucide-react";

function ProductCard({ product }) {
  const { deleteProduct } = useProductStore();

  const { user } = useContext(AuthContext);

  const { addToCart } = useCartStore();

  const { wishlist, toggleWishlist } = useWishlistStore();
  const isWishlisted = wishlist.some((item) => item.id === product.id);
  const mockRating = (Math.random() * (5 - 3.8) + 3.8).toFixed(1);
  const mockReviews = Math.floor(Math.random() * 100) + 10;

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  console.log(
    "Logged-in User ID:",
    user?.userId,
    "Product Owner ID:",
    product.user_id
  );
  const isOwner =
    user &&
    (String(user.userId) === String(product.user_id) ||
      String(user.id) === String(product.user_id));

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      {/* PRODUCT IMAGE */}
      <figure className="relative pt-[56.25%]">
        <img
          src={product.image}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-40 object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className="badge badge-primary font-semibold shadow-md">
            {product.category || "General"}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`absolute top-2 left-2 p-2 rounded-full transition-all ${
            isWishlisted
              ? "bg-red-500 text-white"
              : "bg-base-100/80 text-base-content hover:scale-110"
          }`}
        >
          <HeartIcon size={18} fill={isWishlisted ? "currentColor" : "none"} />
        </button>
      </figure>

      {/* ⭐ NEW: Star Rating Display */}
      <div className="flex items-center flex-wrap gap-1 mb-2">
        <div className="flex text-warning">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              size={14}
              fill={i < Math.floor(mockRating) ? "currentColor" : "none"}
            />
          ))}
        </div>
        <span className="text-[10px] lg:text-xs opacity-70">
          ({mockRating})
        </span>
        <span className="text-xs opacity-50 ml-1">{mockReviews} reviews</span>
      </div>

      <div className="card-body">
        {/* PRODUCT INFO */}
        <h2 className="card-title text-lg font-semibold">{product.name}</h2>
        <p className="text-2xl font-bold text-primary">
          ${Number(product.price).toFixed(2)}
        </p>

        {/* CARD ACTIONS */}

        {isOwner && (
          <div className="card-actions justify-end mt-4">
            <Link
              to={`/product/${product.id}`}
              className="btn btn-sm btn-info btn-outline"
            >
              <EditIcon className="size-4" />
            </Link>
            <button
              onClick={() => deleteProduct(product.id)}
              className="btn btn-sm btn-error btn-outline"
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        )}

        <button
          className="btn btn-sm btn-primary flex items-center gap-2"
          onClick={handleAddToCart}
        >
          <ShoppingCartIcon className="size-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
export default ProductCard;
