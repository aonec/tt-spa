import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import styled from 'styled-components';

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
    calculatorForm,
    setCalculatorForm,
    nodeForm,
    setNodeForm,
    devicesForm,
    setDevicesForm,
    handlePrevious,
    addHousingVisible,
    setAddHousingVisible,
    communicationPipes,
    setNodeModalVisible,
  } = useContext(AddNodeContext);

  const [disable, setDisable] = useState(false);
  const [validationSchema, setValidationSchema] = useState(Yup.object({}));

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
    initialValues: {
      communicationPipes: [],
    },
    validationSchema,
    onSubmit: async () => {
      const form = values.communicationPipes;
      setDevicesForm(form);
      console.log('communicationPipes');
      setNodeModalVisible(true);
    },
  });

  useEffect(() => {
    setFieldValue('communicationPipes', communicationPipes);
  }, [communicationPipes]);

  return (
    <form
      hidden={Number(currentTabKey) !== 3}
      onSubmit={handleSubmit}
      id={'devicesForm'}
    >
      <StyledFormPage>
        <Title color="black" style={styles.w100}>
          Подключенные приборы
        </Title>
        <div style={styles.w100}>
          <RelatedDevices />
        </div>
        <ButtonTT
          style={{ marginTop: 24 }}
          color="white"
          type="button"
          onClick={() => {
            setAddHousingVisible(true);
          }}
        >
          + Добавить прибор
        </ButtonTT>
      </StyledFormPage>
      <StyledFooter form right>
        <div style={{ marginTop: 36 }}>
          <ButtonTT
            type="button"
            color="white"
            onClick={handlePrevious}
            style={{
              position: 'absolute',
              left: 0,
            }}
          >
            Назад
          </ButtonTT>
          <ButtonTT color="blue" big type="submit" form={'devicesForm'}>
            Создать Узел
          </ButtonTT>
          <ButtonTT
            type="button"
            color="white"
            onClick={handleCancel}
            style={{ marginLeft: 16 }}
          >
            Отмена
          </ButtonTT>
        </div>
      </StyledFooter>
      <ModalAddDevice />
      <ModalAddNode />
    </form>
  );
};

export default AddNodeThirdTab;
