import { useEvent } from 'effector-react';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import {
  DeletePipeHousingMeteringDeviceContainer,
  deletePipeHousingMeteringDeviceService,
} from 'services/devices/deletePipeHousingMeteringDeviceService';
import { HousingMeteringDevicesList } from 'services/nodes/nodeProfileService/view/NodeProfilePage/HousingMeteringDevicesList';
import {
  AddHosuingMeteringDeviceContainer,
  addHosuingMeteringDeviceService,
} from '../addHosuingMeteringDeviceService';
import { CreateDeviceText } from './EditNodeRelatedDevices.styled';
import { EditNodeRelatedDevicesProps } from './EditNodeRelatedDevices.types';
import { EPipeNodeConfig } from 'myApi';

export const EditNodeRelatedDevices: FC<EditNodeRelatedDevicesProps> = ({
  node,
}) => {
  const history = useHistory();

  const openAddHousingMeteringDeviceModal = useEvent(
    addHosuingMeteringDeviceService.inputs.openModal,
  );
  const openDeleteHousingMeteringDeviceModal = useEvent(
    deletePipeHousingMeteringDeviceService.inputs.openModal,
  );

  const isNodeConfigWithoutODPU =
    node.configuration === EPipeNodeConfig.HeatNoHousingMeteringDevice;

  return (
    <>
      <HousingMeteringDevicesList
        communicationPipes={node.communicationPipes || []}
        configuration={node.configuration}
        handleEditDevice={(deviceId) =>
          history.push(`/housingMeteringDevices/${deviceId}/edit`)
        }
        handleDeleteDevice={(device) =>
          openDeleteHousingMeteringDeviceModal(device)
        }
      />
      <AddHosuingMeteringDeviceContainer />
      <DeletePipeHousingMeteringDeviceContainer />
      {!isNodeConfigWithoutODPU && (
        <CreateDeviceText
          onClick={() => openAddHousingMeteringDeviceModal(node)}
        >
          + Добавить прибор
        </CreateDeviceText>
      )}
    </>
  );
};
