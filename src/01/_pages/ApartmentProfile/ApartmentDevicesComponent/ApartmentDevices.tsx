import React, { useState } from 'react';
import { Header } from './components/Header';
import { ApartmentDevicesList } from './components/ApartmentDevicesList';
import { ShowHidden } from './components/ShowHidden';
import { getMonthFromDate } from '../../../utils/getMonthFromDate';
import {
  IndividualDeviceListItemResponse,
  IndividualDeviceListItemResponsePagedList,
} from '../../../../myApi';
export const ApartmentDevicesContext = React.createContext<
  IndividualDeviceListItemResponse[] | null
>(null);

export const ApartmentDevices = ({
  devices,
}: {
  devices: IndividualDeviceListItemResponsePagedList;
}) => {
  //TODO
  //Check with/without current readings
  const [sliderIndex, setSliderIndex] = useState(0);

  const { items } = devices || {};
  if (!items?.length) {
    return <div>Ошибка загрузки</div>;
  }

  const currentMonth = getMonthFromDate();
  const isReadingsCurrent =
    currentMonth === getMonthFromDate(items[0].readings![0].readingDate);
  const readingsLength = items[0]?.readings?.length;

  if (!readingsLength) return null;

  return (
    <ApartmentDevicesContext.Provider value={items}>
      <Header
        sliderIndex={sliderIndex}
        setSliderIndex={setSliderIndex}
        isReadingsCurrent={isReadingsCurrent}
        readingsLength={readingsLength}
      />
      <ApartmentDevicesList sliderIndex={sliderIndex} />
      <ShowHidden />
    </ApartmentDevicesContext.Provider>
  );
};
