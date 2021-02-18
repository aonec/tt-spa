import React, {
    useContext, useEffect, useState,
} from 'react';
import {Form} from 'antd';
import moment from 'moment';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import styled from "styled-components";
import {
    magistrals, housingMeteringDeviceTypes, isConnected,
} from '../../../../../tt-components/localBases';
import {
    Title, SelectTT, InputTT, DatePickerTT, StyledModalBody, ButtonTT, StyledFooter, Icon, Warning,
} from '../../../../../tt-components';
import {styles, StyledFormPage} from './styledComponents';

import {AddNodeContext} from '../../../index';


const AddNodeForm = (props) => {
    const {handleCancel} = props;

    const {
        currentTabKey,
        setTab,
        handleChangeTab,
        handleNext,
        node,
        setNode,
        housingStockId,
        calculators,
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

    const {resource, entryNumber, calculatorId} = node;


    const [validationSchema, setValidationSchema] = useState(Yup.object({}));

    const initialValues = {

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

    const StyledList = styled.li`
      padding: 16px 4px;
      border-bottom: 1px solid #DCDEE4;
      display: grid;
      grid-template-columns: 4fr 8fr;
    `
    const StyledInfo = styled.h4`
      padding: 0;
      margin: 0;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      color: rgba(39, 47, 90, 0.6);
    `
    const StyledDescription = styled.p`
      padding: 0;
      margin: 0;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      color: rgba(39, 47, 90, 0.8);
    `

    return (
        <form
            onSubmit={handleSubmit}
        >
            <StyledModalBody>

                <Title size="middle" color="black">
                    Добавление нового узла
                </Title>




                    <div >
                        <h3>1. Общие данные </h3>
                        <ul>
                            <StyledList>
                                <StyledInfo>Адрес </StyledInfo>
                                <StyledDescription>Нижнекамск, ул. Мира, 36</StyledDescription>
                            </StyledList>
                            <StyledList>
                                <StyledInfo>Тип ресурса </StyledInfo>
                                <StyledDescription>Холодная вода</StyledDescription>
                            </StyledList>
                            <StyledList>
                                <StyledInfo>Номер узла</StyledInfo>
                                <StyledDescription>15</StyledDescription>
                            </StyledList>
                            <StyledList>
                                <StyledInfo>Зона</StyledInfo>
                                <StyledDescription>Апартаменты</StyledDescription>
                            </StyledList>
                            <StyledList>
                                <StyledInfo>Коммерческий учет показателей приборов</StyledInfo>
                                <StyledDescription>Приборы на коммерческом учете</StyledDescription>
                            </StyledList>
                            <StyledList>
                                <StyledInfo>Даты действия акта-допуска</StyledInfo>
                                <StyledDescription>16.01.2020 — 16.01.2024</StyledDescription>
                            </StyledList>
                        </ul>
                    </div>




            </StyledModalBody>
            <StyledFooter>
                <ButtonTT
                    color="blue"
                    type="submit"
                    style={{marginLeft: '16px'}}
                    big
                >
                    Создать Узел
                </ButtonTT>
                <ButtonTT type="button" color="white" onClick={handleCancel} style={{marginLeft: '16px'}}>
                    Отмена
                </ButtonTT>
            </StyledFooter>
        </form>
    );
};

export default AddNodeForm;

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
