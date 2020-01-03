const { assert } = require('chai');
const {
  //requestOfGeoCode,
  getReport
  //  requestOfForecast
} = require('../src/utils');

describe('Get Report', () => {
  it('should give the report of weather', () => {
    const data = {
      location: 'India',
      daily: { data: [{ summary: 'data summary' }], summary: 'daily summary' },
      currently: {
        precipProbability: 0,
        precipType: 'rain',
        temperature: 17
      }
    };
    const actual = getReport(data);
    let expected = '\n  ===> India <===';
    expected += '\n-----------------------------------------\n';
    expected += '\ndata summary\nIt is currently ';
    expected += '17 degree temp.\ndaily summary\nThe probability of ';
    expected += 'rain is 0';
    assert.strictEqual(actual, expected);
  });
});
