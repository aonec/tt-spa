import React, {
    useContext, useEffect, useState,
} from 'react';
import {Form} from 'antd';
import moment from 'moment';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import {
    magistrals, housingMeteringDeviceTypes, isConnected,
} from '../../../../../tt-components/localBases';
import {
    Title, SelectTT, InputTT, DatePickerTT, StyledModalBody, ButtonTT, StyledFooter, Icon, Warning,
} from '../../../../../tt-components';
import TabsComponent from './TabsComponent';
import {styles, StyledFormPage} from './styledComponents';
import {handleTabsBeforeFormSubmit} from '../../../../../utils/handleTabsBeforeFormSubmit';
import {NodeContext} from '../../../index';
import {validationSchemaFlowMeter, validationSchemaTemperatureSensor} from './validationSchemas';
import {addOdpu} from "../apiAddOdpu";

const AddDeviceForm = (props) => {
    const {handleCancel} = props;

    const {
        node,
    } = useContext(NodeContext);

    console.log('node', node);

    const {
        resource, calculatorId, communicationPipes,
    } = node;

    const {entryNumber} = communicationPipes[0];


    const communicationPipeIds =  _.map(communicationPipes, 'id');

    console.log("communicationPipeIds", communicationPipeIds)

    const [currentTabKey, setTab] = useState('1');
    const [coldandthermo, setColdandthermo] = useState(false);
    const [disable, setDisable] = useState(false);
    const [validationSchema, setValidationSchema] = useState(Yup.object({}));

    const tabErrors = [
        {
            key: '1',
            value: ['model', 'serialNumber', 'diameter', 'entryNumber', 'pipeNumber', 'hubNumber', 'calculatorId', 'isAllowed'],
        },
    ];

    const initialValues = {
        isConnected: isConnected[0].value,
        isAllowed: true,
        serialNumber: '010320211230',
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
        model: 'Test',
        pipeId: null,
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
            const device = {
                serialNumber: values.serialNumber,
                lastCheckingDate: values.lastCheckingDate,
                futureCheckingDate: values.futureCheckingDate,
                lastCommercialAccountingDate: values.lastCommercialAccountingDate,
                futureCommercialAccountingDate: values.futureCommercialAccountingDate,
                documentsIds: [],
                housingMeteringDeviceType: values.housingMeteringDeviceType,
                resource,
                model: values.model,
                diameter: values.diameter,
                pipeId: null,
                pipe: {
                    calculatorId: values.calculatorId,
                    entryNumber: values.entryNumber,
                    pipeNumber: values.pipeNumber,
                    magistral: values.magistral,
                },
            };
            addOdpu(device).then((res) => {
                console.log(res);
            });
            console.log('SUBMIT', device);
        },
    });

    useEffect(() => {
        setValidationSchema(validationSchemaFlowMeter);
    }, []);

    useEffect(() => {
        if (values.resource === 'ColdWaterSupply' && values.housingMeteringDeviceType === 'TemperatureSensor') {
            setColdandthermo(true);
        } else setColdandthermo(false);
    }, [values.resource, values.housingMeteringDeviceType]);

    useEffect(() => {
        if (values.housingMeteringDeviceType === 'FlowMeter') {
            setValidationSchema(validationSchemaFlowMeter);
        }
        if (values.housingMeteringDeviceType === 'TemperatureSensor') {
            setValidationSchema(validationSchemaTemperatureSensor);
            setFieldValue('diameter', null);
        }
    }, [values.housingMeteringDeviceType]);

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

    function handleChangeTab(value) {
        setTab(value);
    }

    function handleNext() {
        setTab(String(Number(currentTabKey) + 1));
    }

    function handleSubmitForm() {
        const {hasError, errorTab} = handleTabsBeforeFormSubmit(tabErrors, errors);
        if (hasError === true) {
            setTab(errorTab);
        }
    }

    useEffect(() => {
        const pipeNumbers = _.map(communicationPipes, 'number');

        if (pipeNumbers.includes(values.pipeNumber)) {
            const getDevices = _.find(communicationPipes, {number: values.pipeNumber});
            const isSameType = _.find(getDevices.devices, {housingMeteringDeviceType: values.housingMeteringDeviceType});
            console.log('isSameType', isSameType);
            isSameType ? console.log('на трубе уже есть утстройство такого типа') : console.log('на трубе НЕТ утстройство такого типа');
            isSameType ? setFieldValue('isAllowed', false) : setFieldValue('isAllowed', true);
        } else {
            setFieldValue('isAllowed', true);
        }


        console.log('values.pipeNumber, values.housingMeteringDeviceType', values.pipeNumber, values.housingMeteringDeviceType);
    }, [values.pipeNumber, values.housingMeteringDeviceType]);

    return (
        <form
            id="formikFormAddOdpu"
            onSubmit={handleSubmit}
        >
            <StyledModalBody>
                <Title size="middle" color="black">
                    Добавление нового ОДПУ
                </Title>
                {/* {JSON.stringify(errors)} */}
                <Warning
                    hidden={!coldandthermo}
                    title="Для данного узла не предусмотрено наличие термодатчика. Проверьте выбранный ресурс."
                />
                <Warning
                    hidden={values.isAllowed}
                    title="На данной трубе уже есть такой тип устройства"
                />
                <TabsComponent
                    currentTabKey={currentTabKey}
                    handleChangeTab={handleChangeTab}
                />
                <StyledFormPage hidden={Number(currentTabKey) !== 1}>
                    <Form.Item label="Выберите тип прибора" style={styles.w100}>
                        <SelectTT
                            name="housingMeteringDeviceType"
                            onChange={(value) => {
                                setFieldValue('housingMeteringDeviceType', value);
                            }}
                            options={housingMeteringDeviceTypes}
                            value={values.housingMeteringDeviceType}
                        />
                        <Alert name="housingMeteringDeviceType"/>
                    </Form.Item>

                    {/* <Form.Item label="Выберите тип ресурса" style={styles.w100}> */}
                    {/*  <SelectTT */}
                    {/*    name="resource" */}
                    {/*    onChange={(value) => { */}
                    {/*      setFieldValue('resource', value); */}
                    {/*    }} */}
                    {/*    options={resources} */}
                    {/*    defaultValue={resources[0].value} */}
                    {/*    value={values.resource} */}
                    {/*  /> */}
                    {/*  <Alert name="resource"/> */}
                    {/* </Form.Item> */}

                    <Form.Item label="Выберите модель прибора" style={styles.w49}>
                        <InputTT
                            name="model"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.model}
                        />
                        <Alert name="model"/>
                    </Form.Item>

                    <Form.Item label="Серийный номер" style={styles.w49}>
                        <InputTT
                            name="serialNumber"
                            type="text"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.serialNumber}
                        />
                        <Alert name="serialNumber"/>
                    </Form.Item>

                    {(values.housingMeteringDeviceType === 'FlowMeter') ? (
                        <Form.Item label="Диаметр трубы (мм)" style={styles.w100}>
                            <InputTT
                                name="diameter"
                                placeholder="Укажите диаметр трубы в мм"
                                type="number"
                                onChange={handleChange}
                                value={values.diameter}
                                onBlur={handleBlur}
                            />
                            <Alert name="diameter"/>
                        </Form.Item>
                    ) : null}

                    <Form.Item label="Дата поверки" style={styles.w49}>
                        <DatePickerTT
                            format="DD.MM.YYYY"
                            name="lastCheckingDate"
                            placeholder="Укажите дату..."
                            allowClear={false}
                            onChange={(date) => {
                                setFieldValue('lastCheckingDate', date.toISOString());
                            }}
                            value={moment(values.lastCheckingDate)}
                        />
                    </Form.Item>

                    <Form.Item label="Дата следующей поверки" style={styles.w49}>
                        <DatePickerTT
                            format="DD.MM.YYYY"
                            name="futureCheckingDate"
                            placeholder="Укажите дату..."
                            allowClear={false}
                            onChange={(date) => {
                                setFieldValue('futureCheckingDate', date.toISOString());
                            }}
                            value={moment(values.futureCheckingDate)}
                        />
                    </Form.Item>

                    <Form.Item label="Номер трубы" style={styles.w49}>
                        <InputTT
                            name="pipeNumber"
                            type="number"
                            min="0"
                            step="1"
                            placeholder="Номер трубы"
                            value={values.pipeNumber}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            disabled={disable}
                        />
                        <Alert name="pipeNumber"/>
                    </Form.Item>

                    <Form.Item name="text" label="Магистраль" style={styles.w49}>
                        <SelectTT
                            placeholder="Выберите направление магистрали"
                            name="magistral"
                            options={magistrals}
                            onChange={(value) => {
                                setFieldValue('magistral', value);
                            }}
                            value={values.magistral}
                        />
                        <Alert name="magistral"/>
                    </Form.Item>
                </StyledFormPage>

                <StyledFormPage hidden={Number(currentTabKey) !== 2}>
                    <Title color="black">Компонент в разработке</Title>
                </StyledFormPage>
            </StyledModalBody>
            <StyledFooter>

                <ButtonTT
                    color="blue"
                    onClick={handleNext}
                    big
                    hidden={currentTabKey === '2'}
                    disabled={coldandthermo}
                    style={{marginLeft: '16px'}}
                    type="button"
                >
                    Далее
                </ButtonTT>

                <ButtonTT
                    color="blue"
                    type="submit"
                    hidden={currentTabKey !== '2'}
                    style={{marginLeft: '16px'}}
                    big
                    disabled={coldandthermo}
                    onClick={handleSubmitForm}
                >
                    Добавить
                </ButtonTT>
                <ButtonTT type="button" color="white" onClick={handleCancel} style={{marginLeft: '16px'}}>
                    Отмена
                </ButtonTT>
            </StyledFooter>
        </form>
    );
};

export default AddDeviceForm;
