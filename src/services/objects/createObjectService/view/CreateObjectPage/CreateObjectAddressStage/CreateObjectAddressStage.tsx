import { ExistingCitiesGate } from '01/features/housingStocks/displayHousingStockCities/models';
import { ExistingStreetsGate } from '01/features/housingStocks/displayHousingStockStreets/model';
import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { useFormik } from 'formik';
import React, { FC } from 'react';
import { AutoComplete } from 'ui-kit/AutoComplete';
import { Button } from 'ui-kit/Button';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { BlockTitle, PageTitle } from '../CreateObjectPage.styled';
import {
  AddButtonWrapper,
  ButtonPadding,
  ButtonSC,
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
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { validationSchema } from './createObjectAddressStage.constants';
import { Select } from 'ui-kit/Select';
import { LinkButton } from 'ui-kit/shared_components/LinkButton';
import { getPreparedStreetsOptions } from './CreateObjectAddressStage.utils';

export const CreateObjectAddressStage: FC<CreateObjectAddressStageProps> = ({
  existingStreets,
  existingCities,
  onPageCancel,
  createObjectData,
  handleSubmitCreateObject,
}) => {
  const { values, handleSubmit, setFieldValue, errors } =
    useFormik<ObjectAddressValues>({
      initialValues: {
        city: createObjectData?.city || null,
        street: createObjectData?.street || '',
        house: createObjectData?.house || null,
        corpus: createObjectData?.corpus || null,
        index: createObjectData?.index || null,
        additionalAddresses: createObjectData?.additionalAddresses || [],
      },
      enableReinitialize: true,
      onSubmit: (data) => {
        handleSubmitCreateObject(data);
      },
      validateOnChange: false,
      validationSchema,
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
        <PageTitle>Адрес объекта</PageTitle>

        <BlockTitle>Основной адрес объекта</BlockTitle>
        <GridWrapper>
          <FormItem label="Город">
            <Select
              onChange={(value) => setFieldValue('city', value)}
              value={values.city || undefined}
              placeholder="Выберите из списка"
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
            <AutoComplete
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

          <FormItem label="Индекс">
            <Input
              placeholder="Введите"
              value={values.index || undefined}
              onChange={(value) => setFieldValue('index', value.target.value)}
            />
          </FormItem>
        </GridWrapper>

        <SpaceLine />

        <BlockTitle>Адреса, под которыми известен объект</BlockTitle>

        {values.additionalAddresses.map((elem, index) => (
          <>
            <GridWrapper key={index}>
              <FormItem label="Город">
                <Select value={values.city || undefined} disabled />
              </FormItem>

              <FormItem label="Улица">
                <AutoComplete
                  placeholder="Улица"
                  onChange={(value) =>
                    additionalAddressesFieldOnChange(
                      index,
                      'street',
                      value as string,
                    )
                  }
                  value={elem.street}
                  options={preparedExistingStreets || undefined}
                />
              </FormItem>

              <ItemGridWrapper>
                <FormItem label="Номер дома">
                  <Input
                    type="number"
                    placeholder="Введите"
                    value={elem.house}
                    onChange={(value) =>
                      additionalAddressesFieldOnChange(
                        index,
                        'house',
                        value.target.value as string,
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
                        value.target.value as string,
                      )
                    }
                  />
                </FormItem>
              </ItemGridWrapper>
            </GridWrapper>
            <DeleteButton
              className="ant-btn-link"
              onClick={() =>
                setFieldValue(
                  'additionalAddresses',
                  values.additionalAddresses.filter((el, i) => index !== i),
                )
              }
            >
              - Удалить адрес
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
              <Button type="ghost" onClick={() => onPageCancel()}>
                Отмена
              </Button>
            </ButtonPadding>

            <ButtonSC
              onClick={() => {
                handleSubmit();
              }}
            >
              Далее
            </ButtonSC>
          </NextCancelBlock>
        </Footer>
      </Wrapper>
    </>
  );
};
