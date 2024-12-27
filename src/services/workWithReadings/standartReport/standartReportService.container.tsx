import { useUnit } from 'effector-react';
import { ReportPage } from './view/ReportPage';
import { getAllClosingDevicesQuery } from './standartReportService.api';
import { standartReportService } from './standartReportService.models';

const {
  gates: { StandartReportGate },
} = standartReportService;

export const StandartReportContainer = () => {
  const { closingDevices, isLoadingClosingDevices } = useUnit({
    closingDevices: getAllClosingDevicesQuery.$data,
    isLoadingClosingDevices: getAllClosingDevicesQuery.$pending,
  });

  return (
    <>
      <StandartReportGate />
      <ReportPage
        closingDevices={closingDevices}
        isLoadingClosingDevices={isLoadingClosingDevices}
      />
    </>
  );
};
