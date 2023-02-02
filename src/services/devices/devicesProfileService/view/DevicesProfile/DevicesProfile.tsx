import React, { FC } from 'react';
import { useFormik } from 'formik';
import { searchStateChanged } from '01/features/devicesReport/models';
import { DevicesListContainer } from 'services/devices/displayDevicesService/displayDevicesService.container';
import { SearchDevices } from '../SearchDevices';
import { ExtendedSearch } from '01/shared/ui/ExtendedSearch';
import { CalculatorsListRequestPayload } from '01/features/carlculators/calculatorsIntoHousingStockService/calculatorsIntoHousingStockService.types';
import { ExtendedSearchForm } from './ExtendedSearchForm';
import { Wrapper } from './DevicesProfile.styled';
import { DiamtersConfig } from 'services/currentUserService/currentUserService.types';
import { DevicesSearchType } from 'services/devices/devicesPageService/devicesPageService.types';
import { Radio } from 'antd';

interface DeviceProfileProps {
  setFilter: (payload: CalculatorsListRequestPayload) => void;
  isOpen: boolean;
  open: (payload: void) => void;
  close: (payload: void) => void;
  showDownloadDeviceReportButtonClicked: (payload: void) => void;
  searchState: CalculatorsListRequestPayload | null;
  clearSearchPayload: (payload: void) => void;
  diametersConfig: DiamtersConfig;
  devicesSearchType: DevicesSearchType;
  setDevicesSearchType: (type: DevicesSearchType) => void;
  setSerialNumber: (value: string) => void;
  serialNumber: string;
}

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
}) => {
  const {
    handleSubmit: submitForm,
    setFieldValue,
    values,
    resetForm,
  } = useFormik<CalculatorsListRequestPayload>({
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
      IsConnected: searchState?.IsConnected,
      CountTasks: searchState?.CountTasks,
      IsClosed: searchState?.IsClosed,
      FileName: searchState?.FileName,
      PageNumber: searchState?.PageNumber,
      PageSize: searchState?.PageSize,
      OrderBy: searchState?.OrderBy,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      setFilter(values);
      searchStateChanged(values);
    },
  });

  return (
    <Wrapper>
      <Radio.Group
        value={devicesSearchType}
        onChange={(value) =>
          setDevicesSearchType(value.target.value as DevicesSearchType)
        }
      >
        <Radio value={DevicesSearchType.SearialNumber}>Поиск по прибору</Radio>
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
      >
        <ExtendedSearch
          isOpen={isOpen}
          handleClose={() => {
            close();
          }}
          handleOpen={() => open()}
          handleApply={() => {
            submitForm();
            searchStateChanged(values);
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
            />
          }
        />
      </SearchDevices>
      <DevicesListContainer />
    </Wrapper>
  );
};
