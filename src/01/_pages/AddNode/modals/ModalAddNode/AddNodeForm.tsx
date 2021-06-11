import React, { useContext, useState } from 'react';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import styled from 'styled-components';
import {
  nodeStatusList,
  resources,
} from '../../../../tt-components/localBases';
import {
  IconTT,
  StyledModalBody,
  ButtonTT,
  StyledFooter,
} from '../../../../tt-components';

import { useHistory } from 'react-router-dom';
import { AddNodeContext } from '../../AddNodeContext';
import { addNode } from '../../../../_api/apiRequests';
import Title from '../../../../tt-components/Title';
import { useStore } from 'effector-react';
import { $serviceZones } from '../../../../features/serviceZones/selectServiceZones/models';

const AddNodeForm = (props: any) => {
  const history = useHistory();
  const { handleCancel } = props;

  const {
    node,
    housingStockId,
    calculators,
    communicationPipes,
    housingStock,
  } = useContext(AddNodeContext);

  const serviceZones = useStore($serviceZones);

  const { id, city, street, number: houseNumber, corpus } = housingStock;

  const {
    calculatorId,
    entryNumber,
    futureCheckingDate,
    lastCheckingDate,
    nodeStatus,
    number,
    resource,
    nodeServiceZoneId,
  } = node;

  const calculator = _.find(calculators, { id: calculatorId });

  const { serialNumber, model, closingDate } = calculator || {};

  const getServiceZone =
    _.find(serviceZones, { id: nodeServiceZoneId })?.name ??
    'Зона не определена';
  const getNodeStatus =
    _.find(nodeStatusList, { value: nodeStatus })?.label ??
    'Статус не определен';
  const getNodeResource =
    _.find(resources, { value: resource })?.label ?? 'Ресурс не определен';
  const devicesList = _.flatten(
    communicationPipes.map((communicationPipe: any) => {
      const { devices } = communicationPipe;
      return devices.map((device: any) => device);
    })
  );

  console.log('node', node);

  const [validationSchema, setValidationSchema] = useState(Yup.object({}));

  const initialValues = { communicationPipes };

  const { handleSubmit, values } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async () => {
      console.log('Создаем Узел');
      const form = {
        communicationPipes: values.communicationPipes,
      };

      // если в форме есть calculator (id), то отправляем так как есть
      // если его нет, то добавляем в форму housingStockId
      const addNodeForm = {
        ...node,
        communicationPipes,
        housingStockId: +housingStockId,
      };

      addNode(addNodeForm).then((res) => {
        console.log('addNodeFormResponseFromServer', res);
        history.push(`/objects/${housingStockId}`);
      });
    },
  });

  const FirstBlock = () => (
    <Block>
      <BlockTitle>1. Общие данные </BlockTitle>
      <ul>
        <List>
          <Info>Адрес</Info>
          <Description>{`${city}, ${street}, ${houseNumber} ${
            corpus ? ',' + corpus : ''
          }`}</Description>
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
          {calculator ? (
            <CalculatorInfo>
              <IconTT icon="device" />
              <DeviceModel>{model}</DeviceModel>{' '}
              <DeviceSerial>({serialNumber})</DeviceSerial>
            </CalculatorInfo>
          ) : null}
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
        {devicesList.map((device: any) => {
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
