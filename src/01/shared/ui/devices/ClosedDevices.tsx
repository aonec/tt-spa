import React from 'react';
import {
  $individualDevices,
  $isShownClosedDevices,
  hideClosedDevices,
  showClosedDevices,
} from '01/features/individualDevices/displayIndividualDevices/models';
import { useStore } from 'effector-react';
import { Checkbox } from 'antd';

const ClosedDevices = () => {
  const showClosed = useStore($isShownClosedDevices);
  const devices = useStore($individualDevices);

  const closedDevices = devices.filter((device) => device.closingDate !== null);

  return (
    <Checkbox
      checked={showClosed}
      onClick={() => (showClosed ? hideClosedDevices() : showClosedDevices())}
    >
      Показать закрытые ({closedDevices.length})
    </Checkbox>
  );
};

export default ClosedDevices;
