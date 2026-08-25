import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";

import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import Dashboard from "./admin/Dashboard";
import BrandList from "./admin/BrandList";
import BrandEdit from "./admin/BrandEdit";
import CategoryEdit from "./admin/CategoryEdit";
import CategoryList from "./admin/CategoryList";
import ProductEdit from "./admin/ProductEdit";
import ProductList from "./admin/ProductList";
import OrderList from "./admin/OrderList";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />

        {/* Private Routes (Protected for Users) */}
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
        <Route path="/orders" element={<PrivateRoute><OrderHistory /></PrivateRoute>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoute><Dashboard /></AdminRoute>} />
        <Route path="/admin/orders" element={<AdminRoute><OrderList /></AdminRoute>} />
        <Route path="/admin/brands" element={<AdminRoute><BrandList /></AdminRoute>} />
        <Route path="/admin/brands/new" element={<AdminRoute><BrandEdit /></AdminRoute>} />
        <Route path="/admin/brands/:id/edit" element={<AdminRoute><BrandEdit /></AdminRoute>} />

        <Route path="/admin/categories" element={<AdminRoute><CategoryList /></AdminRoute>} />
        <Route path="/admin/categories/new" element={<AdminRoute><CategoryEdit /></AdminRoute>} />
        <Route path="/admin/categories/:id/edit" element={<AdminRoute><CategoryEdit /></AdminRoute>} />

        <Route path="/admin/products" element={<AdminRoute><ProductList /></AdminRoute>} />
        <Route path="/admin/products/new" element={<AdminRoute><ProductEdit /></AdminRoute>} />
        <Route path="/admin/products/:id/edit" element={<AdminRoute><ProductEdit /></AdminRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;