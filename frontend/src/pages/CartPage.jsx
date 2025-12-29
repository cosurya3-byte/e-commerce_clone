import { useState } from "react";
import { useCartStore } from "../store/useCartStore";
import { Trash2Icon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate(); // 3. Initialize navigate inside the component

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const handleMockPayment = async () => {
    if (cart.length === 0) return;
    setIsProcessing(true);

    // Use toast for feedback
    const loadingToast = toast.loading("Processing mock payment...");

    await new Promise((resolve) => setTimeout(resolve, 2000));

    clearCart();
    toast.success("Payment Successful!", { id: loadingToast });
    setIsProcessing(false);
    navigate("/"); // Redirect home
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="text-2xl font-bold text-white">Your cart is empty</h2>
        <Link to="/" className="btn btn-primary">
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-white">Shopping Cart</h1>
      {/* ... mapping items code ... */}
      <div className="grid gap-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center bg-base-100 p-4 rounded-lg shadow-md gap-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-primary font-bold">${item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => removeFromCart(item.id)}
                className="btn btn-ghost btn-sm text-error"
              >
                <Trash2Icon size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 p-6 bg-base-200 rounded-lg flex justify-between items-center">
        <span className="text-2xl font-bold">
          Total: ${totalPrice.toFixed(2)}
        </span>
        <button
          className={`btn btn-primary btn-lg ${isProcessing ? "loading" : ""}`}
          onClick={handleMockPayment}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Checkout"}
        </button>
      </div>
    </div>
  );
};

export default CartPage;
