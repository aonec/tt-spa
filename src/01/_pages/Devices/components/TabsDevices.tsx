import React, { useEffect, useReducer } from 'react';
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../../../components/Loader';
import {
  getDevices,
  setCurrentPage,
} from '../../../Redux/reducers/reducerDevicesPage';
import styles from './TabsDevices.module.scss';
import { createPages } from '../../../utils/pagesCreator';
import DeviceSearchForm from './DeviceSearchForm/DeviceSearchForm';
import devicesSearchReducer from '../devicesSearchReducer';
import DevicesByAddress from './DevicesByAddress/DevicesByAddress';
import { useDebounce } from '../../../hooks/useDebounce';
import { groupDevicesByObjects } from './utils/groupDevicesByObjects';
import styled from 'styled-components';

import { RootState } from '../../../Redux/store';
import { DevicePageType } from '../../../Redux/rootReducer';
import { searchStateChanged } from '../../../features/devicesReport/models';
import { DevicesReportModal } from '../../../features/devicesReport';
import { CalculatorListResponsePagedList, EExpiresCheckingDateAt } from '../../../../api/types';

const { TabPane } = Tabs;

const initialState = {
  expirationDate: '' as EExpiresCheckingDateAt,
  diameterRange: [0, 255] as [number, number],
  destination: undefined,
  rule: undefined,
  searchTerm: '',
};

const TabsDevices = () => {
  const devicePage = useSelector<RootState, DevicePageType>(
    (state) => state.devicePage
  );
  const dispatch = useDispatch();
  const { pageSize, currentPage, totalPages } = devicePage;

  const [searchState, dispatchSearchState] = useReducer(
    devicesSearchReducer,
    initialState
  );

  const debouncedSearchState = useDebounce(searchState, 500);

  const pages = createPages(totalPages, currentPage);

  useEffect(() => {
    dispatch(getDevices(currentPage, pageSize, debouncedSearchState));
    searchStateChanged(debouncedSearchState);
  }, [currentPage, debouncedSearchState]);

  const devicesByObject = groupDevicesByObjects(devicePage.items || []);

  const deviceArray = devicesByObject.map((addressDevicesGroup) => (
    <DevicesByAddress
      key={addressDevicesGroup.address?.mainAddress?.id}
      addressDevicesGroup={addressDevicesGroup}
    />
  ));

  const pagination = pages.map((page, index) => (
    <span
      key={index}
      className={currentPage === page ? styles.currentPage : styles.page}
      onClick={() => dispatch(setCurrentPage(page))}
    >
      {page}
    </span>
  ));

  return (
    <>
      <Tabs defaultActiveKey="1" style={{ maxWidth: 960 }}>
        <Tab tab={<span style={{ fontSize: 16 }}>ОДПУ</span>} key="1">
          <DeviceSearchForm
            searchState={searchState}
            dispatchSearchState={dispatchSearchState}
          />
          {devicePage.isLoading ? (
            <div role="loader">
              ЗАГРУЗКА...
              <Loader show />
            </div>
          ) : (
            <div>
              <div>{deviceArray}</div>
              <Pagination>{pagination}</Pagination>
            </div>
          )}
        </Tab>
      </Tabs>
      <DevicesReportModal />
    </>
  );
};

interface TabsDevicesInterface {
  devicePage: CalculatorListResponsePagedList & {
    isLoading: boolean;
    currentPage: number;
  };
}

const Pagination = styled.div`
  margin: 20px 0;
  position: relative;
  bottom: 0;
`;

const Tab = styled(TabPane)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export default TabsDevices;
