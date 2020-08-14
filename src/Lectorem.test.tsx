import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Lectorem, { createShowModal, createHideModal } from './Lectorem';
import storyData from './fixtureData/story.data';
import { StoryDataInterface } from './interfaces/index';

describe('Lectorem', () => {
  describe('the main component render', () => {
    const renderer = ShallowRenderer.createRenderer();

    describe('with data', () => {
      describe('with no data', () => {
        const props = {
          data: undefined as StoryDataInterface,
        };
        it('should render without crashing', () => {
          renderer.render(<Lectorem {...props} />);
          expect(renderer.getRenderOutput()).toMatchSnapshot();
        });
      });

      describe('with all data', () => {
        const props = {
          data: storyData,
          configuration: { isTranslationShown: false, isTranslationBelow: false, isBySentence: false },
        };
        it('should render without crashing', () => {
          renderer.render(<Lectorem {...props} />);
          expect(renderer.getRenderOutput()).toMatchSnapshot();
        });
      });

      describe('with all data except title and subtitle', () => {
        const props = {
          data: {
            ...storyData,
            title: undefined as string,
            subtitle: undefined as string,
          },
          configuration: { isTranslationShown: false, isTranslationBelow: false, isBySentence: false },
        };
        it('should render without crashing', () => {
          renderer.render(<Lectorem {...props} />);
          expect(renderer.getRenderOutput()).toMatchSnapshot();
        });
      });
    });
  });
  describe('createShowModal', () => {
    const setModalData = jest.fn();
    const showModal = createShowModal(setModalData);
    describe('the function it returns', () => {
      describe('when lect has translation but no explanation', () => {
        const lect = { translation: 'translation123' };
        beforeAll(() => {
          setModalData.mockReset();
          showModal(lect);
        });
        it('should call setModalData with correct lect', () => {
          expect(setModalData).toBeCalledWith(lect);
        });
      });

      describe('when lect no translation but has explanation', () => {
        const lect = { explanation: 'explanation123' };
        beforeAll(() => {
          setModalData.mockReset();
          showModal(lect);
        });
        it('should call setModalData with correct lect', () => {
          expect(setModalData).toBeCalledWith(lect);
        });
      });

      describe('when lect has neither translation nor explanation', () => {
        const lect = { other: 'data' };
        beforeAll(() => {
          setModalData.mockReset();
          showModal(lect);
        });
        it('should call not call setModalData ', () => {
          expect(setModalData).not.toBeCalled();
        });
      });
    });
  });

  describe('createHideModal', () => {
    const setModalData = jest.fn();
    const hideModal = createHideModal(setModalData);
    describe('the function it returns', () => {
      beforeAll(() => {
        setModalData.mockReset();
        hideModal();
      });
      it('should call setModalData with null', () => {
        expect(setModalData).toBeCalledWith(null);
      });
    });
  });
});
