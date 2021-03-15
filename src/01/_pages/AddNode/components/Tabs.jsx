import React from 'react'
import { Tabs } from 'antd'

const { TabPane } = Tabs

const tabs = [
    {
        title: 'Шаг 1. Общие данные',
        key: '1',
    },
    {
        title: 'Шаг 2. Настройки соединения',
        key: '2',
    },
    {
        title: 'Шаг 3. Подключенные приборы',
        key: '3',
    },
]

const TabsComponent = (props) => {
    const { currentTabKey, handleChangeTab } = props
    return (
        <Tabs activeKey={currentTabKey} onChange={handleChangeTab}>
            {tabs.map((currentTab) => {
                const { title, key } = currentTab
                return <TabPane tab={title} key={key} />
            })}
        </Tabs>
    )
}

export default TabsComponent
