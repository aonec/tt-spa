import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useEvent, useStore } from 'effector-react';
import { HouseReadingsHeader } from '../HouseReadingsHeader/HouseReadingsHeader';
import { EResourceType, IndividualDeviceListItemResponse } from 'myApi';
import HouseBanner from './HouseBanner';
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
import { IndividualDeviceMetersInputContainer } from 'services/meters/individualDeviceMetersInputService';
import { openReadingsHistoryModal } from '01/features/readings/displayReadingHistory/models';

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

  const handleOpenReadingsHistoryModal = useEvent(openReadingsHistoryModal);

  const renderDevice = (
    device: IndividualDeviceListItemResponse,
    index: number
  ) => (
    <IndividualDeviceMetersInputContainer
      devices={devices}
      device={device}
      sliderIndex={sliderIndex || 0}
      openReadingsHistoryModal={handleOpenReadingsHistoryModal}
      managementFirmConsumptionRates={managementFirmConsumptionRates}
      deviceIndex={index}
      isHousingStocksReadingInputs
    />
  );

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
      {devices?.map(renderDevice)}
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
