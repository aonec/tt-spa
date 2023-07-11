import React, { FC } from 'react';
import { BagIcon, CityIcon } from 'ui-kit/icons';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { ActionButton } from 'ui-kit/shared_components/ActionButton';
import { SoiReportType } from '../../soiReportService.types';
import { SoiReportForm } from './SoiReportForm';
import { CREATE_SOI_REPORT_FORM_ID } from './SoiReportModal.constants';
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
  isCreateReportLoading,
  createSoiReport,
}) => {
  if (!soiReportType) {
    return (
      <FormModal
        innerModalProps={{ centered: false }}
        formId="soi-report-modal-form"
        title="Выберите тип отчета"
        visible={isModalOpen}
        onCancel={closeSoiReportModal}
        customFooter={<></>}
        form={
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
        }
      />
    );
  }

  return (
    <FormModal
      visible={isModalOpen}
      title="Выгрузка отчёта по СОИ"
      formId={CREATE_SOI_REPORT_FORM_ID}
      onCancel={closeSoiReportModal}
      loading={isCreateReportLoading}
      form={
        <SoiReportForm
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          citiesList={citiesList}
          soiReportType={soiReportType}
          houseManagements={houseManagements}
          preparedAddresses={preparedAddresses}
          createSoiReport={createSoiReport}
        />
      }
      submitBtnText="Выгрузить отчёт"
    />
  );
};
