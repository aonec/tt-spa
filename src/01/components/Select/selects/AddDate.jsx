import React from "react";

import { DatePicker, Space } from 'antd';

import '../../../tt-components/antd.scss'
import {NavLink} from "react-router-dom";
import {addDate, dataReducer} from "../../../_pages/TaskProfile/hooks/usePanel";
import {useDispatch} from "react-redux";





const AddDate = () => {
    const [state, dispatch] = React.useReducer(dataReducer, {})
    function onChange(date, dateString) {
        dispatch(addDate(date.toISOString()))
    }
    return (
        <Space direction="vertical">
            <DatePicker onChange={onChange} />
        </Space>
    )
}

export default AddDate;
