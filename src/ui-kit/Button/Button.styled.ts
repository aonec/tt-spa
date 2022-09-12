import styled from 'styled-components';
import { ButtonStyleType } from './Button.types';

const buttonBackgroundColorsDictionary: { [key in ButtonStyleType]: string } = {
  default: '#189ee9',
  danger: '#ff4545',
  white: '#ffffff',
};

const buttonShadowColorsDictionary: { [key in ButtonStyleType]: string } = {
  default: '#189ee940',
  danger: '#ff454540',
  white: '#f1f1f1',
};

const buttonFontColorsDictionary: { [key in ButtonStyleType]: string } = {
  default: 'white',
  danger: 'white',
  white: '#191b35',
};

const buttonBorderColorsDictionary: { [key in ButtonStyleType]: string } = {
  default: 'none',
  danger: 'none',
  white: '#dcdee4',
};

export const Wrapper = styled.div<{ type: ButtonStyleType }>`
  background-color: ${({ type }) => buttonBackgroundColorsDictionary[type]};
  color: ${({ type }) => buttonFontColorsDictionary[type]};
  cursor: pointer; 
  padding: 0 20px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  width: min-content;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  transition: 0.25s;
  border: 1px solid ${({ type }) => buttonBorderColorsDictionary[type]};
  user-select: none;

  &:hover {
    transform: translate(-4px, -4px);
    box-shadow: 4px 4px 0 ${({ type }) => buttonShadowColorsDictionary[type]};
  }

  &:active {
    transform: translate(-2px, -2px);
    box-shadow: 2px 2px 0 ${({ type }) => buttonShadowColorsDictionary[type]};
  }
`;
