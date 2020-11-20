import React from 'react';
import {Badge} from "antd";

const ActiveLine = ({isActive}) => {


    return (
        <div style={{marginRight: 16, color: 'rgba(39, 47, 90, 0.8)'}}>
        {isActive
            ? <span> <Badge status="success" /> Активен </span>
            : <span> <Badge status="error" /> Не активен </span>
        }
        </div>
)
}

export default ActiveLine;