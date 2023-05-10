import React, { FC } from 'react';
import { DevelopmentSettingsModalProps } from './DevelopmentSettingsModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { SettingsIcon } from 'ui-kit/icons';
import moment from 'moment';
import { Input } from 'ui-kit/Input';
import { Button } from 'ui-kit/Button';
import { Badge, DevUrlInputWrapper } from './DevelopmentSettingsModal.styled';
import { baseURL } from '01/axios';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';

const urls = [
  'https://stage.k8s.transparent-technology.ru/api/',
  'http://localhost:5001/api/',
];

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
          <FormItem label="URL's list">
            <Select
              small
              placeholder="Select url"
              value={urls.find((elem) => elem === devUrl)}
              onChange={(value) => setDevUrl(value as string)}
            >
              {urls.map((elem) => (
                <Select.Option key={elem} value={elem}>
                  {elem}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label="URL">
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
          </FormItem>
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
