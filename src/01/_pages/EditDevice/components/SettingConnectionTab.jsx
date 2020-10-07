import React from 'react';
import {
  Form, Input, Button, Checkbox,
} from 'antd';
import axios from '01/axios';
import { ButtonTT } from '01/tt-components';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function Connection() {
  console.log('Common');

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const getInfoHandler = () => {
    console.log('getInfoHandler');

  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >

      <Form.Item
        label="IP адрес вычислителя"
        name="ipV4"
        rules={[{ required: true, message: 'Пожалуйста, укажите IP-адрес' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Порт"
        name="port"
        rules={[{ required: true, message: 'Пожалуйста, укажите порт' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Адрес прибора"
        name="deviceAddres"
        rules={[{ required: true, message: 'Пожалуйста, укажите адрес устройства' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
        <Button type="secondary" htmlType="button">
          Отменить
        </Button>
        <Button htmlType="button" onClick={getInfoHandler}>
          GetInfo
        </Button>
      </Form.Item>
    </Form>
  );
}
