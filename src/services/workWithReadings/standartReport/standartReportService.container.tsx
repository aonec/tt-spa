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
    lastCloseDevicesWithoutReadingsPollData,
    lastDuplicateReadingsPollData,
  } = useUnit({
    closingDevices: getAllClosingDevicesQuery.$data,
    isLoadingClosingDevices: getAllClosingDevicesQuery.$pending,
    handleStartCloseDevicesByCheckingDatePoll:
      inputs.handleStartCloseDevicesByCheckingDatePoll,
    lastCloseDevicesByCheckingDatePollData:
      lastCloseDevicesByCheckingDatePollQuery.$data,
    lastCloseDevicesWithoutReadingsPollData:
      lastCloseDevicesWithoutReadingsPollQuery.$data,
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
        lastCloseDevicesWithoutReadingsPollData={
          lastCloseDevicesWithoutReadingsPollData
        }
        lastDuplicateReadingsPollData={lastDuplicateReadingsPollData}
      />
    </>
  );
};
