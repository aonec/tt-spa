import React, { useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { DevicesProfileTabsType } from './devicesPageService.types';
import { DevicesPageProfile } from './view/DevicesPageProfile';
import { ESecuredIdentityRoleName } from 'api/myApi';
import { usePermission } from 'hooks/usePermission';
import { useEvent } from 'effector-react';
import {
  DevicesReportContainer,
  devicesReportService,
} from '../devicesReportService';

export const DevicesPageContainer = () => {
  const { type } = useParams<{ type?: DevicesProfileTabsType }>();

  const history = useHistory();

  const openDownloadDevicesReportModal = useEvent(
    devicesReportService.inputs.openModal,
  );

  const isPermitionToAddNode = usePermission([
    ESecuredIdentityRoleName.Administrator,
    ESecuredIdentityRoleName.ManagingFirmExecutor,
  ]);

  useEffect(() => {
    if (type) return;

    history.push(`/devices/${DevicesProfileTabsType.ODPU}`);
  }, [type, history]);

  const setDevicesType = useCallback(
    (type: DevicesProfileTabsType) => {
      history.push(`/devices/${type}`);
    },
    [history],
  );

  const handleAddNode = () => history.push('/devices/addNode');

  return (
    <>
      <DevicesReportContainer />
      <DevicesPageProfile
        setDevicesType={setDevicesType}
        type={type}
        handleAddNode={handleAddNode}
        isPermitionToAddNode={isPermitionToAddNode}
        openDownloadDevicesReportModal={openDownloadDevicesReportModal}
      />
    </>
  );
};
