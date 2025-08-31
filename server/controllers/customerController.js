import db from "../db.js";

// ✅ Create Customer
export const createCustomer = (req, res) => {
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

  const sql = `INSERT INTO customers (firstName, lastName, phone, email, address, city, state, pincode) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [firstName, lastName, phone, email, address, city, state, pincode],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({
        message: "Customer created successfully",
        customerId: result.insertId,
      });
    }
  );
};

// ✅ Get All Customers
export const getCustomers = (req, res) => {
  const sql = "SELECT * FROM customers";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// ✅ Get Customer By ID
export const getCustomerById = (req, res) => {
  const sql = "SELECT * FROM customers WHERE id = ?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0)
      return res.status(404).json({ message: "Customer not found" });
    res.json(results[0]);
  });
};

// ✅ Update Customer
export const updateCustomer = (req, res) => {
  const { firstName, lastName, phone, email, address, city, state, pincode } =
    req.body;
  const sql = `UPDATE customers 
               SET firstName=?, lastName=?, phone=?, email=?, address=?, city=?, state=?, pincode=? 
               WHERE id=?`;

  db.query(
    sql,
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
    ],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Customer updated successfully" });
    }
  );
};

// ✅ Delete Customer
export const deleteCustomer = (req, res) => {
  const sql = "DELETE FROM customers WHERE id=?";
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Customer deleted successfully" });
  });
};

// ✅ Search by Query Params
export const searchCustomers = (req, res) => {
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

  db.query(sql, values, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// ✅ Get All Addresses of a Customer
export const getCustomerAddresses = (req, res) => {
  const sql = "SELECT * FROM addresses WHERE customerId=?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// ✅ Get Single Address
export const getSingleAddress = (req, res) => {
  const sql = "SELECT * FROM addresses WHERE customerId=? AND id=?";
  db.query(sql, [req.params.id, req.params.addressId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0)
      return res.status(404).json({ message: "Address not found" });
    res.json(results[0]);
  });
};

// ✅ Add Address
export const addAddress = (req, res) => {
  const { address, city, state, country, postalCode } = req.body;
  const sql = `INSERT INTO addresses (customerId, address, city, state, country, postalCode) 
               VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [req.params.id, address, city, state, country, postalCode],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res
        .status(201)
        .json({ message: "Address added", addressId: result.insertId });
    }
  );
};

// ✅ Update Address (fixed `postalCode`)
export const updateAddress = (req, res) => {
  const { address, city, state, country, postalCode } = req.body;
  const sql = `UPDATE addresses 
               SET address=?, city=?, state=?, country=?, postalCode=? 
               WHERE id=?`;

  db.query(
    sql,
    [address, city, state, country, postalCode, req.params.addressId],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Address updated successfully" });
    }
  );
};
// ✅ Delete Address
export const deleteAddress = (req, res) => {
  const sql = "DELETE FROM addresses WHERE id=?";
  db.query(sql, [req.params.addressId], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Address deleted successfully" });
  });
};
