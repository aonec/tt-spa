import { ModalTT } from '01/shared/ui/ModalTT';
import React, { FC } from 'react';
import { BagIcon, CityIcon } from 'ui-kit/icons';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { ActionButton } from 'ui-kit/shared_components/ActionButton';
import { SoiReportForm } from './SoiReportForm';
import { ActionButtonsWrapper } from './SoiReportModal.styled';
import { SoiReportModalProps } from './SoiReportModal.types';

export const SoiReportModal: FC<SoiReportModalProps> = ({
  isModalOpen,
  closeSoiReportModal,
}) => {
  return (
    <ModalTT
      title="Выберите тип отчета"
      visible={isModalOpen}
      onCancel={closeSoiReportModal}
      footer={null}
    >
      <ActionButtonsWrapper>
        <ActionButton text="По адресу" icon={<CityIcon />} onClick={() => {}} />
        <ActionButton
          text="По домоуправлению"
          icon={<BagIcon />}
          onClick={() => {}}
        />
      </ActionButtonsWrapper>
    </ModalTT>
    // <FormModal
    //   visible={isModalOpen}
    //   title="Выберите тип отчета"
    //   formId="id"
    //   onCancel={openSoiReportModal}
    //   form={<SoiReportForm />}
    // />
  );
};
