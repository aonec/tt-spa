import React from 'react';
import 'antd/dist/antd.css';
import { Button, Breadcrumb } from 'antd';
import {
  MoreOutlined, UserOutlined, LeftOutlined
} from '@ant-design/icons';

import { Comments } from './Comments'
import {Tags} from './Tags'

export function ApartmentProfile() {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/">
          <LeftOutlined />
          <span>Назад</span></Breadcrumb.Item>
      </Breadcrumb>

      <h1 className="apartment-profile__title">Кв. №41</h1>
      <p>Нижнекамск, ул. Мира, 36</p>
      <Button className="edit-button"><MoreOutlined /></Button>
      <Comments />
      <Tags />
    </div>

  )
}