import React, {useContext} from 'react';
import {Form} from 'antd';
import _ from 'lodash';
import moment from 'moment';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {
    ButtonTT, DatePickerTT, Header, StyledModalBody, StyledFooter, StyledFormPage, styles
} from '../../../../../tt-components';
import {DeviceContext} from '../../../CalculatorProfile';
import {checkDevice} from './apiCheckDevice';
import {yupDate, yupDeviceId} from "../../../../../tt-components/yupTemplates";

const ModalCheckForm = (props) => {
    const {handleCancel} = props;
    const {device} = useContext(DeviceContext);
    const {model, serialNumber, address: {id: houseId}, futureCheckingDate, lastCheckingDate} = device;

    interface FormInterface {
        readonly deviceId: number,
        currentCheckingDate: string,
        futureCheckingDate: string,
    }

    interface InitialValuesInterface {
        lastCheckingDate: string,
        futureCheckingDate: string,
        readonly deviceId: number,
        readonly housingStock: number,
    }

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

    const initialValues: InitialValuesInterface = {
        lastCheckingDate: lastCheckingDate,
        futureCheckingDate: futureCheckingDate,
        deviceId: device.id,
        housingStock: houseId,
    }

    const {
        handleSubmit, handleChange, values, touched, errors,
        handleBlur, setFieldValue,
    } = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            deviceId: yupDeviceId,
            lastCheckingDate: yupDate,
            futureCheckingDate: yupDate
        }),
        onSubmit: async () => {
            const form: FormInterface = {
                deviceId: values.deviceId,
                currentCheckingDate: values.lastCheckingDate,
                futureCheckingDate: values.futureCheckingDate,
            };
            console.log(form);
            console.log(JSON.stringify(form));
            checkDevice(form).then((res) => {
                // setTimeout(handleCancel, 1000);
            });

        },
    });

    return (
        <form onSubmit={handleSubmit}>
            <StyledModalBody>
                <StyledFormPage>
                    <Header>{`Поверка вычислителя ${model} (${serialNumber})`}</Header>
                    <Form.Item label="Дата последней поверки прибора" style={styles.w49}>
                        <DatePickerTT
                            placeholder="Укажите дату"
                            format="DD.MM.YYYY"
                            allowClear={false}
                            onChange={(date) => {
                                setFieldValue('lastCheckingDate', date!.toISOString());
                                setFieldValue('futureCheckingDate', moment(date).add(3, 'years'))
                            }}
                            value={moment(values.lastCheckingDate)}
                            name="lastCheckingDate"
                        />
                        <Alert name={'lastCheckingDate'}/>
                    </Form.Item>
                    <Form.Item label="Дата следующей поверки прибора" style={styles.w49}>
                        <DatePickerTT
                            placeholder="Укажите дату"
                            format="DD.MM.YYYY"
                            allowClear={false}
                            onChange={(date) => {
                                setFieldValue('futureCheckingDate', date!.toISOString());
                            }}
                            value={moment(values.futureCheckingDate)}
                            name="futureCheckingDate"
                        />
                        <Alert name={'futureCheckingDate'}/>
                    </Form.Item>
                </StyledFormPage>
            </StyledModalBody>
            <StyledFooter modal>
                <ButtonTT
                    color="white"
                    type="button"
                    onClick={handleCancel}
                >
                    Отмена
                </ButtonTT>
                <ButtonTT
                    color="blue"
                    style={{marginLeft: '32px'}}
                    type="submit"
                >
                    Сохранить изменения
                </ButtonTT>
            </StyledFooter>
        </form>
    );
};

export default ModalCheckForm;
