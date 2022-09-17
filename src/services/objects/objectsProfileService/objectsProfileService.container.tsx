import GroupReport from '01/features/groupReport';
import { setGroupStatus } from '01/features/groupReport/models/groupReportReducer';
import { useAppDispatch } from '01/Redux/store';
import { useEvent } from 'effector-react';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ChooseTypeOfResourceDisconnectionModalContainer } from 'services/resources/chooseTypeOfResourceDisconnectionModalService';
import { chooseTypeOfResourceDisconnectionModalService } from 'services/resources/chooseTypeOfResourceDisconnectionModalService/chooseTypeOfResourceDisconnectionModalService.model';
import {
  CreateResourceDisconnectionContainer,
  createResourceDisconnectionService,
} from 'services/resources/createResourceDisconnectionService';
import { SearchType } from './objectsProfileService.types';
import { ObjectsProfile } from './view/ObjectsProfile';

export const ObjectsProfileContainer = () => {
  const { searchType } = useParams<{ searchType?: SearchType }>();

  const history = useHistory();

  const dispatch = useAppDispatch();
  const handleExportGroupReport = () => dispatch(setGroupStatus('reportForm'));
  const handleOpenChooseResourceDisconnectionModal = useEvent(
    chooseTypeOfResourceDisconnectionModalService.inputs.openModal
  );

  useEffect(() => {
    if (!searchType) {
      history.push(`/objects/${SearchType.Houses}`);
    }
  }, [searchType]);

  return (
    <>
      <ChooseTypeOfResourceDisconnectionModalContainer />
      <CreateResourceDisconnectionContainer />
      <GroupReport />
      <ObjectsProfile
        searchType={searchType}
        handleExportGroupReport={handleExportGroupReport}
        handleOpenChooseResourceDisconnectionModal={() =>
          handleOpenChooseResourceDisconnectionModal()
        }
      />
    </>
  );
};
