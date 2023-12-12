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
import { SavePhoneNumberProps } from './SavePhoneNumber.types';
import { Tooltip } from 'ui-kit/shared/Tooltip';

export const SavePhoneNumber: FC<SavePhoneNumberProps> = ({ children }) => {
  return (
    <Tooltip
      placement="topRight"
      title={
        <Wrapper>
          <Title>
            Вы обновили номер телефона. Хотите сохранить его в профиле квартиры?
          </Title>

          <Buttons>
            <Left>
              <ButtonWhite>Отмена</ButtonWhite>
            </Left>
            <Right>
              <ButtonWhite>Заменить</ButtonWhite>
              <ButtonBlue>Сохранить</ButtonBlue>
            </Right>
          </Buttons>
        </Wrapper>
      }
    >
      {children}
    </Tooltip>
  );
};
