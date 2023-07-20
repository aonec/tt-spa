import { useSwitchInputOnEnter } from 'hooks/useSwitchInputOnEnter';
import { fromEnter } from 'ui-kit/shared_components/DatePickerNative';
import { useFormik } from 'formik';
import { EActResourceType, EApartmentStatus } from 'api/myApi';
import React, { FC, useCallback } from 'react';
import { DevicesSearchType } from 'services/devices/devicesPageService/devicesPageService.types';
import { SearchIcon } from 'ui-kit/icons';
import { ResourceInfo } from 'ui-kit/shared_components/ResourceInfo';
import { IndividualDevicesExtendedSearch } from '../../../IndividualDevicesExtendedSearch';
import { apartmentStatusesLookup } from '../../../IndividualDevicesExtendedSearch/IndividualDevicesExtendedSearch.constants';
import { IndividualDeviceSearchbySerialNumberPayload } from '../../individualDevicesViesBySerialNumberService.types';
import {
  CheckboxSC,
  SearchFieldsWrapper,
  Wrapper,
} from './SerialNumberSearch.styled';
import { IndividualDevicesViewBySerialNumberSearchProps } from './SerialNumberSearch.types';
import { ClearIconSC } from 'ui-kit/ExtendedSearch/ExtendedSearch.styled';
import { Select } from 'ui-kit/Select';
import { Input } from 'ui-kit/Input';
import { Button } from 'ui-kit/Button';

export const IndividualDevicesViewBySerialNumberSearch: FC<
  IndividualDevicesViewBySerialNumberSearchProps
> = ({ filter, setFilter, clearSearchPayload, mountPlaces }) => {
  const next = useSwitchInputOnEnter('searchBySerialNumber', true);

  const { values, setFieldValue, handleSubmit, setValues, resetForm } =
    useFormik<IndividualDeviceSearchbySerialNumberPayload>({
      initialValues: {
        SerialNumber: filter.SerialNumber,
        ApartmentStatus: filter.ApartmentStatus || null,
        Resource: filter.Resource || null,
        IsAlsoClosing: filter.IsAlsoClosing,
        Model: filter.Model || '',
        MountPlace: filter.MountPlace || '',
        ClosingReason: filter.ClosingReason || null,
        ExpiresCheckingDateAt: filter.ExpiresCheckingDateAt || null,
        City: filter.City || '',
        HouseCorpus: filter.HouseCorpus || '',
        HouseNumber: filter.HouseNumber || '',
        Street: filter.Street || '',
      },
      enableReinitialize: true,
      onSubmit: setFilter,
    });

  const handleEnter = useCallback(
    (index: number) =>
      fromEnter(() => {
        next(index);
        handleSubmit();
      }),
    [next, handleSubmit],
  );

  return (
    <Wrapper>
      <IndividualDevicesExtendedSearch
        devicesSearchType={DevicesSearchType.SearialNumber}
        handleClear={clearSearchPayload}
        handleApply={(newValues) => {
          setValues((oldValues) => ({ ...oldValues, ...newValues }));
          handleSubmit();
        }}
        values={values}
        mountPlaces={mountPlaces}
      >
        <SearchFieldsWrapper>
          <Input
            small
            data-reading-input={'searchBySerialNumber'}
            prefix={<SearchIcon />}
            type="text"
            placeholder="Введите серийный номер прибора"
            onChange={(e) => setFieldValue('SerialNumber', e.target.value)}
            value={values.SerialNumber}
            onKeyDown={fromEnter(() => {
              handleSubmit();
              next(0);
            })}
          />
          <Select
            small
            data-reading-input={'searchBySerialNumber'}
            placeholder="Ресурс"
            value={values.Resource || EActResourceType.All}
            onChange={(value) => {
              const resource = value === EActResourceType.All ? null : value;
              setFieldValue('Resource', resource);
              handleSubmit();
            }}
            onKeyDown={handleEnter(1)}
            showAction={['focus']}
          >
            {Object.values(EActResourceType).map((elem) => (
              <Select.Option key={elem} value={elem}>
                <ResourceInfo resource={elem} />
              </Select.Option>
            ))}
          </Select>
          <Select
            small
            data-reading-input={'searchBySerialNumber'}
            placeholder="Статус кв."
            value={values.ApartmentStatus || undefined}
            onChange={(value) => {
              setFieldValue('ApartmentStatus', value);
              handleSubmit();
            }}
            onKeyDown={fromEnter(() => next(2))}
            showAction={['focus']}
          >
            {[EApartmentStatus.Ok, EApartmentStatus.Pause].map((elem) => (
              <Select.Option key={elem} value={elem}>
                {apartmentStatusesLookup[elem]}
              </Select.Option>
            ))}
          </Select>
          <CheckboxSC
            checked={values.IsAlsoClosing}
            onChange={(e) => {
              setFieldValue('IsAlsoClosing', e.target.checked);
              handleSubmit();
            }}
          >
            Закрытые приборы
          </CheckboxSC>
          <Button
            type="ghost"
            onClick={() => {
              clearSearchPayload();
              resetForm();
            }}
            size="small"
            icon={<ClearIconSC />}
          >
            Сбросить
          </Button>
        </SearchFieldsWrapper>
      </IndividualDevicesExtendedSearch>
    </Wrapper>
  );
};
