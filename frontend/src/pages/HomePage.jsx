import { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import { PackageIcon, PlusCircleIcon, RefreshCwIcon } from "lucide-react";
import ProductCard from "../components/ProductCard";
import AddProductModal from "../components/AddProductModal";

function HomePage() {
  const { products, loading, error, fetchProducts } = useProductStore();

  const { getFilteredProducts } = useProductStore();

  // 1. Use the filtering function instead of the raw products array
  const filteredProducts = getFilteredProducts();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 ">
      <div className="flex justify-between items-center mb-8">
        <button
          className="btn btn-primary"
          onClick={() =>
            document.getElementById("add_product_modal").showModal()
          }
        >
          <PlusCircleIcon className="size-5 mr-2" />
          Add Product
        </button>

        <button className="btn btn-ghost btn-circle" onClick={fetchProducts}>
          <RefreshCwIcon className="size-5" />
        </button>
      </div>

      <AddProductModal />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 3. Map over 'filteredProducts' instead of the raw 'products' array */}
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* 4. Handle the "No Results" state visually */}
      {filteredProducts.length === 0 && !loading && (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-base-content/50">
            No products match your search.
          </h2>
        </div>
      )}

      {error && <div className="alert alert-error mb-8">{error}</div>}

      {products?.length === 0 && !loading && (
        <div className="flex flex-col justify-center items-center h-96 space-y-4">
          <div className="bg-base-100 rounded-full p-6">
            <PackageIcon className="size-12" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold ">No products found</h3>
            <p className="text-gray-500 max-w-sm">
              Get started by adding your first product to the inventory
            </p>
          </div>
        </div>
      )}

      {/* {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(products) && products.length > 0
            ? products.map((product) => (
                <ProductCard
                  key={product.id || product._id}
                  product={product}
                />
              ))
            : !loading && (
                <div className="col-span-full text-center py-10">
                  No products found.
                </div>
              )}
        </div>
      )} */}
    </main>
  );
}
export default HomePage;
