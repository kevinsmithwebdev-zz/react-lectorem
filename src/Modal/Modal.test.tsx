import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Modal, { renderLine, ModalInterface } from './Modal';

const mockLectData = {
  originalSentence: '1.23',
  end: 4.56,
  text: 'Hola.',
  translation: 'Hello.',
  explanation: 'This is how we say hello,',
};
const mockModalData = {
  ...mockLectData,
  originalSentence: 'original123',
  sentenceTranslation: 'translation123'
}
describe('Modal', () => {
  describe('the main component render', () => {
    const renderer = ShallowRenderer.createRenderer();
    describe('empty', () => {
      it('should render without crashing', () => {
        const props = {} as ModalInterface;
        renderer.render(<Modal {...props} />);
        expect(renderer.getRenderOutput()).toBeNull();
      });
    });

    describe('with data', () => {
      const props = {
        data: mockModalData,
        hideModal: () => {},
      };

      it('should render without crashing', () => {
        renderer.render(<Modal { ...props } />);
        expect(renderer.getRenderOutput()).toMatchSnapshot();
      });
    });
  });

  describe('renderLine', () => {
    describe('without label', () => {
      const label = undefined as string;
      const thisData = 'data123';
      it('should render and not crash', () => {
        expect(renderLine(label, thisData)).toBe(false);
      });
    });

    describe('without thisData', () => {
      const label = 'label123';
      const thisData = undefined as string;
      it('should render and not crash', () => {
        expect(renderLine(label, thisData)).toBe(false);
      });
    });

    describe('with data', () => {
      const label = 'label123';
      const thisData = 'thisData123';
      it('should render and not crash', () => {
        expect(renderLine(label, thisData)).toMatchSnapshot();
      });
    });
  });
});
