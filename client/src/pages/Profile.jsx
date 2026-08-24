import { useState } from "react";
import Layout from "../components/Layout/Layout.jsx";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

const Profile = () => {
  const { userInfo } = useAuth();
  const [form, setForm] = useState({
    cus_name: "", cus_add: "", cus_city: "", cus_state: "", cus_postcode: "", cus_country: "", cus_phone: "",
    ship_name: "", ship_add: "", ship_city: "", ship_state: "", ship_postcode: "", ship_country: "", ship_phone: "",
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await api.post("/createProfile", form);
      setMsg("Profile saved! You can now check out.");
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to save profile");
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-2">My Profile</h1>
        <p className="text-gray-600 mb-6">{userInfo?.name} — {userInfo?.email}</p>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-6">
          {msg && <p className="text-sm text-teal-600">{msg}</p>}

          <div>
            <h2 className="font-semibold mb-3">Billing details</h2>
            <div className="grid grid-cols-2 gap-3">
              <input name="cus_name" placeholder="Full name" value={form.cus_name} onChange={handleChange} className="border rounded-md px-3 py-2 text-sm" />
              <input name="cus_phone" placeholder="Phone" value={form.cus_phone} onChange={handleChange} className="border rounded-md px-3 py-2 text-sm" />
              <input name="cus_add" placeholder="Address" value={form.cus_add} onChange={handleChange} className="border rounded-md px-3 py-2 text-sm col-span-2" />
              <input name="cus_city" placeholder="City" value={form.cus_city} onChange={handleChange} className="border rounded-md px-3 py-2 text-sm" />
              <input name="cus_state" placeholder="State" value={form.cus_state} onChange={handleChange} className="border rounded-md px-3 py-2 text-sm" />
              <input name="cus_postcode" placeholder="Postcode" value={form.cus_postcode} onChange={handleChange} className="border rounded-md px-3 py-2 text-sm" />
              <input name="cus_country" placeholder="Country" value={form.cus_country} onChange={handleChange} className="border rounded-md px-3 py-2 text-sm" />
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-3">Shipping details</h2>
            <div className="grid grid-cols-2 gap-3">
              <input name="ship_name" placeholder="Full name" value={form.ship_name} onChange={handleChange} className="border rounded-md px-3 py-2 text-sm" />
              <input name="ship_phone" placeholder="Phone" value={form.ship_phone} onChange={handleChange} className="border rounded-md px-3 py-2 text-sm" />
              <input name="ship_add" placeholder="Address" value={form.ship_add} onChange={handleChange} className="border rounded-md px-3 py-2 text-sm col-span-2" />
              <input name="ship_city" placeholder="City" value={form.ship_city} onChange={handleChange} className="border rounded-md px-3 py-2 text-sm" />
              <input name="ship_state" placeholder="State" value={form.ship_state} onChange={handleChange} className="border rounded-md px-3 py-2 text-sm" />
              <input name="ship_postcode" placeholder="Postcode" value={form.ship_postcode} onChange={handleChange} className="border rounded-md px-3 py-2 text-sm" />
              <input name="ship_country" placeholder="Country" value={form.ship_country} onChange={handleChange} className="border rounded-md px-3 py-2 text-sm" />
            </div>
          </div>

          <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded-md text-sm">
            Save Profile
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Profile;
