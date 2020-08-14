import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Texts, { TextsInterface, getClassName, spreadParagraphsIntoSentenceBlocks } from './Texts';
import storyData from '../fixtureData/story.data';
import paragraphsAsSentencesData from '../fixtureData/paragraphsAsSentences.data';

describe('Texts', () => {
  const { paragraphs } = storyData;
  describe('the main component render', () => {
    const readTime = 123.45;
    const showModal = () => {};

    const renderer = ShallowRenderer.createRenderer();

    describe('with no data, !isBySentence', () => {
      const props = {} as TextsInterface;
      it('should render and match snapshot', () => {
        renderer.render(<Texts {...props} />);
        expect(renderer.getRenderOutput()).toBeNull();
      });
    });

    describe('with data, !isBySentence', () => {
      const configuration = {
        isTranslationShown: false,
        isTranslationBelow: false,
        isBySentence: false,
      };
      const props = {
        paragraphs, readTime, showModal, configuration,
      };
      it('should render and match snapshot', () => {
        renderer.render(<Texts {...props} />);
        expect(renderer.getRenderOutput()).toMatchSnapshot();
      });
    });

    describe('with data, isBySentence', () => {
      const configuration = {
        isTranslationShown: false,
        isTranslationBelow: false,
        isBySentence: true,
      };
      const props = {
        paragraphs, readTime, showModal, configuration,
      };
      it('should render and match snapshot', () => {
        renderer.render(<Texts {...props} />);
        expect(renderer.getRenderOutput()).toMatchSnapshot();
      });
    });
  });

  describe('spreadParagraphsIntoSentenceBlocks', () => {
    const actualReturn = spreadParagraphsIntoSentenceBlocks(paragraphs);
    it('should return the correct array', () => {
      expect(actualReturn).toStrictEqual(paragraphsAsSentencesData);
    });
  });

  describe('getClassName', () => {
    describe('when isTranslationBelow', () => {
      const isTranslationBelow = true;
      describe('when idx is odd', () => {
        const idx = 1;
        const expectedReturn = 'block below ';
        const actualReturn = getClassName(isTranslationBelow, idx);
        it('should return the correct string', () => {
          expect(actualReturn).toBe(expectedReturn);
        });
      });

      describe('when idx is even', () => {
        const idx = 2;
        const expectedReturn = 'block below even';
        const actualReturn = getClassName(isTranslationBelow, idx);
        it('should return the correct string', () => {
          expect(actualReturn).toBe(expectedReturn);
        });
      });
    });
  });

  describe('when !isTranslationBelow', () => {
    const isTranslationBelow = false;
    describe('when idx is odd', () => {
      const idx = 1;
      const expectedReturn = 'block beside ';
      const actualReturn = getClassName(isTranslationBelow, idx);
      it('should return the correct string', () => {
        expect(actualReturn).toBe(expectedReturn);
      });
    });

    describe('when idx is even', () => {
      const idx = 2;
      const expectedReturn = 'block beside even';
      const actualReturn = getClassName(isTranslationBelow, idx);
      it('should return the correct string', () => {
        expect(actualReturn).toBe(expectedReturn);
      });
    });
  });
});
