import { Form, Switch } from 'antd'
import React from 'react'
;<Form.Item
    style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    }}
>
    <Switch
        style={{ width: '48px' }}
        defaultChecked={!isConnected}
        onChange={onSwitchChange}
    />
    <span
        style={{
            fontSize: '16px',
            lineHeight: '32px',
            marginLeft: '16px',
            color: 'rgba(39, 47, 90, 0.9)',
        }}
    >
        Вычислитель без оборудования связи
    </span>
</Form.Item>
