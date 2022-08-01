import { useStore } from 'effector-react';
import React from 'react';
import {
  $isDevSettingsModalOpen,
  closeDevSettingsModal,
  devSettingsForm,
} from './models';
import { Form } from 'antd';
import { useForm } from 'effector-forms/dist';
import { ModalTT } from '../../shared/ui/ModalTT';
import { InputSC } from '../../shared/ui/Fields';

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
