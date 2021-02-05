import React, {
    useContext, useEffect, useState,
} from 'react';
import {Form} from 'antd';
import moment from 'moment';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';

import {
    resources, isConnected, serviceZoneList, nodeStatusList,
} from '../../../tt-components/localBases';
import {
    Title, SelectTT, ButtonTT, StyledFooter,
} from '../../../tt-components';
import {styles, StyledFormPage} from './styledComponents';
import {AddNodeContext} from '../index';

const AddNodeSecondTab = () => {
    const {
        handleCancel,
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
        housingStock
    } = useContext(AddNodeContext);


    const [disable, setDisable] = useState(false);
    const [validationSchema, setValidationSchema] = useState(Yup.object({}));

    const {
        handleSubmit, handleChange, values, touched, errors,
        handleBlur, setFieldValue, setValues,
    } = useFormik({
        initialValues: {
            isConnected: true,
            calculatorId: null,
            entryNumber: null,
        },
        validationSchema,

        onSubmit: async () => {
            const form = {
                isConnected: values.isConnected,
                entryNumber: values.entryNumber,
                calculatorId: values.calculatorId,
            };
            console.log(form);

            setNode((prevState) => ({
                ...prevState,
                ...form
            }));
            setTab('3')
        },
    });


    useEffect(() => {
        setFieldValue('devices', communicationPipes);
    }, [communicationPipes]);

    const Alert = ({name}) => {
        const touch = _.get(touched, `${name}`);
        const error = _.get(errors, `${name}`);
        if (touch && error) {
            return (
                <div>{error}</div>
            );
        }
        return null;
    };

    const entryNumberList = [
        {value: 1, label: 1},
        {value: 2, label: 2},
    ];

    const handleModalAddCalculator = () => {
        setAddCalculator(true);
    };

    return (
        <form
            hidden={Number(currentTabKey) !== 2}
            onSubmit={handleSubmit}
            style={{display: 'flex', flexDirection: 'column'}}
        >
            <StyledFormPage>
                <Title color="black" style={styles.w100}>Настройки соединения</Title>
                <Form.Item label="Подключение к вычислителю" style={styles.w100}>
                    <SelectTT
                        name="isConnected"
                        onChange={(item) => {
                            (item === false) ? setDisable(true) : setDisable(false);
                            setFieldValue('isConnected', item);
                        }}
                        placeholder="Подключение к вычислителю"
                        options={isConnected}
                        value={values.isConnected}
                        disabled
                    />
                </Form.Item>

                <Form.Item label="Вычислитель, к которому подключен узел" style={styles.w49}>
                    <SelectTT
                        name="calculatorId"
                        onChange={(value) => {
                            setFieldValue('calculatorId', value);
                        }}
                        placeholder="Вычислитель, к которому подключен узел"
                        options={calculators}
                        value={values.calculatorId}
                    />
                </Form.Item>

                <Form.Item label="&nbsp;" colon={false} style={styles.w49}>
                    <ButtonTT
                        style={styles.w100}
                        color="white"
                        type="button"
                        onClick={handleModalAddCalculator}
                    >
                        + Создать вычислитель
                    </ButtonTT>
                </Form.Item>

                <Form.Item
                    label="Номер ввода"
                    style={styles.w100}
                >
                    <SelectTT
                        name="entryNumber"
                        onBlur={handleBlur}
                        placeholder="Выберите номер ввода"
                        onChange={(value) => {
                            setFieldValue('entryNumber', value);
                        }}
                        options={entryNumberList}
                        value={values.entryNumber}
                    />
                    <Alert name="entryNumber"/>
                </Form.Item>
            </StyledFormPage>
            <StyledFooter form>
                <ButtonTT
                    color="blue"
                    big
                    type="submit"
                >
                    Далее
                </ButtonTT>
                <ButtonTT type="button" color="white" onClick={handleCancel} style={{marginLeft: '16px'}}>
                    Отмена
                </ButtonTT>
            </StyledFooter>
        </form>
    );
};

export default AddNodeSecondTab;
