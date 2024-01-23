import React, { FC } from 'react';
import {
  ButtonBlue,
  ButtonWhite,
  Buttons,
  Left,
  Right,
  Title,
  Wrapper,
} from './SavePhoneNumber.styled';
import { Tooltip } from 'ui-kit/shared/Tooltip';
import { SavePhoneNumberProps } from './SavePhoneNumber.types';

export const SavePhoneNumber: FC<SavePhoneNumberProps> = ({
  children,
  isOpen,
  handleSavePhoneNumber,
  handleReplacePhoneNumber,
  handleClosePhoneNumber,
}) => {
  return (
    <Tooltip
      open={isOpen}
      placement="topRight"
      title={
        <Wrapper>
          <Title>Хотите сохранить номер в профиле квартиры?</Title>

          <Buttons>
            <Left>
              <ButtonWhite onClick={() => handleClosePhoneNumber()}>
                Отмена
              </ButtonWhite>
            </Left>
            <Right>
              <ButtonWhite onClick={() => handleReplacePhoneNumber()}>
                Заменить
              </ButtonWhite>
              <ButtonBlue onClick={() => handleSavePhoneNumber()}>
                Сохранить
              </ButtonBlue>
            </Right>
          </Buttons>
        </Wrapper>
      }
    >
      {children}
    </Tooltip>
  );
};
