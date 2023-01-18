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
import { Flex } from '01/shared/ui/Layout/Flex';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { Button } from 'ui-kit/Button';
import { SettingsIcon } from 'ui-kit/icons';
import { baseURL } from '01/axios';

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
        <Flex>
          <InputSC
            value={fields.devUrl.value}
            onChange={(e) => fields.devUrl.onChange(e.target.value)}
          />
          <Space />
          <Button
            size="small"
            icon={<SettingsIcon />}
            onClick={() => fields.devUrl.onChange(baseURL)}
          >
            Reset
          </Button>
        </Flex>
      </Form.Item>
    </ModalTT>
  );
};
