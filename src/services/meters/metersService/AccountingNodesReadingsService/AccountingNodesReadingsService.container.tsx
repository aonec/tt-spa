import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AccountingNodesReadings } from './view/AccountingNodesReadings';
import { AccountingNodesReadingsService } from './AccountingNodesReadingsService.model';

const { inputs, outputs } = AccountingNodesReadingsService;

export const AccountingNodesReadingsContainer = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    return inputs.handleElectricNodesLoaded.watch((nodes) => {
      const apartment = nodes[0].address;

      if (!apartment || apartment.id === Number(id)) return;

      history.push(`/meters/accountingNodes/${apartment.id}`);
    }).unsubscribe;
  }, [history, id]);

  return <AccountingNodesReadings />;
};
