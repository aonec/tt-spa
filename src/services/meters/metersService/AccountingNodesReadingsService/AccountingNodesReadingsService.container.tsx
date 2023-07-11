import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AccountingNodesReadings } from './view/AccountingNodesReadings';
import { AccountingNodesReadingsService } from './AccountingNodesReadingsService.model';
import { useUnit } from 'effector-react';
import { ConfirmReadingValueModal } from 'services/meters/readingsHistoryService/confirmReadingService';

const { inputs, outputs, gates } = AccountingNodesReadingsService;
const { HousingStockIdGate } = gates;

export const AccountingNodesReadingsContainer = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const address = useUnit(outputs.$housingStockAddress);
  const electricNodes = useUnit(outputs.$electricNodes);
  const isLoading = useUnit(outputs.$isLoading);
  const sliderIndex = useUnit(outputs.$sliderIndex);
  const sum = useUnit(outputs.$sumOfReadings);

  const handleGetElectricNodes = useUnit(inputs.fetchElectricNodes);
  const upSliderIndex = useUnit(inputs.upSliderIndex);
  const downSliderIndex = useUnit(inputs.downSliderIndex);

  useEffect(() => {
    return outputs.$housingStockAddress.watch((address) => {
      if (!address || address.housingStockId === Number(id)) return;

      history.push(`/meters/accountingNodes/${address.housingStockId}`);
    }).unsubscribe;
  }, [history, id]);

  return (
    <>
      <ConfirmReadingValueModal />

      <HousingStockIdGate id={Number(id)} />
      <AccountingNodesReadings
        handleGetElectricNodes={handleGetElectricNodes}
        address={address}
        electricNodes={electricNodes}
        isLoading={isLoading}
        sliderIndex={sliderIndex}
        upSliderIndex={upSliderIndex}
        downSliderIndex={downSliderIndex}
        sum={sum}
      />
    </>
  );
};
