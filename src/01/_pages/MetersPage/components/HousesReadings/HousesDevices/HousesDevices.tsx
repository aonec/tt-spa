import React from 'react';
import { useParams } from 'react-router-dom';
import { HouseReadingLine } from '../DeviceReadingLine/HouseReadingLine';
import { HouseReadingsHeader } from '../HouseReadingsHeader/HouseReadingsHeader';
import HouseBanner from './HouseBanner';
import { getIndividualDeviceRateNumByName } from '../../MeterDevices/ApartmentReadings';
import { useStore } from 'effector-react';
import {
  $individualDevices,
  IndividualDevicesGate,
} from '01/features/individualDevices/displayIndividualDevices/models';
import {
  $housingStock,
  fetchHousingStockFx,
  HousingStockGate,
} from '01/features/housingStocks/displayHousingStock/models';
import { combine } from 'effector';
import { fetchIndividualDeviceFx } from '01/features/individualDevices/displayIndividualDevice/models';
import { EResourceType } from 'myApi';
import { PendingLoader } from '01/shared/ui/PendingLoader';
import { useMonthSlider } from '01/shared/lib/readings/useMonthSlider';
import { useEffect } from 'react';

type ParamsType = {
  id: string;
};

const HousesDevices: React.FC = () => {
  let { id: housingStockId }: ParamsType = useParams();

  const devices = useStore($individualDevices);
  const house = useStore($housingStock);

  const isLoading = useStore(
    combine(
      fetchIndividualDeviceFx.pending,
      fetchHousingStockFx.pending,
      (pendingDevices, pendingHouse) => pendingDevices || pendingHouse
    )
  );

  const pendingDevices = useStore(fetchIndividualDeviceFx.pending);

  const { sliderIndex, sliderProps, reset } = useMonthSlider(devices);

  useEffect(() => reset && reset(), [housingStockId]);

  const deviceElemsList = devices?.slice()?.sort((device1, device2) => {
    return (
      Number(getNumberFromString(device1.apartmentNumber || '')) -
      Number(getNumberFromString(device2.apartmentNumber || ''))
    );
  });

  const deviceElems = deviceElemsList.map((device, index) => (
    <HouseReadingLine
      sliderIndex={sliderIndex || 0}
      numberOfPreviousReadingsInputs={deviceElemsList
        .slice(0, index)
        .reduce(
          (acc, elem) => acc + getIndividualDeviceRateNumByName(elem.rateType),
          0
        )}
      key={device.id + 'f'}
      device={device}
    />
  ));

  return (
    <>
      <HousingStockGate id={Number(housingStockId)} />
      <PendingLoader loading={isLoading}>
        <IndividualDevicesGate
          HousingStockId={Number(housingStockId)}
          Resource={EResourceType.Electricity}
        />
        {house && <HouseBanner house={house} />}
        {!!deviceElems.length && (
          <HouseReadingsHeader sliderProps={sliderProps} />
        )}
        {!pendingDevices && deviceElems}
      </PendingLoader>
    </>
  );
};

export default HousesDevices;

function getNumberFromString(str: string) {
  return parseInt(str.replace(/[^\d]/g, ''));
}
