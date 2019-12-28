const getReport = ({ location, daily, currently }) => {
  let report = `\n  ===> ${location} <===\n-----------------------------------------\n`;
  report += `\n${daily.data[0].summary}\nIt is currently ${currently.temperature}`;
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

const requestOfGeoCode = callback => {
  return (error, { body }) => {
    if (error) {
      return callback('unable to connect the location service', undefined);
    }
    if (body.features.length == 0) {
      return callback('unable to find the location. search another location');
    }
    callback(undefined, {
      longitude: body.features[0].center[0],
      latitude: body.features[0].center[1],
      location: body.features[0].place_name
    });
  };
};

module.exports = { requestOfGeoCode, getReport, requestOfForecast };
