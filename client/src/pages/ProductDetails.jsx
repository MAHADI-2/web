import { useCart } from "../context/CartContext";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout.jsx";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import React from 'react';

const ProductDetails = () => {
  const { id } = useParams();
  const { userInfo } = useAuth();
  const { addToCart, addToWish } = useCart();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);
  const [msg, setMsg] = useState("");
  const [msgCart, setMsgCart] = useState("");
  const [reviewList, setReviewList] = useState([]);
  const [reviewdes, setReviewdes] = useState("");
  const [reviewReting, setReviewReting] = useState(5);

  const loadProduct = async () => {
    try {
     const { data } = await api.get("/api/v1/products");
      const list = data.data || data;
      const found = (Array.isArray(list) ? list : []).find((item) => item._id === id);
      setProduct(found || null);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  const loadreview = async () => {
    try {
      const { data } = await api.get(`/getReviewsByProduct/${id}`);
      setReviewList(data.data || data);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  const cartHandeler = async () => {
    if (!userInfo) return navigate("/login");
    await addToCart(product._id, qty);
    setMsgCart("Added to cart");
    navigate("/cart");
  };

  const wishHandeler = async () => {
    if (!userInfo) return navigate("/login");
    await addToWish(product._id);
    setMsg("Added to wishlist");
    navigate("/wishlist");
  };

  const reviewHandeler = async (e) => {
    e.preventDefault();
    if (!userInfo) return navigate("/login");
    await api.post("/addReview", { productID: id, rating: reviewReting, des: reviewdes });
    loadreview();
    setReviewdes("");
  };

  useEffect(() => {
    loadProduct();
    loadreview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!product) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 text-lg font-medium">Loading product details...</p>
        </div>
      </Layout>
    );
  }

  const price = product.discount ? product.discountPrice : product.price;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Main Product Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          
          {/* Left Column: Image */}
          <div className="w-full h-96 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center border border-gray-100">
            <img
              src={product.image || "https://via.placeholder.com/500"}
              alt={product.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Right Column: Product Info */}
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>

            {/* Price Section */}
            <div className="flex items-center gap-3">
              <span className="text-2xl font-extrabold text-teal-600">৳{price}</span>
              {product.discount && (
                <span className="text-lg text-gray-400 line-through">৳{product.price}</span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">{product.shortDes}</p>

            {/* Stock Status */}
            <div>
              {product.stock ? (
                <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                  In Stock
                </span>
              ) : (
                <span className="inline-block bg-red-100 text-red-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                  Out of Stock
                </span>
              )}
            </div>

            {msg && <p className="text-sm text-green-600 font-medium">{msg}</p>}

            {/* Actions: Quantity & Buttons */}
            {product.stock && (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Qty:</label>
                  <select
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="h-10 border border-gray-300 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((x) => (
                      <option key={x} value={x}>
                        {x}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3 flex-1">
                  <button
                    type="button"
                    onClick={cartHandeler}
                    className="flex-1 h-10 bg-teal-600 text-white font-medium text-sm rounded-lg hover:bg-teal-700 transition-colors shadow-xs"
                  >
                    Add to Cart
                  </button>

                  <button
                    type="button"
                    onClick={wishHandeler}
                    className="flex-1 h-10 bg-gray-100 text-gray-700 font-medium text-sm rounded-lg hover:bg-gray-200 transition-colors border border-gray-200"
                  >
                    Add to Wishlist
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Review Section */}
        <div className="mt-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Customer Reviews ({reviewList.length})
          </h2>

          {/* Existing Reviews */}
          <div className="space-y-4 mb-8">
            {reviewList.length === 0 ? (
              <p className="text-gray-500 text-sm italic">No reviews yet. Be the first to review!</p>
            ) : (
              reviewList.map((r) => (
                <div key={r._id} className="border-b border-gray-100 pb-4 last:border-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-sm text-gray-800">{r.userID?.name || "User"}</p>
                    <div className="text-yellow-400 text-xs">
                      {"★".repeat(Number(r.rating) || 0)}
                      {"☆".repeat(5 - (Number(r.rating) || 0))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{r.des}</p>
                </div>
              ))
            )}
          </div>

          {/* Add Review Form */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-md font-semibold text-gray-800 mb-3">Write a Review</h3>
            {userInfo ? (
              <form onSubmit={reviewHandeler} className="flex flex-col gap-3 max-w-xl">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600 font-medium">Rating:</label>
                  <select
                    value={reviewReting}
                    onChange={(e) => setReviewReting(Number(e.target.value))}
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n} Star{n > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <textarea
                  required
                  rows="3"
                  placeholder="Share your feedback about this product..."
                  value={reviewdes}
                  onChange={(e) => setReviewdes(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                ></textarea>

                <div>
                  <button
                    type="submit"
                    className="bg-teal-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors shadow-xs"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            ) : (
              <p className="text-sm text-gray-500">
                Please login to leave a review for this product.
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;