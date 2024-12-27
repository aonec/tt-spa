import { GetIndividualDevicesToClose } from 'api/types';
import { PanelItemData, PanelItemStatus } from './PanelItem/PanelItem.types';
import { useMemo } from 'react';

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
        link: 'link',
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
      },
      {
        title: 'Проверить разрядность приборов',
        status: PanelItemStatus.Info,
        info: null,
        btnText: null,
        btnOnClick: () => void 0,
        isLoadingInfo: false,
        link: '/',
      },
    ];
  }, [isLoadingClosingDevices, closingDevices]);

  return panelsList;
}
