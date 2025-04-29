import React, { useEffect, useState } from 'react';

const CarbonFootprintCalculator = ({ km }) => {
  const [footprint, setFootprint] = useState(null);
  const EMISSION_FACTOR = 40; // grams of CO₂ per km

  useEffect(() => {
    if (!isNaN(km)) {
      setFootprint(km * EMISSION_FACTOR);
    } else {
      setFootprint(null);
    }
  }, [km]);

  return (
    <div className="my-4">
      <p className="text-sm mb-1">Distance: <span className="font-medium">{km} km</span></p>
      {footprint !== null && (
        <p className="text-sm text-gray-700">
          Estimated Carbon Footprint: <span className="font-bold">{footprint} g CO₂</span>
        </p>
      )}
    </div>
  );
};

export default CarbonFootprintCalculator;
