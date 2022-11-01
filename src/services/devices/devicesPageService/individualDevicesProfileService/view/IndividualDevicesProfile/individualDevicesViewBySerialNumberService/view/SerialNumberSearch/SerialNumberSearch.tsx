import { fromEnter } from '01/shared/ui/DatePickerNative';
import { ExtendedSearch } from '01/shared/ui/ExtendedSearch';
import { InputSC, SelectSC } from '01/shared/ui/Fields';
import { Checkbox } from 'antd';
import { useFormik } from 'formik';
import { EActResourceType, EApartmentStatus } from 'myApi';
import React, { FC } from 'react';
import { SearchIcon } from 'ui-kit/icons';
import { ResourceInfo } from 'ui-kit/shared_components/ResourceInfo';
import { IndividualDeviceSearchbySerialNumberPayload } from '../../individualDevicesViesBySerialNumberService.types';
import { SearchFieldsWrapper, Wrapper } from './SerialNumberSearch.styled';
import { IndividualDevicesViewBySerialNumberSearchProps } from './SerialNumberSearch.types';

export const IndividualDevicesViewBySerialNumberSearch: FC<IndividualDevicesViewBySerialNumberSearchProps> = ({
  filter,
  setFilter,
}) => {
  const {
    values,
    setFieldValue,
    handleSubmit,
  } = useFormik<IndividualDeviceSearchbySerialNumberPayload>({
    initialValues: {
      SerialNumber: filter.SerialNumber,
      ApartmentStatus: filter.ApartmentStatus,
      Resource: filter.Resource || null,
      IsAlsoClosing: filter.IsAlsoClosing,
    },
    enableReinitialize: true,
    onSubmit: setFilter,
  });

  return (
    <Wrapper>
      <ExtendedSearch />
      <SearchFieldsWrapper>
        <InputSC
          prefix={<SearchIcon />}
          type="number"
          placeholder="Введите серийный номер пробера"
          onChange={(e) => setFieldValue('SerialNumber', e.target.value)}
          value={values.SerialNumber}
          onKeyDown={fromEnter(handleSubmit)}
        />
        <SelectSC
          placeholder="Ресурс"
          value={values.Resource || EActResourceType.All}
          onChange={(value) => setFieldValue('Resource', value)}
        >
          {Object.values(EActResourceType).map((elem) => (
            <SelectSC.Option key={elem} value={elem}>
              <ResourceInfo resource={elem} />
            </SelectSC.Option>
          ))}
        </SelectSC>
        <SelectSC
          placeholder="Статус кв."
          value={values.ApartmentStatus}
          onChange={(value) => setFieldValue('ApartmentStatus', value)}
        >
          {Object.values(EApartmentStatus).map((elem) => (
            <SelectSC.Option key={elem} value={elem}>
              {elem}
            </SelectSC.Option>
          ))}
        </SelectSC>
        <Checkbox
          value={values.IsAlsoClosing}
          onChange={(e) => setFieldValue('IsAlsoClosing', e.target.checked)}
          style={{
            color: '#272f5ae5',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            userSelect: 'none',
          }}
        >
          Показать закрытые приборы
        </Checkbox>
      </SearchFieldsWrapper>
    </Wrapper>
  );
};
