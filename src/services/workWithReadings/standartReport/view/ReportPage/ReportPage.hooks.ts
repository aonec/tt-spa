import { GetIndividualDevicesToClose } from 'api/types';
import { PanelItemData, PanelItemStatus } from './PanelItem/PanelItem.types';
import { useMemo } from 'react';
import { ReportTemplates } from 'services/reportsService/reportViewService/view/ReportViewPage/ReportFiltrationForm/ReportFiltrationForm.types';

export function usePanelsList({
  closingDevices,
  isLoadingClosingDevices,
}: {
  closingDevices: GetIndividualDevicesToClose | null;
  isLoadingClosingDevices: boolean;
}): PanelItemData[] {
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
        btnText: 'Закрыть приборы',
        btnOnClick: () => void 0,
        isLoadingInfo: isLoadingClosingDevices,
        link: `/reports/IndividualDevices?reportTemp=${ReportTemplates.CheckingDateExpiration}`,
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
        link: '/',
      },
      {
        title: 'Квартиры на паузе',
        status: PanelItemStatus.Success,
        info: null,
        btnText: 'Дублировать показания',
        btnOnClick: () => void 0,
        isLoadingInfo: false,
      },
      {
        title: 'Проверить разрядность приборов',
        status: PanelItemStatus.Info,
        info: null,
        btnText: null,
        btnOnClick: () => void 0,
        isLoadingInfo: false,
        link: `/reports/IndividualDevices?reportTemp=${ReportTemplates.InvalidBitDepth}`,
      },
    ];
  }, [isLoadingClosingDevices, closingDevices]);

  return panelsList;
}
