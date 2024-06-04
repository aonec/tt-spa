import React, { FC, useCallback } from 'react';
import { FallbackProps } from './Fallback.types';
import {
  ErrorBoundary,
  FallbackProps as FallbackRendererProps,
} from 'react-error-boundary';
import {
  AdditionalInfoText,
  ButtonSC,
  ErrorText,
  InfoText,
  PageWrapper,
} from './Fallback.styled';
import { message } from 'antd';
import FallbackImg from './assets/fallback.svg?react';

const DURATION_OF_MESSAGE = 5;

export const Fallback: FC<FallbackProps> = ({ children }) => {
  const fallbackRenderer = useCallback(
    ({ error }: FallbackRendererProps) => (
      <PageWrapper>
        <ErrorText>Упс! Что-то пошло не так :(</ErrorText>
        <AdditionalInfoText>
          Пожалуйста, обновите страницу или вернитесь позже
        </AdditionalInfoText>
        <InfoText
          onClick={() => {
            navigator.clipboard.writeText(
              `ErrorText: ${error}. URL:${window.location.pathname}`,
            );
            message.info(
              'Текст ошибки скопирован в буфер обмена. Сообщите об ошибке, приложив скопированный текст',
              DURATION_OF_MESSAGE,
            );
          }}
        >
          (Сведения об ошибке)
        </InfoText>
        <ButtonSC onClick={() => window.location.replace('/login')}>
          Обновить страницу
        </ButtonSC>
        <FallbackImg />
      </PageWrapper>
    ),
    [],
  );

  return (
    <ErrorBoundary fallbackRender={fallbackRenderer}>{children}</ErrorBoundary>
  );
};
