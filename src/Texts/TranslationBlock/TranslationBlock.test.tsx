import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import TranslationBlock, { aggregateTranslations, getClassName } from './TranslationBlock';
import storyData from '../../fixtureData/story.data';
import { SentenceInterface } from '../../interfaces/index';

describe('TranslationBlock', () => {
  describe('the main component render', () => {
    const { sentences } = storyData.paragraphs[0];
    const block = { sentences };
    const idx = 127;
    const readTime = 3.1459;
    const showModal = () => {};
    const baseProps = { block, configuration: {}, idx, readTime, showModal };

    const renderer = ShallowRenderer.createRenderer();
    describe('with data but !isTranslationShown', () => {
      const configuration = {
        isTranslationShown: false,
        isTranslationBelow: false,
        isBySentence: false,
      };
      const props = {
        ...baseProps,
        configuration,
      };

      it('should render and match snapshot', () => {
        renderer.render(<TranslationBlock {...props} />);
        expect(renderer.getRenderOutput()).toBeNull();
      });
    });

    describe('with data and isTranslationShown', () => {
      const configuration = {
        isTranslationShown: true,
        isTranslationBelow: false,
        isBySentence: false,
      };
      const props = {
        ...baseProps,
        configuration,
      };

      it('should render and match snapshot', () => {
        renderer.render(<TranslationBlock {...props} />);
        expect(renderer.getRenderOutput()).toMatchSnapshot();
      });
    });
  });

  describe('aggregateTranslations', () => {
    const sentences = [
      { sentenceTranslation: 'This is sentence 1' },
      { sentenceTranslation: 'And this is the second one.' },
      { sentenceTranslation: 'Don\'t forget the last.' },
    ] as SentenceInterface[];
    const expectedReturn = 'This is sentence 1  And this is the second one.  Don\'t forget the last.';
    const actualReturn = aggregateTranslations(sentences);
    it('should return the correct aggregated string', () => {
      expect(actualReturn).toBe(expectedReturn);
    });
  });

  describe('getClassName', () => {
    describe('when isTranslationBelow', () => {
      const isTranslationBelow = true;
      const expectedReturn = 'TranslationBlock below';
      const actualReturn = getClassName(isTranslationBelow);
      it('should return the correct string', () => {
        expect(actualReturn).toBe(expectedReturn);
      });
    });

    describe('when !isTranslationBelow', () => {
      const isTranslationBelow = false;
      const expectedReturn = 'TranslationBlock beside';
      const actualReturn = getClassName(isTranslationBelow);
      it('should return the correct string', () => {
        expect(actualReturn).toBe(expectedReturn);
      });
    });
  });
});
