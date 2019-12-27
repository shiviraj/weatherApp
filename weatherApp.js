const { geoCode, displayData } = require('./src/weatherLib');

const main = () => {
  const location = process.argv[2].trim();
  geoCode(location, displayData);
};

main();
