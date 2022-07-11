import { StyledDatePicker } from '01/shared/ui/Fields';
import { StyledSelect } from '01/shared/ui/Select/components';
import { InputTT } from '01/tt-components';
import { Form } from 'antd';
import { EResourceType } from 'myApi';
import React, { FC } from 'react';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import {
  BaseInfoWrapper,
  DeviceResourceOptionWrapper,
  Wrapper,
} from './ChangeODPUForm.styled';
import {
  ChangeODPUFormProps,
  ODPUPhaseDictionary,
} from './ChangeODPUForm.types';

export const ChangeODPUForm: FC<ChangeODPUFormProps> = ({}) => {
  return (
    <Wrapper>
      <BaseInfoWrapper>
        <div id="resourceType">
          <Form.Item label="Тип ресурса">
            <StyledSelect value={1} disabled>
              <StyledSelect.Option value={1}>
                <DeviceResourceOptionWrapper>
                  <ResourceIconLookup resource={EResourceType.Electricity} />
                  <span className="device-resource-name">Электричество</span>
                </DeviceResourceOptionWrapper>
              </StyledSelect.Option>
            </StyledSelect>
          </Form.Item>
        </div>
        <div id="deviceType">
          <Form.Item label="Тип прибора">
            <StyledSelect placeholder="Выберите тип прибора">
              {ODPUPhaseDictionary.map(({ key, value }) => (
                <StyledSelect.Option key={key} value={key}>
                  {value}
                </StyledSelect.Option>
              ))}
            </StyledSelect>
          </Form.Item>
        </div>
        <div id="deviceModel">
          <Form.Item label="Модель прибора">
            <InputTT placeholder="Введите модель" />
          </Form.Item>
        </div>
        <div id="serialNumber">
          <Form.Item label="Серийный номер">
            <InputTT placeholder="Введите серийный номер" />
          </Form.Item>
        </div>
        <div id="yearOfManufacture">
          <Form.Item label="Год выпуска">
            <StyledDatePicker placeholder="Введите модель" />
          </Form.Item>
        </div>
      </BaseInfoWrapper>
    </Wrapper>
  );
};
