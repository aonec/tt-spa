import { useUnit } from 'effector-react';
import React from 'react';
import { prepareAddressesForTreeSelect } from 'ui-kit/shared/AddressTreeSelect/AddressTreeSelect.utils';
import { soiReportService } from './soiReportService.model';
import { SoiReportModal } from './view/SoiReportModal';

const { inputs, outputs } = soiReportService;

export const SoiReportContainer = () => {
  const {
    addressesPagedList,
    citiesList,
    closeSoiReportModal,
    createSoiReport,
    houseManagements,
    isCreateReportLoading,
    isModalOpen,
    selectedCity,
    setSelectedCity,
    setSoiReportType,
    soiReportType,
  } = useUnit({
    isModalOpen: outputs.$isModalOpen,
    soiReportType: outputs.$soiReportType,
    citiesList: outputs.$existingCities,
    selectedCity: outputs.$selectedCity,
    houseManagements: outputs.$houseManagements,
    addressesPagedList: outputs.$addressesPagedList,
    isCreateReportLoading: outputs.$isCreateReportLoading,
    closeSoiReportModal: inputs.closeSoiReportModal,
    setSoiReportType: inputs.setSoiReportType,
    setSelectedCity: inputs.setSelectedCity,
    createSoiReport: inputs.createSoiReport,
  });

  const preparedAddresses = prepareAddressesForTreeSelect({
    items: addressesPagedList?.items || [],
    isSelectableStreetNode: false,
    isTreeCheckable: false,
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
