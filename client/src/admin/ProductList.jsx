import { useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import api from "../api/axios";
import { useState, useEffect } from "react";

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const load = async () => {
    await api
      .get("/products")
      .then((res) => {
        if (res.data.status === "success" || Array.isArray(res.data.data)) {
          setProducts(res.data.data || res.data);
        }
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Something went wrong");
      });
  };

  useEffect(() => {
    load();
  }, []);

  const deletProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    await api
      .delete(`/deleteProduct/${id}`)
      .then((res) => {
        if (res.data.status === "success" || res.status === 200) {
          load();
        }
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Something went wrong");
      });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Product List</h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage your store products and inventory
            </p>
          </div>
          <Link
            to="/admin/products/new"
            className="inline-flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white font-medium px-4 py-2.5 rounded-lg text-sm transition-all shadow-sm hover:shadow"
          >
            + Add Product
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-6">Title</th>
                  <th className="py-3.5 px-6">Price</th>
                  <th className="py-3.5 px-6">Stock Status</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-slate-400">
                      No products found.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr
                      key={product._id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-4 px-6 font-medium text-slate-800">
                        {product.title}
                      </td>

                      <td className="py-4 px-6 text-slate-600 font-semibold">
                        ৳{product.price}
                      </td>

                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                            product.stock
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200"
                          }`}
                        >
                          {product.stock ? "In Stock" : "Out of Stock"}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/products/${product._id}/edit`}
                            className="bg-slate-100 hover:bg-teal-50 text-slate-600 hover:text-teal-600 px-3 py-1.5 rounded-md text-xs font-medium border border-slate-200 hover:border-teal-200 transition-all"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => deletProduct(product._id)}
                            className="bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 px-3 py-1.5 rounded-md text-xs font-medium border border-slate-200 hover:border-rose-200 transition-all"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductList;