import { DevicesReportModal } from '01/features/devicesReport';
import { showDownloadDeviceReportButtonClicked } from '01/features/devicesReport/models';
import { MenuButtonTT } from '01/tt-components';
import { useEvent, useStore } from 'effector-react';
import React, { FC } from 'react';
import { DevicesListContainer } from 'services/devices/displayDevicesService/displayDevicesService.container';
import styled from 'styled-components';
import { SearchDevices } from '../SearchDevices';
import { displayDevicesService } from '../../../displayDevicesService/displayDevicesService.models';
import { ExtendedSearch } from '01/shared/ui/ExtendedSearch';
import { useFormik } from 'formik';
import { CalculatorsListRequestPayload } from '01/features/carlculators/calculators/types';
import _ from 'lodash';
import { ExtendedSearchForm } from './ExtendedSearchForm';

export const DevicesProfile: FC = ({}) => {
  const { outputs, inputs } = displayDevicesService;
  const fetchcalc = useEvent(inputs.fetchCalculators);
  const isOpen = useStore(outputs.$isExtendedSearchOpen);
  const close = useEvent(inputs.extendedSearchClosed);
  const open = useEvent(inputs.extendedSearchOpened);

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
    handleReset,
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
    onSubmit: (values) => void fetchcalc(values),
    onReset: (values) => handleReset(values),
  });

  return (
    <div>
      <HeaderWrapper>
        <h1 style={{ fontWeight: 300, marginBottom: 16 }}>Приборы</h1>
        <MenuButtonTT menuButtonArr={menuButtonArr} />
      </HeaderWrapper>
      <SearchDevices isExtendedSearchOpen={isOpen}>
        <ExtendedSearch
          open={isOpen}
          handleClose={() => close(null)}
          handleOpen={() => open(null)}
          handleApply={() => fetchcalc(values)}
          handleClear={() => console.log()}
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

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
