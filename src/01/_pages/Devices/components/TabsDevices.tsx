import React, { useEffect, useReducer, useState } from 'react';

import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../../../components/Loader';
import {
  getDevices,
  setCurrentPage,
} from '../../../Redux/reducers/reducerDevicesPage';

import styles from './TabsDevices.module.scss';
import { createPages } from '../../../utils/pagesCreator';

import DeviceBlock from './DeviceBlock/DeviceBlock';
import DeviceSearchForm from './DeviceSearchForm/DeviceSearchForm';
import devicesSearchReducer from '../devicesSearchReducer';
import DevicesByAddress from './DevicesByAddress/DevicesByAddress';
import {useDebounce} from "../../../hooks/useDebounce";
import {DevicesByAddressInterface, groupDevicesByObjects} from "./utils/groupDevicesByObjects";

const { TabPane } = Tabs;

const initialState = {
  expirationDate: '',
  lowerDiameterRange: null,
  upperDiameterRange: null,
  searchTerm: '',
};

const TabsDevices = ({ devicePage }) => {



  const dispatch = useDispatch();
  const { pageSize } = devicePage;
  const { currentPage } = devicePage;
  const { totalPages } = devicePage;
  const [isLoading, setIsLoading] = useState(true);
  // затипизировать
  const [deviceElems, setDeviceElems] = useState<JSX.Element[]>();

  const [searchState, dispatchSearchState] = useReducer(devicesSearchReducer, initialState);
  const debouncedSearchState = useDebounce(searchState, 500);


const pages = createPages(totalPages, currentPage);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getDevices(currentPage, pageSize, debouncedSearchState));
    setIsLoading(false);
  }, [currentPage, debouncedSearchState]);

  useEffect(() => {
    setIsLoading(true);

    const devicesByObject = groupDevicesByObjects(devicePage.items);


    const deviceArray = devicesByObject.map((addressDevicesGroup) => <DevicesByAddress key={addressDevicesGroup.address?.id} addressDevicesGroup={addressDevicesGroup} />);
    setDeviceElems(deviceArray);
      setIsLoading(false);
  }, [devicePage.items]);


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
      <TabPane className={styles.tab} tab={<span style={{ fontSize: 16 }}>ОДПУ</span>} key="1">
        {/* <DeviceSearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm}/> */}
        <DeviceSearchForm searchState={searchState} dispatchSearchState={dispatchSearchState} />
        {isLoading || devicePage.isLoading ? (
          <div>
            ЗАГРУЗКА...
            <Loader show />
          </div>
        )
          : (
            <div>
              <div className={styles.devices}>{deviceElems}</div>
              <div className={styles.pages}>{pagination}</div>
            </div>
          )}
      </TabPane>
    </Tabs>
  );
};

export default TabsDevices;
