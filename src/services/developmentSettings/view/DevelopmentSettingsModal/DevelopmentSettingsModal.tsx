import React, { FC } from 'react';
import { DevelopmentSettingsModalProps } from './DevelopmentSettingsModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { SettingsIcon } from 'ui-kit/icons';
import moment from 'moment';
import { Form } from 'antd';
import { Input } from 'ui-kit/Input';
import { Button } from 'ui-kit/Button';
import { Badge, DevUrlInputWrapper } from './DevelopmentSettingsModal.styled';
import { baseURL } from '01/axios';

export const DevelopmentSettingsModal: FC<DevelopmentSettingsModalProps> = ({
  visible,
  closeDevSettingsModal,
  devUrl,
  setDevUrl,
}) => {
  return (
    <FormModal
      formId="dev-settings-form"
      form={
        <>
          <Form.Item label="URL">
            <DevUrlInputWrapper>
              <Input
                small
                value={devUrl}
                onChange={(e) => setDevUrl(e.target.value)}
              />
              <Button
                size="small"
                icon={<SettingsIcon />}
                onClick={() => setDevUrl(baseURL)}
              >
                Reset
              </Button>
            </DevUrlInputWrapper>
          </Form.Item>
          <Badge>TT frontend team {moment().format('YYYY')} [ver: 1.0.2]</Badge>
        </>
      }
      centered
      title="Development settings"
      visible={visible}
      onCancel={closeDevSettingsModal}
      customFooter={<></>}
    />
  );
};
