import React, { FC } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  AddButtonWrapper,
  AutoCompleteSc,
  BlockTitle,
  ButtonPadding,
  DeleteButton,
  Footer,
  GridWrapper,
  ItemGridWrapper,
  NextCancelBlock,
  Wrapper,
} from './AddressTab.styled';
import { AddressTabProps } from './AddressTab.types';
import { getPreparedStreetsOptions } from 'services/objects/createObjectService/view/CreateObjectPage/CreateObjectAddressStage/CreateObjectAddressStage.utils';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { Input } from 'ui-kit/Input';
import { SpaceLine } from 'ui-kit/SpaceLine';
import { LinkButton } from 'ui-kit/shared/LinkButton';
import { Button } from 'ui-kit/Button';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import _ from 'lodash';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';

const { ExistingCitiesGate, ExistingStreetsGate } = addressSearchService.gates;

export const AddressTab: FC<AddressTabProps> = ({
  address,
  existingCities,
  existingStreets,
  onPageCancel,
  handleCreateHousingStockAddress,
  handleDeleteHousingStockAddress,
  handleUpdateHousingStockAddress,
  isCreateLoading,
  isUpdateLoading,
  handleRefetchHousingStock,
}) => {
  const { additionalAddresses, mainAddress } = address;

  const { values, handleSubmit, setFieldValue, errors } = useFormik({
    initialValues: {
      city: mainAddress?.city || null,
      street: mainAddress?.street || '',
      house: mainAddress?.number || null,
      corpus: mainAddress?.corpus || null,
      additionalAddresses: additionalAddresses || [],
    },
    enableReinitialize: true,

    onSubmit: (data) => {
      const { city, street, house, corpus } = data;
      const submittedMainAddress = { city, street, house, corpus };
      const initialMainAddress = {
        city: mainAddress?.city,
        street: mainAddress?.street,
        house: mainAddress?.number,
        corpus: mainAddress?.corpus,
      };

      const isMainAddressChanged = !_.isEqual(
        submittedMainAddress,
        initialMainAddress,
      );
      isMainAddressChanged &&
        mainAddress &&
        handleUpdateHousingStockAddress({
          addressId: mainAddress.id,
          data: {
            number: submittedMainAddress.house,
            corpus: submittedMainAddress.corpus,
          },
        });

      data.additionalAddresses.forEach((submittedAdditionalAddress) => {
        const currentInitialAdditionalAddress = additionalAddresses?.find(
          (address) => address.id === submittedAdditionalAddress.id,
        );
        const isAdditionalAddressChanged = !_.isEqual(
          submittedAdditionalAddress,
          currentInitialAdditionalAddress,
        );

        currentInitialAdditionalAddress?.id &&
          isAdditionalAddressChanged &&
          handleUpdateHousingStockAddress({
            addressId: submittedAdditionalAddress.id,
            data: {
              number: submittedAdditionalAddress.number,
              corpus: submittedAdditionalAddress.corpus,
            },
          });

        !currentInitialAdditionalAddress?.id &&
          submittedAdditionalAddress.street &&
          handleCreateHousingStockAddress({
            street: submittedAdditionalAddress.street,
            number: submittedAdditionalAddress.number || undefined,
            corpus: submittedAdditionalAddress.corpus,
          });
      });
      setTimeout(() => handleRefetchHousingStock(), 500);
    },
    validateOnChange: false,
    validationSchema: yup.object().shape({
      city: yup.string().nullable().required('Обязательное поле'),
      street: yup.string().nullable().required('Обязательное поле'),
      house: yup.string().nullable().required('Обязательное поле'),
      corpus: yup.string().nullable(),
    }),
  });

  const additionalAddressesFieldOnChange = (
    index: number,
    fieldName: string,
    value: string,
  ) =>
    setFieldValue(
      'additionalAddresses',
      values.additionalAddresses.map((el, i) => {
        if (index !== i) return el;
        return { ...el, [fieldName]: value };
      }),
    );

  const addressSearch = values.street;

  const preparedExistingStreets = getPreparedStreetsOptions(
    addressSearch,
    existingStreets || [],
  );

  return (
    <>
      <ExistingCitiesGate />
      {values.city && <ExistingStreetsGate City={values.city} />}

      <Wrapper>
        <BlockTitle>Основной адрес объекта</BlockTitle>
        <GridWrapper>
          <FormItem label="Город">
            <Select
              onChange={(value) => setFieldValue('city', value)}
              value={values.city || undefined}
              placeholder="Выберите из списка"
              disabled
            >
              {existingCities?.map((city) => (
                <Select.Option value={city} key={city}>
                  {city}
                </Select.Option>
              ))}
            </Select>
            <ErrorMessage> {errors.city} </ErrorMessage>
          </FormItem>

          <FormItem label="Улица">
            <AutoCompleteSc
              disabled
              placeholder="Улица"
              value={values.street}
              onChange={(value) => setFieldValue('street', value)}
              options={preparedExistingStreets || undefined}
            />
            <ErrorMessage> {errors.street} </ErrorMessage>
          </FormItem>

          <ItemGridWrapper>
            <FormItem label="Номер дома">
              <Input
                placeholder="Введите"
                value={values.house || undefined}
                onChange={(value) => setFieldValue('house', value.target.value)}
              />
              <ErrorMessage> {errors.house} </ErrorMessage>
            </FormItem>
            <FormItem label="Корпус">
              <Input
                placeholder="Введите"
                value={values.corpus || undefined}
                onChange={(value) =>
                  setFieldValue('corpus', value.target.value)
                }
              />
            </FormItem>
          </ItemGridWrapper>
        </GridWrapper>

        <SpaceLine />

        <BlockTitle>Адреса, под которыми известен объект</BlockTitle>

        {values.additionalAddresses.map((address, index) => (
          <>
            <GridWrapper key={index}>
              <FormItem label="Город">
                <Select value={values.city || undefined} disabled />
              </FormItem>

              <FormItem label="Улица">
                <AutoCompleteSc
                  disabled={Boolean(address.id)}
                  placeholder="Улица"
                  onChange={(value) =>
                    additionalAddressesFieldOnChange(
                      index,
                      'street',
                      value as string,
                    )
                  }
                  value={address.street || undefined}
                  options={preparedExistingStreets || undefined}
                />
              </FormItem>

              <ItemGridWrapper>
                <FormItem label="Номер дома">
                  <Input
                    placeholder="Введите"
                    value={address.number || undefined}
                    onChange={(value) =>
                      additionalAddressesFieldOnChange(
                        index,
                        'number',
                        value.target.value as string,
                      )
                    }
                  />
                </FormItem>

                <FormItem label="Корпус">
                  <Input
                    placeholder="Введите"
                    value={address.corpus || undefined}
                    onChange={(value) =>
                      additionalAddressesFieldOnChange(
                        index,
                        'corpus',
                        value.target.value as string,
                      )
                    }
                  />
                </FormItem>
              </ItemGridWrapper>
            </GridWrapper>
            <DeleteButton
              className="ant-btn-link"
              onClick={() => {
                const currentAdditionalAddress = address;

                currentAdditionalAddress?.id &&
                  handleDeleteHousingStockAddress({
                    addressId: currentAdditionalAddress.id,
                  });

                !Boolean(currentAdditionalAddress?.id) &&
                  setFieldValue(
                    'additionalAddresses',
                    values.additionalAddresses.filter((_, i) => index !== i),
                  );
              }}
            >
              – Удалить адрес
            </DeleteButton>
            <SpaceLine />
          </>
        ))}
        <AddButtonWrapper>
          <LinkButton
            onClick={() =>
              setFieldValue('additionalAddresses', [
                ...values.additionalAddresses,
                { street: '', house: '', corpus: '' },
              ])
            }
          >
            + Добавить адрес
          </LinkButton>
        </AddButtonWrapper>

        <Footer>
          <NextCancelBlock>
            <ButtonPadding>
              <Button type="ghost" onClick={onPageCancel}>
                Отмена
              </Button>
            </ButtonPadding>
            <Button
              onClick={() => {
                handleSubmit();
              }}
              isLoading={isUpdateLoading || isCreateLoading}
            >
              Сохранить
            </Button>
          </NextCancelBlock>
        </Footer>
      </Wrapper>
    </>
  );
};
