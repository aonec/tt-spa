import GroupReport from '01/features/groupReport';
import { setGroupStatus } from '01/features/groupReport/models/groupReportReducer';
import { useAppDispatch } from '01/Redux/store';
import { useEvent } from 'effector-react';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ChooseTypeOfResourceDisconnectionModalContainer } from 'services/resources/chooseTypeOfResourceDisconnectionModalService/chooseTypeOfResourceDisconnectionModalService.container';
import { chooseTypeOfResourceDisconnectionModalService } from 'services/resources/chooseTypeOfResourceDisconnectionModalService/chooseTypeOfResourceDisconnectionModalService.model';
import { CreateResourceDisconnectionContainer } from 'services/resources/createResourceDisconnectionService';
import { SearchType } from './objectsProfileService.types';
import { SoiReportContainer, soiReportService } from './soiReportService';
import { ObjectsProfile } from './view/ObjectsProfile';

const { inputs } = soiReportService;

export const ObjectsProfileContainer = () => {
  const { searchType } = useParams<{ searchType?: SearchType }>();

  const history = useHistory();

  const openSoiReportModal = useEvent(inputs.openSoiReportModal);

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
      <SoiReportContainer />
      <CreateResourceDisconnectionContainer />
      <ChooseTypeOfResourceDisconnectionModalContainer />
      <GroupReport />
      <ObjectsProfile
        openSoiReportModal={() => openSoiReportModal()}
        searchType={searchType}
        handleExportGroupReport={handleExportGroupReport}
        handleOpenChooseResourceDisconnectionModal={() =>
          handleOpenChooseResourceDisconnectionModal()
        }
      />
    </>
  );
};
