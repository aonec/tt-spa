import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'antd';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import styled from 'styled-components';
import {
  magistrals,
  housingMeteringDeviceTypes,
  isConnected,
  serviceZoneList,
  nodeStatusList,
  resources,
} from '../../../../../tt-components/localBases';
import {
  IconTT,
  Title,
  SelectTT,
  InputTT,
  DatePickerTT,
  StyledModalBody,
  ButtonTT,
  StyledFooter,
  Icon,
  Warning,
  styles,
  StyledFormPage,
} from '../../../../../tt-components';

import { ListItem, ListWrap } from '../../../../../tt-components/List';
import { addNodeFinal } from '../../../apiAddNode';
import { Redirect, useHistory } from 'react-router-dom';
import { AddNodeContext } from '../../../AddNodeContext';

const AddNodeForm = (props) => {
  const history = useHistory();
  const { handleCancel } = props;

  const {
    currentTabKey,
    setTab,
    handleChangeTab,
    handleNext,
    node,
    setNode,
    housingStockId,
    calculators,
    calculatorsExtended,
    addCalculator,
    setAddCalculator,
    addOdpu,
    setAddOdpu,
    communicationPipes,
    setCommunicationPipes,
    housingStock,
    stepsArr,
    isEmpty,
    addNode,
    setAddNode,
  } = useContext(AddNodeContext);

  console.log('node', node);

  const {
    calculatorId,
    entryNumber,
    futureCheckingDate,
    isConnected,
    lastCheckingDate,
    nodeStatus,
    number,
    resource,
    serviceZone,
  } = node;

  const calculator = _.find(calculatorsExtended, { id: calculatorId });
  // console.log('calculator', calculator);

  const { serialNumber, model, closingDate } = calculator;

  const getServiceZone =
    _.find(serviceZoneList, { value: serviceZone })?.label ??
    'Зона не определена';
  const getNodeStatus =
    _.find(nodeStatusList, { value: nodeStatus })?.label ??
    'Статус не определен';
  const getNodeResource =
    _.find(resources, { value: resource })?.label ?? 'Ресурс не определен';
  const devicesList = _.flatten(
    communicationPipes.map((communicationPipe) => {
      const { devices } = communicationPipe;
      return devices.map((device) => device);
    })
  );

  console.log('node', node);

  const [validationSchema, setValidationSchema] = useState(Yup.object({}));

  const initialValues = { communicationPipes };

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
    initialValues,
    validationSchema,
    onSubmit: async () => {
      console.log('Создаем Узел');
      const form = {
        communicationPipes: values.communicationPipes,
      };
      console.log(form);
      const addNodeForm = { ...node, communicationPipes };
      console.log('addNodeForm', addNodeForm);
      console.log('addNodeForm', JSON.stringify(addNodeForm));
      console.log(history);

      addNodeFinal(addNodeForm).then((res) => {
        console.log('addNodeFormResponseFromServer', res);
        history.push(`/objects/${housingStockId}`);
        // setTimeout(handleCancel, 1000);
        // return <Redirect to={`/objects/${housingStockId}`} />
      });
    },
  });

  const FirstBlock = () => (
    <Block>
      <BlockTitle>1. Общие данные </BlockTitle>
      <ul>
        <List>
          <Info>Адрес</Info>
          <Description>Нижнекамск, ул. Мира, 36</Description>
        </List>
        <List>
          <Info>Тип ресурса</Info>
          <Description>{getNodeResource}</Description>
        </List>
        <List>
          <Info>Номер узла</Info>
          <Description>{number}</Description>
        </List>
        <List>
          <Info>Зона</Info>
          <Description>{getServiceZone}</Description>
        </List>
        <List>
          <Info>Коммерческий учет показателей приборов</Info>
          <Description>{getNodeStatus}</Description>
        </List>
        <List>
          <Info>Даты действия акта-допуска</Info>
          <Description>
            {moment(lastCheckingDate).format('DD.MM.YYYY')} -{' '}
            {moment(futureCheckingDate).format('DD.MM.YYYY')}
          </Description>
        </List>
      </ul>
    </Block>
  );

  const SecondBlock = () => (
    <Block>
      <BlockTitle>2. Настройки соединения </BlockTitle>
      <ul>
        <List style={{ alignItems: 'center' }}>
          <CalculatorInfo>
            <IconTT icon="device" />
            <DeviceModel>{model}</DeviceModel>{' '}
            <DeviceSerial>({serialNumber})</DeviceSerial>
          </CalculatorInfo>
          <DeviceDescription>
            <Description>
              {closingDate ? (
                <Div>
                  <IconTT icon="red" />
                  <span>Не активен</span>
                </Div>
              ) : (
                <Div>
                  <IconTT icon="green" />
                  <span>Активен</span>
                </Div>
              )}
            </Description>
            <Number>
              Ввод:
              {entryNumber}
            </Number>
          </DeviceDescription>
        </List>
      </ul>
    </Block>
  );

  const ThirdBlock = () => (
    <Block>
      <BlockTitle>3. Приборы</BlockTitle>
      <ul>
        {devicesList.map((device) => {
          const { closingDate, model, serialNumber, pipe } = device;
          const { pipeNumber } = pipe;
          return (
            <List style={{ alignItems: 'center' }}>
              <CalculatorInfo>
                <IconTT icon={resource.toLowerCase()} />
                <DeviceModel>{model}</DeviceModel>{' '}
                <DeviceSerial>({serialNumber})</DeviceSerial>
              </CalculatorInfo>
              <DeviceDescription>
                <Description>
                  {closingDate ? (
                    <Div>
                      <IconTT icon="red" />
                      <span>Не активен</span>
                    </Div>
                  ) : (
                    <Div>
                      <IconTT icon="green" />
                      <span>Активен</span>
                    </Div>
                  )}
                </Description>
                <Number>
                  Труба:
                  {pipeNumber}
                </Number>
              </DeviceDescription>
            </List>
          );
        })}
      </ul>
    </Block>
  );

  return (
    <form onSubmit={handleSubmit}>
      <StyledModalBody>
        <Title size="middle" color="black">
          Добавление нового узла
        </Title>

        <FirstBlock />
        <SecondBlock />

        <ThirdBlock />
      </StyledModalBody>
      <StyledFooter>
        <ButtonTT color="blue" type="submit" style={{ marginLeft: '16px' }} big>
          Создать Узел
        </ButtonTT>
        <ButtonTT
          type="button"
          color="white"
          onClick={handleCancel}
          style={{ marginLeft: '16px' }}
        >
          Отмена
        </ButtonTT>
      </StyledFooter>
    </form>
  );
};

export default AddNodeForm;

const List = styled.li`
  padding: 16px 4px;
  border-bottom: 1px solid #dcdee4;
  display: grid;
  grid-template-columns: 4fr 8fr;
`;
const Info = styled.div`
  padding: 0;
  margin: 0;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: rgba(39, 47, 90, 0.6);
`;
const Description = styled.p`
  padding: 0;
  margin: 0;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: rgba(39, 47, 90, 0.8);
`;
const Block = styled.div``;

const BlockTitle = styled.h3`
  padding: 0;
  margin: 0;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 32px;
`;

const CalculatorInfo = styled(Info)`
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: center;
  grid-column-gap: 8px;
`;
const DeviceModel = styled.h4`
  padding: 0;
  margin: 0;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
`;

const DeviceSerial = styled.p`
  padding: 0;
  margin: 0;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
`;

const Number = styled.div``;
const DeviceDescription = styled.div`
  display: grid;
  grid-template-columns: 4fr 8fr;
  align-items: center;
  grid-column-gap: 8px;
`;

// const form = {
//   serialNumber: values.serialNumber,
//   lastCheckingDate: values.lastCheckingDate,
//   futureCheckingDate: values.futureCheckingDate,
//   lastCommercialAccountingDate: values.lastCommercialAccountingDate,
//   futureCommercialAccountingDate: values.futureCommercialAccountingDate,
//   documentsIds: [],
//   housingMeteringDeviceType: values.housingMeteringDeviceType,
//   resource: values.resource,
//   model: values.model,
//   diameter: values.diameter,
//   pipe: {
//     calculatorId: values.calculatorId,
//     entryNumber: values.entryNumber,
//     hubNumber: values.hubNumber || null,
//     pipeNumber: values.pipeNumber,
//     magistral: values.magistral,
//   },
// };
