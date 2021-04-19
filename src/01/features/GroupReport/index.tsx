import React from 'react';
import ModalGroupReport from './components/GroupReport';
import CurrentEmailModal from './components/CurrentEmail/CurrentEmailModal';
import OtherEmailModal from './components/OtherEmail/OtherEmailModal';

const GroupReport = ({
  groupReportStatus,
  setGroupReportStatus,
  setGroupReportFormState,
  groupReportFormState,
}: any) => {
  const isReportModalModalVisible = groupReportStatus === 'reportForm';
  const isCurrentEmailModalVisible = groupReportStatus === 'currentEmailForm';
  const isOtherEmailModalVisible = groupReportStatus === 'otherEmailForm';

  return (
    <>
      <ModalGroupReport
        visible={isReportModalModalVisible}
        setVisible={setGroupReportStatus}
        setGroupReportFormState={setGroupReportFormState}
      />
      <CurrentEmailModal
        visible={isCurrentEmailModalVisible}
        setVisible={setGroupReportStatus}
        groupReportFormState={groupReportFormState}
      />
      <OtherEmailModal
        visible={isOtherEmailModalVisible}
        setVisible={setGroupReportStatus}
        groupReportFormState={groupReportFormState}
      />
    </>
  );
};

export default GroupReport;
