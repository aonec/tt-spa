import React, {
  useContext, useEffect, useState,
} from 'react';
import { Form } from 'antd';
import moment from 'moment';
import { useFormik } from 'formik';
import _ from 'lodash';
import {
  resources, serviceZoneList, nodeStatusList,
} from '../../../tt-components/localBases';
import {
  Title, SelectTT, InputTT, DatePickerTT, ButtonTT, StyledFooter, styles, StyledFormPage
} from '../../../tt-components';
import { AddNodeContext } from '../index';
import { addNodeValidationSchema } from './validationSchemas';


const AddNodeFirstTab = () => {
  const {
    handleCancel, currentTabKey, setTab, handleChangeTab, handleNext, node, setNode, isEmpty,
  } = useContext(AddNodeContext);

  const [validationSchema, setValidationSchema] = useState(addNodeValidationSchema);
  const {
    handleSubmit, handleChange, values, touched, errors,
    handleBlur, setFieldValue, setValues,
  } = useFormik({
    initialValues: {
      resource: resources[0].value,
      number: 1,
      serviceZone: serviceZoneList[0].value,
      nodeStatus: nodeStatusList[0].value,
      lastCheckingDate: undefined,
      futureCheckingDate: undefined,
    },
    validationSchema,
    onSubmit: async () => {
      const form = {
        resource: values.resource,
        number: Number(values.number),
        serviceZone: values.serviceZone,
        nodeStatus: values.nodeStatus,
        lastCheckingDate: values.lastCheckingDate,
        futureCheckingDate: values.futureCheckingDate,
      };
      console.log('AddNodeFirstTab', form);
      setNode((prevState) => ({
        ...prevState,
        ...form,
      }));
      handleNext();
    },
  });

  useEffect(() => {
    setValues((prevValues) => ({
      ...prevValues,
      lastCheckingDate: moment().toISOString(),
      futureCheckingDate: moment().add(1, 'years').toISOString(),
    }));
  }, []);

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
          disabled={!isEmpty(errors)}
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
