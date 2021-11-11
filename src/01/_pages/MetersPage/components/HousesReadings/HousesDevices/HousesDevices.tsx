import React from 'react';
import { useParams } from 'react-router-dom';
import { HouseReadingLine } from '../DeviceReadingLine/HouseReadingLine';
import { HouseReadingsHeader } from '../HouseReadingsHeader/HouseReadingsHeader';
import HouseBanner from './HouseBanner';
import { getIndividualDeviceRateNumByName } from '../../MeterDevices/ApartmentReadings';
import { useStore } from 'effector-react';
import {
  $isAllDevicesDone,
  $pagedIndividualDevices,
  fetchNextPageOfIndividualDevices,
  fetchNextPageOfIndividualDevicesFx,
  PagedIndividualDevicesGate,
} from '01/features/individualDevices/displayIndividualDevices/models';
import {
  $housingStock,
  HousingStockGate,
} from '01/features/housingStocks/displayHousingStock/models';
import {
  EResourceType,
  IndividualDeviceListItemResponse,
} from 'myApi';
import { useMonthSlider } from '01/shared/lib/readings/useMonthSlider';
import { useEffect } from 'react';
import { ConfirmReadingValueModal } from '01/features/readings/readingsInput/confirmInputReadingModal';
import { ReadingsHistoryModal } from '01/features/readings/displayReadingHistory/ReadingsHistoryModal';
import { Loader } from '01/_components/Loader';
import { CancelSwitchInputGate } from '01/features/readings/readingsInput/confirmInputReadingModal/models';
import { useRef } from 'react';
import { ButtonTT } from '01/tt-components';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { Flex } from '01/shared/ui/Layout/Flex';
import { List } from 'react-virtualized';

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
    const element = window;

    function onScrollDown(event: any) {
      if (isAllDevicesDone) return;

      const element = event.target;

      if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        fetchNextPageOfIndividualDevices();
      }
    }

    element.addEventListener('scroll', onScrollDown, true);

    return () => element.removeEventListener('scroll', onScrollDown);
  }, []);

  const getHeight = () => {
    const getDeviceHeight = (_: any, index: number) => {
      const num = getIndividualDeviceRateNumByName(devices[index]?.rateType);

      return 100 + (num - 1) * 40;
    };

    const sizes = devices.map(getDeviceHeight);

    return sizes.reduce((acc, elem) => acc + elem, 0);
  };

  return (
    <div id="individual-devices-on-home-tabs" ref={elementRef as any}>
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
      <List
        rowCount={devices.length}
        rowHeight={({ index }) => {
          const num = getIndividualDeviceRateNumByName(
            devices[index]?.rateType
          );

          return 100 + (num - 1) * 40;
        }}
        rowRenderer={renderDeviceRow}
        height={getHeight()}
        width={956}
      />
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

function getNumberFromString(str: string) {
  return parseInt(str.replace(/[^\d]/g, ''));
}
