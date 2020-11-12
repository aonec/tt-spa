import React from 'react';
import {Badge} from "antd";

const ActiveLine = ({isActive}) => {


    return (
        <>
        {isActive
            ? <span> <Badge status="success" /> Активен </span>
            : <span> <Badge status="error" /> Не активен </span>
        }
        </>
)
}

export default ActiveLine;