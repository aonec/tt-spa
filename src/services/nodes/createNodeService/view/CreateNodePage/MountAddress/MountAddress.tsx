import React, { FC, useMemo, useState } from 'react';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import { Title } from 'ui-kit/Title';
import { Button } from 'ui-kit/Button';
import { Footer } from '../CreateNodePage.styled';
import { FormWrapper } from './MountAddress.styled';
import { MountAddressProps } from './MountAddress.types';
import { useFormik } from 'formik';
import { validationSchema } from './MountAddress.constants';
import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { ExistingStreetsGate } from '01/features/housingStocks/displayHousingStockStreets/model';
import { AutoComplete } from 'ui-kit/AutoComplete';
import { getPreparedStreetsOptions } from 'services/objects/createObjectService/view/CreateObjectPage/CreateObjectAddressStage/CreateObjectAddressStage.utils';
import { useHistory } from 'react-router-dom';
import { mountAddressService } from './MountAddress.models';
import { useStore } from 'effector-react';

const { outputs, effects } = mountAddressService;

export const MountAddress: FC<MountAddressProps> = ({
  housingStock,
  existingCities,
  existingStreets,
  updateRequestPayload,
}) => {
  const savedHousingStock = useStore(outputs.$housingStockListItem);
  const isLoading = useStore(outputs.$isLoading);

  const address = housingStock?.address?.mainAddress;

  const history = useHistory();

  const initialValues = useMemo(() => {
    const savedHousingStockAddress = savedHousingStock?.address?.mainAddress;

    return {
      city: address?.city || savedHousingStockAddress?.city || null,
      street: address?.street || savedHousingStockAddress?.street || '',
      number: address?.number || savedHousingStockAddress?.number || '',
      corpus: address?.corpus || savedHousingStockAddress?.corpus || '',
    };
  }, [savedHousingStock, address]);

  const {
    values,
    handleChange,
    handleSubmit: handleSubmitForm,
    setFieldValue,
    errors,
  } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      if (housingStock) {
        updateRequestPayload({ housingStockId: housingStock.id });

        return;
      }

      if (!values.city) return;

      const housingStockResponse = await effects.fetchHousingStockFx({
        City: values.city,
        Street: values.street,
        HousingStockNumber: values.number,
        Corpus: values.corpus,
        PageNumber: 1,
        PageSize: 1,
      });

      if (!housingStockResponse) return;

      updateRequestPayload({ housingStockId: housingStockResponse.id });
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
  });

  const isFieldsDisabled = Boolean(housingStock) || isLoading;

  const prparedStreetsOptions = getPreparedStreetsOptions(
    values.street,
    existingStreets
  );

  return (
    <>
      {values.city && <ExistingStreetsGate City={values.city} />}
      <div>
        <Title>Адрес установки</Title>
        <FormWrapper>
          <FormItem label="Город">
            <Select
              disabled={isFieldsDisabled}
              placeholder="Выберите"
              value={values.city || undefined}
              onChange={(value) => setFieldValue('city', value)}
            >
              {existingCities?.map((city) => (
                <Select.Option key={city} value={city}>
                  {city}
                </Select.Option>
              ))}
            </Select>
            <ErrorMessage>{errors.city}</ErrorMessage>
          </FormItem>
          <FormItem label="Улица">
            <AutoComplete
              value={values.street}
              onChange={(value) => setFieldValue('street', value)}
              disabled={isFieldsDisabled}
              placeholder="Введите улицу"
              options={prparedStreetsOptions}
            />
            <ErrorMessage>{errors.street}</ErrorMessage>
          </FormItem>
          <FormItem label="Номер дома">
            <Input
              value={values.number}
              onChange={handleChange}
              name="number"
              disabled={isFieldsDisabled}
              placeholder="Введите дом"
            />
            <ErrorMessage>{errors.number}</ErrorMessage>
          </FormItem>
          <FormItem label="Корпус">
            <Input
              value={values.corpus}
              onChange={handleChange}
              name="corpus"
              disabled={isFieldsDisabled}
              placeholder="Введите корпус"
            />
          </FormItem>
        </FormWrapper>
        <Footer>
          <Button type="ghost" onClick={() => history.goBack()}>
            Отмена
          </Button>
          <Button sidePadding={20} onClick={() => handleSubmitForm()}>
            Даллее
          </Button>
        </Footer>
      </div>
    </>
  );
};
