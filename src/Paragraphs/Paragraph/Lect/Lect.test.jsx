import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Lect, { getSpacer, getHasModalInformation, getClassName, ENDING_PUNCTUATION } from './Lect';
import storyData from '../../../../fixture/storyData.json';

const mockLect = storyData.paragraphs[0].lects[0];

describe('Lect', () => {
  describe('the main component render', () => {
    const props = {
      lect: mockLect,
      showModal: 'showModal123',
    };

    const renderer = new ShallowRenderer();
    describe('empty', () => {
      it('should render without crashing', () => {
        renderer.render(<Lect />);
        expect(renderer.getRenderOutput()).toMatchSnapshot();
      });
    });

    describe('with data, should highlight', () => {
      it('should render and match snapshot', () => {
        renderer.render(<Lect { ...props } shouldHighlight />);
        expect(renderer.getRenderOutput()).toMatchSnapshot();
      });
    });

    describe('with data, should not highlight', () => {
      it('should render and match snapshot', () => {
        renderer.render(<Lect { ...props } shouldHighlight={ false } />);
        expect(renderer.getRenderOutput()).toMatchSnapshot();
      });
    });
  });

  describe('getSpacer', () => {
    describe('when ending in terminal punctuation', () => {
      ENDING_PUNCTUATION.forEach(pun => {
        describe(`when ending punctuation is "${pun}"`, () => {
          const text = `howdy${pun}`;
          it('should return two spaces', () => {
            expect(getSpacer(text)).toBe('  ');
          });
        });
      });
    });

    describe('when not ending in punctuation', () => {
      const text = 'howdy';
      it('should return one space', () => {
        expect(getSpacer(text)).toBe(' ');
      });
    });
  });

  describe('getHasModalInformation', () => {
    const testData = [
      { lect: { explanation: undefined, translation: undefined }, result: false },
      { lect: { explanation: undefined, translation: 'something' }, result: true },
      { lect: { explanation: 'something', translation: undefined }, result: true },
      { lect: { explanation: 'something', translation: 'something' }, result: true },
    ];
    const getLectPropText = (lect, prop) => lect[prop] ? `has ${prop}` : `does not have ${prop}`;

    testData.forEach(({ lect, result}) => {
      describe(`when ${getLectPropText(lect, 'explanation')} and ${getLectPropText(lect, 'translation')}`, () => {
        it(`should return ${result}`, () => {
          expect(getHasModalInformation(lect)).toBe(result);
        });
      });
    });
  });

  describe('getClassName', () => {
    const testData = [
      { flags: [false, false], result: 'Lect unHighlighted ' },
      { flags: [false, true], result: 'Lect unHighlighted clickable' },
      { flags: [true, false], result: 'Lect highlighted ' },
      { flags: [true, true], result: 'Lect highlighted clickable' },
    ];

    testData.forEach(({ flags: [shouldHighlight, hasModalInformation], result}) => {
      describe(`when shouldHighlight is ${shouldHighlight} and hasModalInformation is ${hasModalInformation}`, () => {
        it(`should return ${result}`, () => {
          expect(getClassName(shouldHighlight, hasModalInformation)).toBe(result);
        });
      });
    });
  });
});
