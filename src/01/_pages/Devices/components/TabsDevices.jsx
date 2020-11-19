import React, {useEffect, useReducer, useState} from "react";

import { Tabs } from 'antd';
import {Loader} from "../../../components/Loader";
import {
    getDevices,
    setCurrentPage,
    toggleIsLoading
} from "../../../Redux/reducers/reducerDevicesPage";


import {useDispatch, useSelector} from "react-redux";

import styles from './TabsDevices.module.scss'
import {createPages} from "../../../utils/pagesCreator";

import DeviceBlock from "./DeviceBlock/DeviceBlock";
import DeviceSearchForm from "./DeviceSearchForm/DeviceSearchForm";
import devicesSearchReducer from "./../devicesSearchReducer"
import DevicesByAddress from "./DevicesByAddress/DevicesByAddress";


const { TabPane } = Tabs;

const initialState = {
    expirationDate: '',
    lowerDiameterRange: null,
    upperDiameterRange: null,
    searchTerm: ''
}


const TabsDevices = ({devicePage}) => {
    const dispatch = useDispatch();
    const pageSize = devicePage.pageSize;
    const currentPage = devicePage.currentPage;
    const totalPages = devicePage.totalPages;
    // const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [deviceElems, setDeviceElems] = useState([]);

    const [searchState, dispatchSearchState] = useReducer(devicesSearchReducer, initialState)

    const pages = [];
    createPages(pages, totalPages, currentPage);

    useEffect( () => {
        setIsLoading(true)
        dispatch(getDevices(currentPage, pageSize, searchState));
        setIsLoading(false)
    }, [currentPage, searchState]);




    // useEffect(() => {
    //     setIsLoading(true)
    //     const deviceArray = deviceItems.map((device) => {
    //             return <DeviceBlock device={device}/>
    //         }
    //     );
    //     setDeviceElems(deviceArray);
    //     setIsLoading(false)
    // }, [deviceItems])

    useEffect(() => {
        setIsLoading(true);
        const devicesByObject = [];

        devicePage.items.forEach((device) => {
            const {address, ...rest} = device;
            const index = devicesByObject.findIndex((el) => el.address.id === address.id);
            index === -1
                ? devicesByObject.push({ address, devices: [{ ...rest }] })
                : devicesByObject[index].devices.push({...rest})
        })
        const deviceArray = devicesByObject.map((addressDevicesGroup) => {
                return <DevicesByAddress addressDevicesGroup={addressDevicesGroup}/>
            }
        );
        setDeviceElems(deviceArray);
        setIsLoading(false)
    }, [devicePage.items])


    const pagination = pages.map((page, index) => <span
            key={index}
            className={currentPage === page ? styles.currentPage : styles.page}
            onClick={() => dispatch(setCurrentPage(page))}
        >{page}</span> )


    return <Tabs defaultActiveKey="1" style={{maxWidth: 960}}>
            <TabPane className={styles.tab} tab={<span style={{fontSize: 16}}>ОДПУ</span>} key="1">
                {/*<DeviceSearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>*/}
                <DeviceSearchForm dispatch={dispatch} searchState={searchState} dispatchSearchState={dispatchSearchState}/>
                {isLoading? <div>ЗАГРУЗКА... <Loader show={true}/></div> :
                    <div>
                        <div className={styles.devices}>{deviceElems}</div>
                        <div className={styles.pages}>{pagination}</div>
                    </div>}
            </TabPane>
            {/*<TabPane tab="ИПУ" key="2">*/}
            {/*    Content of Tab Pane 2*/}
            {/*</TabPane>*/}
        </Tabs>
}



export default TabsDevices
