import React from "react";

import { Tabs } from 'antd';
import {devicesAPI} from "../../../_api/devices_page";
import {Loader} from "../../../components/Loader";
import {getDevices} from "../../../Redux/reducers/reducerDevicesPage";
import {compose} from "redux";
import {connect} from "react-redux";

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}



class TabsDevices extends React.Component {

    componentDidMount() {
        this.props.getDevices();

    }


    // const devicesArray = devicesAPI.getDevices();
    debugger;

    // if (devicesArray instanceof Promise) return <div>LOAD</div>;
    // const devices = devicesArray.map(device => <div>{device.id}</div>)
//     let items = devices.items;

    // console.log(devicesAPI.getDevices())
    render() {
        let deviceItems = this.props.devices;

        if (!deviceItems) return <div>LOADING...</div>


        let deviceElems = deviceItems.map(device => {
            return <Device device={device} />
            }
        )
     return <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="ОДПУ" key="1">
                {deviceElems}
            </TabPane>
            <TabPane tab="ИПУ" key="2">
                Content of Tab Pane 2
            </TabPane>
        </Tabs>
    }

}


const mapStateToProps = (state) => {
    return {
        devices: state.devicePage.devices
    }
}



export default compose(
    connect(mapStateToProps, {
        getDevices
    })
)(TabsDevices)
