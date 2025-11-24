const express = require("express");
const fs = require("fs");
const router = express.Router();

const rawData = fs.readFileSync("./data/jsondata.json");
const fullData = JSON.parse(rawData);

// GET FILTERED DATA
router.get("/data", (req, res) => {
  let filtered = fullData;

  Object.entries(req.query).forEach(([key, value]) => {
    if (value) {
      filtered = filtered.filter((d) =>
        d[key]?.toString().toLowerCase().includes(value.toLowerCase())
      );
    }
  });

  res.json({
    success: true,
    data: filtered,
  });
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
