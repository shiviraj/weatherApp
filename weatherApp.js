const { getWeatherDetails } = require('./src/weatherLib');

const main = () => {
  const locations = process.argv.slice(2);
  getWeatherDetails(locations);
};

main();
