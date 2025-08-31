import express from "express";
import cors from "cors";
import customerRoutes from "./routes/customerRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/customers", customerRoutes);

// Default route for testing
app.get("/", (req, res) => {
  res.send("Customer API is running ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
