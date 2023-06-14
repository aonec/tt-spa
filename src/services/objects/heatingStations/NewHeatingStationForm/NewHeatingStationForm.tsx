import React, { FC } from 'react';
import {
  AddressGridWrapper,
  GridContainer,
} from './NewHeatingStationForm.styled';
import {
  HeatingStation,
  HeatingStationType,
  NewHeatingStationFormProps,
} from './NewHeatingStationForm.types';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { useFormik } from 'formik';
import { Input } from 'ui-kit/Input';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { Form } from 'antd';
import {
  HeatingStationTypeDictionary,
  validationSchema,
} from './newHeatingStationForm.constants';
import { AutoComplete } from 'ui-kit/AutoComplete';
import { getPreparedStreetsOptions } from 'services/objects/createObjectService/view/CreateObjectPage/CreateObjectAddressStage/CreateObjectAddressStage.utils';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';

const { ExistingCitiesGate, ExistingStreetsGate } = addressSearchService.gates;

export const NewHeatingStationForm: FC<NewHeatingStationFormProps> = ({
  formId,
  handleCreateHeatingStation,
  existingCities,
  existingStreets,
  handleEditHeatingStation,
  openedHeatingStationData,
}) => {
  const { values, handleSubmit, setFieldValue, errors } =
    useFormik<HeatingStation>({
      initialValues: {
        isThermalChamber:
          (openedHeatingStationData?.isThermalChamber
            ? HeatingStationType.ThermalChamber
            : HeatingStationType.CentralHeatingStation) || null,
        name: openedHeatingStationData?.name || null,
        address: {
          city: openedHeatingStationData?.address?.city || null,
          street: openedHeatingStationData?.address?.street || '',
          number: openedHeatingStationData?.address?.housingStockNumber || null,
        },
      },
      enableReinitialize: true,
      onSubmit: (data) => {
        handleCreateHeatingStation && handleCreateHeatingStation(data);
        handleEditHeatingStation &&
          openedHeatingStationData?.id &&
          handleEditHeatingStation({ id: openedHeatingStationData?.id, data });
      },
      validateOnChange: false,
      validationSchema,
    });

  const addressSearch = values.address.street;

  const preparedExistingStreets = getPreparedStreetsOptions(
    addressSearch,
    existingStreets || [],
  );

  return (
    <>
      <ExistingCitiesGate />
      {values.address.city && (
        <ExistingStreetsGate City={values.address.city} />
      )}

      <Form id={formId} onSubmitCapture={handleSubmit}>
        <GridContainer>
          <FormItem label="Тип">
            <Select
              placeholder="Выберите из списка"
              value={values.isThermalChamber || undefined}
              onChange={(value) => setFieldValue('isThermalChamber', value)}
            >
              {Object.values(HeatingStationType).map((e) => (
                <Select.Option value={e} key={e}>
                  {HeatingStationTypeDictionary[e]}
                </Select.Option>
              ))}
            </Select>
            <ErrorMessage>{errors?.isThermalChamber}</ErrorMessage>
          </FormItem>

          <FormItem label="Название">
            <Input
              placeholder="Введите"
              value={values.name || undefined}
              onChange={(value) => setFieldValue('name', value.target.value)}
            />
            <ErrorMessage>{errors?.name}</ErrorMessage>
          </FormItem>
        </GridContainer>

        <AddressGridWrapper>
          <FormItem label="Город">
            <Select
              onChange={(value) =>
                setFieldValue('address', { ...values.address, city: value })
              }
              value={values.address.city || undefined}
              placeholder="Выберите из списка"
            >
              {existingCities?.map((city) => (
                <Select.Option value={city} key={city}>
                  {city}
                </Select.Option>
              ))}
            </Select>
            <ErrorMessage> {errors.address?.city} </ErrorMessage>
          </FormItem>

          <FormItem label="Улица">
            <AutoComplete
              placeholder="Улица"
              value={
                values.address.street === 'Default'
                  ? 'Не выбрано'
                  : values.address.street
              }
              onChange={(value) =>
                setFieldValue('address', { ...values.address, street: value })
              }
              options={preparedExistingStreets || undefined}
            />
            <ErrorMessage> {errors.address?.street} </ErrorMessage>
          </FormItem>

          <FormItem label="Номер">
            <Input
              placeholder="Введите"
              value={values.address.number || undefined}
              onChange={(value) =>
                setFieldValue('address', {
                  ...values.address,
                  number: value.target.value,
                })
              }
            />
            <ErrorMessage> {errors.address?.number} </ErrorMessage>
          </FormItem>
        </AddressGridWrapper>
      </Form>
    </>
  );
};
