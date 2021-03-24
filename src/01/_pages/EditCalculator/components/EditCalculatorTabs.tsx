import React, {Dispatch, SetStateAction, useContext} from 'react'
import {Tabs} from 'antd'

const {TabPane} = Tabs

const tabs = [
    {
        title: 'Общие данные',
        key: '1',
    },
    {
        title: 'Настройки соединения',
        key: '2',
    },
    {
        title: 'Подключенные приборы',
        key: '3',
    },
    {
        title: 'Документы',
        key: '4',
    },
]

interface EditCalculatorTabsInterface {
    tab: string
    setTab: Dispatch<SetStateAction<string>>
}

const EditCalculatorTabs = ({tab, setTab}: EditCalculatorTabsInterface) => {

    return (
        <Tabs
            style={{height: 'fit-content'}}
            activeKey={tab}
            onChange={(tab: string)=>setTab(tab)}
        >
            {tabs.map((currentTab) => {
                const {title, key} = currentTab
                return <TabPane tab={title} key={key}/>
            })}
        </Tabs>
    )
}

export default EditCalculatorTabs
