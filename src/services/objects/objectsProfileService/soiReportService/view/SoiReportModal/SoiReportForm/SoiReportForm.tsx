import { Radio, Space } from 'antd';
import React, { FC } from 'react';
import { TreeSelectSC } from 'services/resources/createResourceDisconnectionService/view/CreateResourceDisconnectionForm/CreateResourceDisconnectionForm.styled';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import { SoiReportType } from '../../../soiReportService.model.types';
import { FormGrid } from './SoiReportForm.styled';
import { SoiReportFormProps } from './SoiReportForm.types';

export const SoiReportForm: FC<SoiReportFormProps> = ({
  soiReportType,
  citiesList,
  selectedCity,
  setSelectedCity,
  houseManagements,
  preparedAddresses,
}) => {
  return (
    <div>
      <FormItem label="Название отчёта">
        <Input placeholder="Введите название отчёта" />
      </FormItem>
      <FormGrid>
        <FormItem label="Город">
          <Select
            value={selectedCity || undefined}
            onChange={(city) => setSelectedCity(city as string)}
            placeholder="Выберите город"
          >
            {citiesList?.map((city) => (
              <Select.Option key={city} value={city}>
                {city}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
        {soiReportType === SoiReportType.Address && (
          <FormItem label="Адрес">
            <TreeSelectSC
              placeholder="Выберите из списка"
              showSearch
              showArrow
              treeCheckable={false}
              treeData={preparedAddresses}
            />
          </FormItem>
        )}
        {soiReportType === SoiReportType.HouseManagement && (
          <FormItem label="Домоуправление">
            <Select placeholder="Выберите домоуправление из списка">
              {houseManagements?.map(({ id, name }) => (
                <Select.Option key={id} value={id}>
                  {name}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
        )}
        <FormItem label="Тип ресурса">
          <Select placeholder="Выберите тип ресурса"></Select>
        </FormItem>
        <FormItem label="Норматив на 1 человека">
          <Input placeholder="Выберите норматив" />
        </FormItem>
        <FormItem label="Период">
          <Radio.Group>
            <Space direction="vertical">
              <Radio value={1}>Месяц</Radio>
              <Radio value={2}>Год</Radio>
            </Space>
          </Radio.Group>
        </FormItem>
      </FormGrid>
    </div>
  );
};
