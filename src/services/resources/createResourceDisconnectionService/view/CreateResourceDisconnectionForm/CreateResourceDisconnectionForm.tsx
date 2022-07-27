import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { Form, TreeSelect } from 'antd';
import { useFormik } from 'formik';
import _ from 'lodash/fp';
import { EResourceDisconnectingType, EResourceType } from 'myApi';
import React, { FC } from 'react';
import { DatePicker } from 'ui-kit/DatePicker';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { getDatePickerValue } from 'utils/getDatePickerValue';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';
import { resourceNamesLookup } from 'utils/resourceNamesLookup';
import {
  createResourceDisconnectionValidationSchema,
  formInitialValues,
  hours,
} from './CreateResourceDisconnectionForm.constants';
import {
  BaseInfoWrapper,
  HeatingStationInputSC,
  ResourceOptionWrapper,
  TimeWrapper,
} from './CreateResourceDisconnectionForm.styled';
import {
  CreateResourceDisconnectionFormTypes,
  CreateResourceDisconnectionFormProps,
} from './CreateResourceDisconnectionForm.types';
import {
  getDate,
  resourceDisconnectingNamesLookup,
} from './CreateresourceDisconnectionForm.utils';
const { SHOW_PARENT } = TreeSelect;

export const CreateResourceDisconnectionForm: FC<CreateResourceDisconnectionFormProps> = ({
  formId,
  handleSubmit,
  cities,
  selectedCity,
  handleSelectCity,
  heatingStations,
  handleSelectHeatingStation,
  addressesFromHeatingStation,
  existingHousingStocks,
}) => {
  const {
    values,
    submitForm,
    setFieldValue,
    handleChange,
    errors,
  } = useFormik<CreateResourceDisconnectionFormTypes>({
    initialValues: formInitialValues,
    validationSchema: createResourceDisconnectionValidationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (formValues) =>
      handleSubmit({
        resource: formValues.resource!,
        disconnectingType: formValues.disconnectingType!,
        startDate: getDate(formValues.startDate, formValues.startHour),
        endDate: getDate(formValues.endDate, formValues.endHour),
        housingStockIds: formValues.housingStockIds,
        heatingStationId: formValues.heatingStationId,
        sender: formValues.sender,
      }),
  });

  const heatingStationPlaceholderText = selectedCity
    ? 'Выберите ЦТП'
    : 'Выберите город';

  const multipleSelectionAddressFromHeatingStation = addressesFromHeatingStation?.map(
    (elem) => ({
      title: getHousingStockAddress(elem),
      value: elem.id,
      key: elem.id,
    })
  );
  const treeData = addressesFromHeatingStation.length
    ? multipleSelectionAddressFromHeatingStation
    : existingHousingStocks;
  console.log(values.housingStockIds);
  console.log(treeData);

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
          <ErrorMessage>{errors.resource}</ErrorMessage>
        </FormItem>
        <FormItem label="Отправитель отключения">
          <Input
            placeholder="Введите название организации"
            value={values.sender}
            name="sender"
            onChange={handleChange}
          />
          <ErrorMessage>{errors.sender}</ErrorMessage>
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
          <HeatingStationInputSC
            allowClear
            placeholder={heatingStationPlaceholderText}
            onChange={(stationId) => {
              handleSelectHeatingStation(String(stationId || ''));
              setFieldValue('heatingStationId', stationId);
            }}
          >
            {heatingStations?.map((station) => (
              <Select.Option key={station.id} value={station.id}>
                {station.name}
              </Select.Option>
            ))}
          </HeatingStationInputSC>
        </FormItem>
        <FormItem label="Адрес">
          <TreeSelect
            treeCheckable
            showSearch
            treeData={treeData}
            showCheckedStrategy={SHOW_PARENT}
            onChange={(selectedAddresses) =>
              setFieldValue('housingStockIds', selectedAddresses)
            }
            placeholder="Выберите адрес из списка"
          />
        </FormItem>
        <FormItem label="Класс отключения">
          <Select
            onChange={(type) => setFieldValue('disconnectingType', type)}
            value={values.disconnectingType || undefined}
            placeholder="Выберите класс отключения"
          >
            {Object.keys(EResourceDisconnectingType).map((elem) => (
              <Select.Option key={elem} value={elem}>
                {resourceDisconnectingNamesLookup[elem]}
              </Select.Option>
            ))}
          </Select>
          <ErrorMessage>{errors.disconnectingType}</ErrorMessage>
        </FormItem>
        <FormItem label="Дата и время отключения ресурса">
          <TimeWrapper>
            <DatePicker
              value={getDatePickerValue(values.startDate, 'DD.MM.YYYY')}
              format="DD.MM.YYYY"
              placeholder="Дата"
              onChange={(_, stringDate) =>
                setFieldValue('startDate', stringDate)
              }
            />
            <Select
              value={values.startHour}
              placeholder="Час"
              onChange={(hour) => setFieldValue('startHour', hour)}
            >
              {hours.map((hour) => (
                <Select.Option key={hour} value={hour}>
                  {hour}
                </Select.Option>
              ))}
            </Select>
          </TimeWrapper>
          <ErrorMessage>{errors.startDate}</ErrorMessage>
        </FormItem>
        <FormItem label="Дата и время включения ресурса">
          <TimeWrapper>
            <DatePicker
              value={getDatePickerValue(values.endDate, 'DD.MM.YYYY')}
              format="DD.MM.YYYY"
              placeholder="Дата"
              onChange={(_, stringDate) => setFieldValue('endDate', stringDate)}
            />
            <Select
              value={values.endHour}
              placeholder="Час"
              onChange={(hour) => setFieldValue('endHour', hour)}
            >
              {hours.map((hour) => (
                <Select.Option key={hour} value={hour}>
                  {hour}
                </Select.Option>
              ))}
            </Select>
          </TimeWrapper>
          <ErrorMessage>{errors.endDate}</ErrorMessage>
        </FormItem>
      </BaseInfoWrapper>
    </Form>
  );
};
