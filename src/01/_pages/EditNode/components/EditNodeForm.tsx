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
  $chosenInput,
  $derivedChosenInput,
  $requestServiceZonesStatus,
  $serviceZones,
  setChosenInput,
} from '../../../features/serviceZones/selectServiceZones/models';
import { useStore } from 'effector-react';
import styled from 'styled-components';
import { Loader } from '../../../components/Loader';
import { DragAndDrop } from '01/shared/ui/DragAndDrop';
import { useUpload } from '01/components/Upload';
import { FilesList } from '01/shared/ui/FilesList';
import { FilesUpload } from './FilesUpload';

interface EditNodeFormInterface {
  // calculator: CalculatorResponse;
  currentTabKey: string;
  setTab: any;
  setAlertVisible: Dispatch<SetStateAction<boolean>>;
  setExistCalculator: Dispatch<SetStateAction<boolean>>;
  node: NodeResponse;
  setDeregisterDeviceValue: any;
  setDeregisterDevice: Dispatch<SetStateAction<boolean>>;
}

const EditNodeForm = ({
  // calculator,
  currentTabKey,
  node,
  setDeregisterDevice,
  setDeregisterDeviceValue,
}: EditNodeFormInterface) => {
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
  const { setVisibleAddDevice } = useContext(EditNodeContext);
  const serviceZones = useStore($serviceZones);
  const zonesLoadingStatus = useStore($requestServiceZonesStatus);
  const isRequestServiceZonesError = zonesLoadingStatus === 'error';
  const chosenInputForSelect = useStore($derivedChosenInput);

  if (!node) {
    return null;
  }
  const nodeServiceZoneId = nodeServiceZone?.id;
  const selectZonesOptions = serviceZones.map((zone) => ({
    value: zone.id,
    label: zone.name,
  }));

  if (nodeServiceZoneId && !chosenInputForSelect) {
    setChosenInput(nodeServiceZoneId);
  }

  const initialServiceZoneInfo = selectZonesOptions.find(
    (el) => el.value === nodeServiceZoneId
  );
  const { label: initialServiceZoneLabel } = initialServiceZoneInfo || {};

  const [form] = Form.useForm();
  const { getFieldValue } = form;

  const onFinish = async () => {
    const nodeForm: UpdateNodeRequest = {
      number: Number(getFieldValue('number')),
      nodeStatus: getFieldValue('nodeStatus'),
      resource: getFieldValue('resource'),
      nodeServiceZoneId: chosenInputForSelect?.value,
      lastCommercialAccountingDate: getFieldValue(
        'lastCommercialAccountingDate'
      )?.toISOString(),
      futureCommercialAccountingDate: getFieldValue(
        'futureCommercialAccountingDate'
      )?.toISOString(),
      calculatorId,
    };

    await putNode(nodeId, nodeForm);
  };

  if (zonesLoadingStatus === 'loading' || zonesLoadingStatus === 'init')
    return <Loader show />;

  const initialValues = {
    resource: resource,
    number: number,
    serviceZone: initialServiceZoneLabel,
    nodeStatus: nodeStatus.value,
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
        form={form}
        requiredMark={false}
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
            style={styles.w100}
            label="Номер узла"
            name="number"
            rules={[{ required: true, message: 'Выберите Номер узла' }]}
          >
            <InputTT placeholder="Номер узла" />
          </Form.Item>

          <Zone>
            <label
              htmlFor="serviceZone"
              style={{ color: 'var(--main-70)', fontWeight: 500 }}
            >
              Зона:
            </label>
            <ZoneInner>
              <SelectTT
                id="serviceZone"
                style={styles.w49}
                onChange={(chosenInputId) => {
                  setChosenInput(+chosenInputId);
                }}
                placeholder="Зона"
                options={selectZonesOptions}
                value={chosenInputForSelect?.value}
              />
              <AddZoneText onClick={() => addServiceZoneButtonClicked()}>
                + Добавить новую зону
              </AddZoneText>
            </ZoneInner>
          </Zone>

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
            <FilesUpload />
          </>
        </StyledFormPage>

        <StyledFormPage hidden={Number(currentTabKey) !== 2}>
          {/*<NodeConnection*/}
          {/*  // calculator={calculator}*/}
          {/*  edit={true}*/}
          {/*  setDeregisterDeviceValue={setDeregisterDeviceValue}*/}
          {/*  setDeregisterDevice={setDeregisterDevice}*/}
          {/*/>*/}
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

const Zone = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ZoneInner = styled.div`
  display: flex;
  margin: 8px 0;
`;

const AddZoneText = styled.div`
  display: flex;
  align-items: center;
  color: var(--primary-100);
  height: 48px;
  margin-left: 16px;
  cursor: pointer;
  font-weight: 500;
`;

export default EditNodeForm;
