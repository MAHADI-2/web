import { createContext, useCallback, useState, useEffect ,useContext} from "react";
import api from "../api/axios.js";
import { useAuth } from "./AuthContext.jsx";

 const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishItems, setWishItems] = useState([]);
  const { userInfo } = useAuth();

  const refreshCart = useCallback(async () => {
    if (!userInfo) return;
    try {
      const { data } = await api.get("/cartRead");
      if (data.status === "success") {
        setCartItems(data.data);
      }
    } catch (error) {
      console.error("Cart fetch failed:", error);
    }
  }, [userInfo]);

  const refreshWish = useCallback(async () => {
    if (!userInfo) return;
    try {
      const { data } = await api.get("/getWish");
      if (data.status === "success") {
        setWishItems(data.data);
      }
    } catch (error) {
      console.error("Wishlist fetch failed:", error);
    }
  }, [userInfo]);

  useEffect(() => {
    const loadData = async () => {
      if (userInfo) {
        await refreshCart();
        await refreshWish();
      } else {
        setCartItems([]);
        setWishItems([]);
      }
    };

    loadData();
  }, [userInfo, refreshCart, refreshWish]);

  const addToCart = async (productID, qty = "1", size = "N/A", color = "N/A") => {
    try {
      const { data } = await api.post("/addCart", { productID, qty, size, color });
      if (data.status === "success") refreshCart();
      return data;
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  };

  const updateCart = async (cartId, qty) => {
    try {
      const { data } = await api.put("/updateCart", { cartId, qty });
      if (data.status === "success") refreshCart();
      return data;
    } catch (error) {
      console.error("Update cart error:", error);
    }
  };

  const removeFromCart = async (cartId) => {
    try {
      const { data } = await api.delete(`/deleteCart/${cartId}`);
      if (data.status === "success") refreshCart();
      return data;
    } catch (error) {
      console.error("Remove from cart error:", error);
    }
  };

  const addToWish = async (productID) => {
    try {
      const { data } = await api.post("/addWish", { productID });
      if (data.status === "success") refreshWish();
      return data;
    } catch (error) {
      console.error("Add to wish error:", error);
    }
  };

  const removeFromWish = async (wishId) => {
    try {
      const { data } = await api.delete(`/deleteWish/${wishId}`);
      if (data.status === "success") refreshWish();
      return data;
    } catch (error) {
      console.error("Remove from wish error:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishItems,
        refreshCart,
        refreshWish,
        addToCart,
        updateCart,
        removeFromCart,
        addToWish,
        removeFromWish,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);