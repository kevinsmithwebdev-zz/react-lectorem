import { getFrontSpacer, SPACELESS_PUNCTUATION } from './punctuation';

describe('punctuation', () => {
  describe('getFrontSpacer', () => {
    describe('when isFirst', () => {
      const isFirst = true;
      it('should return an empty string', () => {
        const char = 'X'; // doesn't matter
        expect(getFrontSpacer(char, isFirst)).toBe('');
      });
    });

    const isFirstValues = [false, undefined];

    isFirstValues.forEach(isFirst => {
      describe(`when isFirst is [${isFirst}]`, () => {
        describe('when char is one of the spaceless punctuation', () => {
          SPACELESS_PUNCTUATION.forEach(char => {
            it(`should return an empty string for "${char}"`, () => {
              expect(getFrontSpacer(char, isFirst)).toBe('');
            });
          })
        });

        describe('when char is not one of the spaceless punctuation', () => {
          const char = 'A';
          it(`should return a space for "${char}"`, () => {
            expect(getFrontSpacer(char, isFirst)).toBe(' ');
          });
        });
      });
    });
  });
});
