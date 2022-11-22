import { ExistingCitiesGate } from '01/features/housingStocks/displayHousingStockCities/models';
import { ExistingStreetsGate } from '01/features/housingStocks/displayHousingStockStreets/model';
import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { StyledSelect } from '01/_pages/IndividualDeviceEdit/components/IndividualDeviceEditForm';
import { Select } from 'antd';
import { useFormik } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { Button } from 'ui-kit/Button';
import { Input } from 'ui-kit/Input';
import {
  BlockTitle,
  ErrorMessage,
  FormItem,
  PageTitle,
  StyledAutoComplete,
} from '../CreateObjectPage.styled';
import {
  AddButton,
  ButtonPadding,
  DeleteButton,
  Footer,
  GridWrapper,
  ItemGridWrapper,
  NextCancelBlock,
  Wrapper,
} from './CreateObjectAddressStage.styled';
import {
  CreateObjectAddressStageProps,
  ObjectAddressValues,
} from './CreateObjectAddressStage.types';

export const CreateObjectAddressStage: FC<CreateObjectAddressStageProps> = ({
  existingStreets,
  existingCities,
}) => {
  const allCities = existingCities;

  const {
    values,
    handleSubmit,
    setFieldValue,
  } = useFormik<ObjectAddressValues>({
    initialValues: {
      city: '',
      street: '',
      house: '',
      corpus: '',
      index: '',
      additionalAddresses: [],
    },
    enableReinitialize: true,
    onSubmit: (address) => {},
  });

  useEffect(() => console.log(values), [values]);

  const additionalAddressesFieldOnChange = (
    index: number,
    fieldName: string,
    value: string
  ) =>
    setFieldValue(
      'additionalAddresses',
      values.additionalAddresses.map((el, i) => {
        if (index !== i) return el;
        return { ...el, [fieldName]: value };
      })
    );

  return (
    <>
      <ExistingCitiesGate />
      {values.city && <ExistingStreetsGate City={values.city} />}

      <Wrapper>
        <PageTitle>Адресс объекта</PageTitle>

        <BlockTitle>Основной адрес объекта</BlockTitle>
        <GridWrapper>
          <FormItem label="Город">
            <StyledSelect
              placeholder="Выберите из списка"
              onChange={(value) => setFieldValue('city', value)}
              value={values.city}
            >
              {allCities?.map((city) => (
                <Select.Option value={city}>{city}</Select.Option>
              ))}
            </StyledSelect>
          </FormItem>

          <FormItem label="Улица">
            <StyledAutoComplete
              placeholder="Улица"
              value={values.street}
              onChange={(value) => setFieldValue('street', value)}
            />
          </FormItem>

          <ItemGridWrapper>
            <FormItem label="Номер дома">
              <Input
                placeholder="Введите"
                value={values.house}
                onChange={(value) => setFieldValue('house', value.target.value)}
              />
            </FormItem>
            <FormItem label="Корпус">
              <Input
                placeholder="Введите"
                value={values.corpus}
                onChange={(value) =>
                  setFieldValue('corpus', value.target.value)
                }
              />
            </FormItem>
          </ItemGridWrapper>

          <FormItem label="Индекс">
            <Input
              placeholder="Введите"
              value={values.index}
              onChange={(value) => setFieldValue('index', value.target.value)}
            />
          </FormItem>
        </GridWrapper>

        <SpaceLine />

        <BlockTitle>Адреса, под которыми известен объект</BlockTitle>

        {values.additionalAddresses.map((elem, index) => (
          <>
            <GridWrapper>
              <FormItem label="Город">
                <StyledSelect
                  placeholder="Выберите из списка"
                  value={elem.city}
                  onChange={(value) =>
                    additionalAddressesFieldOnChange(
                      index,
                      'city',
                      value as string
                    )
                  }
                >
                  {allCities?.map((city) => (
                    <Select.Option value={city}>{city}</Select.Option>
                  ))}
                </StyledSelect>
              </FormItem>

              <FormItem label="Улица">
                <StyledAutoComplete
                  placeholder="Улица"
                  onChange={(value) =>
                    additionalAddressesFieldOnChange(
                      index,
                      'street',
                      value as string
                    )
                  }
                  value={elem.street}
                />
              </FormItem>

              <ItemGridWrapper>
                <FormItem label="Номер дома">
                  <Input
                    placeholder="Введите"
                    value={elem.house}
                    onChange={(value) =>
                      additionalAddressesFieldOnChange(
                        index,
                        'house',
                        value.target.value as string
                      )
                    }
                  />
                </FormItem>

                <FormItem label="Корпус">
                  <Input
                    placeholder="Введите"
                    value={elem.corpus}
                    onChange={(value) =>
                      additionalAddressesFieldOnChange(
                        index,
                        'corpus',
                        value.target.value as string
                      )
                    }
                  />
                </FormItem>
              </ItemGridWrapper>

              <FormItem label="Индекс">
                <Input
                  placeholder="Введите"
                  value={elem.index}
                  onChange={(value) =>
                    additionalAddressesFieldOnChange(
                      index,
                      'index',
                      value.target.value as string
                    )
                  }
                />
              </FormItem>
            </GridWrapper>
            <DeleteButton
              className="ant-btn-link"
              onClick={() =>
                setFieldValue(
                  'additionalAddresses',
                  values.additionalAddresses.filter((el, i) => index !== i)
                )
              }
            >
              - Удалить адрес
            </DeleteButton>
            <SpaceLine />
          </>
        ))}

        <AddButton
          className="ant-btn-link"
          onClick={() =>
            setFieldValue('additionalAddresses', [
              ...values.additionalAddresses,
              { city: '', street: '', house: '', corpus: '' },
            ])
          }
        >
          + Добавить адрес
        </AddButton>

        <Footer>
          <NextCancelBlock>
            <ButtonPadding>
              <Button type="ghost">Отмена</Button>
            </ButtonPadding>
            <Button sidePadding={25}> Далее </Button>
          </NextCancelBlock>
        </Footer>
      </Wrapper>
    </>
  );
};
