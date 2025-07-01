import { useSwitchInputOnEnter } from 'hooks/useSwitchInputOnEnter';
import { fromEnter } from 'ui-kit/shared/DatePickerNative';
import { useFormik } from 'formik';
import { OrganizationUpdateRequest } from 'api/types';
import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
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

export const EditCompanyForm: FC<EditCompanyFormProps> = ({
  currentManagingFirm,
  handleUpdateOrganization,
  existingCities,
  isUpdating,
}) => {
  const navigate = useNavigate();
  const next = useSwitchInputOnEnter('editCompany', true);

  const { values, setFieldValue, submitForm } =
    useFormik<OrganizationUpdateRequest>({
      initialValues: {
        city: currentManagingFirm.address?.city || null,
        corpus: currentManagingFirm.address?.corpus || null,
        street: currentManagingFirm.address?.street || null,
        houseNumber: currentManagingFirm.address?.houseNumber || null,
        email: currentManagingFirm.email,
        name: currentManagingFirm.name,
        phoneNumber: currentManagingFirm.phoneNumber,
      },
      onSubmit: handleUpdateOrganization,
    });

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
          onChange={(e) => setFieldValue('name', e.target.value)}
          data-reading-input={'editCompany'}
          onKeyDown={handleEnter(0)}
        />
      </FormItem>
      <FormItem label="Город">
        <Select
          value={values.city || undefined}
          onChange={(value) => setFieldValue('city', value)}
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
            onChange={(e) => setFieldValue('street', e.target.value)}
            placeholder="Название улицы"
            data-reading-input={'editCompany'}
            onKeyDown={handleEnter(2)}
          />
        </FormItem>
        <FormItem label="Дом">
          <Input
            value={values.houseNumber || undefined}
            onChange={(e) => setFieldValue('houseNumber', e.target.value)}
            placeholder="Номер дома"
            data-reading-input={'editCompany'}
            onKeyDown={handleEnter(3)}
          />
        </FormItem>
        <FormItem label="Корпус">
          <Input
            value={values.corpus || undefined}
            onChange={(e) => setFieldValue('corpus', e.target.value)}
            placeholder="Номер корпуса"
            data-reading-input={'editCompany'}
            onKeyDown={handleEnter(4)}
          />
        </FormItem>
      </AddressGroupWrapper>
      <FormItem label="Электронная почта">
        <Input
          value={values.email || undefined}
          onChange={(e) => setFieldValue('email', e.target.value)}
          data-reading-input={'editCompany'}
          onKeyDown={handleEnter(5)}
        />
      </FormItem>
      <FormItem label="Контактный телефон">
        <Input
          value={values.phoneNumber || undefined}
          onChange={(e) => setFieldValue('phoneNumber', e.target.value)}
          data-reading-input={'editCompany'}
          onKeyDown={handleEnter(6)}
        />
      </FormItem>
      <FooterWrapper>
        <Button type="ghost" onClick={() => navigate(-1)}>
          Отмена
        </Button>
        <Button onClick={submitForm} isLoading={isUpdating}>
          Сохранить
        </Button>
      </FooterWrapper>
    </Wrapper>
  );
};
