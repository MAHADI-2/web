import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout.jsx";
import { useEffect } from "react";

const Wishlist = () => {
  const { userInfo } = useAuth();
  const { wishItems, refreshWish, removeFromWish, addToCart } = useCart();

  useEffect(() => {
    if (userInfo) refreshWish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  if (!userInfo) {
    return (
      <Layout>
        <div className="max-w-md mx-auto px-4 py-16 text-center">
          <p className="text-gray-600 text-lg mb-4">Log in to see your wishlist.</p>
          <Link
            to="/login"
            className="inline-block bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-colors shadow-sm"
          >
            Login
          </Link>
        </div>
      </Layout>
    );
  }

  if (wishItems.length === 0) {
    return (
      <Layout>
        <div className="max-w-md mx-auto px-4 py-16 text-center">
          <div className="text-5xl mb-4">❤️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">Explore products and add your favorites here!</p>
          <Link
            to="/"
            className="inline-block bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-colors shadow-sm"
          >
            Shop Now
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
          My Wishlist ({wishItems.length})
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishItems.map((item) => {
            const p = item.productID;
            if (!p) return null;
            const price = p.discount ? p.discountPrice : p.price;

            return (
              <div
                key={item._id}
                className="bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Product Image & Info */}
                <div>
                  <div className="w-full h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img
                      src={p.image || "https://via.placeholder.com/300"}
                      alt={p.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-4">
                    <h2 className="font-semibold text-gray-800 text-base line-clamp-2 mb-2">
                      {p.title}
                    </h2>

                    {/* Price Section */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-lg font-bold text-teal-600">৳{price}</span>
                      {p.discount && (
                        <span className="text-sm text-gray-400 line-through">৳{p.price}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions Buttons */}
                <div className="p-4 pt-0 flex flex-col gap-2">
                  <button
                    onClick={() => addToCart(p._id)}
                    className="w-full py-2 bg-teal-600 text-white text-sm font-medium rounded-md hover:bg-teal-700 transition-colors shadow-xs"
                  >
                   <Link to="/cart"> Add to Cart</Link>
                  </button>

                  <button
                    onClick={() => removeFromWish(p._id)}
                    className="w-full py-2 bg-red-50 text-red-600 text-sm font-medium rounded-md hover:bg-red-100 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Wishlist;