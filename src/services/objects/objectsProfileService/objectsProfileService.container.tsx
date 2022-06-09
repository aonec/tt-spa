import GroupReport from '01/features/groupReport';
import { setGroupStatus } from '01/features/groupReport/models/groupReportReducer';
import { useAppDispatch } from '01/Redux/store';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { SearchType } from './objectsProfileService.types';
import { ObjectsProfile } from './view/ObjectsProfile';

export const ObjectsProfileContainer = () => {
  const { searchType } = useParams<{ searchType?: SearchType }>();

  const history = useHistory();

  const dispatch = useAppDispatch();
  const handleExportGroupReport = () => dispatch(setGroupStatus('reportForm'));

  function onChangeSearchType(searchType: SearchType) {
    history.push(`/objects/${searchType}`);
  }

  useEffect(() => {
    if (!searchType) {
      history.push(`/objects/${SearchType.Houses}`);
    }
  }, [searchType]);

  return (
    <>
      <GroupReport />
      <ObjectsProfile
        onChangeSearchType={onChangeSearchType}
        searchType={searchType}
        handleExportGroupReport={handleExportGroupReport}
      />
    </>
  );
};
