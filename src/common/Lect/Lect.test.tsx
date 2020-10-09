import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Lect, {
  getHasModalInformation,
} from './Lect';
import { LectInterface } from '../../interfaces/index';
import storyData from '../../fixtureData/story.data';

const mockLect = storyData.paragraphs[0].sentences[0].lects[0];

describe('Lect', () => {
  describe('the main component render', () => {
    const baseProps = {
      lect: mockLect,
      shouldHighlight: false,
      showModal: () => {},
      isLast: false,
      isFirst: false,
      sentenceTranslation: 'sentence translation 123',
      originalSentence: 'original sentence 123',
    };

    const renderer = ShallowRenderer.createRenderer();

    describe('with data, shouldHighlight', () => {
      it('should render and match snapshot', () => {
        renderer.render(<Lect {...baseProps} shouldHighlight />);
        expect(renderer.getRenderOutput()).toMatchSnapshot();
      });
    });

    describe('with data, isFirst', () => {
      it('should render and match snapshot', () => {
        renderer.render(<Lect {...baseProps} isFirst />);
        expect(renderer.getRenderOutput()).toMatchSnapshot();
      });
    });

    describe('with data, isLast', () => {
      it('should render and match snapshot', () => {
        renderer.render(<Lect {...baseProps} isLast />);
        expect(renderer.getRenderOutput()).toMatchSnapshot();
      });
    });

    describe('with data, but no modal information', () => {
      it('should render and match snapshot', () => {
        const newMockLect = {
          ...mockLect,
          explanation: undefined as unknown as string,
          translation: undefined as unknown as string,
        }
        renderer.render(<Lect {...baseProps} lect={ newMockLect } />);
        expect(renderer.getRenderOutput()).toMatchSnapshot();
      });
    });
  });

  describe('getHasModalInformation', () => {
    const testData = [
      {
        lect: { text: 'text123', explanation: undefined, translation: undefined },
        result: false,
      },
      {
        lect: { text: 'text123', explanation: undefined, translation: 'something' },
        result: true,
      },
      {
        lect: { text: 'text123', explanation: 'something', translation: undefined },
        result: true,
      },
      {
        lect: { text: 'text123', explanation: 'something', translation: 'something' },
        result: true,
      },
    ];
    const getLectPropText = (lect: LectInterface, prop: 'explanation' | 'translation'): string =>
      lect[prop] ? `has ${prop}` : `does not have ${prop}`;

    testData.forEach(({ lect, result }) => {
      describe(`when ${getLectPropText(
        lect,
        'explanation'
      )} and ${getLectPropText(lect, 'translation')}`, () => {
        it(`should return ${result}`, () => {
          expect(getHasModalInformation(lect)).toBe(result);
        });
      });
    });
  });

  // describe('getClassName', () => {
  //   const testData = [
  //     { flags: [false, false], result: 'Lect unHighlighted ' },
  //     { flags: [false, true], result: 'Lect unHighlighted clickable' },
  //     { flags: [true, false], result: 'Lect highlighted ' },
  //     { flags: [true, true], result: 'Lect highlighted clickable' },
  //   ];

  //   testData.forEach(
  //     ({ flags: [shouldHighlight, hasModalInformation], result }) => {
  //       describe(`when shouldHighlight is ${shouldHighlight} and hasModalInformation is ${hasModalInformation}`, () => {
  //         it(`should return ${result}`, () => {
  //           expect(getClassName(shouldHighlight, hasModalInformation)).toBe(
  //             result
  //           );
  //         });
  //       });
  //     }
  //   );
  // });
});
