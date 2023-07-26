import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { prepareAddressesForTreeSelect } from 'ui-kit/shared/AddressTreeSelect/AddressTreeSelect.utils';
import { soiReportService } from './soiReportService.model';
import { SoiReportModal } from './view/SoiReportModal';

const { inputs, outputs } = soiReportService;

export const SoiReportContainer = () => {
  const isModalOpen = useStore(outputs.$isModalOpen);
  const soiReportType = useStore(outputs.$soiReportType);
  const citiesList = useStore(outputs.$existingCities);
  const selectedCity = useStore(outputs.$selectedCity);
  const houseManagements = useStore(outputs.$houseManagements);
  const addressesPagedList = useStore(outputs.$addressesPagedList);
  const isCreateReportLoading = useStore(outputs.$isCreateReportLoading);

  const closeSoiReportModal = useEvent(inputs.closeSoiReportModal);
  const setSoiReportType = useEvent(inputs.setSoiReportType);
  const setSelectedCity = useEvent(inputs.setSelectedCity);
  const createSoiReport = useEvent(inputs.createSoiReport);

  const preparedAddresses = prepareAddressesForTreeSelect({
    items: addressesPagedList?.items || [],
    isSelectableStreetNode: false,
  });

  return (
    <SoiReportModal
      isModalOpen={isModalOpen}
      soiReportType={soiReportType}
      closeSoiReportModal={() => closeSoiReportModal()}
      setSoiReportType={setSoiReportType}
      citiesList={citiesList}
      selectedCity={selectedCity}
      setSelectedCity={setSelectedCity}
      houseManagements={houseManagements}
      preparedAddresses={preparedAddresses}
      createSoiReport={createSoiReport}
      isCreateReportLoading={isCreateReportLoading}
    />
  );
};
