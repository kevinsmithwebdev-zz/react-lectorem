import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Modal, { renderLine } from './Modal';

const mockLect = {
  start: 1.23,
  end: 4.56,
  text: 'Hola.',
  translation: 'Hello.',
  explanation: 'This is how we say hello,',
};
describe('Modal', () => {
  describe('the main component render', () => {
    const renderer = new ShallowRenderer();
    describe('empty', () => {
      it('should render without crashing', () => {
        renderer.render(<Modal />);
        expect(renderer.getRenderOutput()).toBeNull();
      });
    });

    describe('with data', () => {
      const props = {
        data: mockLect,
        hideModal: 'hideModal123',
      };

      it('should render without crashing', () => {
        renderer.render(<Modal { ...props } />);
        expect(renderer.getRenderOutput()).toMatchSnapshot();
      });
    });
  });

  describe('renderLine', () => {
    describe('empty', () => {
      it('should render and not crash', () => {
        expect(renderLine()).toBe(false);
      });
    });
  });

  describe('renderLine', () => {
    describe('empty', () => {
      const label = 'label123';
      const thisData = 'thisData123';
      it('should render and not crash', () => {
        expect(renderLine(label, thisData)).toMatchSnapshot();
      });
    });
  });
});
