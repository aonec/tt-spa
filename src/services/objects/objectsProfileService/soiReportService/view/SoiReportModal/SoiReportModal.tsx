import { ModalTT } from '01/shared/ui/ModalTT';
import React, { FC } from 'react';
import { BagIcon, CityIcon } from 'ui-kit/icons';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { ActionButton } from 'ui-kit/shared_components/ActionButton';
import { SoiReportType } from '../../soiReportService.model.types';
import { SoiReportForm } from './SoiReportForm';
import { ActionButtonsWrapper } from './SoiReportModal.styled';
import { SoiReportModalProps } from './SoiReportModal.types';

export const SoiReportModal: FC<SoiReportModalProps> = ({
  isModalOpen,
  closeSoiReportModal,
  soiReportType,
  setSoiReportType,
  citiesList,
  selectedCity,
  setSelectedCity,
  houseManagements,
  preparedAddresses,
}) => {
  if (!soiReportType) {
    return (
      <ModalTT
        title="Выберите тип отчета"
        visible={isModalOpen}
        onCancel={closeSoiReportModal}
        footer={null}
      >
        <ActionButtonsWrapper>
          <ActionButton
            text="По адресу"
            icon={<CityIcon />}
            onClick={() => setSoiReportType(SoiReportType.Address)}
          />
          <ActionButton
            text="По домоуправлению"
            icon={<BagIcon />}
            onClick={() => setSoiReportType(SoiReportType.HouseManagement)}
          />
        </ActionButtonsWrapper>
      </ModalTT>
    );
  }

  return (
    <FormModal
      visible={isModalOpen}
      title="Выберите тип отчета"
      formId="id"
      onCancel={closeSoiReportModal}
      form={
        <SoiReportForm
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          citiesList={citiesList}
          soiReportType={soiReportType}
          houseManagements={houseManagements}
          preparedAddresses={preparedAddresses}
        />
      }
      submitBtnText="Выгрузить отчёт"
    />
  );
};
