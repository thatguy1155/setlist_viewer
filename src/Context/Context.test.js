import { constructSongObject } from './songFunctions';
import { getYearRange, addEmptyYears } from './yearFunctions';

describe('constructSongObject', () => {
  it('constructs the object for the song that will be stored in state', () => {
    const input = {
      'white gloves': ['01-02-2019', '01-02-2020', '01-03-2020'],
    };
    const output = {
      name: 'white gloves',
      byYear: {
        2019: 1,
        2020: 2,
      },
      allYears: [2019, 2020],
    };
    expect(constructSongObject(input)).toEqual(output);
  });
});

describe('getYearRange', () => {
  it('changes the min or max years based on the new song data', () => {
    const songs = [
      {
        allYears: [2019, 2020],
      },
      {
        allYears: [2021, 2022],
      },
    ];
    expect(getYearRange(songs)).toEqual([2019, 2020, 2021, 2022]);
  });
});

describe('addEmptyYears', () => {
  it('takes the song object and adds all the years between minYear and MaxYear where the song wasn\'t played', () => {
    const years = [2016, 2017, 2018, 2019];
    const song = {
      name: 'white gloves',
      byYear: {
        2019: 1,
        2020: 2,
      },
      allYears: [2019, 2020],
    };
    const output = {
      name: 'white gloves',
      byYear: {
        2016: 0,
        2017: 0,
        2018: 0,
        2019: 1,
        2020: 2,
      },
      allYears: [2019, 2020],
    };
    expect(addEmptyYears({ years, song })).toEqual(output);
  });
});
