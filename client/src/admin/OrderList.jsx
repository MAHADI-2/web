import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout.jsx";
import api from "../api/axios.js";

const STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"];

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const { data } = await api.get("/adminOrderList");
      setOrders(data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load orders");
    }
  };

  useEffect(() => { load(); }, []);

  const handleStatusChange = async (id, delivery_status) => {
    try {
      await api.put(`/updateOrder/${id}`, { delivery_status });
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">All Orders</h1>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Tran ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Payable</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Delivery Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id} className="border-t">
                  <td className="p-3 font-mono text-xs">{o.tran_id}</td>
                  <td className="p-3">{o.userID?.name || o.userID?.email}</td>
                  <td className="p-3">৳{o.payable}</td>
                  <td className="p-3">{o.payment_status}</td>
                  <td className="p-3">
                    <select
                      value={o.delivery_status}
                      onChange={(e) => handleStatusChange(o._id, e.target.value)}
                      className="border rounded-md px-2 py-1 text-sm capitalize"
                    >
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
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

export default OrderList;
