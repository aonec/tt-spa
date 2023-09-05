import React, { FC, useState } from 'react';
import { useFormik } from 'formik';
import { DevicesListContainer } from 'services/devices/displayDevicesService/displayDevicesService.container';
import { SearchDevices } from '../SearchDevices';
import { ExtendedSearch } from 'ui-kit/ExtendedSearch';
import { Wrapper } from './DevicesProfile.styled';
import { DevicesSearchType } from 'services/devices/devicesPageService/devicesPageService.types';
import { Radio } from 'antd';
import { DeviceProfileProps } from './DevicesProfile.types';
import {
  DeviceConnectionType,
  IsConnectedToBooleanDictionary,
} from './ExtendedSearchForm/ExtendedSearchForm.constants';
import { NodesListRequestForm } from 'services/devices/displayDevicesService/displayDevicesService.types';
import { ExtendedSearchForm } from './ExtendedSearchForm/ExtendedSearchForm';
import { ESelectedDateType } from './ExtendedSearchForm/ExtendedSearchForm.types';

export const DevicesProfile: FC<DeviceProfileProps> = ({
  setFilter,
  isOpen,
  close,
  open,
  searchState,
  clearSearchPayload,
  diametersConfig,
  devicesSearchType,
  setDevicesSearchType,
  serialNumber,
  setSerialNumber,
  Header,
  handleFetchModels,
  calculatorsModels,
  isSearchError,
}) => {
  const {
    handleSubmit: submitForm,
    setFieldValue,
    values,
    resetForm,
  } = useFormik<NodesListRequestForm>({
    initialValues: {
      'DevicesFilter.PipeDiameters':
        searchState?.['DevicesFilter.PipeDiameters'],
      'DevicesFilter.ExpiresCheckingDateAt':
        searchState?.['DevicesFilter.ExpiresCheckingDateAt'],
      ExpiresAdmissionActDateAt: searchState?.ExpiresAdmissionActDateAt,
      Resource: searchState?.Resource,
      'DevicesFilter.Model': searchState?.['DevicesFilter.Model'],
      'CommercialDateRange.From': searchState?.['CommercialDateRange.From'],
      'CommercialDateRange.To': searchState?.['CommercialDateRange.To'],
      'Address.City': searchState?.['Address.City'],
      'Address.Street': searchState?.['Address.Street'],
      'Address.HousingStockNumber': searchState?.['Address.HousingStockNumber'],
      'Address.Corpus': searchState?.['Address.Corpus'],
      'Address.HouseCategory': searchState?.['Address.HouseCategory'],
      CommercialStatus: searchState?.CommercialStatus,
      RegistrationType: searchState?.RegistrationType,
      'DevicesFilter.Question': searchState?.['DevicesFilter.Question'],
      OrderBy: searchState?.OrderBy,
      IsConnected:
        searchState?.IsConnected === undefined
          ? DeviceConnectionType.All
          : searchState?.IsConnected
          ? DeviceConnectionType.Connected
          : DeviceConnectionType.NotConnected,
      PageNumber: searchState?.PageNumber,
      PageSize: searchState?.PageSize,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      setFilter({
        ...values,
        IsConnected: values.IsConnected
          ? IsConnectedToBooleanDictionary[values.IsConnected]
          : undefined,
      });
    },
  });

  const [dateType, setDateType] = useState<ESelectedDateType>(
    ESelectedDateType.ExpiresCheckingDateAt,
  );

  return (
    <Wrapper>
      <Header>
        <Radio.Group
          value={devicesSearchType}
          onChange={(value) =>
            setDevicesSearchType(value.target.value as DevicesSearchType)
          }
        >
          <Radio value={DevicesSearchType.SearialNumber}>
            Поиск по прибору
          </Radio>
          <Radio value={DevicesSearchType.Address}>Поиск по адресу</Radio>
        </Radio.Group>

        <SearchDevices
          isExtendedSearchOpen={isOpen}
          submitForm={submitForm}
          setFieldValue={setFieldValue}
          values={values}
          diametersConfig={diametersConfig}
          devicesSearchType={devicesSearchType}
          serialNumber={serialNumber}
          setSerialNumber={setSerialNumber}
          handleClear={() => {
            resetForm();
            clearSearchPayload();
          }}
          isSearchError={isSearchError}
        >
          <ExtendedSearch
            isOpen={isOpen}
            handleClose={() => {
              close();
            }}
            handleOpen={() => open()}
            handleApply={() => {
              submitForm();
            }}
            handleClear={() => {
              resetForm();
              clearSearchPayload();
            }}
            extendedSearchContent={
              <ExtendedSearchForm
                setFieldValue={setFieldValue}
                values={values}
                diametersConfig={diametersConfig}
                calculatorsModels={calculatorsModels}
                handleFetchModels={handleFetchModels}
                dateType={dateType}
                setDateType={setDateType}
              />
            }
          />
        </SearchDevices>
      </Header>
      <DevicesListContainer />
    </Wrapper>
  );
};
