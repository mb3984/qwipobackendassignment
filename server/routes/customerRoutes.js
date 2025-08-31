import express from "express";
import {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  searchCustomers,
  getCustomerAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  getSingleAddress, // 👈 new import
} from "../controllers/customerController.js";

const router = express.Router();

// 🔎 Search Customers
router.get("/search", searchCustomers);

// 📌 Address Management
router.get("/:id/addresses", getCustomerAddresses);
router.get("/:id/addresses/:addressId", getSingleAddress); // 👈 new route
router.post("/:id/addresses", addAddress);
router.put("/:id/addresses/:addressId", updateAddress);
router.delete("/:id/addresses/:addressId", deleteAddress);

// 👤 CRUD Routes
router.post("/", createCustomer);
router.get("/", getCustomers);
router.get("/:id", getCustomerById);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

export default router;
