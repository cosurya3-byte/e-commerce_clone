import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircleIcon, ShoppingBagIcon } from "lucide-react";

const SuccessPage = () => {
  const navigate = useNavigate();
  // Generate a random mock order ID
  const orderId = Math.random().toString(36).toUpperCase().substring(2, 10);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="bg-success/10 p-6 rounded-full mb-6">
        <CheckCircleIcon size={80} className="text-success" />
      </div>

      <h1 className="text-4xl font-bold mb-2">Order Confirmed!</h1>
      <p className="text-xl text-base-content/70 mb-8">
        Thank you for your purchase. Your order{" "}
        <span className="font-mono font-bold text-primary">#{orderId}</span> is
        being processed.
      </p>

      <div className="bg-base-200 p-6 rounded-2xl max-w-md w-full mb-8">
        <p className="text-sm opacity-70 mb-4">
          A confirmation email has been sent to your inbox.
        </p>
        <div className="flex justify-between font-bold border-t border-base-300 pt-4">
          <span>Estimated Delivery:</span>
          <span className="text-success">3-5 Business Days</span>
        </div>
      </div>

      <div className="flex gap-4">
        <Link to="/" className="btn btn-primary gap-2">
          <ShoppingBagIcon size={18} /> Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
