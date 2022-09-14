import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  Title,
  ButtonTT,
  StyledFooter,
  styles,
  StyledFormPage,
} from '../../../tt-components';
import RelatedDevices from './RelatedDevices';
import ModalAddDevice from '../modals/ModalAddDevice';
import ModalAddNode from '../modals/ModalAddNode';
import { AddNodeContext } from '../AddNodeContext';

const AddNodeThirdTab = () => {
  const {
    handleCancel,
    currentTabKey,
    setAddOdpu,
    communicationPipes,
    node,
    setAddNode,
    setNode,
  } = useContext(AddNodeContext);

  const [validationSchema, setValidationSchema] = useState(Yup.object({}));

  const {
    handleSubmit,
    values,
    setFieldValue,
  } = useFormik({
    initialValues: {
      communicationPipes: [],
    },
    validationSchema,

    onSubmit: async () => {
      const form = {
        communicationPipes: values.communicationPipes,
      };
      const nodeForm = { ...node, ...form };
      setNode(nodeForm);
      setAddNode(true);
    },
  });

  useEffect(() => {
    setFieldValue('communicationPipes', communicationPipes);
  }, [communicationPipes]);

  function handleShowAddDevice() {
    setAddOdpu(true);
  }

  return (
    <div hidden={Number(currentTabKey) !== 3}>
      <StyledFormPage>
        <Title color="black" style={styles.w100}>
          Подключенные приборы
        </Title>
        <div style={styles.w100}>
          <RelatedDevices />
        </div>
        <ButtonTT
          style={{ marginTop: '24px' }}
          color="white"
          onClick={handleShowAddDevice}
        >
          + Добавить прибор
        </ButtonTT>
      </StyledFormPage>
      <StyledFooter form={true}>
        <ButtonTT color="blue" big onClick={handleSubmit}>
          Создать Узел
        </ButtonTT>
        <ButtonTT
          color="white"
          onClick={handleCancel}
          style={{ marginLeft: 16 }}
        >
          Назад
        </ButtonTT>
      </StyledFooter>
      <ModalAddDevice />
      <ModalAddNode />
    </div>
  );
};

export default AddNodeThirdTab;
