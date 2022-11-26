import { ExistingCitiesGate } from '01/features/housingStocks/displayHousingStockCities/models';
import { ExistingStreetsGate } from '01/features/housingStocks/displayHousingStockStreets/model';
import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { StyledSelect } from '01/_pages/IndividualDeviceEdit/components/IndividualDeviceEditForm';
import { Select } from 'antd';
import { useFormik } from 'formik';
import React, { FC } from 'react';
import { countSimilarityPoints } from 'services/objects/createObjectService/createObjectService.utils';
import { AutoComplete } from 'ui-kit/AutoComplete';
import { Button } from 'ui-kit/Button';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { BlockTitle, PageTitle } from '../CreateObjectPage.styled';
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
import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { validationSchema } from './createObjectAddressStage.constants';

export const CreateObjectAddressStage: FC<CreateObjectAddressStageProps> = ({
  existingStreets,
  existingCities,
  // handleAddressData,
  onPageCancel,
  createObjectData,
  handleSubmitCreateObject
}) => {
  const {
    values,
    handleSubmit,
    setFieldValue,
    errors,
  } = useFormik<ObjectAddressValues>({
    initialValues: {
      city: createObjectData?.city || '',
      street: createObjectData?.street || '',
      house: createObjectData?.house || '',
      corpus: createObjectData?.corpus || '',
      index: createObjectData?.index || '',
      additionalAddresses: createObjectData?.additionalAddresses || [],
    },
    enableReinitialize: true,
    onSubmit: (data) => {
      handleSubmitCreateObject(data);
    },
    validateOnBlur: true,
    validationSchema,
  });

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

  const addressSearch = values.street;

  const preparedExistingStreets = existingStreets
    ?.sort((a, b) => {
      const aPoints = countSimilarityPoints(addressSearch, a);
      const bPoints = countSimilarityPoints(addressSearch, b);

      if (aPoints < bPoints) return 1;

      if (aPoints > bPoints) return -1;

      return 0;
    })
    .map((street) => ({
      value: street,
    }));

  return (
    <>
      <ExistingCitiesGate />
      {values.city && <ExistingStreetsGate City={values.city} />}

      <Wrapper>
        <PageTitle>Адрес объекта</PageTitle>

        <BlockTitle>Основной адрес объекта</BlockTitle>
        <GridWrapper>
          <FormItem label="Город">
            <StyledSelect
              placeholder="Выберите из списка"
              onChange={(value) => setFieldValue('city', value)}
              value={values.city}
            >
              {existingCities?.map((city) => (
                <Select.Option value={city}>{city}</Select.Option>
              ))}
            </StyledSelect>
            <ErrorMessage> {errors.city} </ErrorMessage>
          </FormItem>

          <FormItem label="Улица">
            <AutoComplete
              placeholder="Улица"
              value={values.street}
              onChange={(value) => setFieldValue('street', value)}
              options={preparedExistingStreets}
            />
            <ErrorMessage> {errors.street} </ErrorMessage>
          </FormItem>

          <ItemGridWrapper>
            <FormItem label="Номер дома">
              <Input
                placeholder="Введите"
                value={values.house}
                onChange={(value) => setFieldValue('house', value.target.value)}
              />
              <ErrorMessage> {errors.house} </ErrorMessage>
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
                <StyledSelect value={values.city} disabled />
              </FormItem>

              <FormItem label="Улица">
                <AutoComplete
                  placeholder="Улица"
                  onChange={(value) =>
                    additionalAddressesFieldOnChange(
                      index,
                      'street',
                      value as string
                    )
                  }
                  value={elem.street}
                  options={preparedExistingStreets}
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
              { street: '', house: '', corpus: '' },
            ])
          }
        >
          + Добавить адрес
        </AddButton>

        <Footer>
          <NextCancelBlock>
            <ButtonPadding>
              <Button type="ghost" onClick={() => onPageCancel()}>
                Отмена
              </Button>
            </ButtonPadding>
            <Button
              sidePadding={25}
              onClick={() => {
                handleSubmit();
              }}
            >
              Далее
            </Button>
          </NextCancelBlock>
        </Footer>
      </Wrapper>
    </>
  );
};
