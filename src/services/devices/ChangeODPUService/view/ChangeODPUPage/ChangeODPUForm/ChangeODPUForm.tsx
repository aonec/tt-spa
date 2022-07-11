import React, { FC } from 'react';
import { EResourceType } from 'myApi';
import { FormFields } from 'ui-kit/Inputs/FormFields';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import {
  BaseInfoWrapper,
  ChangingDeviceInfoWrapper,
  ChangingReasonSelectWrapper,
  CheckingDatesWrapper,
  DeviceResourceOptionWrapper,
  SealInfoWrapper,
  Wrapper,
} from './ChangeODPUForm.styled';
import {
  ChangeODPUFormProps,
  closingReasonDictionary,
  ODPUPhaseDictionary,
  yearQuarterDictionary,
} from './ChangeODPUForm.types';
import { checkIsDateNotFuture } from './ChangeODPUForm.utils';
import { DatePickerNative } from '01/shared/ui/DatePickerNative';

export const ChangeODPUForm: FC<ChangeODPUFormProps> = ({}) => {
  return (
    <Wrapper>
      <BaseInfoWrapper>
        <div id="resourceType">
          <FormFields.Item label="Тип ресурса">
            <FormFields.Select value={1} disabled>
              <FormFields.Select.Option value={1}>
                <DeviceResourceOptionWrapper>
                  <ResourceIconLookup resource={EResourceType.Electricity} />
                  <span className="device-resource-name">Электричество</span>
                </DeviceResourceOptionWrapper>
              </FormFields.Select.Option>
            </FormFields.Select>
          </FormFields.Item>
        </div>
        <div id="deviceType">
          <FormFields.Item label="Тип прибора">
            <FormFields.Select placeholder="Выберите тип прибора">
              {ODPUPhaseDictionary.map(({ key, value }) => (
                <FormFields.Select.Option key={key} value={key}>
                  {value}
                </FormFields.Select.Option>
              ))}
            </FormFields.Select>
          </FormFields.Item>
        </div>
        <div id="deviceModel">
          <FormFields.Item label="Модель прибора">
            <FormFields.Input placeholder="Введите модель" />
          </FormFields.Item>
        </div>
        <div id="serialNumber">
          <FormFields.Item label="Серийный номер">
            <FormFields.Input placeholder="Введите серийный номер" />
          </FormFields.Item>
        </div>
        <div id="yearOfManufacture">
          <FormFields.Item label="Год выпуска">
            <FormFields.DatePicker
              disabledDate={checkIsDateNotFuture}
              picker="year"
              placeholder="Введите год"
            />
          </FormFields.Item>
        </div>
        <div id="deviceInstallationDate">
          <FormFields.Item label="Дата установки прибора">
            <DatePickerNative placeholder="Введите дату" />
          </FormFields.Item>
        </div>
        <div id="scaleFactor">
          <FormFields.Item label="Коэффициент">
            <FormFields.Input type="number" placeholder="Введите коэффициент" />
          </FormFields.Item>
        </div>
      </BaseInfoWrapper>
      <CheckingDatesWrapper>
        <FormFields.Item label="Год посл. поверки">
          <FormFields.DatePicker
            picker="year"
            placeholder="Введите год посл. поверки"
          />
        </FormFields.Item>
        <FormFields.Item label="Год след. поверки">
          <FormFields.DatePicker
            picker="year"
            placeholder="Введите год след. поверки"
          />
        </FormFields.Item>
        <FormFields.Item label="Квартал">
          <FormFields.Select placeholder="Выберите">
            {yearQuarterDictionary.map(({ key, value }) => (
              <FormFields.Select.Option key={key} value={key}>
                {value}
              </FormFields.Select.Option>
            ))}
          </FormFields.Select>
        </FormFields.Item>
        <FormFields.Item label="Интервал">
          <FormFields.Input placeholder="Введите интервал" />
        </FormFields.Item>
      </CheckingDatesWrapper>
      <ChangingDeviceInfoWrapper>
        <ChangingReasonSelectWrapper>
          <FormFields.Item label="Причина замены">
            <FormFields.Select placeholder="Выберите причину замены">
              {closingReasonDictionary.map(({ key, value }) => (
                <FormFields.Select.Option key={key} value={key}>
                  {value}
                </FormFields.Select.Option>
              ))}
            </FormFields.Select>
          </FormFields.Item>
        </ChangingReasonSelectWrapper>
      </ChangingDeviceInfoWrapper>
      <SealInfoWrapper>
        <FormFields.Item label="Номер пломбы">
          <FormFields.Input placeholder="Введите номер пломбы" />
        </FormFields.Item>
        <FormFields.Item label="Дата установки пломбы">
          <FormFields.DatePicker placeholder="Выберите дату" />
        </FormFields.Item>
      </SealInfoWrapper>
    </Wrapper>
  );
};
