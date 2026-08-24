import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const Dashboard = () => {
  const links = [
    {
      to: "/admin/categories",
      label: "Categories",
      desc: "Manage product categories",
      bgColor: "bg-emerald-50 text-emerald-600",
    },
    {
      to: "/admin/brands",
      label: "Brands",
      desc: "Manage product brands",
      bgColor: "bg-blue-50 text-blue-600",
    },
    {
      to: "/admin/products",
      label: "Products",
      desc: "Manage store inventory",
      bgColor: "bg-purple-50 text-purple-600",
    },
    {
      to: "/admin/orders",
      label: "Orders",
      desc: "View and manage customer orders",
      bgColor: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* হেডার */}
        <div className="mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">
            Quickly access and control your store management panels
          </p>
        </div>

        {/* কার্ড গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl mb-4 ${l.bgColor}`}
                >
                  {l.label[0]}
                </div>
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-teal-600 transition-colors">
                  {l.label}
                </h2>
                <p className="text-xs text-gray-500 mt-1">{l.desc}</p>
              </div>

              <div className="mt-6 flex items-center text-xs font-semibold text-teal-600 group-hover:translate-x-1 transition-transform">
                Manage &rarr;
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;