import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { prepareAddressesForTreeSelect } from 'services/resources/createResourceDisconnectionService/createResourceDisconnectionService.utils';
import { closedIndividualDevicesFormService } from './closedIndividualDevicesFormService.model';
import { ClosedIndividualDevicesForm } from './view/ClosedIndividualDevicesForm';
import './closedIndividualDevicesFormService.relations';
import { UnloadingType } from './closedIndividualDevicesFormService.types';

export const ClosedIndividualDevicesFormContainer = () => {
  const { inputs, outputs } = closedIndividualDevicesFormService;

  const unloadSelectType = useStore(outputs.$unloadSelectType);

  const setUnloadSelectType = useEvent(inputs.setUnloadSelectType);

  const addressesPagedList = useStore(outputs.$addressesPagedList);

  const organizationPagedList = useStore(outputs.$organizationPagedList);

  const houseManagementList = useStore(outputs.$houseManagementList);

  const preparedAddresses = prepareAddressesForTreeSelect({
    items: addressesPagedList?.items || [],
    isSelectableStreetNode: false,
  });


  return (
    <ClosedIndividualDevicesForm
      unloadSelectType={unloadSelectType}
      setUnloadSelectType={setUnloadSelectType}
      preparedAddresses={preparedAddresses}
      organizationPagedList={organizationPagedList}
      houseManagementList={houseManagementList}
    />
  );
};
