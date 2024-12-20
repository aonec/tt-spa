import React, { FC, useCallback } from 'react';
import { ExtendedSearch } from 'ui-kit/ExtendedSearch';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import {
  EExpiresDateAtExtended,
  IndividualDevicesExtendedSearchProps,
} from './IndividualDevicesExtendedSearch.types';
import { SearchIndividualDevicesParams } from '../../../individualDevicesProfileService.types';
import {
  FirstLineWrapper,
  ResourceNameWrapper,
  ResourceOptionWrapper,
  SecondLineWrapper,
  ThirdLineWrapper,
} from './IndividualDevicesExtendedSearch.styled';
import { FormItem } from 'ui-kit/FormItem';
import { SearchIcon } from 'ui-kit/icons';
import { useFormik } from 'formik';
import { EApartmentStatus, EResourceType } from 'api/types';
import {
  apartmentStatusesLookup,
  expiresCheckingDateAt,
  formTranslateLookup,
  resourcesNamesLookup,
} from './IndividualDevicesExtendedSearch.constants';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import { DevicesSearchType } from 'services/devices/devicesPageService/devicesPageService.types';
import { Select } from 'ui-kit/Select';
import { Input } from 'ui-kit/Input';
import { ClosingReasonsDictionary } from 'dictionaries';
import { Segmented } from 'ui-kit/Segmented';

export const IndividualDevicesExtendedSearch: FC<
  IndividualDevicesExtendedSearchProps
> = ({
  children,
  devicesSearchType,
  handleApply,
  values: filters,
  handleClear,
  mountPlaces,
  isOpen,
  setIsOpen,
}) => {
  const { values, setFieldValue, handleSubmit, resetForm } =
    useFormik<SearchIndividualDevicesParams>({
      initialValues: filters,
      onSubmit: (values) =>
        handleApply({
          ...values,
          IsAlsoClosing: Boolean(values.ClosingReason),
        }),
      enableReinitialize: true,
    });

  const handleSelectExpiredDate = useCallback(
    (value: EExpiresDateAtExtended) => {
      const preparedValue = value === EExpiresDateAtExtended.All ? null : value;

      setFieldValue('ExpiresCheckingDateAt', preparedValue);
    },
    [setFieldValue],
  );

  return (
    <ExtendedSearch
      isOpen={isOpen}
      handleOpen={() => setIsOpen(true)}
      handleClose={() => setIsOpen(false)}
      handleApply={() => {
        handleSubmit();
        setIsOpen(false);
      }}
      handleClear={() => {
        if (handleClear) handleClear();
        resetForm();
      }}
      extendedSearchContent={
        <>
          <AddressSearchContainer
            isCityPreselected={false}
            initialValues={{
              city: values.City,
              street: values.Street,
              house: values.HouseNumber,
              corpus: values.HouseCorpus,
            }}
            showLabels
            fields={[
              SearchFieldType.City,
              SearchFieldType.Street,
              SearchFieldType.House,
              SearchFieldType.Corpus,
            ]}
            onChange={(key, value) =>
              setFieldValue(formTranslateLookup[key], value)
            }
            customTemplate={[
              {
                fieldType: SearchFieldType.City,
                templateValue: '1fr',
              },
              {
                fieldType: SearchFieldType.Street,
                templateValue: '1fr',
              },
              {
                fieldType: SearchFieldType.House,
                templateValue: '0.48fr',
              },
              {
                fieldType: SearchFieldType.Corpus,
                templateValue: '0.48fr',
              },
            ]}
          />
          <FirstLineWrapper>
            <FormItem label="Ресурс">
              <Select
                small
                placeholder="Ресурс"
                value={values.Resource || undefined}
                onChange={(value) => {
                  setFieldValue('Resource', value || null);
                }}
                allowClear
              >
                {Object.values(EResourceType).map((resource) => (
                  <Select key={resource} value={resource}>
                    <ResourceOptionWrapper>
                      <ResourceIconLookup resource={resource} />
                      <ResourceNameWrapper>
                        {resourcesNamesLookup[resource]}
                      </ResourceNameWrapper>
                    </ResourceOptionWrapper>
                  </Select>
                ))}
              </Select>
            </FormItem>
            <FormItem label="Статус кв">
              <Select
                small
                placeholder="Статус кв"
                value={values.ApartmentStatus || undefined}
                onChange={(value) =>
                  setFieldValue('ApartmentStatus', value || null)
                }
                allowClear
              >
                {[EApartmentStatus.Ok, EApartmentStatus.Pause].map((status) => (
                  <Select.Option key={status} value={status}>
                    {apartmentStatusesLookup[status]}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
            <FormItem label="Модель прибора">
              <Input
                small
                value={values.Model || undefined}
                onChange={(event) => setFieldValue('Model', event.target.value)}
                placeholder="Модель прибора"
                prefix={<SearchIcon />}
              />
            </FormItem>
            <FormItem label="Номер прибора">
              <Input
                small
                value={values.SerialNumber || undefined}
                onChange={(event) =>
                  setFieldValue('SerialNumber', event.target.value)
                }
                disabled={devicesSearchType === DevicesSearchType.Address}
                placeholder="Номер прибора"
              />
            </FormItem>
          </FirstLineWrapper>
          <SecondLineWrapper>
            <FormItem label="Место установки прибора">
              <Select
                small
                placeholder="Место установки прибора"
                value={values.MountPlace || undefined}
                onChange={(value) => setFieldValue('MountPlace', value || null)}
                allowClear
              >
                {mountPlaces.map(({ description, name }) => {
                  if (!name) {
                    return null;
                  }
                  return (
                    <Select.Option key={name} value={name}>
                      {description}
                    </Select.Option>
                  );
                })}
              </Select>
            </FormItem>
            <FormItem label="Причина закрытия ИПУ">
              <Select
                small
                placeholder="Причина закрытия ИПУ"
                value={values.ClosingReason || undefined}
                onChange={(value) =>
                  setFieldValue('ClosingReason', value || null)
                }
                allowClear
              >
                {Object.entries(ClosingReasonsDictionary).map(
                  ([closingReason, text]) => (
                    <Select key={closingReason} value={closingReason}>
                      {text}
                    </Select>
                  ),
                )}
              </Select>
            </FormItem>
          </SecondLineWrapper>
          <FormItem label="Дата">
            <ThirdLineWrapper>
              <Select
                small
                placeholder="Выберите"
                value={null}
                onChange={(value) =>
                  setFieldValue('ExpiresCheckingDateAt', value || null)
                }
                allowClear
                disabled
              >
                <Select.Option value={null}>Оканчания поверки</Select.Option>
              </Select>
              <Segmented<EExpiresDateAtExtended>
                active={
                  values.ExpiresCheckingDateAt
                    ? EExpiresDateAtExtended[values.ExpiresCheckingDateAt]
                    : EExpiresDateAtExtended.All
                }
                items={expiresCheckingDateAt}
                onChange={handleSelectExpiredDate}
              />
            </ThirdLineWrapper>
          </FormItem>
        </>
      }
    >
      {children}
    </ExtendedSearch>
  );
};
