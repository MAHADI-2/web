import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout.jsx";
import api from "../api/axios.js";

const ProductEdit = () => {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const navigate = useNavigate();

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  // কাস্টম টেক্সট ইনপুট অন/অফ করার জন্য স্টেট
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [isCustomBrand, setIsCustomBrand] = useState(false);

  const [form, setForm] = useState({
    title: "",
    shortDes: "",
    price: "",
    discount: false,
    discountPrice: "",
    image: "",
    stock: true,
    remark: "",
    categoryID: "",
    customCategoryName: "",
    brandID: "",
    customBrandName: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    // ক্যাটাগরি ও ব্র্যান্ড আনা
    api.get("/getCategory").then(({ data }) => setCategories(data.data || data)).catch(() => {});
    api.get("/getBrand").then(({ data }) => setBrands(data.data || data)).catch(() => {});

    // ইডিট মোড হলে ব্যাকএন্ড থেকে ডেটা লোড করা
    if (!isNew) {
      api.get("/products")
        .then(({ data }) => {
          const list = Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : [];
          const found = list.find((p) => String(p._id) === String(id));

          if (found) {
            setForm({
              title: found.title || "",
              shortDes: found.shortDes || "",
              price: found.price || "",
              discount: Boolean(found.discount),
              discountPrice: found.discountPrice || "",
              image: found.image || "",
              stock: Boolean(found.stock),
              remark: found.remark || "",
              categoryID: found.categoryID?._id || found.categoryID || "",
              customCategoryName: "",
              brandID: found.brandID?._id || found.brandID || "",
              customBrandName: "",
            });
          }
        })
        .catch(() => setError("Product fetch failed"));
    }
  }, [id, isNew]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        title: form.title,
        shortDes: form.shortDes,
        price: Number(form.price),
        discount: form.discount,
        discountPrice: Number(form.discountPrice) || 0,
        image: form.image,
        stock: form.stock,
        remark: form.remark,
        categoryID: isCustomCategory ? form.customCategoryName : form.categoryID,
        brandID: isCustomBrand ? form.customBrandName : form.brandID,
      };

      if (isNew) {
        await api.post("/createProduct", payload);
      } else {
        await api.put(`/updateProduct/${id}`, payload);
      }
      navigate("/admin/products");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save product");
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">{isNew ? "Add Product" : "Edit Product"}</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <label className="text-sm font-medium">Title</label>
            <input name="title" required value={form.title} onChange={handleChange} className="w-full border rounded-md px-3 py-2 text-sm mt-1" />
          </div>

          <div>
            <label className="text-sm font-medium">Short description</label>
            <textarea name="shortDes" required value={form.shortDes} onChange={handleChange} className="w-full border rounded-md px-3 py-2 text-sm mt-1" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Price</label>
              <input name="price" type="number" required value={form.price} onChange={handleChange} className="w-full border rounded-md px-3 py-2 text-sm mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Discount price</label>
              <input name="discountPrice" type="number" value={form.discountPrice} onChange={handleChange} className="w-full border rounded-md px-3 py-2 text-sm mt-1" />
            </div>
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="discount" checked={form.discount} onChange={handleChange} />
              Has discount
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="stock" checked={form.stock} onChange={handleChange} />
              In stock
            </label>
          </div>

          {/* Category Dropdown/Custom Input */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium">Category</label>
              <button
                type="button"
                onClick={() => setIsCustomCategory(!isCustomCategory)}
                className="text-xs text-teal-600 hover:underline"
              >
                {isCustomCategory ? "Select Existing" : "+ Add New Category"}
              </button>
            </div>
            {isCustomCategory ? (
              <input
                name="customCategoryName"
                placeholder="Type new category name"
                required
                value={form.customCategoryName}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            ) : (
              <select name="categoryID" required value={form.categoryID} onChange={handleChange} className="w-full border rounded-md px-3 py-2 text-sm">
                <option value="">Select category</option>
                {categories.map((c) => <option key={c._id} value={c._id}>{c.categoryName}</option>)}
              </select>
            )}
          </div>

          {/* Brand Dropdown/Custom Input */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium">Brand</label>
              <button
                type="button"
                onClick={() => setIsCustomBrand(!isCustomBrand)}
                className="text-xs text-teal-600 hover:underline"
              >
                {isCustomBrand ? "Select Existing" : "+ Add New Brand"}
              </button>
            </div>
            {isCustomBrand ? (
              <input
                name="customBrandName"
                placeholder="Type new brand name"
                required
                value={form.customBrandName}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            ) : (
              <select name="brandID" required value={form.brandID} onChange={handleChange} className="w-full border rounded-md px-3 py-2 text-sm">
                <option value="">Select brand</option>
                {brands.map((b) => <option key={b._id} value={b._id}>{b.brandName}</option>)}
              </select>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Image URL</label>
            <input name="image" value={form.image} onChange={handleChange} className="w-full border rounded-md px-3 py-2 text-sm mt-1" />
          </div>

          <div>
            <label className="text-sm font-medium">Remark</label>
            <input name="remark" value={form.remark} onChange={handleChange} placeholder="new / featured / popular / trending" className="w-full border rounded-md px-3 py-2 text-sm mt-1" />
          </div>

          <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 rounded-md text-sm transition-all">
            Save Product
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ProductEdit;