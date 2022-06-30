import { InputSC } from '01/shared/ui/Fields';
import { ModalTT } from '01/shared/ui/ModalTT';
import { useStore } from 'effector-react';
import React from 'react';
import {
  $isDevSettingsModalOpen,
  closeDevSettingsModal,
  devSettingsForm,
} from './models';
import { Form } from 'antd';
import { useForm } from 'effector-forms/dist';

export const DevSettingsModal = () => {
  const visible = useStore($isDevSettingsModalOpen);
  const { fields } = useForm(devSettingsForm);

  return (
    <ModalTT
      footer={<></>}
      centered
      title="Development settings"
      visible={visible}
      onCancel={closeDevSettingsModal}
    >
      <Form.Item label="URL">
        <InputSC
          value={fields.devUrl.value}
          onChange={(e: any) => fields.devUrl.onChange(e.target.value)}
        />
      </Form.Item>
    </ModalTT>
  );
};
