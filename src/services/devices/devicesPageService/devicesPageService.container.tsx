import { DevicesReportModal } from '01/features/devicesReport';
import React, { useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { DevicesProfileTabsType } from './devicesPageService.types';
import { DevicesPageProfile } from './view/DevicesPageProfile';
import { useStore } from 'effector-react';
import { currentUserService } from 'services/currentUserService';
import _ from 'lodash';
import { ESecuredIdentityRoleName } from 'myApi';

export const DevicesPageContainer = () => {
  const { type } = useParams<{ type?: DevicesProfileTabsType }>();

  const history = useHistory();

  const userRoles = useStore(currentUserService.outputs.$currentUserRoles);
  const userRolesKeys = userRoles.map((e) => e.key);
  const isPermitionToAddNode = Boolean(
    _.intersection(userRolesKeys, [
      ESecuredIdentityRoleName.Administrator,
      ESecuredIdentityRoleName.ManagingFirmExecutor,
    ]).length,
  );

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
      <DevicesReportModal />
      <DevicesPageProfile
        setDevicesType={setDevicesType}
        type={type}
        handleAddNode={handleAddNode}
        isPermitionToAddNode={isPermitionToAddNode}
      />
    </>
  );
};
