import { Form } from 'antd';
import { useEvent, useStore } from 'effector-react';
import moment from 'moment';
import React, { useState } from 'react';
import { DatePicker } from 'ui-kit/DatePicker';
import { FormItem } from 'ui-kit/FormItem';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { closeHomeownerAccountService } from './closeHomeownerAccountService.model';

const { inputs, outputs } = closeHomeownerAccountService;

const formId = 'close-homeowner-account-form';

export const CloseHomeownerAccountContainer = () => {
  const [closedAt, setClosedAt] = useState<moment.Moment | null>(null);

  const isModalOpen = useStore(outputs.$isModalOpen);
  const isLoading = useStore(outputs.$isLoading);

  const handleCloseModal = useEvent(inputs.closeClosingHomeownerModal);
  const handleCloseHomeownerAccount = useEvent(
    inputs.handleCloseHomeownerAccount
  );

  const handleSubmit = () => {
    if (!closedAt) return;

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
              format="DD.MM.YYYY"
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
