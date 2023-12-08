import React, { useCallback, useEffect } from 'react';
import {  useNavigate, useParams } from 'react-router';
import { DevicesProfileTabsType } from './devicesPageService.types';
import { DevicesPageProfile } from './view/DevicesPageProfile';
import { ESecuredIdentityRoleName } from 'api/types';
import { usePermission } from 'hooks/usePermission';
import { useEvent } from 'effector-react';
import {
  DevicesReportContainer,
  devicesReportService,
} from '../devicesReportService';

export const DevicesPageContainer = () => {
  const { type } = useParams<{ type?: DevicesProfileTabsType }>();

  const navigate =  useNavigate();

  const openDownloadDevicesReportModal = useEvent(
    devicesReportService.inputs.openModal,
  );

  const isPermitionToAddNode = usePermission([
    ESecuredIdentityRoleName.Administrator,
    ESecuredIdentityRoleName.ManagingFirmExecutor,
    ESecuredIdentityRoleName.ManagingFirmSpectatingAdministrator,
  ]);

  useEffect(() => {
    if (type) return;

     navigate(`/devices/${DevicesProfileTabsType.ODPU}`);
  }, [type, navigate]);

  const setDevicesType = useCallback(
    (type: DevicesProfileTabsType) => {
       navigate(`/devices/${type}`);
    },
    [navigate],
  );

  const handleAddNode = () =>  navigate('/devices/addNode');

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
