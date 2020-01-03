const { getWeatherDetails } = require('./src/weatherLib');

const main = () => {
  const [, , ...locations] = process.argv;
  getWeatherDetails(locations);
};

main();
