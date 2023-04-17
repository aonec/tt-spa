import React, { FC } from 'react';
import { ClosedEyeIcon, EyeIcon } from 'ui-kit/icons';
import { TextWrapper, Wrapper } from './ToggleWithText.styled';
import { ToggleWithTextProps } from './ToggleWithText.types';

export const ToggleWithText: FC<ToggleWithTextProps> = ({
  closeText,
  isOpen,
  openText,
  handleClose,
  handleOpen,
}) => {
  return (
    <>
      {!isOpen && (
        <Wrapper onClick={handleOpen}>
          <EyeIcon />
          <TextWrapper>{openText}</TextWrapper>
        </Wrapper>
      )}
      {isOpen && (
        <Wrapper onClick={handleClose}>
          <ClosedEyeIcon />
          <TextWrapper>{closeText}</TextWrapper>
        </Wrapper>
      )}
    </>
  );
};
