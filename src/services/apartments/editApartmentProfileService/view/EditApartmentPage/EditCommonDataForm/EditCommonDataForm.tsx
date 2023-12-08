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
import {  useNavigate } from 'react-router-dom';
import { useForm } from 'effector-forms';

export const EditCommonDataForm: FC<EditCommonDataFormProps> = ({
  isUpdatingApartmentLoading,
  form,
}) => {
  const { fields, submit } = useForm(form);

  const navigate =  useNavigate();

  return (
    <Wrapper>
      <FormItem label="Площадь жилого помещения">
        <InputWithAddon
          type="number"
          placeholder="Введите площадь"
          value={fields.Square.value || undefined}
          onChange={(e) => fields.Square.onChange(e.target.value)}
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
            value={fields.ColdWaterRiserCount.value || undefined}
            onChange={(e) =>
              fields.ColdWaterRiserCount.onChange(e.target.value)
            }
            name="ColdWaterRiserCount"
          />
        </FormItem>
        <FormItem label="Количество стояков ГВС">
          <Input
            type="number"
            placeholder="Введите количество"
            value={fields.HotWaterRiserCount.value || undefined}
            onChange={(e) => fields.HotWaterRiserCount.onChange(e.target.value)}
            name="HotWaterRiserCount"
          />
        </FormItem>
        <FormItem label="Количество проживающих">
          <Input
            type="number"
            placeholder="Введите количество"
            value={fields.NumberOfLiving.value || undefined}
            onChange={(e) => fields.NumberOfLiving.onChange(e.target.value)}
            name="NumberOfLiving"
          />
        </FormItem>
        <FormItem label="Нормативное количество проживающих">
          <Input
            type="number"
            placeholder="Введите количество"
            value={fields.NormativeNumberOfLiving.value || undefined}
            onChange={(e) =>
              fields.NormativeNumberOfLiving.onChange(e.target.value)
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
            onClick={() => submit()}
            isLoading={isUpdatingApartmentLoading}
          >
            Сохранить
          </Button>
        </SaveButtonWrapper>
      </Footer>
    </Wrapper>
  );
};
