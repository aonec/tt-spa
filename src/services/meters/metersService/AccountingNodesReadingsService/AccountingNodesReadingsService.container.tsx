import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AccountingNodesReadings } from './view/AccountingNodesReadings';
import { AccountingNodesReadingsService } from './AccountingNodesReadingsService.model';
import { useUnit } from 'effector-react';
import { ConfirmReadingValueContainer } from 'services/meters/readingsHistoryService/confirmReadingService';
import { getElectricNodesQuery } from './AccountingNodesReadingsService.api';

const { inputs, outputs, gates } = AccountingNodesReadingsService;
const { HousingStockIdGate } = gates;

export const AccountingNodesReadingsContainer = () => {
  const history = useHistory();
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
  });

  useEffect(() => {
    return outputs.$housingStockAddress.watch((address) => {
      if (!address || address.housingStockId === Number(id)) return;

      history.push(`/meters/accountingNodes/${address.housingStockId}`);
    }).unsubscribe;
  }, [history, id]);

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
