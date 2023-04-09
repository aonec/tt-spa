import { DatePickerNative } from '01/shared/ui/DatePickerNative';
import { Grid } from '01/shared/ui/Layout/Grid';
import { ModalTT } from '01/shared/ui/ModalTT';
import { useStore } from 'effector-react';
import React from 'react';
import {
  $closeHomeownerRequestStatus,
  $isVisibleCloseHomeonwerAccountModal,
  closeCloseHomeonwerAccountModal,
  closeHomeownerAccountForm,
  closeHomeownerAccountFx,
  resetCloseHomeownerRequestStatus,
} from '../../models';
import { Form, message } from 'antd';
import { $homeowner } from '01/features/homeowner/displayHomeowner/models';
import { useHistory } from 'react-router';
import { useEffect } from 'react';
import { useForm } from 'effector-forms/dist';
import { ErrorMessage } from '01/shared/ui/ErrorMessage';

export const CloseHomeownerAccountModal = () => {
  const visible = useStore($isVisibleCloseHomeonwerAccountModal);
  const homeowner = useStore($homeowner);

  const title = `Вы действительно хотите закрыть лицевой счет ${
    homeowner?.personalAccountNumber || ''
  }?`;

  const status = useStore($closeHomeownerRequestStatus);
  const history = useHistory();

  const { fields, submit } = useForm(closeHomeownerAccountForm);

  useEffect(() => {
    if (!status) return;

    if (status === 'done') {
      history.goBack();
      message.success('Лицевой счет успешно закрыт');
    }
    resetCloseHomeownerRequestStatus();
  }, [status, history]);

  const pending = useStore(closeHomeownerAccountFx.pending);

  return (
    <ModalTT
      title={title}
      visible={visible}
      onCancel={closeCloseHomeonwerAccountModal}
      saveBtnText="Закрыть"
      saveButtonType="danger"
      loading={pending}
      onSubmit={submit}
    >
      <Grid temp="1fr 1fr" gap="15px">
        <Form.Item label="Дата закрытия текущего лицевого счета">
          <DatePickerNative
            value={fields.closedAt.value}
            onChange={fields.closedAt.onChange}
          />
          <ErrorMessage>
            {fields.closedAt.errorText({
              required: 'Это поле обязательное',
            })}
          </ErrorMessage>
        </Form.Item>
      </Grid>
    </ModalTT>
  );
};
