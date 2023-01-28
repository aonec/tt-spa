import React, { FC } from 'react';
import {
  Description,
  EmailTextWrapper,
} from './SendReportToEmailDescription.styled';
import { SendReportToEmailDescriptionProps } from './SendReportToEmailDescription.types';

export const SendReportToEmailDescription: FC<SendReportToEmailDescriptionProps> = ({
  email,
}) => {
  return (
    <>
      <p>
        Объём данных слишком большой для прямого скачивания. Мы отправим вам
        архив с отчётом на почту, которую вы указали при регистрации
        <EmailTextWrapper>{email}</EmailTextWrapper>
      </p>
      <Description>
        Вы можете указать другую почту для получения отчёта.
      </Description>
    </>
  );
};
