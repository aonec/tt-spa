import React, { useEffect, useReducer, useState } from 'react';
import { Tabs } from 'antd';
import { useDispatch } from 'react-redux';
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
import { CalculatorListResponsePagedList } from '../../../../myApi';

const { TabPane } = Tabs;

const initialState = {
  expirationDate: '',
  lowerDiameterRange: '',
  upperDiameterRange: '',
  searchTerm: '',
};

const TabsDevices = ({ devicePage }: TabsDevicesInterface) => {
  const dispatch = useDispatch();
  const { pageSize } = devicePage;
  const { currentPage } = devicePage;
  const { totalPages } = devicePage;
  const [isLoading, setIsLoading] = useState(true);

  const [searchState, dispatchSearchState] = useReducer(
    devicesSearchReducer,
    initialState
  );
  const debouncedSearchState = useDebounce(searchState, 500);

  const pages = createPages(totalPages, currentPage);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getDevices(currentPage, pageSize, debouncedSearchState));
    // setTimeout(() => setIsLoading(false), 10000);
    setIsLoading(false);
  }, [currentPage, debouncedSearchState]);

  const devicesByObject = groupDevicesByObjects(devicePage.items);

  const deviceArray = devicesByObject.map((addressDevicesGroup) => (
    <DevicesByAddress
      key={addressDevicesGroup.address?.id}
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
    <Tabs defaultActiveKey="1" style={{ maxWidth: 960 }}>
      <Tab tab={<span style={{ fontSize: 16 }}>ОДПУ</span>} key="1">
        <DeviceSearchForm
          searchState={searchState}
          dispatchSearchState={dispatchSearchState}
        />
        {isLoading || devicePage.isLoading ? (
          <div aria-label="loading">
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
