import { GetIndividualDevicesToClose, PollResponse } from 'api/types';
import { PanelItemData, PanelItemStatus } from './PanelItem/PanelItem.types';
import { useMemo } from 'react';
import { ReportTemplates } from 'services/reportsService/reportViewService/view/ReportViewPage/ReportFiltrationForm/ReportFiltrationForm.types';

export function usePanelsList({
  closingDevices,
  isLoadingClosingDevices,
  handleStartCloseDevicesByCheckingDatePoll,
  lastCloseDevicesByCheckingDatePollData,
}: {
  closingDevices: GetIndividualDevicesToClose | null;
  isLoadingClosingDevices: boolean;
  handleStartCloseDevicesByCheckingDatePoll: () => void;
  lastCloseDevicesByCheckingDatePollData: PollResponse | null;
}): PanelItemData[] {
  console.log(lastCloseDevicesByCheckingDatePollData);
  const panelsList = useMemo((): PanelItemData[] => {
    return [
      {
        title: 'Приборы с вышедшей датой поверки',
        status: closingDevices?.expiredCheckingDateCount
          ? PanelItemStatus.Error
          : PanelItemStatus.Success,
        info: closingDevices?.expiredCheckingDateCount
          ? `${closingDevices?.expiredCheckingDateCount} приборов`
          : null,
        btnText: `Закрыть приборы`,
        btnOnClick: handleStartCloseDevicesByCheckingDatePoll,
        isLoadingInfo: isLoadingClosingDevices,
        link: `/reports/IndividualDevices?reportTemp=${ReportTemplates.CheckingDateExpiration}`,
        pollState: lastCloseDevicesByCheckingDatePollData,
      },
      {
        title: 'Приборы без показаний более 6 месяцев',
        status: closingDevices?.withoutReadingsCount
          ? PanelItemStatus.Error
          : PanelItemStatus.Success,
        info: closingDevices?.withoutReadingsCount
          ? `${closingDevices?.withoutReadingsCount} приборов`
          : null,
        btnText: 'Закрыть приборы',
        btnOnClick: () => void 0,
        isLoadingInfo: isLoadingClosingDevices,
        link: '/statistics/subscribersConsumption/managingFirm',
        pollState: null,
      },
      {
        title: 'Квартиры на паузе',
        status: PanelItemStatus.Success,
        info: null,
        btnText: 'Дублировать показания',
        btnOnClick: () => void 0,
        isLoadingInfo: false,
        pollState: null,
      },
      {
        title: 'Проверить разрядность приборов',
        status: PanelItemStatus.Info,
        info: null,
        btnText: null,
        btnOnClick: () => void 0,
        isLoadingInfo: false,
        link: `/reports/IndividualDevices?reportTemp=${ReportTemplates.InvalidBitDepth}`,
        pollState: null,
      },
    ];
  }, [
    isLoadingClosingDevices,
    closingDevices,
    lastCloseDevicesByCheckingDatePollData,
  ]);

  return panelsList;
}
