import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AccountingNodesReadings } from './view/AccountingNodesReadings';
import { AccountingNodesReadingsService } from './AccountingNodesReadingsService.model';
import { useUnit } from 'effector-react';
import { ConfirmReadingValueContainer } from 'services/meters/readingsHistoryService/confirmReadingService';
import { getElectricNodesQuery } from './AccountingNodesReadingsService.api';
import { accountingNodesReadingsInputService } from 'services/meters/accountingNodesReadingsInputService';
import { mapToDeviceReadingsHistory } from './AccountingNodesReadingsService.utils';
import { ReadingHistoryModal } from './view/ReadingHistoryModal';

const { inputs, outputs, gates } = AccountingNodesReadingsService;
const { HousingStockIdGate } = gates;

export const AccountingNodesReadingsContainer = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {
    address,
    downSliderIndex,
    electricNodes,
    handleGetElectricNodes,
    isLoading,
    sliderIndex,
    sum,
    upSliderIndex,
    isElectricNodesFetched,
    readings,
    handleCloseHistory,
    isHistoryOpen,
    deviceId,
  } = useUnit({
    address: outputs.$housingStockAddress,
    electricNodes: getElectricNodesQuery.$data,
    isElectricNodesFetched: getElectricNodesQuery.$finished,
    isLoading: outputs.$isLoading,
    sliderIndex: outputs.$sliderIndex,
    sum: outputs.$sumOfReadings,
    handleGetElectricNodes: inputs.fetchElectricNodes,
    upSliderIndex: inputs.upSliderIndex,
    downSliderIndex: inputs.downSliderIndex,
    readings: accountingNodesReadingsInputService.outputs.$readings,
    handleCloseHistory: inputs.handleCloseHistory,
    isHistoryOpen: outputs.$isHistoryOpen,
    deviceId: outputs.$deviceId,
  });

  useEffect(() => {
    return outputs.$housingStockAddress.watch((address) => {
      if (!address || address.housingStockId === Number(id)) return;

      navigate(`/meters/accountingNodes/${address.housingStockId}`);
    }).unsubscribe;
  }, [navigate, id]);

  const readingsById = useMemo(
    () => (deviceId ? readings[deviceId] : null),
    [deviceId, readings],
  );

  const preparedReadings = useMemo(
    () => mapToDeviceReadingsHistory(readingsById),
    [readingsById],
  );

  return (
    <>
      <ConfirmReadingValueContainer />

      <ReadingHistoryModal
        preparedReadings={preparedReadings}
        handleCloseHistory={handleCloseHistory}
        isOpen={isHistoryOpen}
      />

      <HousingStockIdGate id={Number(id)} />

      <AccountingNodesReadings
        handleGetElectricNodes={handleGetElectricNodes}
        address={address}
        electricNodes={electricNodes || []}
        isLoading={isLoading}
        sliderIndex={sliderIndex}
        upSliderIndex={upSliderIndex}
        downSliderIndex={downSliderIndex}
        sum={sum}
        isElectricNodesFetched={isElectricNodesFetched}
      />
    </>
  );
};
