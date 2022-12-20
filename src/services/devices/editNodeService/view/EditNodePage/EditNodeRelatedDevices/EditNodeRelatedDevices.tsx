import NodeRelatedDevices from '01/tt-components/NodeRelatedDevices';
import ModalAddDevice from '01/_pages/EditNode/components/Modals/ModalAddDevice';
import React, { FC, useState } from 'react';
import { ButtonSC } from './EditNodeRelatedDevices.styled';
import { EditNodeRelatedDevicesProps } from './EditNodeRelatedDevices.types';

export const EditNodeRelatedDevices: FC<EditNodeRelatedDevicesProps> = ({
  node,
  magistrals,
  refetchNode,
}) => {
  const [isAddDeviceVisible, setIsAddDeviceVisible] = useState(false);

  return (
    <>
      <NodeRelatedDevices node={node} edit={true} />
      <ButtonSC type="ghost" onClick={() => setIsAddDeviceVisible(true)}>
        Добавить прибор
      </ButtonSC>
      <ModalAddDevice
        visible={isAddDeviceVisible}
        setVisible={setIsAddDeviceVisible}
        magistrals={magistrals}
        node={node!}
        refetchNode={() => refetchNode()}
      />
    </>
  );
};
