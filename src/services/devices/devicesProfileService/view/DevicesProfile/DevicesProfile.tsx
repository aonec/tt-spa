import React, { FC } from 'react';
import { useFormik } from 'formik';
import { DevicesListContainer } from 'services/devices/displayDevicesService/displayDevicesService.container';
import { SearchDevices } from '../SearchDevices';
import { ExtendedSearch } from 'ui-kit/ExtendedSearch';
import { ExtendedSearchForm } from './ExtendedSearchForm';
import { Wrapper } from './DevicesProfile.styled';
import { DiamtersConfig } from 'services/currentUserService/currentUserService.types';
import { DevicesSearchType } from 'services/devices/devicesPageService/devicesPageService.types';
import { Radio } from 'antd';
import { HeaderInject } from 'services/objects/objectsProfileService/view/ObjectsProfile/ObjectsProfile.types';
import { NodesListRequestPayload } from 'services/devices/displayDevicesService/displayDevicesService.types';

interface DeviceProfileProps extends HeaderInject {
  setFilter: (payload: NodesListRequestPayload) => void;
  isOpen: boolean;
  open: (payload: void) => void;
  close: (payload: void) => void;
  openDownloadDevicesReportModal: () => void;
  searchState: NodesListRequestPayload | null;
  clearSearchPayload: (payload: void) => void;
  diametersConfig: DiamtersConfig;
  devicesSearchType: DevicesSearchType;
  setDevicesSearchType: (type: DevicesSearchType) => void;
  setSerialNumber: (value: string) => void;
  serialNumber: string;
  isSearchError: boolean;
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
  Header,
  isSearchError,
}) => {
  const {
    handleSubmit: submitForm,
    setFieldValue,
    values,
    resetForm,
  } = useFormik<NodesListRequestPayload>({
    initialValues: {
      'DevicesFilter.PipeDiameters':
        searchState?.['DevicesFilter.PipeDiameters'],
      'DevicesFilter.ExpiresCheckingDateAt':
        searchState?.['DevicesFilter.ExpiresCheckingDateAt'],
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
      'DevicesFilter.Question': searchState?.['DevicesFilter.Question'],
      OrderBy: searchState?.OrderBy,
      IsConnected: searchState?.IsConnected,
      PageNumber: searchState?.PageNumber,
      PageSize: searchState?.PageSize,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      setFilter(values);
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
              />
            }
          />
        </SearchDevices>
      </Header>
      <DevicesListContainer />
    </Wrapper>
  );
};
