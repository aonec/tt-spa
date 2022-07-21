import { Form } from 'antd';
import { useFormik } from 'formik';
import _ from 'lodash/fp';
import {
  EResourceDisconnectingType,
  EResourceType,
  ResourceDisconnectingCreateRequest,
} from 'myApi';
import React, { FC } from 'react';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';
import { resourceNamesLookup } from 'utils/resourceNamesLookup';
import {
  BaseInfoWrapper,
  ResourceOptionWrapper,
} from './CreateResourceDisconnectionForm.styled';
import { CreateResourceDisconnectionFormProps } from './CreateResourceDisconnectionForm.types';

export const CreateResourceDisconnectionForm: FC<CreateResourceDisconnectionFormProps> = ({
  formId,
  handleSubmit,
  cities,
  selectedCity,
  handleSelectCity,
  heatingStations,
  handleSelectHeatingStation,
  addresses,
}) => {
  const {
    values,
    submitForm,
    setFieldValue,
    handleChange,
  } = useFormik<ResourceDisconnectingCreateRequest>({
    initialValues: {
      resource: EResourceType.Electricity,
      disconnectingType: EResourceDisconnectingType.Emergency,
      endDate: '',
      housingStockIds: [],
      sender: '',
      startDate: '',
      heatingStationId: '',
    },
    onSubmit: handleSubmit,
  });

  const heatingStationPlaceholderText = selectedCity
    ? 'Выберите ЦТП'
    : 'Выберите город';

  const multipleSelectionAddress = addresses?.map((elem) => ({
    label: getHousingStockAddress(elem),
    value: elem.id,
  }));

  return (
    <Form id={formId} onSubmitCapture={submitForm}>
      <BaseInfoWrapper>
        <FormItem label="Тип ресурса">
          <Select
            placeholder="Выберите тип ресурса"
            value={values.resource || undefined}
            onChange={(value) =>
              setFieldValue('resource', value as EResourceType)
            }
          >
            {Object.keys(EResourceType)?.map((elem) => (
              <Select.Option key={elem} value={elem}>
                <ResourceOptionWrapper>
                  <ResourceIconLookup resource={elem as EResourceType} />
                  <span className="device-resource-name">
                    {resourceNamesLookup[elem]}
                  </span>
                </ResourceOptionWrapper>
              </Select.Option>
            ))}
          </Select>
        </FormItem>
        <FormItem label="Отправитель отключения">
          <Input
            placeholder="Введите название организации"
            value={values.sender}
            name="sender"
            onChange={handleChange}
          />
        </FormItem>
        <FormItem label="Город">
          <Select
            placeholder="Выберите город"
            onChange={(value) => handleSelectCity(String(value))}
          >
            {cities?.map((city) => (
              <Select.Option key={city} value={city}>
                {city}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
        <FormItem label="ЦТП">
          <Select
            placeholder={heatingStationPlaceholderText}
            onChange={(stationId) =>
              handleSelectHeatingStation(String(stationId))
            }
          >
            {heatingStations?.map((station) => (
              <Select.Option key={station.id} value={station.id}>
                {station.name}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
        <FormItem label="Адрес">
          <Select
            mode="multiple"
            options={multipleSelectionAddress}
            onChange={(selectedAddresses) =>
              setFieldValue('housingStockIds', selectedAddresses)
            }
            placeholder="Выберите адрес из списка"
          />
        </FormItem>
      </BaseInfoWrapper>
    </Form>
  );
};
