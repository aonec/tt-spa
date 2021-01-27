import React from 'react'
import { Menu, Dropdown, Button } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        Пункт 1
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        Пункт 2
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        Пункт 3
      </a>
    </Menu.Item>
  </Menu>
);

export const DropdownTT = () => {
  console.log('DropdownTT');
  return (
    <Dropdown overlay={menu} placement="bottomRight">
      <Button><MoreOutlined/></Button>
    </Dropdown>
  )
};


