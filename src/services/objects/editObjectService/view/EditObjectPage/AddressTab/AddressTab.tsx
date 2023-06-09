import React, { FC } from 'react';
import { useFormik } from 'formik';
import {
  AddButtonWrapper,
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
import { AutoComplete } from 'ui-kit/AutoComplete';
import { Input } from 'ui-kit/Input';
import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { LinkButton } from 'ui-kit/shared_components/LinkButton';
import { Button } from 'ui-kit/Button';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';

const { ExistingCitiesGate, ExistingStreetsGate } = addressSearchService.gates;

export const AddressTab: FC<AddressTabProps> = ({
  address,
  existingCities,
  existingStreets,
  onPageCancel,
}) => {
  const { additionalAddresses, mainAddress } = address;

  const { values, handleSubmit, setFieldValue, errors } = useFormik({
    initialValues: {
      city: mainAddress?.city || null,
      street: mainAddress?.street || '',
      house: mainAddress?.number || null,
      corpus: mainAddress?.corpus || null,
      // index: mainAddress?. || null,
      additionalAddresses: additionalAddresses || [],
    },
    enableReinitialize: true,
    onSubmit: (data) => {
      // handleSubmitCreateObject(data);
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
              // value={values.index || undefined}
              onChange={(value) => setFieldValue('index', value.target.value)}
            />
          </FormItem>
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
                <AutoComplete
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
                        'house',
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
              <Button type="ghost" onClick={onPageCancel}>
                Отмена
              </Button>
            </ButtonPadding>
            <Button
              // sidePadding={25}
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
