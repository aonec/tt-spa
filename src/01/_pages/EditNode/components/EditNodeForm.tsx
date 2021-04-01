import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Form } from 'antd';
import { useFormik } from 'formik';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';
import { editNodeValidationSchema } from './validationSchemas';
// import RelatedDevices from './RelatedDevices';
import Connection from './Connection';
import {
  InputTT,
  SelectTT,
  DatePickerTT,
  ButtonTT,
  Title,
  StyledFooter,
} from '../../../tt-components';
import {
  items,
  nodeStatusList,
  resources,
  serviceZoneList,
} from '../../../tt-components/localBases';
import { putCalculator, putNode } from './apiEditNode';
import isDateNull from '../../../utils/isDateNull';
import { returnNullIfEmptyString } from '../../../utils/returnNullIfEmptyString';
import { handleTabsBeforeFormSubmit } from '../../../utils/handleTabsBeforeFormSubmit';
import { CalculatorResponse, NodeResponse } from '../../../../myApi';
import RelatedDevices from './RelatedDevices';

interface EditNodeFormInterface {
  calculator: CalculatorResponse;
  currentTabKey: string;
  setTab: any;
  setAlertVisible: Dispatch<SetStateAction<boolean>>;
  setExistCalculator: Dispatch<SetStateAction<boolean>>;
  node: NodeResponse;
}

const EditNodeForm = ({
  calculator,
  currentTabKey,
  setTab,
  setAlertVisible,
  setExistCalculator,
  node,
}: EditNodeFormInterface) => {
  const [validationSchema, setValidationSchema] = useState(
    editNodeValidationSchema
  );

  const {
    resource,
    number,
    serviceZone,
    nodeStatus,
    lastCommercialAccountingDate,
    futureCommercialAccountingDate,
    id: nodeId,
    calculatorId,
  } = node;

  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues: {
      resource,
      number,
      serviceZone,
      nodeStatus,
      lastCommercialAccountingDate: isDateNull(lastCommercialAccountingDate),
      futureCommercialAccountingDate: isDateNull(
        futureCommercialAccountingDate
      ),
    },
    validationSchema,
    onSubmit: async () => {
      const nodeForm = {
        number: Number(values.number),
        nodeStatus: values.nodeStatus,
        resource: values.resource,
        serviceZone: values.serviceZone,
        lastCommercialAccountingDate: values.lastCommercialAccountingDate?.toISOString(),
        futureCommercialAccountingDate: values.futureCommercialAccountingDate?.toISOString(),
        calculatorId,
      };

      console.log('nodeForm', nodeForm);
      // putNode(nodeId, nodeForm).then((res) => {
      //   console.log('putNode', res);
      // });
    },
  });

  const tabErrors = [
    {
      key: '1',
      value: [
        'number',
        'lastCommercialAccountingDate',
        'futureCommercialAccountingDate',
      ],
    },
  ];

  function handleSubmitForm(e: any) {
    e.preventDefault();
    const { hasError, errorTab } = handleTabsBeforeFormSubmit(
      tabErrors,
      errors
    );
    console.log(errors);
    if (hasError === true) {
      setTab(errorTab);
    } else {
      handleSubmit();
    }
  }
  interface AlertInterface {
    name: string;
  }
  const Alert = ({ name }: AlertInterface) => {
    const touch = _.get(touched, `${name}`);
    const error = _.get(errors, `${name}`);
    if (touch && error) {
      return <div>{error}</div>;
    }
    return null;
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <div hidden={Number(currentTabKey) !== 1} style={{ maxWidth: 480 }}>
        <Form.Item label="Тип ресурса">
          <SelectTT
            placeholder="Выберите Тип ресурса"
            options={resources}
            value={values.resource}
            onChange={(event) => {
              setFieldValue('resource', event);
            }}
            onBlur={handleBlur}
            disabled
          />
          <Alert name="resource" />
        </Form.Item>

        <Form.Item label="Номер узла">
          <InputTT
            name="number"
            value={values.number}
            onBlur={handleBlur}
            placeholder="Номер узла"
            onChange={handleChange}
          />
          <Alert name="number" />
        </Form.Item>

        <Form.Item label="Зона">
          <SelectTT
            placeholder="Зона"
            options={serviceZoneList}
            value={values.serviceZone}
            onChange={(event) => {
              setFieldValue('serviceZone', event);
            }}
            onBlur={handleBlur}
          />
          <Alert name="serviceZone" />
        </Form.Item>

        <Form.Item label="Коммерческий учет показателей приборов">
          <SelectTT
            placeholder="Коммерческий учет показателей приборов"
            options={nodeStatusList}
            value={values.nodeStatus}
            onChange={(event, target) => {
              setFieldValue('nodeStatus', event);
            }}
            onBlur={handleBlur}
          />
          <Alert name="nodeStatus" />
        </Form.Item>

        {values.nodeStatus === 'Registered' ? (
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
                onBlur={handleBlur}
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
                onBlur={handleBlur}
                value={values.futureCommercialAccountingDate}
                name="futureCommercialAccountingDate"
              />
            </Form.Item>
          </>
        ) : null}
      </div>

      <div hidden={Number(currentTabKey) !== 2} style={{ maxWidth: 620 }}>
        <Connection calculator={calculator} />
      </div>

      <div hidden={Number(currentTabKey) !== 3} style={{ maxWidth: 620 }}>
        <RelatedDevices node={node} />
      </div>

      <div hidden={Number(currentTabKey) !== 4}>
        <Title size="16" color="black">
          Компонент в разработке
        </Title>
      </div>

      <StyledFooter form>
        <ButtonTT color="blue" style={{ marginRight: '16px' }} type="submit">
          Сохранить
        </ButtonTT>

        <NavLink to={`/nodes/${nodeId}`}>
          <ButtonTT color="white" type="button">
            Отмена
          </ButtonTT>
        </NavLink>
      </StyledFooter>
    </form>
  );
};

export default EditNodeForm;
