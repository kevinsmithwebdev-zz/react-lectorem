import { convertToTrainCase } from './case';

describe('case utilities', () => {
  describe('convertToTrainCase', () => {
    const testCases = [
      ['howdy', 'howdy'],
      ['Howdy', 'howdy'],
      ['Howdy There', 'howdy-there'],
      ['Howdy There, Pardner', 'howdy-there-pardner'],
      ['hey*@#&#$ 123 234-----345', 'hey-123-234-345'],
      ['---hey--there - - 123    ', 'hey-there-123'],
    ];

    describe.each(testCases)('for string "%s"', (input: string, result: string) => {
      it(`should return "${result}"`, () => {
        expect(convertToTrainCase(input)).toBe(result);
      });
    });
  });
});

