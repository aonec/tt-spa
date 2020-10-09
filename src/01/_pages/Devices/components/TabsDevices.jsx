import React, {useEffect, useState} from "react";

import { Tabs } from 'antd';
import {devicesAPI} from "../../../_api/devices_page";
import {Loader} from "../../../components/Loader";
import {
    getDevicesBySerialNumber,
    getDevices,
    setCurrentPage,
    toggleIsLoading
} from "../../../Redux/reducers/reducerDevicesPage";


import {useDispatch, useSelector} from "react-redux";

import styles from './TabsDevices.module.css'
import {createPages} from "../../../utils/pagesCreator";

import DeviceBlock from "./DeviceBlock/DeviceBlock";
import ButtonTT from "../../../tt-components/ButtonTT";


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
        if (searchTerm) return;
        dispatch(toggleIsLoading());
        dispatch(getDevices(currentPage, pageSize));
        dispatch(toggleIsLoading());
    }, [currentPage, pageSize]);

    // const deviceFilterFunction = (item) => {
    //     if (item.id.toString().includes(searchTerm) || item.relatedDevices.some((subItem) => subItem.id.toString().includes(searchTerm))) {
    //         return true
    //     }
    //     return false
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!e.target[0].value) return;
        dispatch(getDevicesBySerialNumber(e.target[0].value));
    }

    const deviceItems = useSelector((state) =>
        state.devicePage.items
    )



    const deviceElems = deviceItems.map((device) => <DeviceBlock device={device} />)
    //

    return <div>

        <Tabs defaultActiveKey="1" onChange={callback}>

            <TabPane className={styles.tab} tab="ОДПУ" key="1">
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label>
                        Поиск по серийному номеру прибора:
                        <input
                            className={styles.input__form}
                            type="text"
                            value={searchTerm}
                            onChange={editSearchTerm}
                            placeholder="Введите серийный номер прибора..."/>
                    </label>
                        <input className={styles.btn} type="submit" value="Отправить" />
                </form>
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
            {/*<TabPane tab="ИПУ" key="2">*/}
            {/*    Content of Tab Pane 2*/}
            {/*</TabPane>*/}
        </Tabs>
    </div>

}



export default TabsDevices
