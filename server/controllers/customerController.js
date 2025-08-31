import dbPromise from "../db.js";

// ✅ Create Customer
export const createCustomer = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, address, city, state, pincode } =
      req.body;

    if (
      !firstName ||
      !lastName ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !pincode
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const db = await dbPromise;
    const result = await db.run(
      `INSERT INTO customers (firstName, lastName, phone, email, address, city, state, pincode)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [firstName, lastName, phone, email, address, city, state, pincode]
    );

    res.status(201).json({
      message: "Customer created successfully",
      customerId: result.lastID,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get All Customers
export const getCustomers = async (req, res) => {
  try {
    const db = await dbPromise;
    const results = await db.all("SELECT * FROM customers");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get Customer By ID
export const getCustomerById = async (req, res) => {
  try {
    const db = await dbPromise;
    const result = await db.get("SELECT * FROM customers WHERE id = ?", [
      req.params.id,
    ]);

    if (!result) return res.status(404).json({ message: "Customer not found" });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update Customer
export const updateCustomer = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, address, city, state, pincode } =
      req.body;
    const db = await dbPromise;

    await db.run(
      `UPDATE customers 
       SET firstName=?, lastName=?, phone=?, email=?, address=?, city=?, state=?, pincode=? 
       WHERE id=?`,
      [
        firstName,
        lastName,
        phone,
        email,
        address,
        city,
        state,
        pincode,
        req.params.id,
      ]
    );

    res.json({ message: "Customer updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete Customer
export const deleteCustomer = async (req, res) => {
  try {
    const db = await dbPromise;
    await db.run("DELETE FROM customers WHERE id=?", [req.params.id]);
    res.json({ message: "Customer deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Search by Query Params
export const searchCustomers = async (req, res) => {
  try {
    const { city, state, pincode } = req.query;

    let sql = "SELECT * FROM customers WHERE 1=1";
    let values = [];

    if (city) {
      sql += " AND city LIKE ?";
      values.push(`%${city}%`);
    }
    if (state) {
      sql += " AND state LIKE ?";
      values.push(`%${state}%`);
    }
    if (pincode) {
      sql += " AND pincode LIKE ?";
      values.push(`%${pincode}%`);
    }

    const db = await dbPromise;
    const results = await db.all(sql, values);

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get All Addresses of a Customer
export const getCustomerAddresses = async (req, res) => {
  try {
    const db = await dbPromise;
    const results = await db.all("SELECT * FROM addresses WHERE customerId=?", [
      req.params.id,
    ]);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get Single Address
export const getSingleAddress = async (req, res) => {
  try {
    const db = await dbPromise;
    const result = await db.get(
      "SELECT * FROM addresses WHERE customerId=? AND id=?",
      [req.params.id, req.params.addressId]
    );

    if (!result) return res.status(404).json({ message: "Address not found" });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Add Address
export const addAddress = async (req, res) => {
  try {
    const { address, city, state, country, postalCode } = req.body;
    const db = await dbPromise;

    const result = await db.run(
      `INSERT INTO addresses (customerId, address, city, state, country, postalCode)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [req.params.id, address, city, state, country, postalCode]
    );

    res.status(201).json({
      message: "Address added",
      addressId: result.lastID,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update Address
export const updateAddress = async (req, res) => {
  try {
    const { address, city, state, country, postalCode } = req.body;
    const db = await dbPromise;

    await db.run(
      `UPDATE addresses 
       SET address=?, city=?, state=?, country=?, postalCode=? 
       WHERE id=?`,
      [address, city, state, country, postalCode, req.params.addressId]
    );

    res.json({ message: "Address updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete Address
export const deleteAddress = async (req, res) => {
  try {
    const db = await dbPromise;
    await db.run("DELETE FROM addresses WHERE id=?", [req.params.addressId]);
    res.json({ message: "Address deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
