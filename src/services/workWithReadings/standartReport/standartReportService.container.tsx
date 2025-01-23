import { useUnit } from 'effector-react';
import { ReportPage } from './view/ReportPage';
import {
  getAllClosingDevicesQuery,
  lastCloseDevicesByCheckingDatePollQuery,
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
  } = useUnit({
    closingDevices: getAllClosingDevicesQuery.$data,
    isLoadingClosingDevices: getAllClosingDevicesQuery.$pending,
    handleStartCloseDevicesByCheckingDatePoll:
      inputs.handleStartCloseDevicesByCheckingDatePoll,
    lastCloseDevicesByCheckingDatePollData:
      lastCloseDevicesByCheckingDatePollQuery.$data,
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
      />
    </>
  );
};
