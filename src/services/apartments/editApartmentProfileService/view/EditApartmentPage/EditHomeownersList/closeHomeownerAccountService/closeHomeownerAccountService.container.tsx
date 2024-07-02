import { Form, message } from 'antd';
import { useUnit } from 'effector-react';
import dayjs from 'api/dayjs';
import React, { useState } from 'react';
import { DatePicker } from 'ui-kit/DatePicker';
import { FormItem } from 'ui-kit/FormItem';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { closeHomeownerAccountService } from './closeHomeownerAccountService.model';

const { inputs, outputs } = closeHomeownerAccountService;

const formId = 'close-homeowner-account-form';

export const CloseHomeownerAccountContainer = () => {
  const [closedAt, setClosedAt] = useState<dayjs.Dayjs | null>(null);

  const {
    handleCloseHomeownerAccount,
    handleCloseModal,
    isLoading,
    isModalOpen,
  } = useUnit({
    isModalOpen: outputs.$isModalOpen,
    isLoading: outputs.$isLoading,
    handleCloseModal: inputs.closeClosingHomeownerModal,
    handleCloseHomeownerAccount: inputs.handleCloseHomeownerAccount,
  });

  const handleSubmit = () => {
    if (!closedAt) return message.warning('Не выбрана дата закрытия');

    handleCloseHomeownerAccount({ closedAt: closedAt.format('YYYY-MM-DD') });
  };

  return (
    <FormModal
      title="Подтвердите закрытие лицевого счета"
      visible={isModalOpen}
      loading={isLoading}
      onCancel={() => handleCloseModal()}
      form={
        <Form id={formId} onSubmitCapture={handleSubmit}>
          <FormItem label="Дата закрытия">
            <DatePicker
              format={{ format: 'DD.MM.YYYY', type: 'mask' }}
              value={closedAt}
              onChange={setClosedAt}
            />
          </FormItem>
        </Form>
      }
      formId={formId}
    />
  );
};
