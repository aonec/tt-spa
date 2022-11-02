import { useSwitchInputOnEnter } from '01/features/individualDevices/switchIndividualDevice/components/stages/BaseInfoStage.hook';
import { fromEnter } from '01/shared/ui/DatePickerNative';
import { InputSC, SelectSC } from '01/shared/ui/Fields';
import { useFormik } from 'formik';
import { EActResourceType, EApartmentStatus } from 'myApi';
import React, { FC, useCallback } from 'react';
import { DevicesSearchType } from 'services/devices/devicesPageService/individualDevicesProfileService/individualDevicesProfileService.types';
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

export const IndividualDevicesViewBySerialNumberSearch: FC<IndividualDevicesViewBySerialNumberSearchProps> = ({
  filter,
  setFilter,
}) => {
  const next = useSwitchInputOnEnter('searchBySerialNumber', true);

  const {
    values,
    setFieldValue,
    handleSubmit,
    setValues,
  } = useFormik<IndividualDeviceSearchbySerialNumberPayload>({
    initialValues: {
      SerialNumber: filter.SerialNumber,
      ApartmentStatus: filter.ApartmentStatus || null,
      Resource: filter.Resource || null,
      IsAlsoClosing: filter.IsAlsoClosing,
      Model: '',
      MountPlace: '',
      ClosingReason: null,
      ExpiresCheckingDateAt: null,
      City: '',
      HouseCorpus: '',
      HouseNumber: '',
      PageNumber: 1,
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
    [next, handleSubmit]
  );

  return (
    <Wrapper>
      <IndividualDevicesExtendedSearch
        devicesSearchType={DevicesSearchType.SearialNumber}
        handleApply={(newValues) => {
          setValues((oldValues) => ({ ...oldValues, ...newValues }));
          handleSubmit();
        }}
        values={values}
      >
        <SearchFieldsWrapper>
          <InputSC
            data-reading-input={'searchBySerialNumber'}
            prefix={<SearchIcon />}
            type="number"
            placeholder="Введите серийный номер пробера"
            onChange={(e) => setFieldValue('SerialNumber', e.target.value)}
            value={values.SerialNumber}
            onKeyDown={fromEnter(() => {
              handleSubmit();
              next(0);
            })}
          />
          <SelectSC
            data-reading-input={'searchBySerialNumber'}
            placeholder="Ресурс"
            value={values.Resource || EActResourceType.All}
            onChange={(value) => {
              setFieldValue('Resource', value);
              handleSubmit();
            }}
            onKeyDown={handleEnter(1)}
            showAction={['focus']}
          >
            {Object.values(EActResourceType).map((elem) => (
              <SelectSC.Option key={elem} value={elem}>
                <ResourceInfo resource={elem} />
              </SelectSC.Option>
            ))}
          </SelectSC>
          <SelectSC
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
              <SelectSC.Option key={elem} value={elem}>
                {apartmentStatusesLookup[elem]}
              </SelectSC.Option>
            ))}
          </SelectSC>
          <CheckboxSC
            checked={values.IsAlsoClosing}
            onChange={(e) => {
              setFieldValue('IsAlsoClosing', e.target.checked);
              handleSubmit();
            }}
          >
            Показать закрытые приборы
          </CheckboxSC>
        </SearchFieldsWrapper>
      </IndividualDevicesExtendedSearch>
    </Wrapper>
  );
};
