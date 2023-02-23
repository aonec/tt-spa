import NodeRelatedDevices from '01/tt-components/NodeRelatedDevices';
import { useEvent } from 'effector-react';
import React, { FC } from 'react';
import {
  AddHosuingMeteringDeviceContainer,
  addHosuingMeteringDeviceService,
} from '../addHosuingMeteringDeviceService';
import { ButtonSC } from './EditNodeRelatedDevices.styled';
import { EditNodeRelatedDevicesProps } from './EditNodeRelatedDevices.types';

export const EditNodeRelatedDevices: FC<EditNodeRelatedDevicesProps> = ({
  node,
}) => {
  const openAddHousingMeteringDeviceModal = useEvent(
    addHosuingMeteringDeviceService.inputs.openModal,
  );

  return (
    <>
      <NodeRelatedDevices node={node} edit={true} />
      <AddHosuingMeteringDeviceContainer />
      <ButtonSC
        type="ghost"
        onClick={() => openAddHousingMeteringDeviceModal(node)}
      >
        Добавить прибор
      </ButtonSC>
    </>
  );
};
