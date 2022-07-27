import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useEvent, useStore } from 'effector-react';
import { List } from 'react-virtualized';
import { HouseReadingLine } from '../DeviceReadingLine/HouseReadingLine';
import { HouseReadingsHeader } from '../HouseReadingsHeader/HouseReadingsHeader';
import { EResourceType, IndividualDeviceListItemResponse } from 'myApi';
import HouseBanner from './HouseBanner';
import { getIndividualDeviceRateNumByName } from '../../MeterDevices/ApartmentReadings';
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
import { useMonthSlider } from '01/shared/lib/readings/useMonthSlider';
import { ConfirmReadingValueModal } from '01/features/readings/readingsInput/confirmInputReadingModal';
import { ReadingsHistoryModal } from '01/features/readings/displayReadingHistory/ReadingsHistoryModal';
import { Loader } from '01/_components/Loader';
import { CancelSwitchInputGate } from '01/features/readings/readingsInput/confirmInputReadingModal/models';
import { ButtonTT } from '01/tt-components';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { Flex } from '01/shared/ui/Layout/Flex';
import { TopButton } from './TopButton/TopButton';
import {
  managementFirmConsumptionRatesService,
  useManagingFirmConsumptionRates,
} from 'services/meters/managementFirmConsumptionRatesService';

const { outputs, inputs } = managementFirmConsumptionRatesService;

type ParamsType = {
  id: string;
};

const HousesDevices: React.FC = () => {
  let { id: housingStockId }: ParamsType = useParams();

  const devices = useStore($pagedIndividualDevices);
  const house = useStore($housingStock);

  const consumptionRates = useStore(outputs.$consumptionRates);
  const loadConsumptionRates = useEvent(
    inputs.loadManagemenFirmConsumptionRates
  );

  const { sliderIndex, sliderProps, reset } = useMonthSlider(devices);

  const isAllDevicesDone = useStore($isAllDevicesDone);

  const pendingDevices = useStore(fetchNextPageOfIndividualDevicesFx.pending);

  useEffect(() => reset && reset(), [housingStockId]);

  const { managementFirmConsumptionRates } = useManagingFirmConsumptionRates(
    consumptionRates,
    loadConsumptionRates,
    house?.managingFirmId
  );

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
      managementFirmConsumptionRates={managementFirmConsumptionRates}
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
