const getReport = data => {
  let report = `\n  ===> ${data.location} <===\n-----------------------------------------\n`;
  report += `\n${data.daily.data[0].summary}\nIt is currently ${data.currently.temperature}`;
  report += ` degree temp.\n${data.daily.summary}\nThe probability of `;
  return `${report}${data.currently.precipType} is ${data.currently.precipProbability}`;
};

const requestOfForecast = (callback, location) => {
  return (error, response) => {
    if (error) {
      callback('unable to connect the weather service', undefined);
      return;
    }
    response.body.location = location;
    callback(undefined, response.body);
  };
};

const requestOfGeoCode = callback => {
  return (error, data) => {
    if (error) {
      callback('unable to connect the location service', undefined);
      return;
    }
    if (data.body.features.length == 0) {
      callback('unable to find the location. search another location');
      return;
    }
    callback(undefined, {
      longitude: data.body.features[0].center[0],
      latitude: data.body.features[0].center[1],
      location: data.body.features[0].place_name
    });
  };
};

module.exports = { requestOfGeoCode, getReport, requestOfForecast };
