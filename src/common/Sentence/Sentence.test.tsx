import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Sentence, { getShouldHighlight, aggregateSentence, renderLect, TIME_CODE_FUDGE } from './Sentence';
import storyData from '../../fixtureData/story.data';
import { LectInterface } from '../../interfaces/index';

const mockSentence = storyData.paragraphs[0].sentences[0];

describe('Sentence', () => {
  describe('the main component render', () => {
    const baseProps = {
      sentence: mockSentence,
      readTime: 12.34,
      showModal: () => {},
      configuration: {
        isBySentence: false,
        isTranslationShown: false,
        isTranslationBelow: false,
      },
    };

    const renderer = ShallowRenderer.createRenderer();

    describe('with data', () => {
      it('should render and match snapshot', () => {
        renderer.render(<Sentence {...baseProps} />);
        expect(renderer.getRenderOutput()).toMatchSnapshot();
      });
    });

    describe('with data, isTranslationShown', () => {
      it('should render and match snapshot', () => {
        renderer.render(<Sentence { ...baseProps } configuration={ { ...baseProps.configuration, isTranslationShown: true } }/>);
        expect(renderer.getRenderOutput()).toMatchSnapshot();
      });
    });

    describe('with data, isTranslationBelow', () => {
      it('should render and match snapshot', () => {
        renderer.render(<Sentence { ...baseProps } configuration={ { ...baseProps.configuration, isTranslationBelow: true } }/>);
        expect(renderer.getRenderOutput()).toMatchSnapshot();
      });
    });
  });

  describe('getShouldHighlight', () => {
    const lect = {
      text: 'text123',
      start: 1000,
      end: 2000,
    };

    describe('when readTime does not exist', () => {
      const readTime = undefined as unknown as number;
      it('should return false', () => {
        expect(getShouldHighlight(lect, readTime)).toBe(false);
      });
    });

    describe('when lect does not exist', () => {
      const readTime = 123;
      it('should return false', () => {
        expect(getShouldHighlight(undefined as unknown as LectInterface, readTime)).toBe(false);
      });
    });

    describe('when start does not exist', () => {
      const readTime = 123;
      it('should return false', () => {
        expect(getShouldHighlight({ ...lect, start: undefined } as LectInterface, readTime)).toBe(false);
      });
    });

    describe('when end does not exist', () => {
      const readTime = 123;
      it('should return false', () => {
        expect(getShouldHighlight({ ...lect, end: undefined } as LectInterface, readTime)).toBe(false);
      });
    });

    describe('when readTime is well before start', () => {
      const readTime = lect.start - TIME_CODE_FUDGE * 2;
      it('should return false', () => {
        expect(getShouldHighlight(lect, readTime)).toBe(false);
      });
    });

    describe('when readTime is before start but within fudge', () => {
      const readTime = lect.start - TIME_CODE_FUDGE / 2;
      it('should return true', () => {
        expect(getShouldHighlight(lect, readTime)).toBe(true);
      });
    });

    describe('when readTime is well within start and stop', () => {
      const readTime = lect.start + (lect.end - lect.start) / 2;
      it('should return true', () => {
        expect(getShouldHighlight(lect, readTime)).toBe(true);
      });
    });

    describe('when readTime is after start but within fudge', () => {
      const readTime = lect.end + TIME_CODE_FUDGE / 2;
      it('should return true', () => {
        expect(getShouldHighlight(lect, readTime)).toBe(true);
      });
    });

    describe('when readTime is well after end', () => {
      const readTime = lect.end + TIME_CODE_FUDGE * 2;
      it('should return false', () => {
        expect(getShouldHighlight(lect, readTime)).toBe(false);
      });
    });
  });

  describe('aggregateSentence', () => {
    it('should return the correct string', () => {
      const expectedString = ' Frère Jacques.';
      expect(aggregateSentence(mockSentence)).toBe(expectedString);
    });
  });

  describe('renderLect', () => {
    describe('if should be highlighted', () => {
      const mockLect = mockSentence.lects[0];
      const readTime = mockLect.start as number + TIME_CODE_FUDGE / 2;
      const functionProps = {
        idx: 12,
        isLast: false,
        lect: mockLect,
        originalSentence: 'original sentence 123',
        readTime,
        sentenceTranslation: 'sentence translation 123',
        showModal: () => {},
      }
      it('should render and match snapshot', () => {
        expect(renderLect(functionProps)).toMatchSnapshot();
      });
    });

    describe('if should not be highlighted', () => {
      const mockLect = mockSentence.lects[0];
      const readTime = mockLect.end as number + TIME_CODE_FUDGE * 2;
      const functionProps = {
        idx: 12,
        isLast: false,
        lect: mockLect,
        originalSentence: 'original sentence 123',
        readTime,
        sentenceTranslation: 'sentence translation 123',
        showModal: () => {},
      }
      it('should render and match snapshot', () => {
        expect(renderLect(functionProps)).toMatchSnapshot();
      });
    });
  });
});
