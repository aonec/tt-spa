import React, { useEffect } from 'react';
import {
  requestDevicesByHouse,
  requestHouse,
  HouseType,
} from '../../../../../_api/houses_readings_page';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { HouseReadingLine } from '../DeviceReadingLine/HouseReadingLine';
import { HouseReadingsHeader } from '../HouseReadingsHeader/HouseReadingsHeader';
import { selectDevices } from '../../../../../Redux/ducks/readings/selectors';
import { setDevices } from '01/Redux/ducks/readings/actionCreators';
import HouseBanner from './HouseBanner';
import { useSwitchOnInputs } from '../../../../../hooks/useSwitchInputsOnEnter';
import { getIndividualDeviceRateNumByName } from '../../MeterDevices/ApartmentReadings';

type ParamsType = {
  id: string;
};

const HousesDevices: React.FC = () => {
  let { id: housingStockId }: ParamsType = useParams();
  const dispatch = useDispatch();
  const devices = useSelector(selectDevices);
  const [house, setHouse] = useState<HouseType>();
  const [isLoading, setIsLoading] = useState(true);
  useSwitchOnInputs();

  const setInfoAsync = async () => {
    setIsLoading(true);
    const res = await requestDevicesByHouse(housingStockId);
    const houseObject = await requestHouse(housingStockId);
    setHouse(houseObject);
    dispatch(setDevices(res.items));
    setIsLoading(false);
  };

  useEffect(() => void setInfoAsync(), [housingStockId]);

  if (isLoading || !house) return null;

  const deviceElemsList = devices?.slice()?.sort((device1, device2) => {
    return Number(device1.apartmentNumber) - Number(device2.apartmentNumber);
  });

  const deviceElems = deviceElemsList.map((device, index) => (
    <HouseReadingLine
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
      <HouseBanner house={house} />
      <HouseReadingsHeader />
      {deviceElems}
    </>
  );
};

export default HousesDevices;
