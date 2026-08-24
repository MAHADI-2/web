import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import api from "../api/axios";
import { useState, useEffect } from "react";

const CategoryList = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]); 
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      const { data } = await api.get("/getCategory");
      if (data.status === "success") setCategories(data.data);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this category?")) return;
      await api.delete(`/deleteCategory/${id}`);
      load();
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Layout>
      <div>
        <div className="flex justify-between mt-5 px-4 py-2">
          <h1 className="text-2xl font-bold mb-4">CategoryList</h1>
          <button 
            onClick={() => navigate("/admin/categories/new")}
            className="inline-block bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-colors shadow-sm"
          >
            Create Category
          </button>
        </div>

        <div className="px-4 py-2">
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <table className="w-full">
            <thead>
              <tr className="flex justify-between border-b pb-2 bg-gray-300">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>

            <tbody >
              {categories.map((categorie) => (
                <tr key={categorie._id} className="flex justify-between items-center border-b py-2 hover:bg-gray-100">
                  {/* Name এর নিচের অংশ */}
                  <td className="px-4 py-2 ">{categorie.categoryName}</td>

                  {/* Action এর নিচের অংশ */}
                  <td className="px-4 py-2 flex gap-3">
                    <Link 
                      to={`/admin/categories/${categorie._id}/edit`}
                      className="text-teal-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(categorie._id)}
                      className="text-red-500 hover:underline"
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

export default CategoryList;