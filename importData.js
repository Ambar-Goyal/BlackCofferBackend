require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Insight = require('./models/Insight');

// Clean string safely
const cleanString = (value) => {
  if (!value || typeof value !== "string") return "Unknown";
  const cleaned = value.trim();
  return cleaned === "" ? "Unknown" : cleaned;
};

// Clean number safely
const cleanNumber = (value) => {
  if (value === null || value === undefined || value === "" || isNaN(Number(value))) {
    return null;
  }
  return Number(value);
};

const importData = async () => {
  try {
    await connectDB();

    const filePath = path.join(__dirname, 'jsondata.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const json = JSON.parse(raw);

    if (!Array.isArray(json)) {
      throw new Error('jsondata.json must be an array of objects');
    }

    // Clear old data
    await Insight.deleteMany({});

    const docs = json.map(item => ({
      intensity: cleanNumber(item.intensity),
      likelihood: cleanNumber(item.likelihood),
      relevance: cleanNumber(item.relevance),
      year: cleanNumber(item.year) || cleanNumber(item.start_year),

      country: cleanString(item.country),
      topic: cleanString(item.topic),
      region: cleanString(item.region),
      city: cleanString(item.city),
      sector: cleanString(item.sector),
      pestle: cleanString(item.pestle),
      source: cleanString(item.source),
      swot: cleanString(item.swot),

      end_year: cleanNumber(item.end_year),

      // EXTRA FIELDS (your dataset specific)
      insight: cleanString(item.insight),
      url: cleanString(item.url),
      title: cleanString(item.title),
      impact: cleanString(item.impact),
      added: cleanString(item.added),
      published: cleanString(item.published)
    }));

    await Insight.insertMany(docs);
    console.log(`Imported ${docs.length} records successfully.`);
    process.exit(0);

  } catch (err) {
    console.error('Error importing data:', err);
    process.exit(1);
  }
};

importData();
