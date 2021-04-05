import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { Form } from 'antd';
import { NavLink } from 'react-router-dom';
import { editNodeValidationSchema } from './validationSchemas';
import {
  InputTT,
  SelectTT,
  DatePickerTT,
  ButtonTT,
  Title,
  StyledFooter,
  IconTT,
  styles,
  StyledFormPage,
} from '../../../tt-components';
import {
  nodeStatusList,
  resources,
  serviceZoneList,
} from '../../../tt-components/localBases';
import { handleTabsBeforeFormSubmit } from '../../../utils/handleTabsBeforeFormSubmit';
import {
  CalculatorResponse,
  NodeResponse,
  UpdateNodeRequest,
} from '../../../../myApi';
import NodeRelatedDevices from '../../../tt-components/NodeRelatedDevices';
import NodeConnection from '../../../tt-components/NodeConnection';
import moment from 'moment';
import { putNode } from './apiEditNode';
import { EditNodeContext } from '../Context';

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
  setTab,
  setAlertVisible,
  setExistCalculator,
  node,
  setDeregisterDevice,
  setDeregisterDeviceValue,
}: EditNodeFormInterface) => {
  const [validationSchema, setValidationSchema] = useState(
    editNodeValidationSchema
  );

  const { visibleAddDevice, setVisibleAddDevice } = useContext(EditNodeContext);

  if (!node) {
    return null;
  }

  console.log('node', node);
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

  // const tabErrors = [
  //   {
  //     key: '1',
  //     value: [
  //       'number',
  //       'lastCommercialAccountingDate',
  //       'futureCommercialAccountingDate',
  //     ],
  //   },
  // ];

  // function handleSubmitForm(e: any) {
  //   e.preventDefault();
  //   const { hasError, errorTab } = handleTabsBeforeFormSubmit(
  //     tabErrors,
  //     errors
  //   );
  //   console.log(errors);
  //   if (hasError) {
  //     setTab(errorTab);
  //   } else {
  //     handleSubmit();
  //   }
  // }

  const [form] = Form.useForm();
  const {
    setFieldsValue,
    getFieldsValue,
    getFieldValue,
    validateFields,
    getFieldsError,
  } = form;

  const onFinish = () => {
    console.log('onFinish');

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
    // console.log('nodeForm', nodeForm);

    putNode(nodeId, nodeForm).then((res) => {
      console.log('putNode', res);
    });
  };
  const onFinishFailed = () => {
    console.log('onFinishFailed');
  };

  const initialValues = {
    resource: resource,
    number: number,
    serviceZone: serviceZone,
    nodeStatus: nodeStatus,
    lastCommercialAccountingDate: lastCommercialAccountingDate
      ? moment(lastCommercialAccountingDate)
      : null,
    futureCommercialAccountingDate: futureCommercialAccountingDate
      ? moment(futureCommercialAccountingDate)
      : null,
  };

  return (
    <Form
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      form={form}
      requiredMark={false}
      onFieldsChange={(_, allFields) => {
        // onChange(allFields);
      }}
      // onValuesChange={onFormLayoutChange}
      scrollToFirstError
    >
      <StyledFormPage
        hidden={Number(currentTabKey) !== 1}
        style={{ maxWidth: 960 }}
      >
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

        <Form.Item
          style={styles.w100}
          label="Зона"
          name="serviceZone"
          rules={[{ required: true, message: 'Выберите Зона' }]}
        >
          <SelectTT placeholder="Зона" options={serviceZoneList} />
        </Form.Item>

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

        {/*{getFieldValue('nodeStatus') === 'Registered' ? (*/}
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
        {/*) : null}*/}
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
    </Form>
  );
};

export default EditNodeForm;
