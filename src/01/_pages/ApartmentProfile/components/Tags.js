import React, { useState, useEffect } from "react";

import { Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function log(e) {
    console.log(e);
}

function preventDefault(e) {
    e.preventDefault();
    console.log('Clicked! But prevent default.');
}

export const Tags = () => {

    return (
        <>
            <Tag>Tag 1</Tag>
            <Tag>
                <a href="https://github.com/ant-design/ant-design/issues/1862">Link</a>
            </Tag>
            <Tag closable onClose={log}>
                Tag 2
    </Tag>
            <Tag closable onClose={preventDefault}>
                Prevent Default
    </Tag>
        </>

    )
}