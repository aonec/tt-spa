import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { Form, Switch } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import {
  InputTT, SelectTT, DatePickerTT, Wrap, ButtonTT, Title, IconTT,
} from '../../../tt-components';
import {
  ipv4RegExp, items, nodeStatusList, resources, serviceZoneList,
} from '../../../tt-components/localBases';
import { EditNodeContext } from '../index';
import { putCalculator, putNode } from './apiEditNode';
import isDateNull from '../../../utils/isDateNull';
import { returnNullIfEmptyString } from '../../../utils/returnNullIfEmptyString';
import { handleTabsBeforeFormSubmit } from '../../../utils/handleTabsBeforeFormSubmit';

import { defaultValidationSchema } from './validationSchemas';
import { NodeContext } from "../../Node";
import styled from "styled-components";
import RelatedDevices from "./RelatedDevices";
import Connection from "./Connection";


const EditNodeForm = () => {
  const {
    calculator, currentTabKey, setTab, setAlertVisible, setExistCalculator, node,
  } = useContext(EditNodeContext);

  const [validationSchema, setValidationSchema] = useState(defaultValidationSchema);

  const {
    nodeResourceType,
    number,
    serviceZone,
    nodeStatus,
    lastCommercialAccountingDate,
    futureCommercialAccountingDate,
    id: nodeId,
    calculatorId,
  } = node;

  const {
    handleSubmit, handleChange, values, touched, errors,
    handleBlur, setFieldValue, setFieldError,
  } = useFormik({
    initialValues: {
      nodeResourceType,
      number,
      serviceZone,
      nodeStatus,
      lastCommercialAccountingDate: isDateNull(lastCommercialAccountingDate),
      futureCommercialAccountingDate: isDateNull(futureCommercialAccountingDate),
    },
    validationSchema,
    onSubmit: async () => {
      const nodeForm = {
        number: Number(values.number),
        nodeStatus: values.nodeStatus,
        nodeResourceType: values.nodeResourceType,
        serviceZone: values.serviceZone,
        lastCommercialAccountingDate: values.lastCommercialAccountingDate.toISOString(),
        futureCommercialAccountingDate: values.futureCommercialAccountingDate.toISOString(),
        calculatorId,
      };

      console.log('nodeForm', nodeForm);
      console.log(JSON.stringify(nodeForm));
      putNode(nodeId, nodeForm).then((res) => {
        console.log('putNode', res);
      });
    },
  });

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

  const tabErrors = [
    {
      key: '1',
      value: ['number',
        'nodeStatus',
        'nodeResourceType',
        'serviceZone',
        'lastCommercialAccountingDate',
        'futureCommercialAccountingDate'],
    },
    // {
    //   key: '2',
    //   value: ['ipV4', 'port', 'deviceAddress'],
    // },
  ];


  return (
    <form onSubmit={handleSubmit}>
      <div hidden={Number(currentTabKey) !== 1} style={{ maxWidth: 480 }}>
        <Form.Item label="Тип ресурса">
          <SelectTT
            placeholder="Выберите Тип ресурса"
            options={resources}
            value={values.nodeResourceType}
            onChange={(event) => {
              setFieldValue('nodeResourceType', event);
            }}
            disabled
          />
          <Alert name="nodeResourceType"/>
        </Form.Item>

        <Form.Item label="Номер узла">
          <InputTT
            name="number"
            value={values.number}
            onBlur={handleBlur}
            placeholder="Номер узла"
            onChange={handleChange}
          />
          <Alert name="number"/>
        </Form.Item>

        <Form.Item label="Зона">
          <SelectTT
            placeholder="Зона"
            options={serviceZoneList}
            value={values.serviceZone}
            onChange={(event) => {
              setFieldValue('serviceZone', event);
            }}
          />
          <Alert name="serviceZone"/>
        </Form.Item>

        <Form.Item label="Коммерческий учет показателей приборов">
          <SelectTT
            placeholder="Коммерческий учет показателей приборов"
            options={nodeStatusList}
            value={values.nodeStatus}
            onChange={(event, target) => {
              setFieldValue('nodeStatus', event);
            }}
          />
          <Alert name="nodeStatus"/>
        </Form.Item>

        {values.nodeStatus === 'Registered'
          ? (
            <>
              <Form.Item label="Дата начала действия акта-допуска">
                <DatePickerTT
                  format="DD.MM.YYYY"
                  name="lastCommercialAccountingDate"
                  allowClear={false}
                  placeholder="Укажите дату..."
                  onChange={(date) => {
                    setFieldValue('lastCommercialAccountingDate', date);
                  }}
                  value={values.lastCommercialAccountingDate}
                />
              </Form.Item>

              <Form.Item label="Дата окончания действия акта-допуска">
                <DatePickerTT
                  format="DD.MM.YYYY"
                  placeholder="Укажите дату..."
                  allowClear={false}
                  onChange={(date) => {
                    setFieldValue('futureCommercialAccountingDate', date);
                  }}
                  value={values.futureCommercialAccountingDate}
                  name="futureCommercialAccountingDate"
                />
              </Form.Item>
            </>
          )
          : null}

      </div>

      <div hidden={Number(currentTabKey) !== 2} style={{ maxWidth: 620 }}>
        <Connection />
      </div>

      <div hidden={Number(currentTabKey) !== 3} style={{ maxWidth: 620 }}>
        <RelatedDevices/>
      </div>

      <div hidden={Number(currentTabKey) !== 4}>
        <Title size="16" color="black">Компонент в разработке</Title>
      </div>

      <div style={{ padding: '32px 0' }}>
        <ButtonTT
          color="blue"
          style={{ marginRight: '16px' }}
          type="submit"
        >
          Сохранить
        </ButtonTT>

        <NavLink to={`/nodes/${nodeId}`}>
          <ButtonTT color="white" type="button">
            Отмена
          </ButtonTT>
        </NavLink>
      </div>

    </form>

  );
};

export default EditNodeForm;




export const Template = styled.div``;

export const NameWrap = styled.a`
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: center;

  &:hover {
    h3,
    p {
      color: var(--primary-100);
    }
  }
`;

export const Name = styled.h3`
  padding: 0;
  margin: 0;
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
`;

export const Serial = styled.p`
  padding: 0;
  margin: 0;
  color: rgba(39, 47, 90, 0.6);
`;

export const State = styled.div`
  display: flex;
  align-items: center;
  color: rgba(39, 47, 90, 0.8);
`;

export const ListWrap = styled.div`
  display: grid;
  height: min-content;
}
`;

export const ListItem = styled.div`
  display: grid;
  grid-template-columns: 5.5fr 2fr 1.5fr 1.5fr 1.5fr;
  grid-template-rows: 48px;
  align-items: center;
  border-bottom: 1px solid var(--frame);
  opacity: 0.8;
`;
export const Span = styled.span`
  color: rgba(39, 47, 90, 0.6);
`;