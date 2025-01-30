import { useUnit } from 'effector-react';
import { ReportPage } from './view/ReportPage';
import {
  getAllClosingDevicesQuery,
  lastCloseDevicesByCheckingDatePollQuery,
  lastCloseDevicesWithoutReadingsPollQuery,
  lastDuplicateReadingsPollQuery,
} from './standartReportService.api';
import { standartReportService } from './standartReportService.models';

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
  });

  return (
    <>
      <StandartReportGate />
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
      />
    </>
  );
};
