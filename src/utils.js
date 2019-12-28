const getReport = ({ location, daily, currently }) => {
  const firstIndex = 0;
  let report = `\n  ===> ${location} <===`;
  report += '\n-----------------------------------------\n';
  report += `\n${daily.data[firstIndex].summary}\nIt is currently `;
  report += `${currently.temperature}`;
  report += ` degree temp.\n${daily.summary}\nThe probability of `;
  return `${report}${currently.precipType} is ${currently.precipProbability}`;
};

const requestOfForecast = (callback, location) => {
  return (error, { body }) => {
    if (error) {
      return callback('unable to connect the weather service', undefined);
    }
    body.location = location;
    callback(undefined, body);
  };
};

const createFeatureObject = ({ features }) => {
  const firstIndex = 0;
  const secondIndex = 1;
  const firstFeature = features[firstIndex];
  return {
    longitude: firstFeature.center[firstIndex],
    latitude: firstFeature.center[secondIndex],
    location: firstFeature.place_name
  };
};

const requestOfGeoCode = callback => {
  return (error, { body }) => {
    if (error) {
      return callback('unable to connect the location service', undefined);
    }
    const lengthOfBody = 0;
    if (body.features.length === lengthOfBody) {
      return callback('unable to find the location. search another location');
    }
    callback(undefined, createFeatureObject(body));
  };
};

module.exports = { requestOfGeoCode, getReport, requestOfForecast };
