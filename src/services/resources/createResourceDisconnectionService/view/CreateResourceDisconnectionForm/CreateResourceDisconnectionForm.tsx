import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { Form } from 'antd';
import { useFormik } from 'formik';
import _, { __ } from 'lodash/fp';
import { EResourceDisconnectingType, EResourceType } from 'myApi';
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { DatePicker } from 'ui-kit/DatePicker';
import { Document, DocumentsUploadContainer } from 'ui-kit/DocumentsService';
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
  ResourceOptionWrapper,
  TagPlaceholder,
  TimeWrapper,
  TreeSelectSC,
} from './CreateResourceDisconnectionForm.styled';
import {
  CreateResourceDisconnectionFormTypes,
  CreateResourceDisconnectionFormProps,
  TreeSelectLabelValueType,
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
  isInterHeatingSeason,
}) => {
  const handleSubmitFormik = useCallback(
    (formValues: CreateResourceDisconnectionFormTypes) => {
      const preparedHousingStockIds = formValues.housingStockIds.filter(
        (elem) => elem !== -1
      );
      const resource = formValues.resource;
      const disconnectingType = formValues.disconnectingType;

      if (resource && disconnectingType) {
        handleSubmit({
          resource,
          disconnectingType,
          startDate: getDate(formValues.startDate, formValues.startHour),
          endDate: getDate(formValues.endDate, formValues.endHour),
          housingStockIds: preparedHousingStockIds,
          heatingStationId: formValues.heatingStationId || null,
          sender: formValues.sender,
        });
      }
    },
    [handleSubmit]
  );

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
    onSubmit: handleSubmitFormik,
  });

  const [documents, setDocuments] = useState<Document[]>([]);

  const allHousingStocks = useMemo(
    () =>
      treeData.reduce((acc, street) => {
        const housingStocks = street?.children?.map(
          (address) => address.value
        ) || [Number(street.value)];
        if (housingStocks) {
          return [...acc, ...housingStocks];
        }
        return acc;
      }, [] as number[]),
    [treeData]
  );

  const handleChangeHousingStocks = useCallback(
    (
      selectedAddresses:
        | TreeSelectLabelValueType
        | TreeSelectLabelValueType[]
        | string
        | (string | number)[]
        | number
    ) => {
      const selectedAddressesArray = [selectedAddresses].flat();

      const allHousingStocksVariantClicked = selectedAddressesArray.includes(
        -1
      );
      const allHousingStocksChosen =
        selectedAddressesArray.length === allHousingStocks.length &&
        !isAllPrevious.current;

      const isAllSelected =
        allHousingStocksVariantClicked || allHousingStocksChosen;

      if (isAllSelected && !isAllPrevious.current) {
        isAllPrevious.current = true;
        return setFieldValue('housingStockIds', [...allHousingStocks, -1]);
      }

      if (!isAllSelected && isAllPrevious.current) {
        isAllPrevious.current = false;
        return setFieldValue('housingStockIds', []);
      }
      isAllPrevious.current = false;

      setFieldValue(
        'housingStockIds',
        selectedAddressesArray.filter((elem) => elem !== -1)
      );
    },
    [allHousingStocks]
  );

  const isAllPrevious = useRef(false);
  const isAllHousingStocksSelected = values.housingStockIds.includes(-1);

  const housingStocksPlaceholderText = isAllHousingStocksSelected
    ? 'Выбраны все адреса'
    : `Выбрано ${values.housingStockIds.length} адреса(-ов)`;

  const tagPlaceholder = useMemo(
    () => (
      <TagPlaceholder className="tag-placeholder">
        {housingStocksPlaceholderText}
      </TagPlaceholder>
    ),
    [housingStocksPlaceholderText]
  );

  const heatingStationPlaceholderText = selectedCity
    ? 'Выберите ЦТП'
    : 'Выберите город';
  const addressPlaceholderTextWhenCHSSelected = values.heatingStationId
    ? 'Выберите адрес из списка'
    : 'Выберите ЦТП';
  const addressPlaceholderTextWhenCitySelected = selectedCity
    ? addressPlaceholderTextWhenCHSSelected
    : 'Выберите город';

  const preparedEndHours = hours.filter((hour) => {
    const startHourNumber = Number(values.startHour.split(':')[0]);
    const endHourNumber = Number(hour.split(':')[0]);

    return endHourNumber >= startHourNumber;
  });

  const handleDisableDate = useCallback(
    (endDate: moment.Moment) => {
      const startDate = getDatePickerValue(values.startDate, 'DD.MM.YYYY');
      if (!startDate) {
        return true;
      }
      return endDate.startOf('day').diff(startDate, 'day') < 0;
    },
    [values.startDate]
  );

  useEffect(() => {
    setFieldValue('housingStockIds', []);
  }, [treeData]);

  useEffect(() => {
    if (!values.startDate) {
      setFieldValue('endDate', '');
    }
  }, [values.startDate]);

  useEffect(() => {
    if (!isInterHeatingSeason) {
      const startHourNumber = Number(values.startHour.split(':')[0]);
      const endHourNumber = Number(values.endHour.split(':')[0]);

      if (endHourNumber <= startHourNumber) {
        setFieldValue('endHour', values.startHour);
      }
    }
  }, [values.startHour]);

  useEffect(() => {
    if (isInterHeatingSeason) {
      setFieldValue('resource', EResourceType.Heat);
      setFieldValue(
        'disconnectingType',
        EResourceDisconnectingType.InterHeatingSeason
      );
    }
  }, [isInterHeatingSeason]);

  return (
    <Form id={formId} onSubmitCapture={submitForm}>
      <BaseInfoWrapper>
        <FormItem label="Тип ресурса">
          <Select
            disabled={isInterHeatingSeason}
            placeholder="Выберите тип ресурса"
            value={values.resource || undefined}
            onChange={(value) =>
              setFieldValue('resource', value as EResourceType)
            }
          >
            {resourceTypes?.map(({ key, value }) => {
              if (key) {
                return (
                  <Select.Option key={key} value={key}>
                    <ResourceOptionWrapper>
                      <div className="device-resource-icon">
                        <ResourceIconLookup resource={key as EResourceType} />
                      </div>
                      {value}
                    </ResourceOptionWrapper>
                  </Select.Option>
                );
              }
            }) || null}
          </Select>
          <ErrorMessage>{errors.resource}</ErrorMessage>
        </FormItem>
        <FormItem label="Класс отключения">
          <Select
            disabled={isInterHeatingSeason}
            onChange={(type) => setFieldValue('disconnectingType', type)}
            value={values.disconnectingType || undefined}
            placeholder="Выберите класс отключения"
          >
            {disconnectingTypes.map(({ key, value }) => {
              if (key) {
                return (
                  <Select.Option key={key} value={key}>
                    {value}
                  </Select.Option>
                );
              }
            }) || null}
          </Select>
          <ErrorMessage>{errors.disconnectingType}</ErrorMessage>
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
            )) || null}
          </Select>
        </FormItem>
        <FormItem label="ЦТП">
          <Select
            allowClear
            disabled={!selectedCity}
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
            )) || null}
          </Select>
        </FormItem>
        <FormItem label="Адрес">
          <TreeSelectSC
            showSearch
            showArrow
            disabled={!selectedCity || !values.heatingStationId}
            value={values.housingStockIds}
            treeCheckable
            maxTagCount={0}
            maxTagPlaceholder={() => {
              return tagPlaceholder;
            }}
            treeData={[{ title: 'Все дома', value: -1, key: -1 }, ...treeData]}
            showCheckedStrategy="SHOW_CHILD"
            onChange={(values) => handleChangeHousingStocks(values)}
            placeholder={addressPlaceholderTextWhenCitySelected}
          />
          <ErrorMessage>{errors.housingStockIds}</ErrorMessage>
        </FormItem>

        <div />

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
              disabled={!values.startDate || isInterHeatingSeason}
              value={getDatePickerValue(values.endDate, 'DD.MM.YYYY')}
              format="DD.MM.YYYY"
              placeholder="Дата"
              onChange={(_, stringDate) => setFieldValue('endDate', stringDate)}
              disabledDate={handleDisableDate}
            />
            <Select
              disabled={!values.startDate || isInterHeatingSeason}
              value={values.endHour}
              placeholder="Час"
              onChange={(hour) => setFieldValue('endHour', hour)}
            >
              {preparedEndHours.map((hour) => (
                <Select.Option key={hour} value={hour}>
                  {hour}
                </Select.Option>
              ))}
            </Select>
          </TimeWrapper>
          <ErrorMessage>{errors.endDate}</ErrorMessage>
        </FormItem>
      </BaseInfoWrapper>
      <FormItem label="Отправитель отключения">
        <Input
          placeholder="Введите название организации"
          value={values.sender}
          name="sender"
          onChange={handleChange}
        />
        <ErrorMessage>{errors.sender}</ErrorMessage>
      </FormItem>

      {isInterHeatingSeason && (
        <FormItem label="Приказ или акт об отключении ресурса">
          <DocumentsUploadContainer
            documents={documents}
            uniqId="edit-apartment-act-form"
            onChange={(files) => {
              setDocuments(files);
              setFieldValue('documentId', files[0]?.id || null);
            }}
            max={1}
          />
          <ErrorMessage>{errors.documentId}</ErrorMessage>
        </FormItem>
      )}
    </Form>
  );
};
