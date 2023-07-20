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
import {
  CreatePipeHousingMeteringDeviceInNodeRequest,
  EPipeNodeConfig,
} from 'api/myApi';
import {
  ButtonSC,
  CommunicationPipesListWrapper,
} from './ConnectedDevices.styled';
import { CommunicationPipeListItem } from './CommunicationPipeListItem';

const { inputs } = addConnectedCommonDevicesService;

export const ConnectedDevices: FC<ConnectedDevicesProps> = ({
  goPrevStep,
  requestPayload,
  updateRequestPayload,
  validateNode,
  isValidationLoading,
}) => {
  const openAddCommonDeviceModal = useEvent(inputs.openAddCommonDeviceModal);

  const [communicationPipes, setCommunicationPipes] = useState<
    CommunicationPipePayload[]
  >(requestPayload?.communicationPipes || []);

  const { configuration } = requestPayload;

  const isNodeConfigWithoutODPU =
    configuration === EPipeNodeConfig.HeatNoHousingMeteringDevice;

  const handleAddCommunicationPipe = (
    communicationPipe: CommunicationPipePayload,
  ) => {
    setCommunicationPipes((prev) => [...prev, communicationPipe]);
  };

  const handleAddDevice = (device: CreateCommonDevicePartitial) => {
    const pipeId = String(device.pipeId);

    const newDevice = omit(
      device,
      'pipeId',
    ) as CreatePipeHousingMeteringDeviceInNodeRequest;

    setCommunicationPipes((pipes) =>
      pipes.map((pipe) => {
        if (pipe.id !== pipeId) return pipe;

        const pipeDevices = pipe.devices || [];

        return {
          ...pipe,
          devices: [...pipeDevices, newDevice],
        };
      }),
    );
  };

  useEffect(
    () => inputs.handleMeteringDeviceCreated.watch(handleAddDevice).unsubscribe,
    [],
  );

  useEffect(() => {
    updateRequestPayload({ communicationPipes });
  }, [communicationPipes, updateRequestPayload]);

  const handleDeletePipe = (pipeId: string) => {
    setCommunicationPipes((prev) => prev.filter((elem) => elem.id !== pipeId));
  };

  const handleDeleteDevice = (pipeId: string, deviceIndex: number) => {
    setCommunicationPipes((prev) =>
      prev.map((pipe) => {
        if (pipe.id !== pipeId) return pipe;

        return {
          ...pipe,
          devices: pipe.devices?.filter((_, index) => index !== deviceIndex),
        };
      }),
    );
  };

  return (
    <>
      {configuration && (
        <AddPipeNodeCommonDeviceContainer
          handleAddCommunicationPipe={handleAddCommunicationPipe}
          configuration={configuration}
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
        {Boolean(communicationPipes.length) && configuration && (
          <CommunicationPipesListWrapper>
            {communicationPipes.map((pipe) => (
              <CommunicationPipeListItem
                configuration={configuration}
                key={pipe.id}
                pipe={pipe}
                handleDeletePipe={handleDeletePipe}
                handleDeleteDevice={handleDeleteDevice}
                isNodeConfigWithoutODPU={isNodeConfigWithoutODPU}
              />
            ))}
          </CommunicationPipesListWrapper>
        )}
        {!isNodeConfigWithoutODPU && (
          <LinkButton onClick={() => openAddCommonDeviceModal()}>
            + Добавить прибор
          </LinkButton>
        )}
        <Footer>
          <Button type="ghost" onClick={goPrevStep}>
            Назад
          </Button>
          <ButtonSC onClick={validateNode}>Создать узел</ButtonSC>
        </Footer>
      </div>
    </>
  );
};
