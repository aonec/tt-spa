import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { useFormik } from 'formik';
import React, { FC } from 'react';
import { Button } from 'ui-kit/Button';
import { FormItem } from 'ui-kit/FormItem';
import { Input, InputWithAddon } from 'ui-kit/Input';
import {
  FieldsWrapper,
  Footer,
  SaveButtonWrapper,
  SquareAddonWrapper,
  Wrapper,
} from './EditCommonDataForm.styled';
import { EditCommonDataFormProps } from './EditCommonDataForm.types';
import { useHistory } from 'react-router-dom';

export const EditCommonDataForm: FC<EditCommonDataFormProps> = ({
  apartment,
  handleUpdateApartment,
  isUpdatingApartmentLoading,
}) => {
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      Square: apartment.square,
      NumberOfLiving: apartment.numberOfLiving,
      NormativeNumberOfLiving: apartment.normativeNumberOfLiving,
      ColdWaterRiserCount: apartment.coldWaterRiserCount,
      HotWaterRiserCount: apartment.hotWaterRiserCount,
    },
    onSubmit: (values) => {
      handleUpdateApartment({
        ApartmentId: apartment.id,
        Square: Number(values.Square) || undefined,
        NumberOfLiving: Number(values.NumberOfLiving) || undefined,
        ColdWaterRiserCount: Number(values.ColdWaterRiserCount) || undefined,
        HotWaterRiserCount: Number(values.HotWaterRiserCount) || undefined,
        NormativeNumberOfLiving:
          Number(values.NormativeNumberOfLiving) || undefined,
      });
    },
    enableReinitialize: true,
  });

  const history = useHistory();

  return (
    <Wrapper>
      <FormItem label="Площадь жилого помещения">
        <InputWithAddon
          type="number"
          placeholder="Введите площадь"
          value={values.Square || undefined}
          onChange={handleChange}
          name="Square"
          addonAfter={
            <SquareAddonWrapper>
              м<sup>2</sup>
            </SquareAddonWrapper>
          }
        />
      </FormItem>
      <FieldsWrapper>
        <FormItem label="Количество стояков ХВС">
          <Input
            type="number"
            placeholder="Введите количество"
            value={values.ColdWaterRiserCount || undefined}
            onChange={handleChange}
            name="ColdWaterRiserCount"
          />
        </FormItem>
        <FormItem label="Количество стояков ГВС">
          <Input
            type="number"
            placeholder="Введите количество"
            value={values.HotWaterRiserCount || undefined}
            onChange={handleChange}
            name="HotWaterRiserCount"
          />
        </FormItem>
        <FormItem label="Количество проживающих">
          <Input
            type="number"
            placeholder="Введите количество"
            value={values.NumberOfLiving || undefined}
            onChange={handleChange}
            name="NumberOfLiving"
          />
        </FormItem>
        <FormItem label="Нормативное количество проживающих">
          <Input
            type="number"
            placeholder="Введите количество"
            value={values.NormativeNumberOfLiving || undefined}
            onChange={handleChange}
            name="NormativeNumberOfLiving"
          />
        </FormItem>
      </FieldsWrapper>
      <SpaceLine />
      <Footer>
        <Button type="ghost" onClick={() => history.goBack()}>
          Отмена
        </Button>
        <SaveButtonWrapper>
          <Button
            onClick={() => handleSubmit()}
            isLoading={isUpdatingApartmentLoading}
          >
            Сохранить
          </Button>
        </SaveButtonWrapper>
      </Footer>
    </Wrapper>
  );
};
