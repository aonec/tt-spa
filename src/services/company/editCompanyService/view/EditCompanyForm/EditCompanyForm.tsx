import { useSwitchInputOnEnter } from 'hooks/useSwitchInputOnEnter';
import { fromEnter } from 'ui-kit/shared/DatePickerNative';
import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'ui-kit/Button';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import {
  AddressGroupWrapper,
  FooterWrapper,
  Wrapper,
} from './EditCompanyForm.styled';
import { EditCompanyFormProps } from './EditCompanyForm.types';
import { useForm } from 'effector-forms';

export const EditCompanyForm: FC<EditCompanyFormProps> = ({
  existingCities,
  isUpdating,
  form,
}) => {
  const history = useHistory();
  const next = useSwitchInputOnEnter('editCompany', true);

  const { fields, submit, values } = useForm(form);

  const handleEnter = useCallback(
    (index: number) =>
      fromEnter(() => {
        next(index);
      }),
    [next],
  );

  return (
    <Wrapper>
      <FormItem label="Название">
        <Input
          value={values.name || undefined}
          onChange={(e) => fields.name?.onChange(e.target.value)}
          data-reading-input={'editCompany'}
          onKeyDown={handleEnter(0)}
        />
      </FormItem>
      <FormItem label="Город">
        <Select
          value={values.city || undefined}
          onChange={(value) => fields.city?.onChange(String(value))}
          placeholder="Выберите город"
          data-reading-input={'editCompany'}
          onKeyDown={handleEnter(1)}
          showAction={['focus']}
        >
          {existingCities.map((city) => (
            <Select.Option value={city} key={city}>
              {city}
            </Select.Option>
          ))}
        </Select>
      </FormItem>
      <AddressGroupWrapper>
        <FormItem label="Улица">
          <Input
            value={values.street || undefined}
            onChange={(e) => fields.street?.onChange(e.target.value)}
            placeholder="Название улицы"
            data-reading-input={'editCompany'}
            onKeyDown={handleEnter(2)}
          />
        </FormItem>
        <FormItem label="Дом">
          <Input
            value={values.houseNumber || undefined}
            onChange={(e) => fields.houseNumber?.onChange(e.target.value)}
            placeholder="Номер дома"
            data-reading-input={'editCompany'}
            onKeyDown={handleEnter(3)}
          />
        </FormItem>
        <FormItem label="Корпус">
          <Input
            value={values.corpus || undefined}
            onChange={(e) => fields.corpus?.onChange(e.target.value)}
            placeholder="Номер корпуса"
            data-reading-input={'editCompany'}
            onKeyDown={handleEnter(4)}
          />
        </FormItem>
      </AddressGroupWrapper>
      <FormItem label="Электронная почта">
        <Input
          value={values.email || undefined}
          onChange={(e) => fields.email?.onChange(e.target.value)}
          data-reading-input={'editCompany'}
          onKeyDown={handleEnter(5)}
        />
      </FormItem>
      <FormItem label="Контактный телефон">
        <Input
          value={values.phoneNumber || undefined}
          onChange={(e) => fields.phoneNumber?.onChange(e.target.value)}
          data-reading-input={'editCompany'}
          onKeyDown={handleEnter(6)}
        />
      </FormItem>
      <FooterWrapper>
        <Button type="ghost" onClick={() => history.goBack()}>
          Отмена
        </Button>
        <Button type="primary" onClick={() => submit()} isLoading={isUpdating}>
          Сохранить
        </Button>
      </FooterWrapper>
    </Wrapper>
  );
};
