import React from 'react';
import { Header } from './components/Header';
import { ApartmentDevicesList } from './components/ApartmentDevicesList';
import {
  IndividualDeviceListItemResponse,
  IndividualDeviceListItemResponsePagedList,
} from '../../../../myApi';
import { useMonthSlider } from '../../../shared/lib/readings/useMonthSlider';
import MonthSlider from '../../../shared/ui/devices/MonthSlider';
export const ApartmentDevicesContext = React.createContext<
  IndividualDeviceListItemResponse[] | null
>(null);

export const ApartmentDevices = ({
  devices,
}: {
  devices: IndividualDeviceListItemResponsePagedList;
}) => {
  const { sliderIndex, sliderProps } = useMonthSlider(devices.items);

  const { items } = devices || {};
  if (!items?.length) {
    return <div>Ошибка загрузки</div>;
  }

  return (
    <ApartmentDevicesContext.Provider value={items}>
      {sliderIndex !== undefined && sliderProps ? (
        <>
          <Header slider={<MonthSlider {...sliderProps} />} />
          <ApartmentDevicesList sliderIndex={sliderIndex} />
        </>
      ) : null}
    </ApartmentDevicesContext.Provider>
  );
};
