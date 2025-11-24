const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const dataRoutes = require("./routes/dataRoutes");

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api", dataRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Backend running with local JSON data ✔");
});

// Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
