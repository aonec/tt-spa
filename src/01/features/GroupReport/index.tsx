import React from 'react';
import ModalGroupReport from './components/GroupReport';
import CurrentEmailModal from './components/CurrentEmail/CurrentEmailModal';
import OtherEmailModal from './components/OtherEmail/OtherEmailModal';

const GroupReport = () => {
  return (
    <>
      <ModalGroupReport />
      <CurrentEmailModal />
      <OtherEmailModal />
    </>
  );
};

export default GroupReport;
