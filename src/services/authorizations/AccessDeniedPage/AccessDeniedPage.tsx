import React, { FC } from 'react';
import {
  Descripion,
  DescriptionWrapper,
  MailRef,
  Title,
  Wrapper,
} from './AccessDeniedPage.styled';
import { AccessDeniedPageProps } from './AccessDeniedPage.types';
import  Page403Icon  from './assets/403.svg?react';
import { Button } from 'ui-kit/Button';
import { useNavigate } from 'react-router-dom';
import { currentUserService } from 'services/currentUser/currentUserService';
import { useUnit } from 'effector-react';

export const AccessDeniedPage: FC<AccessDeniedPageProps> = () => {
  const navigate = useNavigate();

  const currentUser = useUnit(currentUserService.outputs.$currentUser);

  if (!currentUser) {
    return null;
  }

  return (
    <Wrapper>
      <Page403Icon />
      <Title>У вас нет доступа к запрашиваемым ресурсам </Title>
      <DescriptionWrapper>
        <Descripion>
          Если вы уверены, что это ошибка или недоразумение, то, пожалуйста,
          напишите нам в
          <MailRef href="mailto:support@aonec.ru"> службу поддержки. </MailRef>В
          письме не забудьте указать ссылку на страницу.
        </Descripion>
      </DescriptionWrapper>
      <Button onClick={() => navigate(-1)}>Вернуться назад</Button>
    </Wrapper>
  );
};
