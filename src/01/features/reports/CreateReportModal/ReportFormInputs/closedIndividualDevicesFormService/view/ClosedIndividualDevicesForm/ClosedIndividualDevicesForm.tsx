import { closingReasons } from '01/features/individualDevices/switchIndividualDevice/components/stages/BaseInfoStage';
import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { Checkbox } from 'antd';
import React, { FC } from 'react';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { RangeDatePicker } from '../../../view/RangeDatePicker';
import { ResourceSelect } from '../../../view/ResourceSelect';
import { ExportTypeSelectWrapper } from './ClosedIndividualDevicesForm.styled';
import { ClosedIndividualDevicesFormProps } from './ClosedIndividualDevicesForm.types';
import { unloadingTypes } from './ClosedIndividualDevicesFormService.constants';

export const ClosedIndividualDevicesForm: FC<ClosedIndividualDevicesFormProps> = ({}) => {
  return (
    <div>
      <ExportTypeSelectWrapper>
        <FormItem label="Тип выгрузки">
          <Select placeholder="Выберите из списка">
            {Object.entries(unloadingTypes).map(([key, elem]) => (
              <Select.Option value={key} key={key}>
                {elem}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
        <FormItem label={'Домоуправление'}>
          <Select placeholder="Выберите из списка"></Select>
        </FormItem>
      </ExportTypeSelectWrapper>

      <ResourceSelect onChange={() => {}} resources={[]}></ResourceSelect>

      <FormItem label="Причина закрытия">
        <Select mode="multiple" placeholder="Выберите из спика">
          {Object.entries(closingReasons).map(([key, elem]) => (
            <Select.Option value={key} key={key}>
              {elem}
            </Select.Option>
          ))}
        </Select>
      </FormItem>

      <RangeDatePicker
        label="Период закрытия"
        rangePeriod={[null, null]}
        onChange={() => {}}
      />

      <SpaceLine />

      <Checkbox>
        {'Исключить квартиры с открытыми ИПУ по выбранному адресу'}
      </Checkbox>
    </div>
  );
};
