import React, { FC } from 'react';
import { Tabs } from 'antd';
import { useFormik } from 'formik';
import _ from 'lodash';
import { DevicesReportModal } from '01/features/devicesReport';
import {
  searchStateChanged,
  showDownloadDeviceReportButtonClicked,
} from '01/features/devicesReport/models';
import { MenuButtonTT } from '01/tt-components';
import { DevicesListContainer } from 'services/devices/displayDevicesService/displayDevicesService.container';
import { SearchDevices } from '../SearchDevices';
import { ExtendedSearch } from '01/shared/ui/ExtendedSearch';
import { CalculatorsListRequestPayload } from '01/features/carlculators/calculatorsIntoHousingStockService/calculatorsIntoHousingStockService.types';
import { ExtendedSearchForm } from './ExtendedSearchForm';
import { HeaderWrapper, HeaderText, Wrapper } from './DevicesProfile.styled';
const { TabPane: Tab } = Tabs;
interface DeviceProfileProps {
  fetchcalc: (
    payload: CalculatorsListRequestPayload
  ) => CalculatorsListRequestPayload;
  isOpen: boolean;
  open: (payload: void) => void;
  close: (payload: void) => void;
  showDownloadDeviceReportButtonClicked: (payload: void) => void;
  searchState: CalculatorsListRequestPayload | null;
  clearSearchPayload: (payload: void) => void
}
export const DevicesProfile: FC<DeviceProfileProps> = ({
  fetchcalc,
  isOpen,
  close,
  open,
  searchState,
  clearSearchPayload
}) => {
  const menuButtonArr = [
    {
      title: 'Выгрузить список приборов',
      cb: showDownloadDeviceReportButtonClicked,
      show: true,
      color: 'default',
      clickable: true,
    },
  ];

  const {
    handleSubmit: submitForm,
    setFieldValue,
    values,
    resetForm,
  } = useFormik<CalculatorsListRequestPayload>({
    initialValues: {
      'Filter.DiameterRange.From': searchState?.['Filter.DiameterRange.From'],
      'Filter.DiameterRange.To': searchState?.['Filter.DiameterRange.To'],
      'Filter.ExpiresCheckingDateAt': searchState?.['Filter.ExpiresCheckingDateAt'],
      'Filter.Resource': searchState?.['Filter.Resource'],
      'Filter.Model': searchState?.['Filter.Model'],
      'Filter.CommercialDateRange.From': searchState?.['Filter.CommercialDateRange.From'],
      'Filter.CommercialDateRange.To': searchState?.['Filter.CommercialDateRange.To'],
      'Filter.Address.City': searchState?.['Filter.Address.City'],
      'Filter.Address.Street': searchState?.['Filter.Address.Street'],
      'Filter.Address.HousingStockNumber': searchState?.['Filter.Address.HousingStockNumber'],
      'Filter.Address.Corpus': searchState?.['Filter.Address.Corpus'],
      'Filter.Address.HouseCategory': searchState?.['Filter.Address.HouseCategory'],
      'Filter.HousingStockId': searchState?.['Filter.HousingStockId'],
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
      fetchcalc(values);
      searchStateChanged(values);
    },
  });

  return (
    <div>
      <HeaderWrapper>
        <HeaderText>Приборы</HeaderText>
        <MenuButtonTT menuButtonArr={menuButtonArr} />
      </HeaderWrapper>
      <Wrapper>
        <Tabs defaultActiveKey="1">
          <Tab tab={<span style={{ fontSize: 16 }}>ОДПУ</span>} key="1"></Tab>
        </Tabs>
        <SearchDevices
          isExtendedSearchOpen={isOpen}
          submitForm={submitForm}
          setFieldValue={setFieldValue}
          values={values}
        >
          <ExtendedSearch
            isOpen={isOpen}
            handleClose={() => {
              close();
              clearSearchPayload()
              resetForm()
            }}
            handleOpen={() => open()}
            handleApply={() => {
              fetchcalc(values);
              searchStateChanged(values);
            }}
            handleClear={() => {
              resetForm()
              clearSearchPayload()
            }}
            extendedSearchContent={
              <ExtendedSearchForm
                setFieldValue={setFieldValue}
                values={values}
              />
            }
          />
        </SearchDevices>
        <DevicesListContainer />
        <DevicesReportModal />
      </Wrapper>
    </div>
  );
};
