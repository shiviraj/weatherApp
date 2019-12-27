const request = require('request');
const { requestOfGeoCode, getReport, requestOfForecast } = require('./utils');

const displayWeatherData = (error, data) => {
  if (error) {
    console.log('Unable to connect to weather service');
    return;
  }
  console.log(getReport(data));
};

const getForecastDetails = (data, callback) => {
  const key = '893cb995b21d1bdf5c5bd0a05207792a';
  let url = `https://api.darksky.net/forecast/`;
  url = `${url}${key}/${data.latitude},${data.longitude}?units=si`;
  request({ url, json: true }, requestOfForecast(callback, data.location));
};

const displayData = (error, data) => {
  if (error) {
    console.error('Error:', error);
    return;
  }
  getForecastDetails(data, displayWeatherData);
};

const geoCode = (address, callback) => {
  const accessToken = `pk.eyJ1Ijoic2hpdmlyYWoiLCJhIjoiY2s0bnoxM2JjMDY0aTNldDI5Y2V1MmF4cCJ9.q-znG-rhQtGtuV5uhg7WMg`;
  address = encodeURIComponent(address);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${accessToken}`;
  request({ url, json: true }, requestOfGeoCode(callback));
};

module.exports = { geoCode, displayData };
