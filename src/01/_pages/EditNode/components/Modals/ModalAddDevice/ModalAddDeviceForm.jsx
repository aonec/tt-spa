import React, { useEffect, useState } from 'react'
import { Form, Divider } from 'antd'
import _ from 'lodash'
import moment from 'moment'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'
import {
    ButtonTT,
    DatePickerTT,
    Header,
    InputTT,
    SelectTT,
    StyledFooter,
    StyledModalBody,
    Title,
    StyledFormPage,
    styles,
    IconTT,
} from '../../../../../tt-components'
import {
    housingMeteringDeviceTypes,
    isConnected,
    magistrals,
    nodeStatusList,
    resources,
} from '../../../../../tt-components/localBases'
import TabsComponent from './Tabs'
import {
    validationSchemaFlowMeter,
    validationSchemaTemperatureSensor,
} from './validationSchemas'
import { addOdpu } from './apiModalAddDevice'

const ModalAddDeviceForm = (props) => {
    const { node, calculator, handleCancel } = props
    const { address, id: calculatorId } = calculator

    const { city, street, housingStockNumber, corpus } = address

    const {
        futureCommercialAccountingDate,
        lastCommercialAccountingDate,
        nodeStatus,
        number,
        resource,
        serviceZone,
        communicationPipes,
    } = node

    const [currentTabKey, setTab] = useState('1')
    const [validationSchema, setValidationSchema] = useState(Yup.object({}))

    const devices = communicationPipes.map((communicationPipe) => {
        const { devices } = communicationPipe
        return devices.map((device) => {
            return device
        })
    })
    const res = _.flatten(devices)
    const entryNumbers = res.map((item) => {
        const { hub } = item
        const { entryNumber } = hub
        return entryNumber
    })

    function handleChangeTab(value) {
        setTab(value)
    }

    function handleNext() {
        setTab(String(Number(currentTabKey) + 1))
    }

    const Alert = ({ name }) => {
        const touch = _.get(touched, `${name}`)
        const error = _.get(errors, `${name}`)
        if (touch && error) {
            return <div>{error}</div>
        }
        return null
    }

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
            isConnected: isConnected[0].value,
            serialNumber: '120220211643',
            lastCheckingDate: moment().toISOString(),
            futureCheckingDate: moment().add(3, 'years').toISOString(),
            lastCommercialAccountingDate:
                lastCommercialAccountingDate ?? moment().toISOString(),
            futureCommercialAccountingDate:
                futureCommercialAccountingDate ?? moment().toISOString(),
            documentsIds: [],
            ipV4: '',
            deviceAddress: null,
            port: null,
            housingMeteringDeviceType: housingMeteringDeviceTypes[0].value,
            resource,
            model: 'COLD 12022021',
            diameter: null,
            calculatorId: calculatorId ?? null,
            entryNumber: null,
            hubNumber: null,
            pipeNumber: null,
            magistral: magistrals[0].value,
            city,
            street,
            housingStockNumber,
            corpus,
            number,
            nodeStatus,
        },
        validationSchema,

        onSubmit: async () => {
            const template = {
                serialNumber: 'string',
                lastCheckingDate: '2021-02-12T13:38:14.655Z',
                futureCheckingDate: '2021-02-12T13:38:14.655Z',
                lastCommercialAccountingDate: '2021-02-12T13:38:14.655Z',
                documentsIds: [0],
                futureCommercialAccountingDate: '2021-02-12T13:38:14.655Z',
                housingMeteringDeviceType: 'string',
                resource: 'string',
                model: 'string',
                pipeId: 0,
                pipe: {
                    calculatorId: 0,
                    entryNumber: 0,
                    hubNumber: 0,
                    pipeNumber: 0,
                    magistral: 'string',
                },
                diameter: 0,
            }
            const form = {
                serialNumber: values.serialNumber,
                lastCheckingDate: values.lastCheckingDate,
                futureCheckingDate: values.futureCheckingDate,
                lastCommercialAccountingDate:
                    values.lastCommercialAccountingDate,
                futureCommercialAccountingDate:
                    values.futureCommercialAccountingDate,
                documentsIds: [],
                housingMeteringDeviceType: values.housingMeteringDeviceType,
                resource: values.resource,
                model: values.model,
                diameter: Number(values.diameter),
                pipe: {
                    calculatorId: values.calculatorId,
                    entryNumber: values.entryNumber,
                    hubNumber: values.hubNumber || null,
                    pipeNumber: values.pipeNumber,
                    magistral: values.magistral,
                },
            }
            addOdpu(form).then((res) => {
                // setTimeout(() => { setAddOdpu(false); }, 1000);
            })
        },
    })

    useEffect(() => {
        setValidationSchema(validationSchemaFlowMeter)
    }, [])

    return (
        <form id="addDevice" onSubmit={handleSubmit}>
            <StyledModalBody>
                <Header>Добавление нового ОДПУ</Header>
                <TabsComponent
                    currentTabKey={currentTabKey}
                    handleChangeTab={handleChangeTab}
                />
                <StyledFormPage hidden={Number(currentTabKey) !== 1}>
                    <Form.Item label="Выберите тип ресурса" style={styles.w49}>
                        <SelectTT
                            name="resource"
                            onChange={(value) => {
                                setFieldValue('resource', value)
                            }}
                            options={resources}
                            defaultValue={resources[0].value}
                            value={values.resource}
                            disabled
                        />
                        <Alert name="resource" />
                    </Form.Item>

                    <Form.Item label="Выберите тип прибора" style={styles.w49}>
                        <SelectTT
                            name="housingMeteringDeviceType"
                            onChange={(value) => {
                                setFieldValue(
                                    'housingMeteringDeviceType',
                                    value
                                )
                                if (value === 'FlowMeter') {
                                    setValidationSchema(
                                        validationSchemaFlowMeter
                                    )
                                }
                                if (value === 'TemperatureSensor') {
                                    setValidationSchema(
                                        validationSchemaTemperatureSensor
                                    )
                                }
                            }}
                            options={housingMeteringDeviceTypes}
                            value={values.housingMeteringDeviceType}
                        />
                        <Alert name="housingMeteringDeviceType" />
                    </Form.Item>

                    <Divider style={{ margin: 0 }} />

                    <SubHeader>Адрес установки</SubHeader>

                    <Form.Item label="Город" style={styles.w49}>
                        <InputTT
                            name="city"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.city}
                            placeholder="Нижнекамск"
                            disabled
                        />
                        <Alert name="city" />
                    </Form.Item>

                    <Form.Item label="Улица" style={styles.w49}>
                        <InputTT
                            name="street"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.street}
                            placeholder="Пр Мира"
                            disabled
                        />
                        <Alert name="street" />
                    </Form.Item>

                    <Form.Item label="Дом" style={styles.w49}>
                        <InputTT
                            name="housingStockNumber"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.housingStockNumber}
                            placeholder="6"
                            disabled
                        />
                        <Alert name="housingStockNumber" />
                    </Form.Item>

                    <Form.Item label="Корпус" style={styles.w49}>
                        <InputTT
                            name="corpus"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.corpus}
                            placeholder="А"
                            disabled
                        />
                        <Alert name="corpus" />
                    </Form.Item>

                    <Divider style={{ margin: 0 }} />

                    <SubHeader>Узел</SubHeader>

                    <Form.Item
                        label="Подключение к вычислителю"
                        style={styles.w49}
                    >
                        <SelectTT
                            name="isConnected"
                            onChange={(value) => {
                                setFieldValue('isConnected', value)
                            }}
                            options={isConnected}
                            value={values.isConnected}
                            disabled
                        />
                        <Alert name="isConnected" />
                    </Form.Item>

                    <Form.Item
                        label="Вычислитель, к которому подключен прибор"
                        style={styles.w49}
                    >
                        <InputTT
                            name="calculatorId"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.calculatorId}
                            disabled
                        />
                        <Alert name="calculatorId" />
                    </Form.Item>

                    <Form.Item label="Номер ввода" style={styles.w100}>
                        <InputTT
                            name="entryNumber"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Номер ввода"
                            value={values.entryNumber}
                        />
                        <Alert name="entryNumber" />
                    </Form.Item>

                    <Form.Item label="Номер узла" style={styles.w49}>
                        <InputTT
                            name="number"
                            onBlur={handleBlur}
                            placeholder="Номер узла"
                            value={values.number}
                            onChange={handleChange}
                            disabled
                        />
                        <Alert name="entryNumber" />
                    </Form.Item>

                    <Form.Item label="Статус узла" style={styles.w49}>
                        <SelectTT
                            name="nodeStatus"
                            onChange={(value) => {
                                setFieldValue('nodeStatus', value)
                            }}
                            options={nodeStatusList}
                            value={values.nodeStatus}
                            disabled
                        />
                        <Alert name="nodeStatus" />
                    </Form.Item>

                    <Form.Item
                        label="Дата начала Акта действия допуска"
                        style={styles.w49}
                    >
                        <DatePickerTT
                            format="DD.MM.YYYY"
                            name="lastCommercialAccountingDate"
                            placeholder="Укажите дату..."
                            allowClear={false}
                            onChange={(date) => {
                                setFieldValue(
                                    'lastCommercialAccountingDate',
                                    date.toISOString()
                                )
                            }}
                            value={moment(values.lastCommercialAccountingDate)}
                            disabled
                        />
                    </Form.Item>

                    <Form.Item
                        label="Дата окончания Акта действия допуска"
                        style={styles.w49}
                    >
                        <DatePickerTT
                            format="DD.MM.YYYY"
                            name="futureCommercialAccountingDate"
                            placeholder="Укажите дату..."
                            allowClear={false}
                            onChange={(date) => {
                                setFieldValue(
                                    'futureCommercialAccountingDate',
                                    date.toISOString()
                                )
                            }}
                            value={moment(
                                values.futureCommercialAccountingDate
                            )}
                            disabled
                        />
                    </Form.Item>
                </StyledFormPage>

                {/* Second Tabs */}
                <StyledFormPage hidden={Number(currentTabKey) !== 2}>
                    <Form.Item label="Выберите тип прибора" style={styles.w100}>
                        <SelectTT
                            name="housingMeteringDeviceType"
                            onChange={(value) => {
                                setFieldValue(
                                    'housingMeteringDeviceType',
                                    value
                                )
                            }}
                            options={housingMeteringDeviceTypes}
                            value={values.housingMeteringDeviceType}
                            disabled
                        />
                        <Alert name="housingMeteringDeviceType" />
                    </Form.Item>

                    <Form.Item
                        label="Выберите модель прибора"
                        style={styles.w49}
                    >
                        <InputTT
                            name="model"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.model}
                        />
                        <Alert name="model" />
                    </Form.Item>

                    <Form.Item label="Серийный номер" style={styles.w49}>
                        <InputTT
                            name="serialNumber"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.serialNumber}
                        />
                        <Alert name="serialNumber" />
                    </Form.Item>

                    {values.housingMeteringDeviceType === 'FlowMeter' ? (
                        <Form.Item
                            label="Диаметр трубы (мм)"
                            style={styles.w100}
                        >
                            <InputTT
                                name="diameter"
                                placeholder="Укажите диаметр трубы в мм"
                                onChange={handleChange}
                                value={values.diameter}
                                onBlur={handleBlur}
                            />
                            <Alert name="diameter" />
                        </Form.Item>
                    ) : null}

                    <Form.Item label="Дата поверки" style={styles.w49}>
                        <DatePickerTT
                            format="DD.MM.YYYY"
                            name="lastCheckingDate"
                            placeholder="Укажите дату..."
                            allowClear={false}
                            onChange={(date) => {
                                setFieldValue(
                                    'lastCheckingDate',
                                    date.toISOString()
                                )
                            }}
                            value={moment(values.lastCheckingDate)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Дата следующей поверки"
                        style={styles.w49}
                    >
                        <DatePickerTT
                            format="DD.MM.YYYY"
                            name="futureCheckingDate"
                            placeholder="Укажите дату..."
                            allowClear={false}
                            onChange={(date) => {
                                setFieldValue(
                                    'futureCheckingDate',
                                    date.toISOString()
                                )
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
                        />
                        <Alert name="pipeNumber" />
                    </Form.Item>

                    <Form.Item label="Магистраль" style={styles.w49}>
                        <SelectTT
                            placeholder="Выберите направление магистрали"
                            name="magistral"
                            options={magistrals}
                            onChange={(value) => {
                                setFieldValue('magistral', value)
                            }}
                            value={values.magistral}
                        />
                        <Alert name="magistral" />
                    </Form.Item>
                </StyledFormPage>

                <StyledFormPage hidden={Number(currentTabKey) !== 3}>
                    <Title color="black">Компонент в разработке</Title>
                </StyledFormPage>
            </StyledModalBody>
            <StyledFooter>
                <ButtonTT
                    color="blue"
                    onClick={handleNext}
                    big
                    hidden={currentTabKey === '3'}
                    style={{ marginLeft: '16px' }}
                    type="button"
                >
                    Далее
                </ButtonTT>

                <ButtonTT
                    color="blue"
                    type="submit"
                    hidden={currentTabKey !== '3'}
                    style={{ marginLeft: '16px' }}
                    big
                >
                    Добавить
                </ButtonTT>
                <ButtonTT
                    type="button"
                    color="white"
                    onClick={handleCancel}
                    style={{ marginLeft: '16px' }}
                >
                    Отмена
                </ButtonTT>
            </StyledFooter>
        </form>
    )
}

export default ModalAddDeviceForm

const SubHeader = styled.h3`
    margin: 0;
    padding: 0;
    width: 100%;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 32px;
`
