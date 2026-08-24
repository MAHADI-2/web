import express from "express";
const router = express.Router();

import {
  createBrand,
  getBrand,
  deleteBrand,
  createCategory,
  getCategory,
  updateBrand,
  updateCategory,
  deleteCategory,
  createProduct,
  updateProduct,
  deleteProduct
} from "./userController/brandController.js";

import { protect, admin } from "./middleware/middleware.js";

import { register, login, sendOtp } from "./userController/uthController.js";

import { addWish, getWish, updateWish, deleteWish } from "./wishSrvAnndCntl/wishController.js";

import { addCart, cartRead, updateCart, deleteCart } from "./cartController.js";

import { createProfile } from "./profile/profileController.js";
import { productDetails, getProductDetails } from "./productDlts/productDetailscontroller.js";

import {
  createInvoice,
  paymentSuccess,
  paymentFail,
  paymentCancel,
  paymentIPN,
  invoiceList,
  invoiceProductList,
  savePaymentSetting,
  adminOrderList,
  updateOrder
} from "./invoiceCrate/invoiceController.js";

import { addReview, getReviewsByProduct } from "./reveiw/reveiwController.js";
import { createFeature } from "./reveiw/features/featurController.js";
import { getProduct } from "./productSrvAndCntrl/productController.js";

// Brand Routes
router.post("/createBrand", protect, admin, createBrand);
router.get("/getBrand", getBrand);
router.delete("/deleteBrand/:id", protect, admin, deleteBrand);
router.put("/updateBrand/:id", protect, admin, updateBrand);

// Category Routes
router.post("/createCategory", protect, admin, createCategory);
router.get("/getCategory", getCategory);
router.put("/updateCategory/:id", protect, admin, updateCategory);
router.delete("/deleteCategory/:id", protect, admin, deleteCategory);

// Product Routes
router.post("/createProduct", protect, admin, createProduct);
router.put("/updateProduct/:id", protect, admin, updateProduct);
router.delete("/deleteProduct/:id", protect, admin, deleteProduct);

// Auth Routes (baseURL এর সাথে মিলিয়ে /sendOtp, /register, /login ঠিক রাখা হয়েছে)
router.post("/sendOtp", sendOtp);
router.post("/register", register);
router.post("/login", login);

// Wishlist Routes
router.post("/addWish", protect, addWish);
router.get("/getWish", protect, getWish);
router.put("/updateWish/", protect, updateWish);
router.delete("/deleteWish/:id", protect, deleteWish);

// Cart Routes
router.post("/addCart", protect, addCart);
router.get("/cartRead", protect, cartRead);
router.put("/updateCart/:id", protect, updateCart);
router.delete("/deleteCart/:id", protect, deleteCart);

// Profile Routes
router.post("/createProfile", protect, createProfile);
router.get("/getProfile", protect, createProfile);

// Product Details Routes
router.post("/productDetails", protect, admin, productDetails);
router.get("/getProductDetails", protect, getProductDetails);
router.get("/products", getProduct);

// Invoice & Payment Routes
router.post("/createInvoice", protect, createInvoice);
router.post("/PaymentSuccess/:trxID", paymentSuccess);
router.post("/PaymentFail/:trxID", paymentFail);
router.post("/PaymentCancel/:trxID", paymentCancel);
router.post("/paymentIPN", protect, paymentIPN);
router.get("/invoiceList", protect, invoiceList);
router.get("/invoiceProductList", protect, invoiceProductList);
router.post("/savePaymentSetting", protect, admin, savePaymentSetting);

// Order Routes
router.get("/adminOrderList", protect, admin, adminOrderList);
router.put("/updateOrder/:id", protect, admin, updateOrder);

// Review & Feature Routes
router.post("/addReview", protect, addReview);
router.get("/getReviewsByProduct/:productID", getReviewsByProduct);
router.post("/createFeature", protect, admin, createFeature);

export default router;