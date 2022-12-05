import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import React, { FC } from 'react';
import { Button } from 'ui-kit/Button';
import { LinkButton } from 'ui-kit/shared_components/LinkButton';
import { Title } from 'ui-kit/Title';
import { Footer } from '../CreateNodePage.styled';
import { ConnectedDevicesProps } from './ConnectedDevices.types';

export const ConnectedDevices: FC<ConnectedDevicesProps> = ({ goPrevStep }) => {
  return (
    <div>
      <Title>Подключенные приборы</Title>
      <SpaceLine />
      <LinkButton onClick={() => {}}>+ Добавить прибор</LinkButton>
      <Footer>
        <Button type="ghost" onClick={goPrevStep}>
          Назад
        </Button>
        <Button sidePadding={20}>Создать узел</Button>
      </Footer>
    </div>
  );
};
