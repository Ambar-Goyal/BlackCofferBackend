const Insight = require('../models/Insight');

const buildQueryFromFilters = (queryParams) => {
  const {
    end_year,
    topic,
    sector,
    region,
    pestle,
    source,
    swot,
    country,
    city
  } = queryParams;

  const query = {};

  if (end_year) query.end_year = Number(end_year);
  if (topic) query.topic = topic;
  if (sector) query.sector = sector;
  if (region) query.region = region;
  if (pestle) query.pestle = pestle;
  if (source) query.source = source;
  if (swot) query.swot = swot;
  if (country) query.country = country;
  if (city) query.city = city;

  return query;
};

exports.getData = async (req, res) => {
  try {
    const query = buildQueryFromFilters(req.query);
    const data = await Insight.find(query).lean();
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

exports.getFilters = async (req, res) => {
  try {
    const [
  topics,
  sectors,
  regions,
  pestles,
  swots,
  countries,
  cities,
  end_years,
  sources
] = await Promise.all([
  Insight.distinct('topic'),
  Insight.distinct('sector'),
  Insight.distinct('region'),
  Insight.distinct('pestle'),
  Insight.distinct('swot'),
  Insight.distinct('country'),
  Insight.distinct('city'),
  Insight.distinct('end_year'),
  Insight.distinct('source')   // ADD THIS
]);


    res.json({
      success: true,
      filters: {
        topics: topics.filter(Boolean).sort(),
        sectors: sectors.filter(Boolean).sort(),
        regions: regions.filter(Boolean).sort(),
        pestles: pestles.filter(Boolean).sort(),
        swots: swots.filter(Boolean).sort(),
        countries: countries.filter(Boolean).sort(),
        cities: cities.filter(Boolean).sort(),
        end_years: end_years.filter(Boolean).sort((a, b) => a - b)
      }
    });
  } catch (err) {
    console.error('Error fetching filters:', err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
