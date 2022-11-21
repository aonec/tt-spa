import { ExistingCitiesGate } from '01/features/housingStocks/displayHousingStockCities/models';
import { ExistingStreetsGate } from '01/features/housingStocks/displayHousingStockStreets/model';
import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { StyledSelect } from '01/_pages/IndividualDeviceEdit/components/IndividualDeviceEditForm';
import { Checkbox, Select } from 'antd';
import { useFormik } from 'formik';
import React, { FC, useState } from 'react';
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
  Footer,
  GridWrapper,
  ItemGridWrapper,
  NextCancelBlock,
  NonUserSelect,
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

  const [isHasOtherAddress, setHasOtherAddress] = useState(false);
  console.log(isHasOtherAddress);

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
              onChange={() => {}}
              // value={}
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
              onClick={() => {}}
            />
          </FormItem>

          <ItemGridWrapper>
            <FormItem label="Номер дома">
              <Input
                placeholder="Введите"
                value=""
                onChange={(value) => {}}
                onClick={() => {}}
              />
            </FormItem>
            <FormItem label="Корпус">
              <Input
                placeholder="Введите"
                value=""
                onChange={(value) => {}}
                onClick={() => {}}
              />
            </FormItem>
          </ItemGridWrapper>

          <FormItem label="Индекс">
            <Input
              placeholder="Введите"
              value=""
              onChange={(value) => {}}
              onClick={() => {}}
            />
          </FormItem>
        </GridWrapper>

        <SpaceLine />

        {/* <BlockTitle>Адреса, под которыми известен объект</BlockTitle> */}

        <AddButton className="ant-btn-link" onClick={() => {}}>
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
