import React, { FC, useState } from 'react';
import { Button } from 'ui-kit/Button';
import { LinkButton } from 'ui-kit/shared_components/LinkButton';
import { Title } from 'ui-kit/Title';
import { Footer } from '../CreateNodePage.styled';
import { ConnectedDevicesProps } from './ConnectedDevices.types';
import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { Empty } from 'antd';
import { addConnectedCommonDevicesService } from './ConnectedDevices.models';
import { useEvent } from 'effector-react';
import { AddPipeNodeCommonDeviceContainer } from 'services/nodes/addPipeNodeCommonDeviceService';
import { CommunicationPipePayload } from 'services/nodes/addPipeNodeCommonDeviceService/addPipeNodeCommonDeviceService.types';

const { inputs } = addConnectedCommonDevicesService;

export const ConnectedDevices: FC<ConnectedDevicesProps> = ({
  goPrevStep,
  requestPayload,
}) => {
  const openAddCommonDeviceModal = useEvent(inputs.openAddCommonDeviceModal);

  const [communicationPipes, setCommunicationPipes] = useState<
    CommunicationPipePayload[]
  >([]);

  const { resource } = requestPayload;

  const handleAddCommunicationPipe = (
    communicationPipe: CommunicationPipePayload
  ) => {
    setCommunicationPipes((prev) => [...prev, communicationPipe]);
  };

  return (
    <>
      {resource && (
        <AddPipeNodeCommonDeviceContainer
          handleAddCommunicationPipe={handleAddCommunicationPipe}
          resource={resource}
          communicationPipes={communicationPipes}
        />
      )}
      <div>
        <Title>Подключенные приборы</Title>
        <Empty
          description="Нет подключённых приборов"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
        <SpaceLine noTop />
        <LinkButton onClick={() => openAddCommonDeviceModal()}>
          + Добавить прибор
        </LinkButton>
        <Footer>
          <Button type="ghost" onClick={goPrevStep}>
            Назад
          </Button>
          <Button sidePadding={20}>Создать узел</Button>
        </Footer>
      </div>
    </>
  );
};
