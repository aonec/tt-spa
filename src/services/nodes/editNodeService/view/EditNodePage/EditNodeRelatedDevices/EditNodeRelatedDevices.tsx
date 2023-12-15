import { useUnit } from 'effector-react';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { EPipeNodeConfig } from 'api/types';

export const EditNodeRelatedDevices: FC<EditNodeRelatedDevicesProps> = ({
  node,
}) => {
  const navigate = useNavigate();

  const {
    openAddHousingMeteringDeviceModal,
    openDeleteHousingMeteringDeviceModal,
  } = useUnit({
    openAddHousingMeteringDeviceModal:
      addHosuingMeteringDeviceService.inputs.openModal,
    openDeleteHousingMeteringDeviceModal:
      deletePipeHousingMeteringDeviceService.inputs.openModal,
  });

  const isNodeConfigWithoutODPU =
    node.configuration === EPipeNodeConfig.HeatNoHousingMeteringDevice;

  return (
    <>
      <HousingMeteringDevicesList
        communicationPipes={node.communicationPipes || []}
        configuration={node.configuration}
        handleEditDevice={(deviceId) =>
          navigate(`/housingMeteringDevices/${deviceId}/edit`)
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
