import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AccountingNodesReadings } from './view/AccountingNodesReadings';
import { AccountingNodesReadingsService } from './AccountingNodesReadingsService.model';
import { useUnit } from 'effector-react';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { ConfirmReadingValueModal } from '01/features/readings/readingsInput/confirmInputReadingModal';

const { inputs, outputs, gates } = AccountingNodesReadingsService;
const { HousingStockIdGate } = gates;

export const AccountingNodesReadingsContainer = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const address = useUnit(outputs.$housingStockAddress);
  const electricNodes = useUnit(outputs.$electricNodes);
  const isLoading = useUnit(outputs.$isLoading);

  const handleGetElectricNodes = useUnit(inputs.fetchElectricNodes);

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
      <WithLoader isLoading={isLoading}>
        <AccountingNodesReadings
          handleGetElectricNodes={handleGetElectricNodes}
          address={address}
          electricNodes={electricNodes}
        />
      </WithLoader>
    </>
  );
};
