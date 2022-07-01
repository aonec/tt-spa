import React, { useContext } from 'react';
import { Form } from 'antd';
import moment from 'moment';
import { useFormik } from 'formik';
import _ from 'lodash';
import { resources, nodeStatusList } from '../../../tt-components/localBases';
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
import { AddNodeContext } from '../AddNodeContext';
import { AlertInterface } from '../../../tt-components/interfaces';
import { nodeValidationSchema } from '../../../tt-components/validationSchemas';
import {
  $derivedChosenInput,
  $requestServiceZonesStatus,
  $serviceZones,
  PageGate,
  setChosenInput,
} from '../../../features/serviceZones/selectServiceZones/models';
import { addServiceZoneButtonClicked } from '../../../features/serviceZones/addServiceZone/models';
import AddNewZonesModal from '../../../features/serviceZones/addServiceZone';
import styled from 'styled-components';
import { useStore } from 'effector-react';

const AddNodeSecondTab = () => {
  const { handleCancel, currentTabKey, handleNext, setNode } = useContext(
    AddNodeContext
  );

  const serviceZones = useStore($serviceZones);
  const zonesLoadingStatus = useStore($requestServiceZonesStatus);
  const isRequestServiceZonesError = zonesLoadingStatus === 'error';
  const chosenInputForSelect = useStore($derivedChosenInput);

  const selectZonesOptions = serviceZones.map((zone) => ({
    value: zone.id,
    label: zone.name,
  }));

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
      resource: resources[0].value,
      number: 1,
      serviceZone: chosenInputForSelect?.value ?? selectZonesOptions[0]?.value,
      nodeStatus: nodeStatusList[0].value,
      lastCommercialAccountingDate: moment(),
      futureCommercialAccountingDate: moment().add(4, 'years'),
      disabledSecond: false,
    },
    validationSchema: nodeValidationSchema,
    onSubmit: async () => {

      const form = {
        resource: values.resource,
        number: Number(values.number),
        nodeServiceZoneId:
          chosenInputForSelect?.value ?? selectZonesOptions[0]?.value,
        nodeStatus: values.nodeStatus,
        lastCommercialAccountingDate: values.lastCommercialAccountingDate.toISOString(
          true
        ),
        futureCommercialAccountingDate: values.futureCommercialAccountingDate.toISOString(
          true
        ),
      };
      setNode((prevState: any) => ({
        ...prevState,
        ...form,
      }));
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
    <>
      <PageGate />
      <div hidden={Number(currentTabKey) !== 2}>
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
                value={
                  chosenInputForSelect?.value ?? selectZonesOptions[0]?.value
                }
              />
              <AddZoneText onClick={() => addServiceZoneButtonClicked()}>
                + Добавить новую зону
              </AddZoneText>
            </ZoneInner>
          </Zone>

          <AddNewZonesModal />

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
                    setFieldValue('futureCommercialAccountingDate', moment(date).add(4, 'years'));
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
        <StyledFooter form>
          <ButtonTT color="blue" big onClick={handleSubmit}>
            Далее
          </ButtonTT>

          <ButtonTT
            type="button"
            color="white"
            onClick={handleCancel}
            style={{ marginLeft: 16 }}
          >
            Назад
          </ButtonTT>
        </StyledFooter>
      </div>
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

export default AddNodeSecondTab;
