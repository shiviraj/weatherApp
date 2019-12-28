const request = require('request');
const { requestOfGeoCode, getReport, requestOfForecast } = require('./utils');

const displayWeatherData = (error, data) => {
  if (error) {
    return console.log('Unable to connect to weather service');
  }
  console.log(getReport(data));
};

const getForecastDetails = ({ location, longitude, latitude }, callback) => {
  const key = '893cb995b21d1bdf5c5bd0a05207792a';
  let url = `https://api.darksky.net/forecast/`;
  url = `${url}${key}/${latitude},${longitude}?units=si`;
  request({ url, json: true }, requestOfForecast(callback, location));
};

const displayData = (error, data) => {
  if (error) {
    return console.error('Error:', error);
  }
  getForecastDetails(data, displayWeatherData);
};

const geoCode = (address, callback) => {
  const accessToken = `pk.eyJ1Ijoic2hpdmlyYWoiLCJhIjoiY2s0bnoxM2JjMDY0aTNldDI5Y2V1MmF4cCJ9.q-znG-rhQtGtuV5uhg7WMg`;
  address = encodeURIComponent(address);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${accessToken}`;
  request({ url, json: true }, requestOfGeoCode(callback));
};

const getWeatherDetails = locations =>
  locations.map(location => geoCode(location, displayData));

module.exports = { getWeatherDetails };
