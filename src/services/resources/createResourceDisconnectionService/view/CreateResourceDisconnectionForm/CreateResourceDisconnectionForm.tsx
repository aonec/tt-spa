import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { Form } from 'antd';
import { useFormik } from 'formik';
import _ from 'lodash/fp';
import { EResourceDisconnectingType, EResourceType } from 'myApi';
import React, { FC, useEffect } from 'react';
import { DatePicker } from 'ui-kit/DatePicker';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { getDatePickerValue } from 'utils/getDatePickerValue';
import {
  createResourceDisconnectionValidationSchema,
  formInitialValues,
  hours,
} from './CreateResourceDisconnectionForm.constants';
import {
  BaseInfoWrapper,
  HeatingStationInputSC,
  ResourceOptionWrapper,
  TagPlaceholder,
  TimeWrapper,
  TreeSelectSC,
} from './CreateResourceDisconnectionForm.styled';
import {
  CreateResourceDisconnectionFormTypes,
  CreateResourceDisconnectionFormProps,
} from './CreateResourceDisconnectionForm.types';
import { getDate } from './CreateresourceDisconnectionForm.utils';

export const CreateResourceDisconnectionForm: FC<CreateResourceDisconnectionFormProps> = ({
  formId,
  handleSubmit,
  cities,
  selectedCity,
  handleSelectCity,
  heatingStations,
  handleSelectHeatingStation,
  treeData,
  disconnectingTypes,
  resourceTypes,
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
  const addressPlaceholderText = selectedCity
    ? 'Выберите адрес из списка'
    : 'Выберите город';

  useEffect(() => {
    setFieldValue('housingStockIds', []);
  }, [treeData]);

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
            {resourceTypes?.map(({ key, value }) => (
              <Select.Option key={key!} value={key!}>
                <ResourceOptionWrapper>
                  <ResourceIconLookup resource={key as EResourceType} />
                  <span className="device-resource-name">{value}</span>
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
            value={selectedCity || undefined}
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
          <TreeSelectSC
            showSearch
            value={values.housingStockIds}
            treeCheckable
            maxTagCount={0}
            maxTagPlaceholder={(values) => (
              <TagPlaceholder>
                Выбрано {values.length} адреса(-ов)
              </TagPlaceholder>
            )}
            treeData={treeData}
            showCheckedStrategy="SHOW_CHILD"
            onChange={(selectedAddresses) =>
              setFieldValue('housingStockIds', selectedAddresses)
            }
            placeholder={addressPlaceholderText}
          />
          <ErrorMessage>{errors.housingStockIds}</ErrorMessage>
        </FormItem>
        <FormItem label="Класс отключения">
          <Select
            onChange={(type) => setFieldValue('disconnectingType', type)}
            value={values.disconnectingType || undefined}
            placeholder="Выберите класс отключения"
          >
            {disconnectingTypes.map(({ key, value }) => (
              <Select.Option key={key!} value={key!}>
                {value}
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
