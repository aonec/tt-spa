import { ExistingCitiesGate } from '01/features/housingStocks/displayHousingStockCities/models';
import { ExistingStreetsGate } from '01/features/housingStocks/displayHousingStockStreets/model';
import { StyledSelect } from '01/_pages/IndividualDeviceEdit/components/IndividualDeviceEditForm';
import { Select } from 'antd';
import { useEvent } from 'effector-react';
import { useFormik } from 'formik';
import React, { FC } from 'react';
import { AddressSearchValues } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { Button } from 'ui-kit/Button';
import {
  BlockTitle,
  ErrorMessage,
  FormItem,
  PageTitle,
  StyledAutoComplete,
} from '../CreateObjectPage.styled';
import {
  ButtonPadding,
  Footer,
  GridWrapper,
  ItemGridWrapper,
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
    },
    enableReinitialize: true,
    onSubmit: (address) => {},
  });

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
              // onChange={(value: any) => {
              //   fields.resource.onChange(value);
              // }}
              // value={fields.resource.value || undefined}
            >
              {allCities?.map((city) => (
                <Select.Option value={city}>{city}</Select.Option>
              ))}
            </StyledSelect>
            {/* <ErrorMessage>
            {fields.model.errorText({
              required: 'Это поле обязательное',
            })} 
           </ErrorMessage> */}
          </FormItem>

          <FormItem label="Улица">
            <StyledAutoComplete
              placeholder="Улица"
              value={values.street}
              onChange={(value) => {}}
              onKeyDown={(e) => {}}
              onClick={() => {}}
              // options={options}
              // disabled={isDisabled}
            />
          </FormItem>

          <ItemGridWrapper>
            <FormItem label="Номер дома">
              <StyledAutoComplete
                placeholder="Введите"
                value=""
                onChange={(value) => {}}
                onKeyDown={(e) => {}}
                onClick={() => {}}
                // options={options}
                // disabled={isDisabled}
              />
            </FormItem>
            <FormItem label="Корпус">
              <StyledAutoComplete
                placeholder="Введите"
                value=""
                onChange={(value) => {}}
                onKeyDown={(e) => {}}
                onClick={() => {}}
                // options={options}
                // disabled={isDisabled}
              />
            </FormItem>
          </ItemGridWrapper>
          <FormItem label="Индекс">
            <StyledAutoComplete
              placeholder="Введите"
              value=""
              onChange={(value) => {}}
              onKeyDown={(e) => {}}
              onClick={() => {}}
              // options={options}
              // disabled={isDisabled}
            />
          </FormItem>
        </GridWrapper>

        <Footer>
          <ButtonPadding>
            <Button type="ghost">Отмена</Button>
          </ButtonPadding>
          <Button sidePadding={25}> Далее </Button>
        </Footer>
      </Wrapper>
    </>
  );
};
