import React from "react";

import { Tabs } from 'antd';

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}

const TabsDevices = () => (
    <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="ОДПУ" key="1">
            Content of Tab Pane 1
        </TabPane>
        <TabPane tab="ИПУ" key="2">
            Content of Tab Pane 2
        </TabPane>
    </Tabs>
);

export default TabsDevices;