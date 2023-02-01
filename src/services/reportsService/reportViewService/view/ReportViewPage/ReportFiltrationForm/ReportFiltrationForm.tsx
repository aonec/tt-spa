import React, { FC } from 'react';
import { Radio, Space } from 'antd';
import { useFormik } from 'formik';
import { ResourceOption, Wrapper } from './ReportFiltrationForm.styled';
import { ReportFiltrationFormProps } from './ReportFiltrationForm.types';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { SearchIcon } from 'ui-kit/icons';
import { reportViewService } from 'services/reportsService/reportViewService/reportViewService.model';
import { getAddresses } from './ReportFiltrationForm.utils';
import { SelectMultiple } from 'ui-kit/SelectMultiple';
import { EResourceType } from 'myApi';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { ResourceShortNamesDictionary } from 'services/devices/resourceAccountingSystemsService/view/ResourceAccountingSystems/NodesGroup/NodesGroup.constants';

const { gates } = reportViewService;
const { HouseManagementsGate } = gates;

export const ReportFiltrationForm: FC<ReportFiltrationFormProps> = ({
  existingCities,
  houseManagements,
  addressesWithHouseManagements,
}) => {
  const { values, setFieldValue } = useFormik({
    initialValues: {
      city: '',
      houseManagement: null as null | string,
      housingStockId: null as null | number,
    },
    onSubmit: () => {},
  });

  const addresses = getAddresses(
    addressesWithHouseManagements,
    values.houseManagement
  );

  return (
    <>
      <HouseManagementsGate />
      <div>
        <Wrapper>
          <FormItem label="Город">
            <Select
              suffixIcon={<SearchIcon />}
              placeholder="Выберите из списка"
              value={values.city || undefined}
              onChange={(value) => setFieldValue('city', value)}
            >
              {existingCities?.map((city) => (
                <Select.Option key={city} value={city}>
                  {city}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label="Домоуправление">
            <Select
              value={values.houseManagement || undefined}
              suffixIcon={<SearchIcon />}
              placeholder="Выберите из списка"
              onChange={(value) =>
                setFieldValue('houseManagement', value || null)
              }
              allowClear
            >
              {houseManagements?.map((houseManagement) => (
                <Select.Option
                  key={houseManagement.id}
                  value={houseManagement.id}
                >
                  {houseManagement.name}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label="Адрес">
            <Select
              value={values.housingStockId || undefined}
              suffixIcon={<SearchIcon />}
              placeholder="Выберите адреса из списка"
              onChange={(value) => setFieldValue('housingStockId', value)}
            >
              {addresses.map((address) => (
                <Select.Option key={address.id} value={address.id}>
                  {address.addressString}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label="Ресурс">
            <SelectMultiple placeholder="Выбраны все ресурсы">
              {Object.values(EResourceType).map((resource) => (
                <SelectMultiple.Option key={resource} value={resource}>
                  <ResourceOption>
                    <ResourceIconLookup resource={resource} />
                    <div>{ResourceShortNamesDictionary[resource]}</div>
                  </ResourceOption>
                </SelectMultiple.Option>
              ))}
            </SelectMultiple>
          </FormItem>
          <FormItem label="Вид отчета">
            <Select placeholder="Выберите из списка" />
          </FormItem>
        </Wrapper>
        <FormItem label="Период">
          <Radio.Group>
            <Space direction="vertical">
              <Radio>Последние сутки</Radio>
              <Radio>Последние 7 дней</Radio>
              <Radio>С начала месяца</Radio>
              <Radio>За прошлый месяц</Radio>
              <Radio>Произвольный период</Radio>
            </Space>
          </Radio.Group>
        </FormItem>
      </div>
    </>
  );
};
