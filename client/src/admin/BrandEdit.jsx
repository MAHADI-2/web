import { useState, useEffect } from "react";
import api from "../api/axios";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";

const BrandEdit = () => {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const navigate = useNavigate();

  const [Form, setForm] = useState({ brandName: "", brandImage: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isNew) {
      api.get("/getBrand").then(({ data }) => {
        const list = data.data || data;
        const found = list.find((b) => b._id === id);
        if (found)
          setForm({
            brandName: found.brandName,
            brandImage: found.brandImage || "",
          });
      });
    }
  }, [id, isNew]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (isNew) {
        await api.post("/createBrand", Form);
      } else {
        await api.put(`/updateBrand/${id}`, Form);
      }
      navigate("/admin/brands");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-16 px-4">
        <div>
          <h1 className="text-2xl font-bold mb-4 text-green-500 text-shadow-2xs mt-4">
            {isNew ? "Add Brand" : "Edit Brand"}
          </h1>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div>
            <form
              onSubmit={handleSubmit}
              className="bg-gray-100 p-6 rounded-lg shadow space-y-6"
            >
              <div>
                <label className="text-gray-600 text-md font-bold block mb-2">
                  Brand Name
                </label>
                <input
                  type="text"
                  name="brandName"
                  value={Form.brandName}
                  onChange={(e) =>
                    setForm({ ...Form, brandName: e.target.value })
                  }
                  className="bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 px-3 py-2"
                />
              </div>

              <div>
                <label className="text-gray-600 text-md font-bold block mb-2">
                  Brand Image URL
                </label>
                <input
                  type="text"
                  name="brandImage"
                  value={Form.brandImage}
                  onChange={(e) =>
                    setForm({ ...Form, brandImage: e.target.value })
                  }
                  className="bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 px-3 py-2"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isNew ? "Create" : "Update"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BrandEdit;