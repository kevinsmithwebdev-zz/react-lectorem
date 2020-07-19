import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Paragraph, {
  getShouldHighlight,
  renderLect,
  TIME_CODE_FUDGE,
} from './Paragraph';
import storyData from '../../../fixture/storyData.json';

const mockParagraph = storyData.paragraphs[0];

describe('Paragraph', () => {
  describe('the main component render', () => {
    const renderer = new ShallowRenderer();
    describe('empty', () => {
      it('should render without crashing', () => {
        renderer.render(<Paragraph />);
        expect(renderer.getRenderOutput()).toMatchSnapshot();
      });
    });

    describe('with data', () => {
      const props = {
        paragraph: mockParagraph,
        idx: 123,
        readTime: 12.34,
        showModal: 'showModal123',
      };

      it('should render and match snapshot', () => {
        renderer.render(<Paragraph {...props} />);
        expect(renderer.getRenderOutput()).toMatchSnapshot();
      });
    });
  });

  describe('getShouldHighlight', () => {
    const lect = {
      start: 1000,
      end: 2000,
    };

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

  describe('renderLect', () => {
    const lect = mockParagraph.lects[0];
    const idx = 12;
    const readTime = 123;
    const showModal = 'showModal123';
    it('should render and match snapshot', () => {
      expect(renderLect(lect, idx, readTime, showModal)).toMatchSnapshot();
    });
  });
});
