import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

const BrandList = () => {
  const [brands, setBrands] = useState([]);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      const { data } = await api.get("/getBrand");
      if (data.status === "success") setBrands(data.data);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this brand?")) return;
      await api.delete(`/deleteBrand/${id}`);
      load();
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* হেডার অংশ */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Brand List</h1>
          <Link
            to="/admin/brands/new"
            className="inline-block bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-colors shadow-sm"
          >
            + Add Brand
          </Link>
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        {/* টেবিল অংশ */}
        <div className="px-4 py-2">
          <table className="w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-gray-100">
              <tr className="flex justify-between border-b pb-2 bg-gray-300">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {brands.map((b) => (
                <tr
                  key={b._id}
                  className="flex justify-between items-center border-b px-4 py-3 hover:bg-gray-50"
                >
                  {/* Name-এর ঠিক নিচে */}
                  <td className="text-gray-800">{b.brandName}</td>

                  {/* Action-এর ঠিক নিচে */}
                  <td className="flex gap-4">
                    <Link
                      to={`/admin/brands/${b._id}/edit`}
                      className="text-teal-600 hover:underline font-medium"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(b._id)}
                      className="text-red-500 hover:underline font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default BrandList;