import React, {
    useContext, useEffect, useRef, useState,
} from 'react';
import {Form} from 'antd';
import moment from 'moment';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import styled from 'styled-components';
import {
    resources, magistrals, housingMeteringDeviceTypes, isConnected, ipv4RegExp, serviceZoneList, nodeStatusList,
} from '../../../tt-components/localBases';
import {
    Title, SelectTT, InputTT, DatePickerTT, StyledModalBody, ButtonTT, StyledFooter, Icon, Warning, StyledModalHeader,
} from '../../../tt-components';
import TabsComponent from './Tabs';
import RelatedDevices from './RelatedDevices';
import {styles, StyledFormPage} from './styledComponents';
import {addNode} from '../apiAddNode';
import {AddNodeContext} from '../index';

const StyledHint = styled.div`
  color: rgba(39, 47, 90, 0.7)
`;

const AddNodeSecondTab = (props) => {
    const {handleCancel, currentTabKey, setTab, handleChangeTab, handleNext} = useContext(AddNodeContext)
    const {
        housingStock,
        addCalculator,
        setAddCalculator,
        calculators,
        currentCalculatorId,
        setCurrentCalculatorId,
        setAddOdpu,
        addOdpu,
        devices,
        setDevices,
        calculatorsExtended,
        setResource,
        entryNumber,
        setEntryNumber,
        communicationPipes,
    } = props;

    const [disable, setDisable] = useState(false);
    const [validationSchema, setValidationSchema] = useState(Yup.object({}));

    const {
        handleSubmit, handleChange, values, touched, errors,
        handleBlur, setFieldValue, setValues,
    } = useFormik({
        initialValues: {
            resource: resources[0].value,
            number: 1,
            serviceZone: serviceZoneList[0].value,
            nodeStatus: nodeStatusList[0].value,
            lastCheckingDate: moment().toISOString(),
            futureCheckingDate: moment().add(1, 'years').toISOString(),
            isConnected: true,
            calculatorId: null,
            devices,
        },
        validationSchema,

        onSubmit: async () => {
            const form = {
                resource: values.resource,
                number: values.number,
                serviceZone: values.serviceZone,
                nodeStatus: values.nodeStatus,
                lastCommercialAccountingDate: values.lastCommercialAccountingDate,
                futureCommercialAccountingDate: values.futureCommercialAccountingDate,
                calculatorId: values.calculatorId,
                communicationPipes,
            };
            console.log(form);
            console.log(JSON.stringify(form));
            // addNode(form).then((res) => {
            //   console.log(res);
            // });
        },
    });

    useEffect(() => {
        setFieldValue('calculatorId', currentCalculatorId);
    }, [currentCalculatorId]);

    useEffect(() => {
        setFieldValue('devices', devices);
    }, [devices]);

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
                            setCurrentCalculatorId(value);
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
                            setEntryNumber(value);
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
