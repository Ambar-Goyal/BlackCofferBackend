const express = require("express");
const fs = require("fs");
const router = express.Router();

const raw = fs.readFileSync("./data/jsondata.json", "utf-8");
const fullData = JSON.parse(raw);

// GET DATA
router.get("/data", (req, res) => {
  try {
    let filtered = fullData;

    Object.entries(req.query).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((d) =>
          d[key]?.toString().toLowerCase().includes(value.toLowerCase())
        );
      }
    });

    res.json({ success: true, data: filtered });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET FILTER OPTIONS
router.get("/filters", (req, res) => {
  const getUnique = (field) =>
    [...new Set(fullData.map((d) => d[field]).filter(Boolean))];

  res.json({
    success: true,
    filters: {
      topics: getUnique("topic"),
      sectors: getUnique("sector"),
      regions: getUnique("region"),
      pestles: getUnique("pestle"),
      swots: getUnique("swot"),
      countries: getUnique("country"),
      cities: getUnique("city"),
      end_years: getUnique("end_year"),
    },
  });
});

module.exports = router;
