import React, { Dispatch, SetStateAction, useContext } from 'react';
import { Alert, Form } from 'antd';
import { NavLink } from 'react-router-dom';
import {
  InputTT,
  SelectTT,
  DatePickerTT,
  ButtonTT,
  StyledFooter,
  IconTT,
  styles,
  StyledFormPage,
} from '../../../tt-components';
import { nodeStatusList, resources } from '../../../tt-components/localBases';
import {
  CalculatorResponse,
  NodeResponse,
  UpdateNodeRequest,
} from '../../../../myApi';
import NodeRelatedDevices from '../../../tt-components/NodeRelatedDevices';
import NodeConnection from '../../../tt-components/NodeConnection';
import moment from 'moment';
import { EditNodeContext } from '../Context';
import { putNode } from '../../../_api/apiRequests';
import Title from '../../../tt-components/Title';
import { addServiceZoneButtonClicked } from '../../../features/serviceZones/addServiceZone/models';
import AddNewZonesModal from '../../../features/serviceZones/addServiceZone';
import {
  $requestServiceZonesStatus,
  $serviceZones,
} from '../../../features/serviceZones/selectServiceZones/models';
import { useStore } from 'effector-react';
import styled from 'styled-components';

interface EditNodeFormInterface {
  calculator: CalculatorResponse;
  currentTabKey: string;
  setTab: any;
  setAlertVisible: Dispatch<SetStateAction<boolean>>;
  setExistCalculator: Dispatch<SetStateAction<boolean>>;
  node: NodeResponse;
  setDeregisterDeviceValue: any;
  setDeregisterDevice: Dispatch<SetStateAction<boolean>>;
}

const EditNodeForm = ({
  calculator,
  currentTabKey,
  node,
  setDeregisterDevice,
  setDeregisterDeviceValue,
}: EditNodeFormInterface) => {
  const { setVisibleAddDevice } = useContext(EditNodeContext);
  const serviceZones = useStore($serviceZones);
  const selectZonesOptions = serviceZones.map((zone) => ({
    value: zone.id,
    label: zone.name,
  }));
  const zonesLoadingStatus = useStore($requestServiceZonesStatus);
  const isRequestServiceZonesError = zonesLoadingStatus === 'error';

  if (!node) {
    return null;
  }

  const {
    resource,
    number,
    nodeServiceZone,
    nodeStatus,
    lastCommercialAccountingDate,
    futureCommercialAccountingDate,
    id: nodeId,
    calculatorId,
  } = node;

  const nodeServiceZoneId = nodeServiceZone.id;
  const initialServiceZoneInfo = selectZonesOptions.find(
    (el) => el.value === nodeServiceZoneId
  );
  const { label: initialServiceZoneLabel } = initialServiceZoneInfo || {};

  const [form] = Form.useForm();
  const { getFieldValue } = form;

  const onFinish = () => {
    const nodeForm: UpdateNodeRequest = {
      number: Number(getFieldValue('number')),
      nodeStatus: getFieldValue('nodeStatus'),
      resource: getFieldValue('resource'),
      serviceZone: getFieldValue('serviceZone'),
      lastCommercialAccountingDate: getFieldValue(
        'lastCommercialAccountingDate'
      )?.toISOString(),
      futureCommercialAccountingDate: getFieldValue(
        'futureCommercialAccountingDate'
      )?.toISOString(),
      calculatorId,
    };

    putNode(nodeId, nodeForm).then((res) => {
      console.log('putNode', res);
    });
  };
  const onFinishFailed = () => {
    console.log('onFinishFailed');
  };

  if (zonesLoadingStatus === 'loading' || zonesLoadingStatus === 'init')
    return <div>ЗАГРУЗКА...</div>;

  const initialValues = {
    resource: resource,
    number: number,
    serviceZone: initialServiceZoneLabel,
    nodeStatus: nodeStatus,
    lastCommercialAccountingDate: lastCommercialAccountingDate
      ? moment(lastCommercialAccountingDate)
      : null,
    futureCommercialAccountingDate: futureCommercialAccountingDate
      ? moment(futureCommercialAccountingDate)
      : null,
  };

  return (
    <>
      {isRequestServiceZonesError ? (
        <Alert
          message="Ошибка"
          description="Не удалось загрузить зоны обслуживания. Пожалуйста, обновите страницу или повторите попытку позже"
          type="error"
          showIcon
          closable
          style={{ marginBottom: 24 }}
        />
      ) : null}

      <Form
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
        requiredMark={false}
        onFieldsChange={(_, allFields) => {
          // onChange(allFields);
        }}
        scrollToFirstError
      >
        <StyledFormPage hidden={Number(currentTabKey) !== 1}>
          <Form.Item
            style={styles.w100}
            label="Тип ресурса"
            name={'resource'}
            rules={[{ required: true, message: 'Выберите Тип ресурса' }]}
          >
            <SelectTT
              placeholder="Выберите Тип ресурса"
              options={resources}
              disabled
            />
          </Form.Item>

          <Form.Item
            style={styles.w49}
            label="Номер узла"
            name="number"
            rules={[{ required: true, message: 'Выберите Номер узла' }]}
          >
            <InputTT placeholder="Номер узла" />
          </Form.Item>

          <ZoneWrapper>
            <Form.Item
              style={styles.w49}
              label="Зона"
              name="serviceZone"
              rules={[{ required: true, message: 'Выберите Зону' }]}
            >
              <SelectTT placeholder="Зона" options={selectZonesOptions} />
              {/*<SelectTT placeholder="Зона" options={[]} />*/}
            </Form.Item>
            <AddZoneText onClick={() => addServiceZoneButtonClicked()}>
              + Добавить новую зону
            </AddZoneText>
          </ZoneWrapper>

          <AddNewZonesModal />

          <Form.Item
            style={styles.w100}
            label="Коммерческий учет показателей приборов"
            name="nodeStatus"
            rules={[{ required: true, message: 'Выберите Коммерческий учет' }]}
          >
            <SelectTT
              placeholder="Коммерческий учет показателей приборов"
              options={nodeStatusList}
            />
          </Form.Item>

          <>
            <Form.Item
              style={styles.w100}
              label="Дата начала действия акта-допуска"
              name="lastCommercialAccountingDate"
              rules={[
                {
                  required: true,
                  message: 'Выберите Дата начала действия акта-допуска',
                },
              ]}
            >
              <DatePickerTT
                format="DD.MM.YYYY"
                placeholder="Укажите дату..."
                allowClear={false}
              />
            </Form.Item>

            <Form.Item
              style={styles.w100}
              label="Дата окончания действия акта-допуска"
              name="futureCommercialAccountingDate"
              rules={[
                {
                  required: true,
                  message: 'Выберите Дата окончания действия акта-допуска',
                },
              ]}
            >
              <DatePickerTT
                format="DD.MM.YYYY"
                placeholder="Укажите дату..."
                allowClear={false}
              />
            </Form.Item>
          </>
        </StyledFormPage>

        <StyledFormPage hidden={Number(currentTabKey) !== 2}>
          <NodeConnection
            calculator={calculator}
            edit={true}
            setDeregisterDeviceValue={setDeregisterDeviceValue}
            setDeregisterDevice={setDeregisterDevice}
          />
        </StyledFormPage>

        <StyledFormPage hidden={Number(currentTabKey) !== 3}>
          <div style={styles.w100}>
            <NodeRelatedDevices
              node={node}
              edit={true}
              close={false}
              setDeregisterDeviceValue={setDeregisterDeviceValue}
              setDeregisterDevice={setDeregisterDevice}
            />
          </div>

          <ButtonTT
            type="button"
            color="white"
            small
            onClick={() => {
              if (setVisibleAddDevice) {
                setVisibleAddDevice(true);
              }
            }}
            style={{ marginTop: 24 }}
          >
            Подключить прибор
            <IconTT icon="plus" />
          </ButtonTT>
        </StyledFormPage>

        <StyledFormPage hidden={Number(currentTabKey) !== 4}>
          <Title size="16" color="black">
            Компонент в разработке
          </Title>
        </StyledFormPage>

        <StyledFooter form right>
          <NavLink to={`/nodes/${nodeId}`}>
            <ButtonTT
              color="white"
              type="button"
              style={{ marginRight: '16px' }}
            >
              Отмена
            </ButtonTT>
          </NavLink>
          <ButtonTT
            color="blue"
            type="submit"
            disabled={isRequestServiceZonesError}
          >
            Сохранить
          </ButtonTT>
        </StyledFooter>
      </Form>
    </>
  );
};

const ZoneWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const AddZoneText = styled.div`
  color: var(--primary-100);
  height: 48px;
  margin-left: 16px;
  cursor: pointer;
  font-weight: 500;
`;

export default EditNodeForm;
