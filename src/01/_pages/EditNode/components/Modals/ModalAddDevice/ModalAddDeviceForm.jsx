import React, {useEffect, useState} from 'react';
import {Form} from 'antd';
import _ from 'lodash';
import moment from 'moment';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {
    ButtonTT, DatePickerTT, Header, StyledFooter, StyledModalBody,
} from '../../../../../tt-components';
import {housingMeteringDeviceTypes, isConnected, magistrals, resources} from "../../../../../tt-components/localBases";
import {addOdpu} from "../../../../ObjectProfile/components/AddDevice/apiAddOdpu";

const ModalAddDeviceForm = (props) => {
    // const {
    //   visible, id, setVisible, handleCancel, device,
    // } = props;
    // const { model, serialNumber } = device;

    const [validationSchema, setValidationSchema] = useState(Yup.object({}));

    const validationSchemaFlowMeter = Yup.object({
        model: Yup.string().min(3, 'Модель должна быть длиннее трех символов').required('Введите модель'),
        serialNumber: Yup.string().min(3, 'Серийный номер должен быть длиннее трех символов').required('Введите серийный номер'),
        calculatorId: Yup.number().typeError('Вы не выбрали вычислитель').required('Выберите вычислитель'),
        entryNumber: Yup.number().min(0).max(10, 'Укажите число до 10').typeError('Введите число, значение не может быть пустым')
            .required('Введите номер'),
        pipeNumber: Yup.number().min(0).max(10, 'Укажите число до 10').typeError('Введите число, значение не может быть пустым')
            .required('Введите номер'),
        diameter: Yup.number().min(1, 'от 1').max(150, 'до 150').typeError('Нельзя оставлять пустое значение')
            .required('Введите число от 1'),
    });
    const validationSchemaTemperatureSensor = Yup.object({
        model: Yup.string().min(3, 'Модель должна быть длиннее трех символов').required('Введите модель'),
        serialNumber: Yup.string().min(3, 'Серийный номер должен быть длиннее трех символов').required('Введите серийный номер'),
        calculatorId: Yup.number().typeError('Вы не выбрали вычислитель').required('Выберите вычислитель'),
        entryNumber: Yup.number().min(0).max(10, 'Укажите число до 10').typeError('Введите число, значение не может быть пустым')
            .required('Введите номер'),
        pipeNumber: Yup.number().min(0).max(10, 'Укажите число до 10').typeError('Введите число, значение не может быть пустым')
            .required('Введите номер'),
    });

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


    const {
        handleSubmit, handleChange, values, touched, errors,
        handleBlur, setFieldValue, setValues,
    } = useFormik({
        initialValues: {
            isConnected: isConnected[0].value,
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
            resource: resources[0].value,
            model: '',
            diameter: null,
            calculatorId: null,
            entryNumber: null,
            hubNumber: null,
            pipeNumber: null,
            magistral: magistrals[0].value,
        },
        validationSchema,

        onSubmit: async () => {
            const form = {
                serialNumber: values.serialNumber,
                lastCheckingDate: values.lastCheckingDate,
                futureCheckingDate: values.futureCheckingDate,
                lastCommercialAccountingDate: values.lastCommercialAccountingDate,
                futureCommercialAccountingDate: values.futureCommercialAccountingDate,
                documentsIds: [],
                housingMeteringDeviceType: values.housingMeteringDeviceType,
                resource: values.resource,
                model: values.model,
                diameter: values.diameter,
                pipe: {
                    calculatorId: values.calculatorId,
                    entryNumber: values.entryNumber,
                    hubNumber: values.hubNumber || null,
                    pipeNumber: values.pipeNumber,
                    magistral: values.magistral,
                },
            };
            console.log(form);
            console.log(JSON.stringify(form));
            // addOdpu(form).then(() => {
            //     setTimeout(() => { setAddOdpu(false); }, 1000);
            // });
        },
    });

    useEffect(() => {
        setValidationSchema(validationSchemaFlowMeter)
    },[])


    return (
        <form id="deregisterDevice" onSubmit={handleSubmit}>
            <StyledModalBody>
                <Header>Добавление нового ОДПУ</Header>
                <Form.Item label="Дата снятия прибора с учета">
                    <DatePickerTT
                        placeholder="Укажите дату"
                        format="DD.MM.YYYY"
                        allowClear={false}
                        onChange={(date) => {
                            setFieldValue('closingDateTime', date.toISOString());
                        }}
                        value={moment(values.closingDateTime)}
                        name="closingDateTime"
                    />
                </Form.Item>
                <Alert name="closingDateTime"/>
            </StyledModalBody>
            <StyledFooter modal>
                <ButtonTT
                    type="button"
                    color="white"
                    // onClick={handleCancel}
                >
                    Отмена
                </ButtonTT>

                <ButtonTT
                    color="red"
                    style={{marginLeft: '32px'}}
                    type="submit"
                    big
                    form="deregisterDevice"
                >
                    Снять прибор с учета
                </ButtonTT>

            </StyledFooter>
        </form>
    );
};

export default ModalAddDeviceForm;
