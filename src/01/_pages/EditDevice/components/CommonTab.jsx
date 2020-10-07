import React from 'react';
import {
  Form, Input, Button, Checkbox, Select, DatePicker,
} from 'antd';
import { connect, useSelector, useDispatch } from 'react-redux';

import { items, serviceLife } from '../CalculatorJSON';

function CommonTab() {
  const dispatch = useDispatch();
  const {serialNumber, infoId} = useSelector((state) => state.editCalculatorReducer);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const getInfoHandler = () => {
    console.log('getInfoHandler');
    console.log(serialNumber, infoId)
  };

  console.log('Common');
  return (
    <Form
      {...layout}
      name="basic"
    //   initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >

      <Form.Item
        label="Тип вычислителя"
        name="model"
        rules={[{ required: true, message: 'Пожалуйста, укажите Тип вычислителя' }]}
      >
        <Select options={items} />
      </Form.Item>

      <Form.Item
        label="Серийный номер"
        id="serialNumber"
        // rules={[{ required: true, message: 'Пожалуйста, укажите Серийный номер' }]}
      >
        <Input 
        // placeholder={serialNumber}
        value={serialNumber}
        onChange={()=>console.log("onChange")}
        />
      </Form.Item>

      <Form.Item
        label="Дата выпуска прибора"
        name="lastCommercialAccountingDate"
        rules={[{ required: true, message: 'Пожалуйста, укажите Дата выпуска прибора' }]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        label="Дата ввода в эксплуатацию"
        name="lastCommercialAccountingDate"
        rules={[{ required: true, message: 'Пожалуйста, укажите Дата выпуска прибора' }]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        label="Срок эксплуатации по нормативу"
        name="futureCommercialAccountingDate"
        rules={[{ required: true, message: 'Пожалуйста, укажите Срок эксплуатации по нормативу' }]}
      >
        <Select options={serviceLife} />
      </Form.Item>

      <Form.Item
        label="Дата поверки прибора"
        name="futureCheckingDate"
        rules={[{ required: true, message: 'Пожалуйста, укажите Дата поверки прибора' }]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        label="Дата следующей поверки прибора"
        name="futureCheckingDate"
        rules={[{ required: true, message: 'Пожалуйста, укажите Дата следующей поверки прибора' }]}
      >
        <DatePicker />
      </Form.Item>

      {/* <Form.Item
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
      </Form.Item> */}

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

export default connect()(CommonTab)