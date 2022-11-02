import React, { FC, useMemo, useState } from 'react';
import { ExtendedSearch } from '01/shared/ui/ExtendedSearch';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { IndividualDevicesExtendedSearchProps } from './IndividualDevicesExtendedSearch.types';
import {
  DevicesSearchType,
  SearchIndividualDevicesParams,
} from '../../../individualDevicesProfileService.types';
import {
  FirstLineWrapper,
  ResourceNameWrapper,
  ResourceOptionWrapper,
  SecondLineWrapper,
} from './IndividualDevicesExtendedSearch.styled';
import { FormItem } from 'ui-kit/FormItem';
import { InputSC, SelectSC } from '01/shared/ui/Fields';
import { SearchIcon } from 'ui-kit/icons';
import { useFormik } from 'formik';
import { EApartmentStatus, EResourceType } from 'myApi';
import {
  apartmentStatusesLookup,
  closingReasonLookup,
  expiresCheckingDateAtLookup,
  formTranslateLookup,
  resourcesNamesLookup,
} from './IndividualDevicesExtendedSearch.constants';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { SelectValue } from 'antd/lib/select';

export const IndividualDevicesExtendedSearch: FC<IndividualDevicesExtendedSearchProps> = ({
  children,
  devicesSearchType,
  handleApply,
  onChange,
  values: formValues = {},
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const initialValues = useMemo(() => {
    return {
      City: '',
      Street: '',
      HouseNumber: '',
      HouseCorpus: '',
      Model: '',
      SerialNumber: '',
      MountPlace: '',
      Resource: null,
      ApartmentStatus: null,
      ClosingReason: null,
      ExpiresCheckingDateAt: null,
      ...formValues,
    };
  }, [formValues]);

  const {
    values,
    setFieldValue: setFormikValue,
    resetForm,
  } = useFormik<SearchIndividualDevicesParams>({
    initialValues,
    onSubmit: () => {},
    enableReinitialize: true,
  });

  const setFieldValue = (key: string, value: string | SelectValue) => {
    setFormikValue(key, value);
    if (onChange) onChange(key, value);
  };

  return (
    <ExtendedSearch
      isOpen={isOpen}
      handleOpen={() => setIsOpen(true)}
      handleClose={() => setIsOpen(false)}
      handleApply={() => {
        handleApply(values);
        setIsOpen(false);
      }}
      handleClear={resetForm}
      extendedSearchContent={
        <>
          <AddressSearchContainer
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
              <SelectSC
                placeholder="Ресурс"
                value={values.Resource || undefined}
                onChange={(value) => setFieldValue('Resource', value)}
                allowClear
              >
                {Object.values(EResourceType).map((resource) => (
                  <SelectSC key={resource} value={resource}>
                    <ResourceOptionWrapper>
                      <ResourceIconLookup resource={resource} />
                      <ResourceNameWrapper>
                        {resourcesNamesLookup[resource]}
                      </ResourceNameWrapper>
                    </ResourceOptionWrapper>
                  </SelectSC>
                ))}
              </SelectSC>
            </FormItem>
            <FormItem label="Статус кв">
              <SelectSC
                placeholder="Статус кв"
                value={values.ApartmentStatus || undefined}
                onChange={(value) => setFieldValue('ApartmentStatus', value)}
                allowClear
              >
                {[EApartmentStatus.Ok, EApartmentStatus.Pause].map((status) => (
                  <SelectSC.Option key={status} value={status}>
                    {apartmentStatusesLookup[status]}
                  </SelectSC.Option>
                ))}
              </SelectSC>
            </FormItem>
            <FormItem label="Модель прибора">
              <InputSC
                value={values.Model || undefined}
                onChange={(event) => setFieldValue('Model', event.target.value)}
                placeholder="Модель прибора"
                prefix={<SearchIcon />}
              />
            </FormItem>
            <FormItem label="Номер прибора">
              <InputSC
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
              <SelectSC
                placeholder="Место установки прибора"
                value={values.MountPlace || undefined}
                onChange={(value) => setFieldValue('Model', value)}
                allowClear
              ></SelectSC>
            </FormItem>
            <FormItem label="Причина закрытия ИПУ">
              <SelectSC
                placeholder="Причина закрытия ИПУ"
                value={values.ClosingReason || undefined}
                onChange={(value) => setFieldValue('ClosingReason', value)}
                allowClear
              >
                {Object.entries(closingReasonLookup).map(
                  ([closingReason, text]) => (
                    <SelectSC key={closingReason} value={closingReason}>
                      {text}
                    </SelectSC>
                  )
                )}
              </SelectSC>
            </FormItem>
            <FormItem label="Дата окoнчания поверки">
              <SelectSC
                placeholder="Дата окoнчания поверки"
                value={values.ExpiresCheckingDateAt || undefined}
                onChange={(value) =>
                  setFieldValue('ExpiresCheckingDateAt', value)
                }
                allowClear
              >
                {Object.entries(expiresCheckingDateAtLookup).map(
                  ([key, value]) => (
                    <SelectSC key={key} value={key}>
                      {value}
                    </SelectSC>
                  )
                )}
              </SelectSC>
            </FormItem>
          </SecondLineWrapper>
        </>
      }
    >
      {children}
    </ExtendedSearch>
  );
};
