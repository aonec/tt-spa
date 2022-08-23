import React from 'react';
import { Header } from './components/Header';
import { ApartmentDevicesList } from './components/ApartmentDevicesList';
import {
  IndividualDeviceListItemResponse,
  IndividualDeviceListItemResponsePagedList,
} from '../../../../myApi';
import MonthSlider from '../../../shared/ui/devices/MonthSlider';
import { useState } from 'react';
import { useSliderIndex } from '01/features/individualDevices/switchIndividualDevice/components/ReadingsInput';
export const ApartmentDevicesContext = React.createContext<
  IndividualDeviceListItemResponse[] | null
>(null);

export const ApartmentDevices = ({
  devices,
}: {
  devices: IndividualDeviceListItemResponsePagedList;
}) => {
  const { sliderIndex, up, down, canUp, canDown } = useSliderIndex();
  const [showClosed, setShowClosed] = useState(false);

  const { items } = devices || {};
  if (!items?.length) {
    return <div>Ошибка загрузки</div>;
  }

  return (
    <ApartmentDevicesContext.Provider value={items}>
      {
        <div>
          <Header
            devicesCount={
              items.filter((elem) => elem.closingDate).length as any
            }
            showClosed={showClosed}
            setShowClosed={setShowClosed as any}
            slider={
              <MonthSlider
                {...{
                  onClickIncrease: up,
                  onClickDecrease: down,
                  isNextArrowDisabled: !canDown,
                  isPreviousArrowDisabled: !canUp,
                  sliderIndex,
                }}
              />
            }
          />
          <ApartmentDevicesList
            sliderIndex={sliderIndex}
            showClosed={showClosed}
          />
        </div>
      }
    </ApartmentDevicesContext.Provider>
  );
};
