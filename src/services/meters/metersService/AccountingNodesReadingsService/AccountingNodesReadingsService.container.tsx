import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AccountingNodesReadings } from './view/AccountingNodesReadings';
import { AccountingNodesReadingsService } from './AccountingNodesReadingsService.model';
import { useUnit } from 'effector-react';
import { ConfirmReadingValueContainer } from 'services/meters/readingsHistoryService/confirmReadingService';
import { getElectricNodesQuery } from './AccountingNodesReadingsService.api';
import { accountingNodesReadingsInputService } from 'services/meters/accountingNodesReadingsInputService';
import { transformToIndividualDeviceReadingsHistory } from './AccountingNodesReadingsService.utils';

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
  } = useUnit({
    address: outputs.$housingStockAddress,
    electricNodes: getElectricNodesQuery.$data,
    isElectricNodesFetched: getElectricNodesQuery.$succeeded,
    isLoading: outputs.$isLoading,
    sliderIndex: outputs.$sliderIndex,
    sum: outputs.$sumOfReadings,
    handleGetElectricNodes: inputs.fetchElectricNodes,
    upSliderIndex: inputs.upSliderIndex,
    downSliderIndex: inputs.downSliderIndex,
    readings: accountingNodesReadingsInputService.outputs.$readings,
  });

  useEffect(() => {
    return outputs.$housingStockAddress.watch((address) => {
      if (!address || address.housingStockId === Number(id)) return;

      navigate(`/meters/accountingNodes/${address.housingStockId}`);
    }).unsubscribe;
  }, [navigate, id]);

  // const preparedReadings = transformToIndividualDeviceReadingsHistory(readings)

  return (
    <>
      <ConfirmReadingValueContainer />

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
