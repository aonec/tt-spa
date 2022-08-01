import React from 'react';
import { useParams } from 'react-router-dom';
import { HouseReadingLine } from '../DeviceReadingLine/HouseReadingLine';
import { HouseReadingsHeader } from '../HouseReadingsHeader/HouseReadingsHeader';
import HouseBanner from './HouseBanner';
import { getIndividualDeviceRateNumByName } from '../../MeterDevices/ApartmentReadings';
import { useStore } from 'effector-react';

import { useEffect } from 'react';
import { useRef } from 'react';
import { TopButton } from './TopButton/TopButton';
import { $isAllDevicesDone, $pagedIndividualDevices, fetchNextPageOfIndividualDevices, fetchNextPageOfIndividualDevicesFx, PagedIndividualDevicesGate } from '../../../../../features/individualDevices/displayIndividualDevices/models';
import { $housingStock, HousingStockGate } from '../../../../../features/housingStocks/displayHousingStock/models';
import { useMonthSlider } from '../../../../../shared/lib/readings/useMonthSlider';
import { EResourceType, IndividualDeviceListItemResponse } from '../../../../../../api/types';
import { CancelSwitchInputGate } from '../../../../../features/readings/readingsInput/confirmInputReadingModal/models';
import { ReadingsHistoryModal } from '../../../../../features/readings/displayReadingHistory/ReadingsHistoryModal';
import { ConfirmReadingValueModal } from '../../../../../features/readings/readingsInput/confirmInputReadingModal';
import { Flex } from '../../../../../shared/ui/Layout/Flex';
import { Loader } from '../../../../../_components/Loader';
import { ButtonTT } from '../../../../../tt-components';
import { Space } from '../../../../../shared/ui/Layout/Space/Space';

type ParamsType = {
  id: string;
};

const HousesDevices: React.FC = () => {
  let { id: housingStockId }: ParamsType = useParams();

  const devices = useStore($pagedIndividualDevices);
  const house = useStore($housingStock);

  const { sliderIndex, sliderProps, reset } = useMonthSlider(devices);

  const isAllDevicesDone = useStore($isAllDevicesDone);

  const pendingDevices = useStore(fetchNextPageOfIndividualDevicesFx.pending);

  useEffect(() => reset && reset(), [housingStockId]);

  const renderDevice = (
    device: IndividualDeviceListItemResponse,
    index: number
  ) => (
    <HouseReadingLine
      disabled={pendingDevices}
      sliderIndex={sliderIndex || 0}
      numberOfPreviousReadingsInputs={devices
        .slice(0, index)
        .reduce(
          (acc, elem) => acc + getIndividualDeviceRateNumByName(elem.rateType),
          0
        )}
      key={device.id + 'f'}
      device={device}
    />
  );

  const renderDeviceRow = ({ key, index, style }: any) => {
    return (
      <div key={key} style={style}>
        {renderDevice(devices[index]!, index)}
      </div>
    );
  };

  const deviceElems = devices.map(renderDevice);

  const elementRef = useRef();

  useEffect(() => {
    function onScrollDown() {
      if (pendingDevices) return;

      const scrollHeight = document.body.scrollHeight - window.screen.height;

      if (window.scrollY > scrollHeight - 200) {
        fetchNextPageOfIndividualDevices();
      }
    }

    window.addEventListener('scroll', onScrollDown, true);

    return () => {
      window.removeEventListener('scroll', onScrollDown, true);
    };
  }, []);

  const getHeight = () => {
    const getDeviceHeight = (_: any, index: number) => {
      const num = getIndividualDeviceRateNumByName(devices[index]?.rateType);

      return 100 + (num - 1) * 40;
    };

    return devices.map(getDeviceHeight).reduce((acc, elem) => acc + elem, 0);
  };

  return (
    <div id="individual-devices-on-home-tabs" ref={elementRef as any}>
      <TopButton />
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
      {devices.map(renderDeviceRow)}
      <Space />
      {!isAllDevicesDone && (
        <ButtonTT
          disabled={pendingDevices}
          color="blue"
          onClick={() => fetchNextPageOfIndividualDevices()}
        >
          {pendingDevices ? (
            <Flex>
              <Loader show />
              <Space w={8} />
              Загрузка
            </Flex>
          ) : (
            'Загрузить приборы'
          )}
        </ButtonTT>
      )}
    </div>
  );
};

export default HousesDevices;
