import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout.jsx";
import api from "../api/axios.js";

const OrderHistory = () => {
  const [invoices, setInvoices] = useState([]);
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [invRes, itemRes] = await Promise.all([
          api.get("/invoiceList"),
          api.get("/invoiceProductList"),
        ]);
        if (invRes.data.status === "success") setInvoices(invRes.data.data);
        if (itemRes.data.status === "success") setItems(itemRes.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load orders");
      }
    };
    load();
  }, []);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Order History</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {invoices.length === 0 && !error && <p className="text-gray-500 text-sm">No orders yet.</p>}

        <div className="space-y-4">
          {invoices.map((inv) => {
            const orderItems = items.filter((it) => it.invoiceID === inv._id);
            return (
              <div key={inv._id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between text-sm">
                  <span className="font-mono text-xs text-gray-500">{inv.tran_id}</span>
                  <span className="capitalize text-teal-600">{inv.delivery_status}</span>
                </div>
                <div className="flex justify-between mt-1 text-sm">
                  <span>{new Date(inv.createdAt).toLocaleDateString()}</span>
                  <span className={inv.payment_status === "Paid" ? "text-green-600" : "text-yellow-600"}>
                    {inv.payment_status}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  {orderItems.length} item(s) — Total: ৳{inv.payable}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default OrderHistory;
