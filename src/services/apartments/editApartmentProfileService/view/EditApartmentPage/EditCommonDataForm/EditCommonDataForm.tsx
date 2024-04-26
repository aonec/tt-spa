import { SpaceLine } from 'ui-kit/SpaceLine';
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
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

export const EditCommonDataForm: FC<EditCommonDataFormProps> = ({
  isUpdatingApartmentLoading,
  initialValues,
  handleEditCommonData,
}) => {
  const navigate = useNavigate();

  const { values, setFieldValue, handleSubmit } = useFormik({
    initialValues,
    onSubmit: (data) => {
      handleEditCommonData(data);
    },
  });

  return (
    <Wrapper>
      <FormItem label="Площадь жилого помещения">
        <InputWithAddon
          type="number"
          placeholder="Введите площадь"
          value={values.Square || undefined}
          onChange={(e) => setFieldValue('Square', e.target.value)}
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
            onChange={(e) =>
              setFieldValue('ColdWaterRiserCount', e.target.value)
            }
            name="ColdWaterRiserCount"
          />
        </FormItem>
        <FormItem label="Количество стояков ГВС">
          <Input
            type="number"
            placeholder="Введите количество"
            value={values.HotWaterRiserCount || undefined}
            onChange={(e) =>
              setFieldValue('HotWaterRiserCount', e.target.value)
            }
            name="HotWaterRiserCount"
          />
        </FormItem>
        <FormItem label="Количество проживающих">
          <Input
            type="number"
            placeholder="Введите количество"
            value={values.NumberOfLiving || undefined}
            onChange={(e) => setFieldValue('NumberOfLiving', e.target.value)}
            name="NumberOfLiving"
          />
        </FormItem>
        <FormItem label="Нормативное количество проживающих">
          <Input
            type="number"
            placeholder="Введите количество"
            value={values.NormativeNumberOfLiving || undefined}
            onChange={(e) =>
              setFieldValue('NormativeNumberOfLiving', e.target.value)
            }
            name="NormativeNumberOfLiving"
          />
        </FormItem>
      </FieldsWrapper>
      <SpaceLine />
      <Footer>
        <Button type="ghost" onClick={() => navigate(-1)}>
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
