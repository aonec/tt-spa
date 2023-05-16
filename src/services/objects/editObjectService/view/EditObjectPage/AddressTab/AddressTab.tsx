import React, { FC } from 'react';
import { useFormik } from 'formik';
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
import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { LinkButton } from 'ui-kit/shared_components/LinkButton';
import { Button } from 'ui-kit/Button';
import { ExistingCitiesGate } from '01/features/housingStocks/displayHousingStockCities/models';
import { ExistingStreetsGate } from '01/features/housingStocks/displayHousingStockStreets/model';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import _ from 'lodash';

export const AddressTab: FC<AddressTabProps> = ({
  address,
  index,
  existingCities,
  existingStreets,
  onPageCancel,
  handleCreateHousingStockAddress,
  handleDeleteHousingStockAddress,
  handleUpdateHousingStockAddress,
  isDeleteLoading,
}) => {
  const { additionalAddresses, mainAddress } = address;

  const { values, handleSubmit, setFieldValue, errors } = useFormik({
    initialValues: {
      city: mainAddress?.city || null,
      street: mainAddress?.street || '',
      house: mainAddress?.number || null,
      corpus: mainAddress?.corpus || null,
      index: index || null,
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
          submittedAdditionalAddress.number &&
          handleCreateHousingStockAddress({
            street: submittedAdditionalAddress.street,
            number: submittedAdditionalAddress.number,
            corpus: submittedAdditionalAddress.corpus,
          });
      });
    },
    validateOnChange: false,
    // validationSchema,
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
                type="number"
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

          {/* <FormItem label="Индекс">
            <Input
              placeholder="Введите"
              value={values.index || undefined}
              onChange={(value) => setFieldValue('index', value.target.value)}
            />
          </FormItem> */}
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
                    type="number"
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
                // setFieldValue(
                //   'additionalAddresses',
                //   values.additionalAddresses.filter((el, i) => index !== i),
                // );

                const currentAdditionalAddress = address;

                currentAdditionalAddress?.id &&
                  handleDeleteHousingStockAddress({
                    addressId: currentAdditionalAddress.id,
                  });
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
            >
              Сохранить
            </Button>
          </NextCancelBlock>
        </Footer>
      </Wrapper>
    </>
  );
};
