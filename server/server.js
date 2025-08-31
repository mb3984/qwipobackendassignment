import express from "express";
import cors from "cors";
import customerRoutes from "./routes/customerRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// ✅ Allow frontend requests
app.use(cors({
  origin: ["http://localhost:5173", "https://your-frontend-domain.com"], // whitelist
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

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
