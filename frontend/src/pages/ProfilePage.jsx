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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
