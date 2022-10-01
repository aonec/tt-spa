import { useEvent, useStore } from 'effector-react';
import React, { useMemo } from 'react';
import { resourceDisconnectionFiltersService } from 'services/resources/resourceDisconnectionFiltersService';
import { createResourceDisconnectionService } from './createResourceDisconnectionService.model';
import {
} from './createResourceDisconnectionService.utils';
import { CreateResourceDisconnectionModal } from './view/CreateResourceDisconnectionModal';
import { chooseTypeOfResourceDisconnectionModalService } from '../chooseTypeOfResourceDisconnectionModalService/chooseTypeOfResourceDisconnectionModalService.model';

import '../editResourceDisconnectionService/editResourceDisconnectionService.relations';
import '../chooseTypeOfResourceDisconnectionModalService/chooseTypeOfResourceDisconnectionModalService.relations';
import { editResourceDisconnectionService } from '../editResourceDisconnectionService';

const { inputs, outputs } = createResourceDisconnectionService;
const { gates } = resourceDisconnectionFiltersService;
const { ResourceDisconnectigFiltersGate } = gates;

export const CreateResourceDisconnectionContainer = () => {
  const isOpen = useStore(outputs.$isModalOpen);
  const resourceTypes = useStore(outputs.$resourceTypes);
  const disconnectingTypes = useStore(outputs.$disconnectingTypes);
  const typeOfAddress = useStore(outputs.$typeOfAddress);

  const isInterHeatingSeason = useStore(
    chooseTypeOfResourceDisconnectionModalService.outputs.$isInterHeatingSeason
  );
  const isEdit = useStore(editResourceDisconnectionService.outputs.$isEdit);
  const resourceDisconnection = useStore(
    editResourceDisconnectionService.outputs.$resourceDisconnection
  );
  const isDisconnectionLoading = useStore(
    editResourceDisconnectionService.outputs.$isDisconectionLoading
  );

  const setTypeOfAddress = useEvent(inputs.setTypeOfAddress);
  const handleCloseModal = useEvent(inputs.closeModal);
  const handleCreateResourceDisconnection = useEvent(
    inputs.createResourceDisconnection
  );
  const handleEditResourceDisconnection = useEvent(
    editResourceDisconnectionService.inputs.editResourceDisconnection
  );
  const handleUpdateDocument = useEvent(
    editResourceDisconnectionService.inputs.updateDocument
  );

  const preparedExistingHousingStocks = useMemo(() => [], []);

  return (
    <>
      <ResourceDisconnectigFiltersGate />
      <CreateResourceDisconnectionModal
        resourceTypes={resourceTypes}
        treeData={preparedExistingHousingStocks}
        resourceDisconnection={resourceDisconnection}
        disconnectingTypes={disconnectingTypes}
        handleClose={() => handleCloseModal()}
        handleCreateResourceDisconnection={handleCreateResourceDisconnection}
        handleEditResourceDisconnection={handleEditResourceDisconnection}
        handleUpdateDocument={handleUpdateDocument}
        setTypeOfAddress={setTypeOfAddress}
        isOpen={isOpen}
        typeOfAddress={typeOfAddress}
        isInterHeatingSeason={isInterHeatingSeason}
        isEdit={isEdit}
        isDisconnectionLoading={isDisconnectionLoading}
        isHousingStocksLoading={false}
      />
    </>
  );
};
