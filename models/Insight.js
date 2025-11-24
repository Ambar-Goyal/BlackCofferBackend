const mongoose = require("mongoose");

const InsightSchema = new mongoose.Schema({
  intensity: Number,
  likelihood: Number,
  relevance: Number,
  year: Number,

  country: String,
  topic: String,
  region: String,
  city: String,
  sector: String,
  pestle: String,
  source: String,
  swot: String,

  end_year: Number,

  // EXTRA FIELDS from your dataset
  insight: String,
  url: String,
  title: String,
  impact: String,
  added: String,
  published: String
});

module.exports = mongoose.model("Insight", InsightSchema);
