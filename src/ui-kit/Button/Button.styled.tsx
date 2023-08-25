import styled from 'styled-components';
import { Button as ButtonAntd } from 'antd';
import { ButtonSizeType, ButtonStyleType } from './Button.types';

const typesOfButton: {
  [key in ButtonStyleType]: {
    mainColor: string;
    fontColor: string;
    shadowColor: string;
    borderColor: string;
  };
} = {
  primary: {
    mainColor: '#189EE9',
    fontColor: 'white',
    shadowColor: '#189EE940',
    borderColor: 'none',
  },
  danger: {
    mainColor: '#ff4545',
    fontColor: 'white',
    shadowColor: '#ff454540',
    borderColor: 'none',
  },
  ghost: {
    mainColor: 'transparent',
    fontColor: '#191b35',
    shadowColor: '#00000014',
    borderColor: '#dcdee4',
  },
};

const sizesOfButton: {
  [key in ButtonSizeType]: {
    height: number;
    padding: number;
    fontSize: number;
  };
} = {
  middle: {
    height: 48,
    padding: 20,
    fontSize: 16,
  },
  small: {
    height: 32,
    padding: 14,
    fontSize: 13,
  },
};

export const IconWrapper = styled.div`
  margin-left: 10px;
`;

interface Button {
  btnType: ButtonStyleType;
  size: ButtonSizeType;
  floating?: boolean;
}

export const ButtonSC = styled(ButtonAntd)<Button>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ floating }) => (floating ? '100%' : 'min-content')};

  border-radius: 4px;
  font-weight: 600;

  white-space: nowrap;
  transition: 0.25s;

  &:not(&[disabled]):hover {
    transform: translate(-4px, -4px);
    box-shadow: 4px 4px 0px
      ${({ btnType }) => typesOfButton[btnType].shadowColor};
  }

  &:not(&[disabled]):active {
    transform: translate(-2px, -2px);
    box-shadow: 2px 2px 0px
      ${({ btnType }) => typesOfButton[btnType].shadowColor};
  }

  padding: 0 ${({ size }) => sizesOfButton[size].padding}px;
  height: ${({ size }) => sizesOfButton[size].height}px;
  font-size: ${({ size }) => sizesOfButton[size].fontSize}px;

  &,
  &:hover,
  &:active,
  &:focus,
  &[disabled],
  &[disabled]:hover,
  &[disabled]:active {
    border: none;
    border: 1px solid ${({ btnType }) => typesOfButton[btnType].borderColor};
    background-color: ${({ btnType }) => typesOfButton[btnType].mainColor};
    color: ${({ btnType }) => typesOfButton[btnType].fontColor};

    svg {
      path {
        fill: ${({ btnType }) => typesOfButton[btnType].fontColor};
      }
    }
  }

  &[disabled] {
    opacity: 0.6;
  }
`;
