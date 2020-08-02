import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Paragraphs from './Paragraphs';

describe('Paragraphs', () => {
  describe('the main component render', () => {
    const renderer = new ShallowRenderer();
    describe('empty', () => {
      it('should render without crashing', () => {
        renderer.render(<Paragraphs />);
        expect(renderer.getRenderOutput()).toBeNull();
      });
    });

    describe('with data', () => {
      it('should match snapshot', () => {
        const props = {
          paragraphs: ['p1', 'p2', 'p3'],
          readTime: 'readTime123',
          showModal: 'showModal123',
        };
        renderer.render(<Paragraphs { ...props } />);
        expect(renderer.getRenderOutput()).toMatchSnapshot();
      });
    });
  });
});
