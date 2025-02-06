import { PanelItemData, PanelItemStatus } from './PanelItem/PanelItem.types';
import { useMemo } from 'react';
import { ReportTemplates } from 'services/reportsService/reportViewService/view/ReportViewPage/ReportFiltrationForm/ReportFiltrationForm.types';
import { ActionsHookProps } from './ReportPage.types';
import { EPollState } from 'api/types';

export function usePanelsList({
  closingDevices,
  isLoadingClosingDevices,
  handleStartCloseDevicesByCheckingDatePoll,
  lastCloseDevicesByCheckingDatePollData,
  handleStartCloseDevicesWithoutReadingsPoll,
  lastCloseDevicesWithoutReadingsPollData,
  handleStartDuplicateReadingsPoll,
  lastDuplicateReadingsPollData,
}: ActionsHookProps): PanelItemData[] {
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
        isLoadingInfo:
          lastCloseDevicesByCheckingDatePollData?.status ===
            EPollState.Pending ||
          lastCloseDevicesByCheckingDatePollData?.status === EPollState.Running,
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
        btnOnClick: handleStartCloseDevicesWithoutReadingsPoll,
        isLoadingInfo:
          lastCloseDevicesWithoutReadingsPollData?.status ===
            EPollState.Pending ||
          lastCloseDevicesWithoutReadingsPollData?.status ===
            EPollState.Running,
        link: '/statistics/subscribersConsumption/managingFirm',
        pollState: lastCloseDevicesWithoutReadingsPollData,
      },
      {
        title: 'Квартиры на паузе',
        status: PanelItemStatus.Success,
        info: null,
        btnText: 'Дублировать показания',
        btnOnClick: handleStartDuplicateReadingsPoll,
        isLoadingInfo:
          lastDuplicateReadingsPollData?.status === EPollState.Pending ||
          lastDuplicateReadingsPollData?.status === EPollState.Running,
        pollState: lastDuplicateReadingsPollData,
      },
      {
        title: 'Проверить разрядность приборов',
        status: PanelItemStatus.Info,
        info: null,
        btnText: null,
        btnOnClick: () => null,
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
