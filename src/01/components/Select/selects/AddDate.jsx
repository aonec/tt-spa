import React from "react";

import {ConfigProvider, DatePicker, Space} from 'antd';

import '../../../tt-components/antd.scss'
import {NavLink} from "react-router-dom";
import {addDate, dataReducer} from "../../../_pages/TaskProfile/hooks/usePanel";
import {useDispatch} from "react-redux";
import moment from 'moment';
import 'moment/locale/ru';
import locale from 'antd/es/locale/ru_RU';


const AddDate = ({ getData = () => {} }) => {



    function onChange(date, dateString) {
        getData({ nextStageDeadline: date.toISOString() ?? null })
    }
    return (
        <Space direction="vertical">
            <DatePicker format={"DD.MM.YYYY"} onChange={onChange} />
        </Space>
    )
}

export default AddDate;
