import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import TextBlock from './TextBlock';
import storyData from '../../fixtureData/story.data';

describe('TextBlock', () => {
  describe('the main component render', () => {
    const { sentences } = storyData.paragraphs[0];
    const configuration = {
      isTranslationShown: true,
      isTranslationBelow: true,
      isBySentence: true,
    };
    const renderer = ShallowRenderer.createRenderer();
    describe('with data', () => {
      const props = {
        block: { sentences },
        configuration,
        idx: 127,
        readTime: 3.1459,
        showModal: () => {},
      };

      it('should render and match snapshot', () => {
        renderer.render(<TextBlock {...props} />);
        expect(renderer.getRenderOutput()).toMatchSnapshot();
      });
    });
  });
});
