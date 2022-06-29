import React, { FC } from 'react';
import { Tabs } from 'antd';
import { useFormik } from 'formik';
import _ from 'lodash';
import { DevicesReportModal } from '01/features/devicesReport';
import { searchStateChanged, showDownloadDeviceReportButtonClicked } from '01/features/devicesReport/models';
import { MenuButtonTT } from '01/tt-components';
import { DevicesListContainer } from 'services/devices/displayDevicesService/displayDevicesService.container';
import { SearchDevices } from '../SearchDevices';
import { ExtendedSearch } from '01/shared/ui/ExtendedSearch';
import { CalculatorsListRequestPayload } from '01/features/carlculators/calculatorsIntoHousingStockService/calculatorsIntoHousingStockService.types';
import { ExtendedSearchForm } from './ExtendedSearchForm';
import { HeaderWrapper, HeaderText } from './DevicesProfile.styled';
const { TabPane: Tab } = Tabs;
interface DeviceProfileProps {
  fetchcalc: (
    payload: CalculatorsListRequestPayload
  ) => CalculatorsListRequestPayload;
  isOpen: boolean;
  open: (payload: void) => void;
  close: (payload: void) => void;
  showDownloadDeviceReportButtonClicked: (payload: void) => void;
}
export const DevicesProfile: FC<DeviceProfileProps> = ({fetchcalc, isOpen, close, open}) => {
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
      'Filter.DiameterRange.From': undefined,
      'Filter.DiameterRange.To': undefined,
      'Filter.ExpiresCheckingDateAt': undefined,
      'Filter.Resource': undefined,
      'Filter.Model': undefined,
      'Filter.CommercialDateRange.From': undefined,
      'Filter.CommercialDateRange.To': undefined,
      'Filter.Address.City': undefined,
      'Filter.Address.Street': undefined,
      'Filter.Address.HousingStockNumber': undefined,
      'Filter.Address.Corpus': undefined,
      'Filter.Address.HouseCategory': undefined,
      'Filter.HousingStockId': undefined,
      'Filter.NodeStatus': undefined,
      Question: undefined,
      OrderRule: undefined,
      IsConnected: undefined,
      CountTasks: undefined,
      IsClosed: undefined,
      FileName: undefined,
      PageNumber: undefined,
      PageSize: undefined,
      OrderBy: undefined,
    },
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
      <Tabs defaultActiveKey="1">
        <Tab tab={<span style={{ fontSize: 16 }}>ОДПУ</span>} key="1"></Tab>
      </Tabs>
      <SearchDevices 
       isExtendedSearchOpen={isOpen}
       fetchcalc={fetchcalc}
       searchStateChanged={searchStateChanged}
       >
        <ExtendedSearch
          isOpen={isOpen}
          handleClose={() => close()}
          handleOpen={() => open()}
          handleApply={() => {
            fetchcalc(values);
            searchStateChanged(values);
          }}
          handleClear={() => resetForm()}
          extendedSearchContent={
            <ExtendedSearchForm setFieldValue={setFieldValue} values={values} />
          }
        />
      </SearchDevices>
      <DevicesListContainer />
      <DevicesReportModal />
    </div>
  );
};
