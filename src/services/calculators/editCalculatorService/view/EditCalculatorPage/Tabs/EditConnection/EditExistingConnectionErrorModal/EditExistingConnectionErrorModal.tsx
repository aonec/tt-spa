import React, { FC } from 'react';
import { EditExistingConnectionErrorModalProps } from './EditExistingConnectionErrorModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { EditExistingConnectionErrorForm } from './EditExistingConnectionErrorForm';
import { Button } from 'ui-kit/Button';
import { FooterSc } from './EditExistingConnectionErrorModal.styled';

const formId = 'edit-existing-connection-error-modal';

export const EditExistingConnectionErrorModal: FC<EditExistingConnectionErrorModalProps> = ({
  sameConnectionCalculator,
  handleCloseModal,
  isModalOpen,
  clearCalculatorStore,
}) => {
  return (
    <>
      <FormModal
        title="В системе уже есть устройство с совпадающими настройками соединения"
        visible={isModalOpen}
        onCancel={handleCloseModal}
        customFooter={
          <FooterSc>
            <Button type="ghost" onClick={handleCloseModal}>
              Изменить настройки соединения
            </Button>
          </FooterSc>
        }
        form={
          <EditExistingConnectionErrorForm
            sameConnectionCalculator={sameConnectionCalculator}
            handleCloseModal={handleCloseModal}
            clearCalculatorStore={clearCalculatorStore}
          />
        }
        formId={formId}
      />
    </>
  );
};
