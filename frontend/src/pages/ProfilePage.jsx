import { PackageOpenIcon, PlusIcon } from "lucide-react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext"; //
import { useProductStore } from "../store/useProductStore";
import ProductCard from "../components/ProductCard"; //

const ProfilePage = () => {
  const { user } = useContext(AuthContext); //
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts(); // We'll filter these in the UI for now
  }, [fetchProducts]);

  // Filter products to show only those belonging to the logged-in user
  const myProducts = products.filter(
    (p) => String(p.user_id) === String(user?.userId)
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button onClick={() => navigate("/")} className="btn btn-ghost mb-8">
        <ArrowLeftIcon className="size-4 mr-2" />
        Back to Products
      </button>
      <div className="bg-base-200 p-8 rounded-2xl mb-8 flex items-center gap-6">
        <div className="avatar placeholder">
          <div className="bg-primary text-primary-content rounded-full w-24">
            <span className="text-3xl">{user?.name?.charAt(0)}</span>
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold">Hi, {user?.name}!</h1>
          <p className="opacity-70 text-lg">
            Manage your listed products below.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-6">
        My Inventory ({myProducts.length})
      </h2>

      <button
        onClick={() => document.getElementById("add_product_modal").showModal()}
        className="btn btn-primary btn-sm gap-2"
      >
        <PlusIcon size={18} /> Add New
      </button>

      {myProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* 1. Improved Empty State Graphic */
        <div className="text-center py-20 bg-base-200/50 rounded-3xl border-2 border-dashed border-base-300">
          <div className="flex justify-center mb-4 text-base-content/20">
            <PackageOpenIcon size={80} />
          </div>
          <h3 className="text-xl font-bold mb-2">No products found</h3>
          <p className="text-base-content/60 mb-6">
            You haven't listed any products yet. Start selling today!
          </p>
          <button
            onClick={() =>
              document.getElementById("add_product_modal").showModal()
            }
            className="btn btn-primary"
          >
            List Your First Product
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
