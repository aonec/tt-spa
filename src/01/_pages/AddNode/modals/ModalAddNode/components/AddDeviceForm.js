import React, {
  useContext, useEffect, useState,
} from 'react';
import { Form } from 'antd';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import {
  magistrals, housingMeteringDeviceTypes, isConnected,
} from '../../../../../tt-components/localBases';
import {
  Title, SelectTT, InputTT, DatePickerTT, StyledModalBody, ButtonTT, StyledFooter, Icon, Warning,
} from '../../../../../tt-components';
import { styles, StyledFormPage } from './styledComponents';
import { handleTabsBeforeFormSubmit } from '../../../../../utils/handleTabsBeforeFormSubmit';
import { AddNodeContext } from '../../../index';
import { validationSchemaFlowMeter, validationSchemaTemperatureSensor } from './validationSchemas';
import RelatedDevices from "../../../components/RelatedDevices";

const AddDeviceForm = (props) => {
  const { handleCancel } = props;

  const {
    node,
    communicationPipes,
    setCommunicationPipes,
  } = useContext(AddNodeContext);

  console.log('node', node);

  const { resource, entryNumber, calculatorId } = node;

  const [currentTabKey, setTab] = useState('1');
  const [coldandthermo, setColdandthermo] = useState(false);
  const [disable, setDisable] = useState(false);
  const [validationSchema, setValidationSchema] = useState(Yup.object({}));

  const initialValues = {
    isConnected: isConnected[0].value,
    isAllowed: true,
    serialNumber: '',
    lastCheckingDate: moment().toISOString(),
    futureCheckingDate: moment().add(3, 'years').toISOString(),
    lastCommercialAccountingDate: moment().toISOString(),
    futureCommercialAccountingDate: moment().toISOString(),
    documentsIds: [],
    ipV4: '',
    deviceAddress: null,
    port: null,
    housingMeteringDeviceType: housingMeteringDeviceTypes[0].value,
    resource,
    model: '',
    diameter: null,
    calculatorId,
    entryNumber,
    hubNumber: null,
    pipeNumber: null,
    magistral: magistrals[0].value,
  };

  const {
    handleSubmit, handleChange, values, touched, errors,
    handleBlur, setFieldValue, setValues,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async () => {
      console.log('Создаем Узел');
    },
  });

  return (
    <form
      onSubmit={handleSubmit}
    >
      <StyledModalBody>

        <Title size="middle" color="black">
          Добавление нового узла
        </Title>

        <StyledFormPage>

            <h3>1. Общие данные </h3>
            <span></span>

        </StyledFormPage>

      </StyledModalBody>
      <StyledFooter>
        <ButtonTT
          color="blue"
          type="submit"
          style={{ marginLeft: '16px' }}
          big
        >
          Создать Узел
        </ButtonTT>
        <ButtonTT type="button" color="white" onClick={handleCancel} style={{ marginLeft: '16px' }}>
          Отмена
        </ButtonTT>
      </StyledFooter>
    </form>
  );
};

export default AddDeviceForm;

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
