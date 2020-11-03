import React, {useEffect, useState} from "react";

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


const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}



const TabsDevices = () => {
    const dispatch = useDispatch();
    const pageSize = useSelector((state) => state.devicePage.pageSize);
    const currentPage = useSelector((state) => state.devicePage.currentPage);
    const totalPages = useSelector((state) => state.devicePage.totalPages);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [deviceElems, setDeviceElems] = useState([]);


    const pages = [];
    createPages(pages, totalPages, currentPage);

    useEffect( () => {
        setIsLoading(true)
        dispatch(getDevices(currentPage, pageSize, searchTerm));
        setIsLoading(false)
    }, [currentPage, searchTerm]);

    const deviceItems = useSelector((state) =>
        state.devicePage.items
    )

    useEffect(() => {
        const deviceArray = deviceItems.map((device) => {
                return <DeviceBlock device={device}/>
            }
        );
        setDeviceElems(deviceArray)
    }, [deviceItems])



    if (isLoading) return 'ЗАГРУЗКА...'

    return <div>

        <Tabs defaultActiveKey="1" onChange={callback} style={{maxWidth: 960}}>
            <TabPane className={styles.tab} tab={<span style={{fontSize: 16}}>ОДПУ</span>} key="1">
                <DeviceSearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
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
