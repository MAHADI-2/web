import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

const Cart = () => {
  const { userInfo } = useAuth();
  const { cartItems, refreshCart, updateCartQty, removeFromCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) refreshCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  const total = cartItems.reduce((acc, item) => {
    const p = item.productID;
    if (!p) return acc;
    const price = p.discount ? p.discountPrice : p.price;
    return acc + price * item.qty;
  }, 0);

  if (!userInfo) {
    return (
      <Layout>
        <div className="max-w-md mx-auto px-4 py-16 text-center">
          <p className="text-gray-500 mb-4">Log in to see your cart.</p>
          <Link to="/login" className="text-teal-600 underline">Login</Link>
        </div>
      </Layout>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <p className="text-gray-500 mb-4">Your cart is empty.</p>
          <Link to="/" className="text-teal-600 underline">Continue shopping</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

        <div className="space-y-4">
          {cartItems.map((item) => {
            const p = item.productID;
            if (!p) return null;
            const price = p.discount ? p.discountPrice : p.price;
            return (
              <div key={item._id} className="flex items-center gap-4 bg-white p-3 rounded-lg shadow">
                <img
                  src={p.image || "https://via.placeholder.com/80"}
                  alt={p.title}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <p className="font-medium text-sm">{p.title}</p>
                  <p className="text-teal-600 font-semibold text-sm">৳{price}</p>
                </div>
                <select
                  value={item.qty}
                  onChange={(e) => updateCartQty(item._id, Number(e.target.value))}
                  className="border rounded-md px-2 py-1 text-sm"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((x) => <option key={x} value={x}>{x}</option>)}
                </select>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-white p-4 rounded-lg shadow flex items-center justify-between">
          <span className="font-semibold">Total: ৳{total.toFixed(2)}</span>
          <button
            onClick={() => navigate("/checkout")}
            className="bg-teal-600 text-white px-6 py-2 rounded-md text-sm hover:bg-teal-700"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
