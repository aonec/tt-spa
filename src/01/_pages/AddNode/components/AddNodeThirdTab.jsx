import React, {
  useContext, useEffect, useState,
} from 'react';

import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import styled from 'styled-components';
import {
  resources, serviceZoneList, nodeStatusList,
} from '../../../tt-components/localBases';
import {
  Title, ButtonTT, StyledFooter,
} from '../../../tt-components';
import RelatedDevices from './RelatedDevices';
import { styles, StyledFormPage } from './styledComponents';
import { addNode } from '../apiAddNode';
import { AddNodeContext } from '../index';

const StyledHint = styled.div`
  color: rgba(39, 47, 90, 0.7)
`;

const AddNodeThirdTab = () => {
  const {
    handleCancel, currentTabKey, setTab, handleChangeTab, handleNext, addCalculator,
    setAddCalculator,
    addOdpu,
    setAddOdpu,
    communicationPipes,
    node,
  } = useContext(AddNodeContext);

  const [disable, setDisable] = useState(false);
  const [validationSchema, setValidationSchema] = useState(Yup.object({}));

  const {
    handleSubmit, handleChange, values, touched, errors,
    handleBlur, setFieldValue, setValues,
  } = useFormik({
    initialValues: {
      communicationPipes: [],
    },
    validationSchema,

    onSubmit: async () => {
      const form = {
        communicationPipes: values.communicationPipes,
      };
      console.log(form);

      const addNodeForm = { ...node, communicationPipes };
      console.log('addNodeForm', addNodeForm);
      addNode(addNodeForm).then((res)=>{
          console.log("addNodeFormResponseFromServer", res)
      })
    },
  });

  useEffect(() => {
    setFieldValue('communicationPipes', communicationPipes);
  }, [communicationPipes]);

  function handleShowAddDevice() {
    setAddOdpu(true);
  }

  const Alert = ({ name }) => {
    const touch = _.get(touched, `${name}`);
    const error = _.get(errors, `${name}`);
    if (touch && error) {
      return (
        <div>{error}</div>
      );
    }
    return null;
  };

  return (
    <form
      hidden={Number(currentTabKey) !== 3}
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
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
          type="button"
          onClick={handleShowAddDevice}
        >
          + Добавить прибор
        </ButtonTT>
      </StyledFormPage>
      <StyledFooter form>
        <ButtonTT
          color="blue"
          big
          type="submit"
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

export default AddNodeThirdTab;
