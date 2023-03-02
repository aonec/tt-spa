import { useEvent } from 'effector-react';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import {
  DeleteHousingMeteringDeviceContainer,
  deleteHousingMeteringDeviceService,
} from 'services/devices/editNodeService/deleteHousingMeteringDeviceService';
import { HousingMeteringDevicesList } from 'services/nodes/nodeProfileService/view/NodeProfilePage/HousingMeteringDevicesList';
import {
  AddHosuingMeteringDeviceContainer,
  addHosuingMeteringDeviceService,
} from '../addHosuingMeteringDeviceService';
import { CreateDeviceText } from './EditNodeRelatedDevices.styled';
import { EditNodeRelatedDevicesProps } from './EditNodeRelatedDevices.types';

export const EditNodeRelatedDevices: FC<EditNodeRelatedDevicesProps> = ({
  node,
}) => {
  const history = useHistory();

  const openAddHousingMeteringDeviceModal = useEvent(
    addHosuingMeteringDeviceService.inputs.openModal,
  );
  const openDeleteHousingMeteringDeviceModal = useEvent(
    deleteHousingMeteringDeviceService.inputs.openModal,
  );

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
      <DeleteHousingMeteringDeviceContainer />
      <CreateDeviceText onClick={() => openAddHousingMeteringDeviceModal(node)}>
        + Добавить прибор
      </CreateDeviceText>
    </>
  );
};
