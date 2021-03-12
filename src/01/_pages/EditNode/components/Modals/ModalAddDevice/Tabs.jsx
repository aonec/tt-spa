import React from 'react'
import { Tabs } from 'antd'

const { TabPane } = Tabs

const tabs = [
    {
        title: 'Шаг 1. Общие данные',
        key: '1',
    },
    {
        title: 'Шаг 2. Прибор',
        key: '2',
    },
    {
        title: 'Шаг 3. Документы',
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
