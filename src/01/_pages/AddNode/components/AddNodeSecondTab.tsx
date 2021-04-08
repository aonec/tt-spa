import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'antd';
import moment from 'moment';
import { useFormik } from 'formik';
import _ from 'lodash';
import {
  resources,
  serviceZoneList,
  nodeStatusList,
} from '../../../tt-components/localBases';
import {
  Title,
  SelectTT,
  InputTT,
  DatePickerTT,
  ButtonTT,
  StyledFooter,
  styles,
  StyledFormPage,
} from '../../../tt-components';
import { addNodeValidationSchema } from './validationSchemas';
import { AddNodeContext } from '../AddNodeContext';
import { AlertInterface } from '../../../tt-components/interfaces';

const AddNodeSecondTab = () => {
  const {
    handleCancel,
    currentTabKey,
    handlePrevious,
    handleNext,
    setNodeForm,
  } = useContext(AddNodeContext);

  const [validationSchema, setValidationSchema] = useState(
    addNodeValidationSchema
  );
  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    handleBlur,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: {
      resource: resources[0].value,
      number: 1,
      serviceZone: serviceZoneList[0].value,
      nodeStatus: nodeStatusList[0].value,
      lastCommercialAccountingDate: moment(),
      futureCommercialAccountingDate: moment().add(1, 'years'),
      hasErrors: false,
    },
    validationSchema,
    onSubmit: async () => {
      const form = {
        resource: values.resource,
        number: Number(values.number),
        serviceZone: values.serviceZone,
        nodeStatus: values.nodeStatus,
        lastCommercialAccountingDate: values.lastCommercialAccountingDate.toISOString(),
        futureCheckingDate: values.futureCommercialAccountingDate.toISOString(),
      };
      console.log('AddNodeFirstTab', form);
      setNodeForm(form);
      handleNext();
    },
  });

  const Alert = ({ name }: AlertInterface) => {
    const touch = _.get(touched, `${name}`);
    const error = _.get(errors, `${name}`);
    if (touch && error) {
      return <div style={{ color: 'red' }}>{error}</div>;
    }
    return null;
  };

  return (
    <form hidden={Number(currentTabKey) !== 2} onSubmit={handleSubmit}>
      <StyledFormPage>
        <Title color="black" style={styles.w100}>
          Общие данные
        </Title>
        <Form.Item label="Тип ресурса" style={styles.w49}>
          <SelectTT
            name="resource"
            onChange={(value) => {
              setFieldValue('resource', value);
            }}
            onBlur={handleBlur}
            options={resources}
            value={values.resource}
          />
          <Alert name="resource" />
        </Form.Item>

        <Form.Item label="Номер узла" style={styles.w49}>
          <InputTT
            name="number"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.number}
          />
          <Alert name="number" />
        </Form.Item>

        <Form.Item label="Зона" style={styles.w100}>
          <SelectTT
            name="serviceZone"
            onChange={(value) => {
              setFieldValue('serviceZone', value);
            }}
            onBlur={handleBlur}
            options={serviceZoneList}
            value={values.serviceZone}
          />
          <Alert name="serviceZone" />
        </Form.Item>

        <Form.Item
          label="Коммерческий учет показателей приборов"
          style={styles.w100}
        >
          <SelectTT
            name="nodeStatus"
            onChange={(value) => {
              setFieldValue('nodeStatus', value);
              if (value === nodeStatusList[1].value) {
                setFieldValue('futureCommercialAccountingDate', undefined);
                setFieldValue('lastCommercialAccountingDate', undefined);
              }
            }}
            onBlur={handleBlur}
            options={nodeStatusList}
            value={values.nodeStatus}
          />
          <Alert name="nodeStatus" />
        </Form.Item>

        {values.nodeStatus !== nodeStatusList[1].value ? (
          <>
            <Form.Item
              label="Дата начала Акта действия допуска"
              style={styles.w49}
            >
              <DatePickerTT
                format="DD.MM.YYYY"
                name="lastCommercialAccountingDate"
                allowClear={false}
                onChange={(date) => {
                  setFieldValue('lastCommercialAccountingDate', date);
                }}
                value={values.lastCommercialAccountingDate}
              />
              <Alert name="lastCheckingDate" />
            </Form.Item>

            <Form.Item
              label="Дата окончания Акта действия допуска"
              style={styles.w49}
            >
              <DatePickerTT
                format="DD.MM.YYYY"
                name="futureCommercialAccountingDate"
                allowClear={false}
                onChange={(date) => {
                  setFieldValue('futureCommercialAccountingDate', date);
                }}
                value={values.futureCommercialAccountingDate}
              />
              <Alert name="futureCommercialAccountingDate" />
            </Form.Item>
          </>
        ) : null}
      </StyledFormPage>
      <StyledFooter form right>
        <ButtonTT
          type="button"
          color="white"
          onClick={handlePrevious}
          style={{
            position: 'absolute',
            left: 0,
          }}
        >
          Назад
        </ButtonTT>
        <ButtonTT color="blue" big type="submit" disabled={values.hasErrors}>
          Далее
        </ButtonTT>

        <ButtonTT
          type="button"
          color="white"
          onClick={handleCancel}
          style={{ marginLeft: 16 }}
        >
          Отмена
        </ButtonTT>
      </StyledFooter>
    </form>
  );
};

export default AddNodeSecondTab;
