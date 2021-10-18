import { DatePickerNative } from '01/shared/ui/DatePickerNative';
import { Grid } from '01/shared/ui/Layout/Grid';
import { ModalTT } from '01/shared/ui/ModalTT';
import { useStore } from 'effector-react';
import React from 'react';
import {
  $isVisibleCloseHomeonwerAccountModal,
  closeCloseHomeonwerAccountModal,
} from '../../models';
import { Form } from 'antd';
import { $homeowner } from '01/features/homeowner/displayHomeowner/models';

export const CloseHomeownerAccountModal = () => {
  const visible = useStore($isVisibleCloseHomeonwerAccountModal);
  const homeowner = useStore($homeowner);

  const title = `Вы действительно хотите закрыть лицевой счет ${
    homeowner?.personalAccountNumber || ''
  }?`;

  return (
    <ModalTT
      title={title}
      visible={visible}
      onCancel={closeCloseHomeonwerAccountModal}
      saveBtnText="Закрыть"
      saveButtonType="red"
    >
      <Grid temp="1fr 1fr" gap="15px">
        <Form.Item label="Дата закрытия текущего лицевого счета">
          <DatePickerNative />
        </Form.Item>
      </Grid>
    </ModalTT>
  );
};
