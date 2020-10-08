import React, {useEffect, useState} from "react";

import { Tabs } from 'antd';
import {devicesAPI} from "../../../_api/devices_page";
import {Loader} from "../../../components/Loader";
import {getDevices, setCurrentPage, toggleIsLoading} from "../../../Redux/reducers/reducerDevicesPage";


import {useDispatch, useSelector} from "react-redux";

import styles from './TabsDevices.module.css'
import {createPages} from "../../../utils/pagesCreator";

import {Icon} from "../../../tt-components/Icon";
import {NavLink} from "react-router-dom";


const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}



const TabsDevices = () => {
    const dispatch = useDispatch();
    const pageSize = useSelector((state) => state.devicePage.pageSize);
    const currentPage = useSelector((state) => state.devicePage.currentPage);
    const totalPages = useSelector((state) => state.devicePage.totalPages);
    const isLoading = useSelector((state) => state.devicePage.isLoading);

    const [searchTerm, setSearchTerm] = useState('');
    const editSearchTerm = (e) => {
        setSearchTerm(e.target.value)
    }


    const pages = [];
    createPages(pages, totalPages, currentPage);

    useEffect( () => {
        dispatch(toggleIsLoading());
        dispatch(getDevices(currentPage, pageSize));
        dispatch(toggleIsLoading());
    }, [currentPage, pageSize, searchTerm]);

    const deviceFilterFunction = (item) => {
        if (item.id.toString().includes(searchTerm) || item.relatedDevices.some((subItem) => subItem.id.toString().includes(searchTerm))) {
            return true
        }
        return false
    }

    const deviceItems = useSelector((state) =>
        state.devicePage.devices.filter(deviceFilterFunction)
    )



    const deviceElems = deviceItems.map((device) => {
        return <div className={styles.device}>
            <NavLink className={styles.device__title} to={`/objects/${device.housingStockId}/devices/${device.id}`}><Icon className={styles.icon} icon={"device"} fill={"var(--main-100)"}/>{device.model}</NavLink>
                <div className={styles.subDevices}>
                {device.relatedDevices.length ?
                device.relatedDevices.map((device) => <div><NavLink to={`/objects/${device.housingStockId}/devices/${device.id}`}><Icon className={styles.icon} icon={"water"} fill={"var(--hot-water)"}/>{device.model}</NavLink></div>) :
                'Подприборов нет'}

            </div>

        </div>
    })

    // if (isLoading) return <div>LOADING...</div>

    return <div>

        <Tabs defaultActiveKey="1" onChange={callback}>

            <TabPane className={styles.tab} tab="ОДПУ" key="1">
                <input
                    className={styles.form}
                    type="text"
                    value={searchTerm}
                    onChange={editSearchTerm}
                    placeholder="Введите серийный номер прибора..."/>
                {isLoading ? <div>ЗАГРУЗКА... <Loader show={true}/></div> :
                    <div>
                        <div className={styles.devices}>{deviceElems}</div>
                        <div className={styles.pages}>
                            {pages.map((page, index) => <span
                                key={index}
                                className={currentPage == page ? styles.currentPage : styles.page}
                                onClick={() => dispatch(setCurrentPage(page))}
                            >{page}</span> )}
                        </div>
                    </div>}
            </TabPane>
            <TabPane tab="ИПУ" key="2">
                Content of Tab Pane 2
            </TabPane>
        </Tabs>
    </div>
}



export default TabsDevices
