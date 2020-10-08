
import { Tabs } from 'antd';
import {devicesAPI} from "../../../_api/devices_page";
import {Loader} from "../../../components/Loader";
import {getDevices} from "../../../Redux/reducers/reducerDevicesPage";
import {compose} from "redux";
import DeviceBlock from "./DeviceBlock/DeviceBlock";
import {getDevices, setCurrentPage, toggleIsLoading} from "../../../Redux/reducers/reducerDevicesPage";


const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}








    const deviceItems = useSelector((state) => state.devicePage.devices);



    const deviceElems = deviceItems.map((device) => {
        return <div>
            Прибор - {device.id}
            <div>Подприборы: {device.relatedDevices.length ?
                device.relatedDevices.map((device) => <div>Подприбор {device.id}</div>) :
                'Подприборов нет'
            }
            </div>

        </div>
    })

    // if (isLoading) return <div>LOADING...</div>

    return <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane className={styles.tab} tab="ОДПУ" key="1">
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
}



export default TabsDevices
