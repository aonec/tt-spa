import React from 'react'

import { ConfigProvider, DatePicker, Space } from 'antd'

import styles from './antd.module.scss'
import { NavLink } from 'react-router-dom'
import {
    addDate,
    dataReducer,
} from '../../../_pages/TaskProfile/hooks/usePanel'
import 'moment/locale/ru'

const AddDate = ({ getData = () => {} }) => {
    function onChange(date, dateString) {
        getData({ nextStageDeadline: date.toISOString() ?? null })
    }

    return (
        <Space direction="vertical">
            <DatePicker
                style={{ height: 50, width: '100%' }}
                format="DD.MM.YYYY"
                onChange={onChange}
            />
        </Space>
    )
}

export default AddDate
