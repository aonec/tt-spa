import { DevicesReportModal } from '01/features/devicesReport';
import React, { useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { DevicesProfileTabsType } from './devicesPageService.types';
import { DevicesPageProfile } from './view/DevicesPageProfile';

export const DevicesPageContainer = () => {
  const { type } = useParams<{ type?: DevicesProfileTabsType }>();

  const history = useHistory();

  useEffect(() => {
    if (type) return;

    history.push(`/devices/${DevicesProfileTabsType.ODPU}`);
  }, [type, history]);

  const setDevicesType = useCallback(
    (type: DevicesProfileTabsType) => {
      history.push(`/devices/${type}`);
    },
    [history]
  );

  const handleAddNode = () => history.push('/devices/addNode');

  return (
    <>
      <DevicesReportModal />
      <DevicesPageProfile
        setDevicesType={setDevicesType}
        type={type}
        handleAddNode={handleAddNode}
      />
    </>
  );
};
