const { getWeatherDetails } = require('./src/weatherLib');

const main = () => {
  const requiredAfter = 2;
  const locations = process.argv.slice(requiredAfter);
  getWeatherDetails(locations);
};

main();
