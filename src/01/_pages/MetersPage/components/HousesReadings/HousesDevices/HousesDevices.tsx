import React from 'react';
import { useParams } from 'react-router-dom';
import { HouseReadingLine } from '../DeviceReadingLine/HouseReadingLine';
import { HouseReadingsHeader } from '../HouseReadingsHeader/HouseReadingsHeader';
import HouseBanner from './HouseBanner';
import { getIndividualDeviceRateNumByName } from '../../MeterDevices/ApartmentReadings';
import { useStore } from 'effector-react';
import {
  $pagedIndividualDevices,
  fetchNextPageOfIndividualDevices,
  fetchNextPageOfIndividualDevicesFx,
  PagedIndividualDevicesGate,
} from '01/features/individualDevices/displayIndividualDevices/models';
import {
  $housingStock,
  HousingStockGate,
} from '01/features/housingStocks/displayHousingStock/models';
import { EResourceType } from 'myApi';
import { useMonthSlider } from '01/shared/lib/readings/useMonthSlider';
import { useEffect } from 'react';
import { ConfirmReadingValueModal } from '01/features/readings/readingsInput/confirmInputReadingModal';
import { ReadingsHistoryModal } from '01/features/readings/displayReadingHistory/ReadingsHistoryModal';
import { Loader } from '01/_components/Loader';
import Button from '01/_components/Button';
import { CancelSwitchInputGate } from '01/features/readings/readingsInput/confirmInputReadingModal/models';

type ParamsType = {
  id: string;
};

const HousesDevices: React.FC = () => {
  let { id: housingStockId }: ParamsType = useParams();

  const devices = useStore($pagedIndividualDevices);
  const house = useStore($housingStock);

  const { sliderIndex, sliderProps, reset } = useMonthSlider(devices);

  const pendingDevices = useStore(fetchNextPageOfIndividualDevicesFx.pending);

  useEffect(() => reset && reset(), [housingStockId]);

  const deviceElemsList = devices?.slice()?.sort((device1, device2) => {
    return (
      Number(getNumberFromString(device1.apartmentNumber || '')) -
      Number(getNumberFromString(device2.apartmentNumber || ''))
    );
  });

  const deviceElems = deviceElemsList.map((device, index) => (
    <HouseReadingLine
      disabled={pendingDevices}
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
      <CancelSwitchInputGate />
      <ConfirmReadingValueModal />
      <ReadingsHistoryModal />
      <HousingStockGate id={Number(housingStockId)} />
      <PagedIndividualDevicesGate
        HousingStockId={Number(housingStockId)}
        Resource={EResourceType.Electricity}
      />
      {house && <HouseBanner house={house} />}
      {!!deviceElems.length && (
        <HouseReadingsHeader sliderProps={sliderProps} />
      )}
      {deviceElems}
      {pendingDevices && <Loader show size={20} />}
      {!pendingDevices && (
        <Button color="blue" onClick={() => fetchNextPageOfIndividualDevices()}>
          Загрузить приборы
        </Button>
      )}
    </>
  );
};

export default HousesDevices;

function getNumberFromString(str: string) {
  return parseInt(str.replace(/[^\d]/g, ''));
}
