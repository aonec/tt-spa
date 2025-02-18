import { useUnit } from 'effector-react';
import { ReportPage } from './view/ReportPage';
import {
  addressesWithHouseManagementsQuery,
  getAllClosingDevicesQuery,
  lastCloseDevicesByCheckingDatePollQuery,
  lastCloseDevicesWithoutReadingsPollQuery,
  lastDuplicateReadingsPollQuery,
  organizationsQuery,
} from './standartReportService.api';
import { standartReportService } from './standartReportService.models';
import { ExportStandartReportContainer } from './exportStandartReport';
import { exportStandartReportService } from './exportStandartReport/exportStandartReportService.models';

const {
  inputs,
  gates: { StandartReportGate },
} = standartReportService;

export const StandartReportContainer = () => {
  const {
    closingDevices,
    isLoadingClosingDevices,
    handleStartCloseDevicesByCheckingDatePoll,
    lastCloseDevicesByCheckingDatePollData,
    handleStartCloseDevicesWithoutReadingsPoll,
    lastCloseDevicesWithoutReadingsPollData,
    handleStartDuplicateReadingsPoll,
    lastDuplicateReadingsPollData,
    handleExport,
    organizations,
    houseManagements,
  } = useUnit({
    closingDevices: getAllClosingDevicesQuery.$data,
    isLoadingClosingDevices: getAllClosingDevicesQuery.$pending,
    handleStartCloseDevicesByCheckingDatePoll:
      inputs.handleStartCloseDevicesByCheckingDatePoll,
    lastCloseDevicesByCheckingDatePollData:
      lastCloseDevicesByCheckingDatePollQuery.$data,
    handleStartCloseDevicesWithoutReadingsPoll:
      inputs.handleStartCloseDevicesWithoutReadingsPoll,
    lastCloseDevicesWithoutReadingsPollData:
      lastCloseDevicesWithoutReadingsPollQuery.$data,
    handleStartDuplicateReadingsPoll: inputs.handleStartDuplicateReadingsPoll,
    lastDuplicateReadingsPollData: lastDuplicateReadingsPollQuery.$data,
    handleExport: exportStandartReportService.inputs.openModal,
    organizations: organizationsQuery.$data,
    houseManagements: addressesWithHouseManagementsQuery.$data,
  });

  return (
    <>
      <StandartReportGate />
      <ExportStandartReportContainer />
      <ReportPage
        closingDevices={closingDevices}
        isLoadingClosingDevices={isLoadingClosingDevices}
        handleStartCloseDevicesByCheckingDatePoll={
          handleStartCloseDevicesByCheckingDatePoll
        }
        lastCloseDevicesByCheckingDatePollData={
          lastCloseDevicesByCheckingDatePollData
        }
        handleStartCloseDevicesWithoutReadingsPoll={
          handleStartCloseDevicesWithoutReadingsPoll
        }
        lastCloseDevicesWithoutReadingsPollData={
          lastCloseDevicesWithoutReadingsPollData
        }
        handleStartDuplicateReadingsPoll={handleStartDuplicateReadingsPoll}
        lastDuplicateReadingsPollData={lastDuplicateReadingsPollData}
        handleExport={handleExport}
        organizations={organizations}
        houseManagements={houseManagements}
      />
    </>
  );
};
