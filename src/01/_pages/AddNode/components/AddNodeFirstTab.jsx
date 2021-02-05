import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { Form } from 'antd';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import styled from 'styled-components';
import {
  resources, magistrals, housingMeteringDeviceTypes, isConnected, ipv4RegExp, serviceZoneList, nodeStatusList,
} from '../../../tt-components/localBases';
import {
  Title, SelectTT, InputTT, DatePickerTT, StyledModalBody, ButtonTT, StyledFooter, Icon, Warning, StyledModalHeader,
} from '../../../tt-components';
import TabsComponent from './Tabs';
import RelatedDevices from './RelatedDevices';
import { styles, StyledFormPage } from './styledComponents';
import { addNode } from '../apiAddNode';
import { AddNodeContext } from '../index';

const AddNodeFirstTab = (props) => {
  const {
    handleCancel, currentTabKey, setTab, handleChangeTab, handleNext, node, setNode
  } = useContext(AddNodeContext);
  const {
    setAddCalculator,
    currentCalculatorId,
    devices,
    setResource,
    communicationPipes,
  } = props;
  const [disable, setDisable] = useState(false);
  const [validationSchema, setValidationSchema] = useState(Yup.object({}));

  const {
    handleSubmit, handleChange, values, touched, errors,
    handleBlur, setFieldValue, setValues,
  } = useFormik({
    initialValues: {
      resource: resources[0].value,
      number: 1,
      serviceZone: serviceZoneList[0].value,
      nodeStatus: nodeStatusList[0].value,
      lastCheckingDate: moment().toISOString(),
      futureCheckingDate: moment().add(1, 'years').toISOString(),
    },
    validationSchema,
    onSubmit: async () => {
      const form = {
        resource: values.resource,
        number: values.number,
        serviceZone: values.serviceZone,
        nodeStatus: values.nodeStatus,
        lastCommercialAccountingDate: values.lastCommercialAccountingDate,
        futureCommercialAccountingDate: values.futureCommercialAccountingDate,
      };
      console.log('AddNodeFirstTab', form);
      setNode(prevState => ({
        ...prevState,
        ...form
      }));
    },
  });

  useEffect(() => {
    setFieldValue('calculatorId', currentCalculatorId);
  }, [currentCalculatorId]);

  useEffect(() => {
    setFieldValue('devices', devices);
  }, [devices]);

  const Alert = ({ name }) => {
    const touch = _.get(touched, `${name}`);
    const error = _.get(errors, `${name}`);
    if (touch && error) {
      return (
        <div>{error}</div>
      );
    }
    return null;
  };

  return (
    <form
      hidden={Number(currentTabKey) !== 1}
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <StyledFormPage>
        <Title color="black" style={styles.w100}>Общие данные</Title>
        <Form.Item label="Тип ресурса" style={styles.w49}>
          <SelectTT
            name="resource"
            onChange={(value) => {
              setFieldValue('resource', value);
              setResource(value);
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

        <Form.Item label="Коммерческий учет показателей приборов" style={styles.w100}>
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
            <Form.Item label="Дата начала Акта действия допуска" style={styles.w49}>
              <DatePickerTT
                format="DD.MM.YYYY"
                name="lastCommercialAccountingDate"
                placeholder="Укажите дату..."
                allowClear={false}
                onChange={(date) => {
                  setFieldValue('lastCommercialAccountingDate', date.toISOString());
                }}
                value={moment(values.lastCommercialAccountingDate)}
              />
              <Alert name="lastCommercialAccountingDate" />
            </Form.Item>

            <Form.Item label="Дата окончания Акта действия допуска" style={styles.w49}>
              <DatePickerTT
                format="DD.MM.YYYY"
                name="futureCommercialAccountingDate"
                placeholder="Укажите дату..."
                allowClear={false}
                onChange={(date) => {
                  setFieldValue('futureCommercialAccountingDate', date.toISOString());
                }}
                value={moment(values.futureCommercialAccountingDate)}
              />
              <Alert name="futureCommercialAccountingDate" />
            </Form.Item>
          </>
        ) : null}
      </StyledFormPage>
      <StyledFooter form>
        <ButtonTT
          color="blue"
          big
          type="submit"
        >
          Далее
        </ButtonTT>
        <ButtonTT type="button" color="white" onClick={handleCancel} style={{ marginLeft: '16px' }}>
          Отмена
        </ButtonTT>
      </StyledFooter>
    </form>
  );
};

export default AddNodeFirstTab;
