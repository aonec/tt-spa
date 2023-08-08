import React, { FC } from 'react';
import { useFormik } from 'formik';
import { DevicesListContainer } from 'services/devices/displayDevicesService/displayDevicesService.container';
import { SearchDevices } from '../SearchDevices';
import { ExtendedSearch } from 'ui-kit/ExtendedSearch';
import { CalculatorsListRequestForm } from 'services/calculators/calculatorsListService/calculatorsListService.types';
import { ExtendedSearchForm } from './ExtendedSearchForm/ExtendedSearchForm';
import { Wrapper } from './DevicesProfile.styled';
import { DevicesSearchType } from 'services/devices/devicesPageService/devicesPageService.types';
import { Radio } from 'antd';
import { DeviceProfileProps } from './DevicesProfile.types';
import {
  EIsDeviceConnectedType,
  IsConnectedToBooleanDictionary,
} from './ExtendedSearchForm/ExtendedSearchForm.constants';

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
  housingMeteringDevicesModels,
}) => {
  console.log(searchState);
  const {
    handleSubmit: submitForm,
    setFieldValue,
    values,
    resetForm,
  } = useFormik<CalculatorsListRequestForm>({
    initialValues: {
      'Filter.PipeDiameters': searchState?.['Filter.PipeDiameters'],
      'Filter.ExpiresCheckingDateAt':
        searchState?.['Filter.ExpiresCheckingDateAt'],
      'Filter.Resource': searchState?.['Filter.Resource'],
      'Filter.Model': searchState?.['Filter.Model'],
      'Filter.CommercialDateRange.From':
        searchState?.['Filter.CommercialDateRange.From'],
      'Filter.CommercialDateRange.To':
        searchState?.['Filter.CommercialDateRange.To'],
      'Filter.Address.City': searchState?.['Filter.Address.City'],
      'Filter.Address.Street': searchState?.['Filter.Address.Street'],
      'Filter.Address.HousingStockNumber':
        searchState?.['Filter.Address.HousingStockNumber'],
      'Filter.Address.Corpus': searchState?.['Filter.Address.Corpus'],
      'Filter.Address.HouseCategory':
        searchState?.['Filter.Address.HouseCategory'],
      'Filter.NodeStatus': searchState?.['Filter.NodeStatus'],
      Question: searchState?.Question,
      OrderRule: searchState?.OrderRule,

      IsConnected:
        searchState?.IsConnected === undefined
          ? EIsDeviceConnectedType.All
          : searchState?.IsConnected
          ? EIsDeviceConnectedType.Connected
          : EIsDeviceConnectedType.NotConnected,

      CountTasks: searchState?.CountTasks,
      IsClosed: searchState?.IsClosed,
      FileName: searchState?.FileName,
      PageNumber: searchState?.PageNumber,
      PageSize: searchState?.PageSize,
      OrderBy: searchState?.OrderBy,
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
                housingMeteringDevicesModels={housingMeteringDevicesModels}
                handleFetchModels={handleFetchModels}
              />
            }
          />
        </SearchDevices>
      </Header>
      <DevicesListContainer />
    </Wrapper>
  );
};
