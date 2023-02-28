import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { Form } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
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
import { Select } from 'ui-kit/Select';
import { getDatePickerValue } from 'utils/getDatePickerValue';
import { EAddressDetails } from '../../createResourceDisconnectionService.types';
import {
  createResourceDisconnectionValidationSchema,
  formInitialValues,
  hours,
} from './CreateResourceDisconnectionForm.constants';
import {
  BaseInfoWrapper,
  CitySelectWrapper,
  InputSC,
  TagPlaceholder,
  TimeWrapper,
  TreeSelectSC,
} from './CreateResourceDisconnectionForm.styled';
import {
  CreateResourceDisconnectionFormTypes,
  CreateResourceDisconnectionFormProps,
  DetailsSelectLookup,
  TreeSelectValue,
} from './CreateResourceDisconnectionForm.types';
import {
  getAllHousingStocks,
  getDate,
  getFormValues,
  prepareEndHours,
} from './CreateresourceDisconnectionForm.utils';
import { CreateResourceDisconnectionSelectResource } from './CreateResourceDisconnectionSelectResource';

export const CreateResourceDisconnectionForm: FC<
  CreateResourceDisconnectionFormProps
> = ({
  formId,
  handleCreateResourceDisconnection,
  treeData,
  disconnectingTypes,
  resourceTypes,
  isInterHeatingSeason,
  resourceDisconnection,
  isEdit,
  handleEditResourceDisconnection,
  handleUpdateDocument,
  setTypeOfAddress,
  typeOfAddress,
  isHousingStocksLoading,
  existingCities,
  selectCity,
  selectedCity,
}) => {
  const documentInit = useMemo(
    () =>
      resourceDisconnection?.document ? [resourceDisconnection?.document] : [],
    [resourceDisconnection?.document],
  );

  const [documents, setDocuments] = useState<Document[]>(documentInit);

  const initialValues = useMemo(() => {
    if (!isEdit || !resourceDisconnection) {
      return formInitialValues;
    }
    return getFormValues(resourceDisconnection);
  }, [resourceDisconnection, isEdit]);

  const handleSubmitFormik = useCallback(
    (formValues: CreateResourceDisconnectionFormTypes) => {
      const preparedHousingStockIds = formValues.housingStockIds.filter(
        (elem) => elem !== -1,
      );
      const resource = formValues.resource;
      const disconnectingType = formValues.disconnectingType;

      if (!(resource && disconnectingType)) {
        return;
      }

      if (isEdit) {
        if (isInterHeatingSeason) {
          const document = documents[0];
          const isIdDifferent = documentInit[0]?.id !== document.id;

          if (document && isIdDifferent) {
            handleUpdateDocument(documents[0].id);
          }
        }

        return handleEditResourceDisconnection({
          disconnectingType,
          startDate: getDate(formValues.startDate, formValues.startHour),
          endDate: getDate(formValues.endDate, formValues.endHour),
          housingStockIds: preparedHousingStockIds,
          sender: formValues.sender,
        });
      }

      return handleCreateResourceDisconnection({
        resource,
        disconnectingType,
        startDate: getDate(formValues.startDate, formValues.startHour),
        endDate: getDate(formValues.endDate, formValues.endHour),
        housingStockIds: preparedHousingStockIds,
        heatingStationId: formValues.heatingStationId || null,
        sender: formValues.sender,
        documentId: formValues.documentId,
      });
    },
    [
      documents,
      handleCreateResourceDisconnection,
      handleEditResourceDisconnection,
      isEdit,
      documentInit,
      handleUpdateDocument,
      isInterHeatingSeason,
    ],
  );

  const { values, submitForm, setFieldValue, handleChange, errors } =
    useFormik<CreateResourceDisconnectionFormTypes>({
      initialValues,
      validationSchema: createResourceDisconnectionValidationSchema,
      enableReinitialize: true,
      validateOnChange: false,
      validateOnBlur: false,
      onSubmit: handleSubmitFormik,
    });

  const isAllPrevious = useRef(false);
  const isAllHousingStocksSelected = values.housingStockIds.includes(-1);

  const isCityShow =
    existingCities.length > 1 && typeOfAddress === EAddressDetails.All;

  const allHousingStocks = useMemo(
    () => getAllHousingStocks(treeData),
    [treeData],
  );

  const handleChangeHousingStocks = useCallback(
    (selectedAddresses: TreeSelectValue) => {
      const selectedAddressesArray = [selectedAddresses].flat();

      const allHousingStocksVariantClicked =
        selectedAddressesArray.includes(-1);
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
        selectedAddressesArray.filter((elem) => elem !== -1),
      );
    },
    [allHousingStocks, setFieldValue],
  );

  const housingStocksPlaceholderText = isAllHousingStocksSelected
    ? 'Выбраны все адреса'
    : `Выбрано ${values.housingStockIds.length} адреса(-ов)`;

  const tagPlaceholder = useMemo(
    () => (
      <TagPlaceholder className="tag-placeholder">
        {housingStocksPlaceholderText}
      </TagPlaceholder>
    ),
    [housingStocksPlaceholderText],
  );

  const preparedEndHours = prepareEndHours(values.startHour);

  const handleDisableDate = useCallback(
    (endDate: moment.Moment) => {
      const startDate = getDatePickerValue(values.startDate, 'DD.MM.YYYY');
      if (!startDate) {
        return true;
      }
      return endDate.startOf('day').diff(startDate, 'day') < 0;
    },
    [values.startDate],
  );

  useEffect(() => {
    setFieldValue('housingStockIds', []);
  }, [treeData, setFieldValue]);

  useEffect(() => {
    if (!values.startDate) {
      setFieldValue('endDate', '');
    }
  }, [values.startDate, setFieldValue]);

  useEffect(() => {
    if (!resourceDisconnection || treeData.length === 0) {
      return;
    }
    const housingStocks = resourceDisconnection.housingStocks || [];
    const housingStockIds = housingStocks.map(
      (housingstock) => housingstock.id,
    );

    handleChangeHousingStocks(housingStockIds);
  }, [treeData, handleChangeHousingStocks, resourceDisconnection]);

  useEffect(() => {
    if (!isInterHeatingSeason) {
      const startHourNumber = Number(values.startHour.split(':')[0]);
      const endHourNumber = Number(values.endHour.split(':')[0]);

      if (endHourNumber <= startHourNumber) {
        setFieldValue('endHour', values.startHour);
      }
    }
  }, [values.startHour, setFieldValue, values.endHour, isInterHeatingSeason]);

  useEffect(() => {
    if (isInterHeatingSeason) {
      setFieldValue('resource', EResourceType.Heat);
      setFieldValue(
        'disconnectingType',
        EResourceDisconnectingType.InterHeatingSeason,
      );
    }
  }, [isInterHeatingSeason, setFieldValue]);

  return (
    <Form id={formId} onSubmitCapture={submitForm}>
      <BaseInfoWrapper>
        <CreateResourceDisconnectionSelectResource
          disabled={isInterHeatingSeason || isEdit}
          currentValue={values.resource || undefined}
          resourceTypes={resourceTypes}
          errorText={errors.resource || null}
          setFieldValue={(value) => setFieldValue('resource', value)}
        />

        <FormItem label="Класс отключения">
          <Select
            disabled={isInterHeatingSeason || isEdit}
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
              return null;
            })}
          </Select>
          <ErrorMessage>{errors.disconnectingType}</ErrorMessage>
        </FormItem>

        <CitySelectWrapper showCity={isCityShow}>
          <FormItem label="Детальность адреса">
            <Select
              placeholder="Выберите из списка"
              onChange={(type) => setTypeOfAddress(type as EAddressDetails)}
              value={typeOfAddress}
            >
              {DetailsSelectLookup.map(({ key, value }) => (
                <Select.Option key={key} value={key}>
                  {value}
                </Select.Option>
              ))}
            </Select>
          </FormItem>

          {isCityShow && (
            <FormItem label="Город">
              <Select
                placeholder="Выберите из списка"
                onChange={(type) => selectCity(String(type))}
                value={selectedCity || undefined}
              >
                {existingCities.map((city) => (
                  <Select.Option key={city} value={city}>
                    {city}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
          )}
        </CitySelectWrapper>

        <FormItem label="Адрес">
          <TreeSelectSC
            showSearch
            showArrow
            value={values.housingStockIds}
            disabled={isHousingStocksLoading || (isCityShow && !selectedCity)}
            treeCheckable
            maxTagCount={0}
            maxTagPlaceholder={() => {
              return tagPlaceholder;
            }}
            treeData={[{ title: 'Все дома', value: -1, key: -1 }, ...treeData]}
            showCheckedStrategy="SHOW_CHILD"
            onChange={(values) => handleChangeHousingStocks(values)}
            placeholder="Выберите адрес"
          />
          <ErrorMessage>{errors.housingStockIds}</ErrorMessage>
        </FormItem>

        <FormItem label="Дата и время отключения ресурса">
          <TimeWrapper>
            <DatePicker
              disabled={isEdit}
              value={getDatePickerValue(values.startDate, 'DD.MM.YYYY')}
              format="DD.MM.YYYY"
              placeholder="Дата"
              onChange={(_, stringDate) =>
                setFieldValue('startDate', stringDate)
              }
            />
            <Select
              disabled={isEdit}
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
        <InputSC
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
            uniqId="add-document-to-resource-disconnection"
            onChange={(files) => {
              setDocuments(files);
              setFieldValue('documentId', files[0]?.id || null);
            }}
            max={1}
            // type={EDocumentType.}
          />
          <ErrorMessage>{errors.documentId}</ErrorMessage>
        </FormItem>
      )}
    </Form>
  );
};
