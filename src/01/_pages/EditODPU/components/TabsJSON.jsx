import { DatePicker, Form, Input, Select } from "antd";
import { connection, resources, serviceLife, types } from "./CalculatorJSON";
import moment from "moment";
import React from "react";

const Tab1 = () => {
  console.log('Tab1');

  return (
    <>
      <Form.Item label="Выберите тип прибора" className="housingMeteringDeviceType">
        <Select
          height="60px"
          name="housingMeteringDeviceType"
          onChange={(event) => {
            values.housingMeteringDeviceType = event;
            const value = event;
            const path = ['housingMeteringDeviceType'];
            // dispatch(onChangeDeviceFormValueByPath(path, value));
          }}
          options={types}
          value={values.housingMeteringDeviceType}
        />
        <Alert name="closingDateTime" />
      </Form.Item>

      <Form.Item label="Выберите тип ресурса" className="resource">
        <Select
          name="resource"
          onChange={(event) => {
            values.resource = event;
            const value = event;
            const path = ['resource'];
            // dispatch(onChangeDeviceFormValueByPath(path, value));
          }}
          options={resources}
          value={values.resource}

        />
      </Form.Item>

      <Form.Item label="Выберите модель прибора" className="model">
        <Input
          name="model"
          type="text"
          onChange={(event) => {
            handleChange(event);
            const { value } = event.target;
            const path = ['model'];
            // dispatch(onChangeDeviceFormValueByPath(path, value));
          }}
          value={values.model}
          onBlur={handleBlur}
        />
        <Alert name="model" />
      </Form.Item>

      <Form.Item label="Серийный номер" className="serialNumber">
        <Input

          name="serialNumber"
          type="text"
          format="DD.MM.YYYY"
          onChange={(event) => {
            const { value } = event.target;
            const path = ['serialNumber'];
            // dispatch(onChangeDeviceFormValueByPath(path, value));
          }}
          value={values.serialNumber}
          onBlur={handleBlur}
        />
        <Alert name="serialNumber" />
      </Form.Item>

      <Form.Item label="Дата выпуска прибора" className="lastCommercialAccountingDate">
        <DatePicker
          name="lastCommercialAccountingDate"
          placeholder="Укажите дату..."
          format="DD.MM.YYYY"
          onChange={(date) => {
            const path = ['checkingDate'];
            const value = date.toISOString();
            // dispatch(onChangeDeviceFormValueByPath(path, value));
          }}
          value={moment(checkingDate)}
        />
        <Alert name="lastCommercialAccountingDate" />
      </Form.Item>

      <Form.Item label="Дата ввода в эксплуатацию" className="lastCommercialAccountingDate">
        <DatePicker
          value={moment(futureCheckingDate)}
          placeholder="Укажите дату..."
          format="DD.MM.YYYY"
          onChange={(date) => {
            const path = ['lastCommercialAccountingDate'];
            const value = date.toISOString();
            // dispatch(onChangeDeviceFormValueByPath(path, value));
          }}
          name="futureCheckingDate"
        />
        <Alert name="futureCheckingDate" />
      </Form.Item>

      <Form.Item label="Срок эксплуатации по нормативу" className="futureCommercialAccountingDate">
        <Select

          name="futureCommercialAccountingDate"
          onChange={(event) => {
            const value = moment()
              .add(event, 'year')
              .toISOString();
            const path = ['futureCommercialAccountingDate'];
            // dispatch(onChangeDeviceFormValueByPath(path, value));
          }}
          name="futureCommercialAccountingDate"
          placeholder="Укажите оперид эксплуатации"
          options={serviceLife}
          defaultValue={serviceLife[0].value}
        />
        <Alert name="futureCommercialAccountingDate" />
      </Form.Item>
    </>
  );
};

const Tab2 = () => {
  console.log('Tab2');
  return (
    <>
      <Form.Item label="Подключение к вычислителю" className="connection">
        <Select
          id="connection"
          name="connection"
          onChange={(event) => {
            values.connection = event;
            const value = event;
            const path = ['resource'];
            // dispatch(onChangeDeviceFormValueByPath(path, value));
          }}
          options={connection}
          value={values.connection}

        />
      </Form.Item>

      <Form.Item
        label="Выберите вычислитель, к которому подключен прибор"
        className="calculatorId"
      >
        <Input
          id="calculatorId"
          name="calculatorId"
          type="number"
          placeholder="Начните вводить ID прибора"
          value={calculatorId}
          onChange={(event) => {
            const { value } = event.target;
            const path = ['calculatorId'];
            // dispatch(onChangeDeviceFormValueByPath(path, Number(value)));
          }}
        />
        <Alert name="calculatorId" />
      </Form.Item>

      <Form.Item label="Номер ввода" className="entryNumber">
        <Input
          id="entryNumber"
          type="number"
          placeholder="1"
          value={entryNumber}
          onChange={(event) => {
            const { value } = event.target;
            const path = ['pipe', 'entryNumber'];
            // dispatch(onChangeDeviceFormValueByPath(path, Number(value)));
          }}
        />
      </Form.Item>

      <Form.Item label="Номер узла" className="hubNumber">
        <Input
          id="hubNumber"
          type="number"
          placeholder="1"
          value={hubNumber}
          onChange={(event) => {
            const { value } = event.target;
            const path = ['pipe', 'hubNumber'];
            // dispatch(onChangeDeviceFormValueByPath(path, Number(value)));
          }}
        />
      </Form.Item>

      <Form.Item label="Номер трубы" className="pipeNumber">
        <Input
          id="pipeNumber"
          type="number"
          placeholder="1"
          value={pipeNumber}
          onChange={(event) => {
            const { value } = event.target;
            const path = ['pipe', 'pipeNumber'];
            // dispatch(onChangeDeviceFormValueByPath(path, Number(value)));
          }}
        />
      </Form.Item>
    </>
  );
};