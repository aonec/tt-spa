import React, { FC, useMemo } from 'react';
import moment from 'moment';
import stc from 'string-to-color';
import { baseURL } from '01/axios';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { SettingsIcon } from 'ui-kit/icons';
import { Input } from 'ui-kit/Input';
import { Button } from 'ui-kit/Button';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import {
  Badge,
  DevUrlInputWrapper,
  FeatureToggle,
  FeatureTogglesWrapper,
} from './DevelopmentSettingsModal.styled';
import { DevelopmentSettingsModalProps } from './DevelopmentSettingsModal.types';
import { urls } from './DevelopmentSettingsModal.constants';

export const DevelopmentSettingsModal: FC<DevelopmentSettingsModalProps> = ({
  visible,
  closeDevSettingsModal,
  devUrl,
  setDevUrl,
  featureToggles,
  toggleFeature,
}) => {
  const featuresArray = useMemo(
    () => Object.entries(featureToggles),
    [featureToggles],
  );

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
          <FormItem label="Feature toggles">
            <FeatureTogglesWrapper>
              {featuresArray.map(([key, isActive]) => {
                const color = stc(key);

                return (
                  <FeatureToggle
                    onClick={() => toggleFeature(key)}
                    color={color}
                    isActive={isActive}
                  >
                    {key}
                  </FeatureToggle>
                );
              })}
            </FeatureTogglesWrapper>
          </FormItem>
          <Badge>TT frontend team {moment().format('YYYY')} [ver: 1.1.0]</Badge>
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
