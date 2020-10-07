import React, {useEffect} from "react";

import { Tabs } from 'antd';
import {devicesAPI} from "../../../_api/devices_page";
import {Loader} from "../../../components/Loader";
import {getDevices, setCurrentPage} from "../../../Redux/reducers/reducerDevicesPage";
import {compose} from "redux";
import Device from "./Device";
import {useDispatch, useSelector} from "react-redux";

import styles from './TabsDevices.module.css'
import {createPages} from "../../../utils/pagesCreator";

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}



const TabsDevices = () => {

    const dispatch = useDispatch();
    const pageSize = useSelector((state) => state.devicePage.pageSize);
    const currentPage = useSelector((state) => state.devicePage.currentPage);
    const totalPages = useSelector((state) => state.devicePage.totalPages);


    const pages = [];
    createPages(pages, totalPages, currentPage);

    useEffect( () => {
        dispatch(getDevices(currentPage, pageSize))
    }, [currentPage, pageSize]);

    const deviceItems = useSelector((state) => state.devicePage.devices);


    if (!deviceItems) return <div>LOADING...</div>



        const deviceElems = deviceItems.map((device) => {
                return <div>Прибор - {device.id}</div>
            }
        );

        return <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="ОДПУ" key="1">
                {deviceElems}
                <div className={styles.pages}>
                    {pages.map((page, index) => <span
                        key={index}
                        className={currentPage == page ? styles.currentPage : styles.page}
                        onClick={() => dispatch(setCurrentPage(page))}
                    >{page}</span> )}
                </div>
            </TabPane>
            <TabPane tab="ИПУ" key="2">
                Content of Tab Pane 2
            </TabPane>
        </Tabs>
    }



    export default TabsDevices
