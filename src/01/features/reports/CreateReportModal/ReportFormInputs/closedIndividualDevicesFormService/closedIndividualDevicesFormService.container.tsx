import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { prepareAddressesForTreeSelect } from 'services/resources/createResourceDisconnectionService/createResourceDisconnectionService.utils';
import { closedIndividualDevicesFormService } from './closedIndividualDevicesFormService.model';
import { ClosedIndividualDevicesForm } from './view/ClosedIndividualDevicesForm';

export const ClosedIndividualDevicesFormContainer = () => {
  const unloadSelectType = useStore(
    closedIndividualDevicesFormService.outputs.$unloadSelectType
  );
  const setUnloadSelectType = useEvent(
    closedIndividualDevicesFormService.inputs.setUnloadSelectType
  );

  const addressesPagedList = useStore(
    closedIndividualDevicesFormService.outputs.$addressesPagedList
  );

  const organizationPagedList = useStore(
    closedIndividualDevicesFormService.outputs.$organizationPagedList
  );

  const houseManagementList = useStore(closedIndividualDevicesFormService.outputs.$houseManagementList)

  const preparedAddresses = prepareAddressesForTreeSelect(
    addressesPagedList?.items || []
  );

 

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
