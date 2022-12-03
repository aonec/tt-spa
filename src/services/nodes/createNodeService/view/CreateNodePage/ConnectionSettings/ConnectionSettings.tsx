import React, { FC } from 'react';
import { Button } from 'ui-kit/Button';
import { Title } from 'ui-kit/Title';
import { Footer } from '../CreateNodePage.styled';
import { Wrapper } from './ConnectionSettings.styled';
import { ConnectionSettingsProps } from './ConnectionSettings.types';

export const ConnectionSettings: FC<ConnectionSettingsProps> = ({
  goPrevStep,
}) => {
  return (
    <div>
      <Title>Настройки соединения</Title>
      <Wrapper></Wrapper>
      <Footer>
        <Button type="ghost" onClick={goPrevStep}>
          Назад
        </Button>
        <Button sidePadding={20}>Даллее</Button>
      </Footer>
    </div>
  );
};
