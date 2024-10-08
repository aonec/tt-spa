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
  handleReplacePhoneNumber,
  handleClosePhoneNumber,
}) => {
  return (
    <Tooltip
      open={isOpen}
      placement="topRight"
      title={
        <Wrapper>
          <Title>
            Сохранить номер телефона как основной в профиле картиры?
          </Title>

          <Buttons>
            <Left>
              <ButtonWhite onClick={() => handleClosePhoneNumber()}>
                Отмена
              </ButtonWhite>
            </Left>
            <Right>
              <ButtonBlue onClick={() => handleReplacePhoneNumber()}>
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
