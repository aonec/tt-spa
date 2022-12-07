import React, { FC } from 'react';
import { Button } from 'ui-kit/Button';
import { LinkButton } from 'ui-kit/shared_components/LinkButton';
import { Title } from 'ui-kit/Title';
import { Footer } from '../CreateNodePage.styled';
import { ConnectedDevicesProps } from './ConnectedDevices.types';
import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { Empty } from 'antd';

export const ConnectedDevices: FC<ConnectedDevicesProps> = ({
  goPrevStep,
  openAddCommonDeviceModal,
}) => {
  return (
    <div>
      <Title>Подключенные приборы</Title>
      <Empty
        description="Нет подключённых приборов"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
      <SpaceLine noTop />
      <LinkButton onClick={openAddCommonDeviceModal}>
        + Добавить прибор
      </LinkButton>
      <Footer>
        <Button type="ghost" onClick={goPrevStep}>
          Назад
        </Button>
        <Button sidePadding={20}>Создать узел</Button>
      </Footer>
    </div>
  );
};
