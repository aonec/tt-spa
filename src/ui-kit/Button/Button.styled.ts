import styled from 'styled-components';
import { ButtonSizeType, ButtonStyleType } from './Button.types';

const buttonBackgroundColorsDictionary: { [key in ButtonStyleType]: string } = {
  default: '#189ee9',
  danger: '#ff4545',
  ghost: '#ffffff',
};

const buttonShadowColorsDictionary: { [key in ButtonStyleType]: string } = {
  default: '#189ee940',
  danger: '#ff454540',
  ghost: '#f1f1f1',
};

const buttonFontColorsDictionary: { [key in ButtonStyleType]: string } = {
  default: 'white',
  danger: 'white',
  ghost: '#191b35',
};

const buttonBorderColorsDictionary: { [key in ButtonStyleType]: string } = {
  default: 'none',
  danger: 'none',
  ghost: '#dcdee4',
};

const buttonSizesDictionary: {
  [key in ButtonSizeType]: {
    height: number;
    padding: number;
    fontSize: number;
  };
} = {
  middle: {
    height: 42,
    padding: 20,
    fontSize: 16,
  },
  small: {
    height: 30,
    padding: 14,
    fontSize: 13,
  },
};

export const Wrapper = styled.div<{
  type: ButtonStyleType;
  size: ButtonSizeType;
  disabled?: boolean;
}>`
  background-color: ${({ type }) => buttonBackgroundColorsDictionary[type]};
  color: ${({ type }) => buttonFontColorsDictionary[type]};
  padding: 0 ${({ size }) => buttonSizesDictionary[size].padding}px;
  border-radius: 4px;
  font-size: ${({ size }) => buttonSizesDictionary[size].fontSize}px;
  font-weight: 600;
  width: min-content;
  height: ${({ size }) => buttonSizesDictionary[size].height}px;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  transition: 0.25s;
  border: 1px solid ${({ type }) => buttonBorderColorsDictionary[type]};
  user-select: none;
  white-space: nowrap;

  &:not(.tt-button-disabled):hover {
    transform: translate(-4px, -4px);
    box-shadow: 4px 4px 0 ${({ type }) => buttonShadowColorsDictionary[type]};
  }

  &:not(.tt-button-disabled):active {
    transform: translate(-2px, -2px);
    box-shadow: 2px 2px 0 ${({ type }) => buttonShadowColorsDictionary[type]};
  }

  cursor: pointer;

  &.tt-button-disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const IconWrapper = styled.div`
  margin-left: 10px;
`;
