require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const dataRoutes = require("./routes/dataRoutes");

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(morgan("dev"));

// API Routes
app.use("/api", dataRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Insights API is running using local JSON data");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
