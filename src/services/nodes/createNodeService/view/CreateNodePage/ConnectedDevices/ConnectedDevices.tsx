import React, { FC, useEffect, useState } from 'react';
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
import {
  CommunicationPipePayload,
  CreateCommonDevicePartitial,
} from 'services/nodes/addPipeNodeCommonDeviceService/addPipeNodeCommonDeviceService.types';
import { omit } from 'lodash';
import { CreatePipeHousingMeteringDeviceInNodeRequest } from 'myApi';
import { CommunicationPipesListWrapper } from './ConnectedDevices.styled';
import { CommunicationPipeListItem } from './CommunicationPipeListItem';

const { inputs } = addConnectedCommonDevicesService;

export const ConnectedDevices: FC<ConnectedDevicesProps> = ({
  goPrevStep,
  requestPayload,
  updateRequestPayload,
  openConfiramtionModal,
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

  const handleAddDevice = (device: CreateCommonDevicePartitial) => {
    const pipeId = device.pipeId;

    const newDevice = omit(
      device,
      'pipeId'
    ) as CreatePipeHousingMeteringDeviceInNodeRequest;

    setCommunicationPipes((pipes) =>
      pipes.map((pipe) => {
        if (pipe.id !== pipeId) return pipe;

        const pipeDevices = pipe.devices || [];

        return {
          ...pipe,
          devices: [...pipeDevices, newDevice],
        };
      })
    );
  };

  useEffect(
    () => inputs.handleMeteringDeviceCreated.watch(handleAddDevice).unsubscribe,
    []
  );

  useEffect(() => {
    if (requestPayload.communicationPipes) {
      setCommunicationPipes(requestPayload.communicationPipes);
    }
  }, []);

  useEffect(() => {
    updateRequestPayload({ communicationPipes });
  }, [communicationPipes]);

  const handleDeletePipe = (pipeId: number) => {
    setCommunicationPipes((prev) => prev.filter((elem) => elem.id !== pipeId));
  };

  const handleDeleteDevice = (pipeId: number, deviceIndex: number) => {
    setCommunicationPipes((prev) =>
      prev.map((pipe) => {
        if (pipe.id !== pipeId) return pipe;

        return {
          ...pipe,
          devices: pipe.devices?.filter((_, index) => index !== deviceIndex),
        };
      })
    );
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
        {!communicationPipes.length && (
          <>
            <Empty
              description="Нет подключённых приборов"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
            <SpaceLine noTop />
          </>
        )}
        {Boolean(communicationPipes.length) && resource && (
          <CommunicationPipesListWrapper>
            {communicationPipes.map((pipe) => (
              <CommunicationPipeListItem
                resource={resource}
                key={pipe.id}
                pipe={pipe}
                handleDeletePipe={handleDeletePipe}
                handleDeleteDevice={handleDeleteDevice}
              />
            ))}
          </CommunicationPipesListWrapper>
        )}
        <LinkButton onClick={() => openAddCommonDeviceModal()}>
          + Добавить прибор
        </LinkButton>
        <Footer>
          <Button type="ghost" onClick={goPrevStep}>
            Назад
          </Button>
          <Button sidePadding={20} onClick={openConfiramtionModal}>
            Создать узел
          </Button>
        </Footer>
      </div>
    </>
  );
};
