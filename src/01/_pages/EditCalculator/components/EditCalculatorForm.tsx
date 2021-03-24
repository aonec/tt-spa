import React, {Dispatch, SetStateAction, useContext, useEffect, useRef, useState} from 'react'
import {Form, Switch} from 'antd'
import {useFormik} from 'formik'
import * as Yup from 'yup'

import {NavLink} from 'react-router-dom'
import moment from 'moment'
import {
    InputTT,
    SelectTT,
    DatePickerTT,
    Wrap,
    ButtonTT,
    Title,
} from '../../../tt-components'
// import {ipv4RegExp, items} from '../../../tt-components/localBases'
import {putCalculator} from './apiEditCalculator'
import isDateNull from '../../../utils/isDateNull'
import {returnNullIfEmptyString} from '../../../utils/returnNullIfEmptyString'
import {handleTabsBeforeFormSubmit} from '../../../utils/handleTabsBeforeFormSubmit'

import {
    defaultValidationSchema,
    emptyConnectionValidationSchema,
} from './validationSchemas'
import isEmptyString from '../../../utils/isEmptyString'
import {CalculatorResponse, UpdateCalculatorRequest} from "../../../../myApi";
import {DEFAULT_CALCULATOR, ItemInterface, items} from "../../../tt-components/localBases";
import _ from "lodash";

interface EditCalculatorFormInterface {
    calculator: CalculatorResponse
    tab: string
    setTab: Dispatch<SetStateAction<string>>
    setAlert: Dispatch<SetStateAction<boolean>>
    setExistCalculator?: Dispatch<SetStateAction<boolean>>
}


const EditCalculatorForm = ({
                                calculator,
                                tab,
                                setTab,
                                setAlert,
                                setExistCalculator
                            }: EditCalculatorFormInterface) => {

    const {
        lastCheckingDate,
        futureCheckingDate,
        futureCommercialAccountingDate,
        lastCommercialAccountingDate,
        id,
        model,
        serialNumber,
        connection: {ipV4, port, deviceAddress},
        address: {id: houseId},
        isConnected,
    } = calculator || DEFAULT_CALCULATOR

    const [validationSchema, setValidationSchema] = useState(Yup.object({}))

    const getCurrentInfoId = model ? _.find<ItemInterface>(items, {label: model}) : undefined;

    const {
        handleSubmit,
        handleChange,
        values,
        touched,
        errors,
        handleBlur,
        setFieldValue,
        setFieldError,
    } = useFormik({
        initialValues: {
            serialNumber,
            lastCheckingDate: isDateNull(lastCheckingDate),
            futureCheckingDate: isDateNull(futureCheckingDate),
            lastCommercialAccountingDate: isDateNull(
                lastCommercialAccountingDate
            ),
            futureCommercialAccountingDate: isDateNull(
                futureCommercialAccountingDate
            ),
            ipV4: ipV4,
            port: port,
            deviceAddress: deviceAddress,
            housingStockId: houseId,
            infoId: getCurrentInfoId ? getCurrentInfoId.value : undefined,
            isConnected,
        },
        validationSchema,
        onSubmit: async () => {

            const form: UpdateCalculatorRequest = {
                serialNumber: values.serialNumber,
                lastCheckingDate: values.lastCheckingDate?.toISOString(),
                futureCheckingDate: values.futureCheckingDate?.toISOString(),
                lastCommercialAccountingDate: values.lastCommercialAccountingDate?.toISOString(),
                futureCommercialAccountingDate: values.futureCommercialAccountingDate?.toISOString(),
                connection: {
                    ipV4: values.ipV4,
                    deviceAddress: returnNullIfEmptyString(
                        values.deviceAddress
                    ),
                    port: returnNullIfEmptyString(values.port),
                },
                housingStockId: values.housingStockId,
                infoId: values.infoId,
            }
            console.log('FORM', form)
            console.log(JSON.stringify(form))

            interface ThenInterface {
                show: boolean | undefined
                id: number | null | undefined
            }

            putCalculator(id, form).then(({show, id}: ThenInterface) => {
                console.log("show", show)
                console.log("id", id)
                if (show) {
                    setAlert(true)
                    // setExistCalculator(id)
                }
            })
        },
    })

    useEffect(() => {
        setValidationSchema(defaultValidationSchema)
    }, [])

    function isEmptyConnection() {
        return (
            isEmptyString(values.deviceAddress) &&
            isEmptyString(values.port) &&
            isEmptyString(values.ipV4)
        )
    }

    function onSwitchChange(checked: boolean) {
        setFieldValue('isConnected', checked)
        if (checked === true) {
            setValidationSchema(defaultValidationSchema)
        }
        if (checked === false) {
            if (isEmptyConnection() === true) {
                setFieldError('ipV4', undefined)
                setFieldError('port', undefined)
                setFieldError('deviceAddress', undefined)
                setValidationSchema(emptyConnectionValidationSchema)
            }
            if (isEmptyConnection() === false) {
                setValidationSchema(defaultValidationSchema)
            }
        }
    }

    useEffect(() => {
        // setEmpty(isEmptyConnection());
        console.log('Правда, что все строки пустые:?', isEmptyConnection())

        if (values.isConnected === false) {
            if (isEmptyConnection() === true) {
                setFieldError('ipV4', undefined)
                setFieldError('port', undefined)
                setFieldError('deviceAddress', undefined)
                setValidationSchema(emptyConnectionValidationSchema)
            }
            if (isEmptyConnection() === false) {
                setValidationSchema(defaultValidationSchema)
            }
        }
    }, [values.deviceAddress, values.ipV4, values.port])

    interface AlertInterface {
        name: string
    }

    const Alert = ({name}: AlertInterface) => {
        const touch = _.get(touched, `${name}`)
        const error = _.get(errors, `${name}`)
        if (touch && error) {
            return <div>{error}</div>
        }
        return null
    }

    const tabErrors = [
        {
            key: '1',
            value: ['serialNumber', 'infoId'],
        },
        {
            key: '2',
            value: ['ipV4', 'port', 'deviceAddress'],
        },
    ]

    function handleSubmitForm(e: any) {
        e.preventDefault()
        const {hasError, errorTab} = handleTabsBeforeFormSubmit(
            tabErrors,
            errors
        )
        console.log(errors)
        if (hasError === true) {
            setTab(errorTab)
        } else {
            handleSubmit()
        }
    }

    return (
        <form onSubmit={handleSubmitForm} style={{maxWidth: 800}}>
            <div hidden={Number(tab) !== 1}>
                <Form.Item label="Серийный номер устройства">
                    <InputTT
                        name="serialNumber"
                        value={values.serialNumber}
                        onBlur={handleBlur}
                        placeholder="Серийный номер"
                        onChange={handleChange}
                    />
                    <Alert name="serialNumber"/>
                </Form.Item>

                <Form.Item label="Тип вычислителя">
                    <SelectTT
                        placeholder="Выберите тип устройства"
                        options={items}
                        value={values.infoId}
                        onChange={(event, target) => {
                            // setFieldValue('infoId', Number(target.value))
                        }}
                    />
                    <Alert name="infoId"/>
                </Form.Item>

                <Form.Item label="Дата Поверки">
                    <DatePickerTT
                        format="DD.MM.YYYY"
                        name="lastCheckingDate"
                        placeholder="Укажите дату..."
                        allowClear={false}
                        onChange={(date) => {
                            setFieldValue('lastCheckingDate', date)
                            setFieldValue(
                                'futureCheckingDate',
                                moment(date).add(4, 'years')
                            )
                        }}
                        value={values.lastCheckingDate}
                    />
                    <Alert name="lastCheckingDate"/>
                </Form.Item>

                <Form.Item label="Дата Следующей поверки">
                    <DatePickerTT
                        format="DD.MM.YYYY"
                        placeholder="Укажите дату..."
                        allowClear={false}
                        onChange={(date) => {
                            setFieldValue('futureCheckingDate', date)
                        }}
                        value={values.futureCheckingDate}
                        name="futureCheckingDate"
                    />
                    <Alert name="futureCheckingDate"/>
                </Form.Item>

                <Form.Item label="Дата начала действия акта-допуска">
                    <DatePickerTT
                        format="DD.MM.YYYY"
                        name="lastCommercialAccountingDate"
                        allowClear={false}
                        placeholder="Укажите дату..."
                        onChange={(date) => {
                            setFieldValue('lastCommercialAccountingDate', date)
                        }}
                        value={values.lastCommercialAccountingDate}
                    />
                </Form.Item>

                <Form.Item label="Дата окончания действия акта-допуска">
                    <DatePickerTT
                        format="DD.MM.YYYY"
                        placeholder="Укажите дату..."
                        allowClear={false}
                        onChange={(date) => {
                            setFieldValue(
                                'futureCommercialAccountingDate',
                                date
                            )
                        }}
                        value={values.futureCommercialAccountingDate}
                        name="futureCommercialAccountingDate"
                    />
                </Form.Item>
            </div>
            <div hidden={Number(tab) !== 2}>
                <Form.Item
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Switch
                        style={{width: '48px'}}
                        onChange={onSwitchChange}
                        checked={values.isConnected || false}
                    />
                    <span
                        style={{
                            fontSize: '16px',
                            lineHeight: '32px',
                            marginLeft: '16px',
                            color: 'rgba(39, 47, 90, 0.9)',
                        }}
                    >
                        Опрашивать вычислитель
                    </span>
                </Form.Item>

                <Form.Item label="IP адрес вычислителя">
                    <InputTT
                        type="text"
                        value={values.ipV4}
                        placeholder="Укажите IP-адрес устройства, например 192.168.0.1"
                        onChange={handleChange}
                        name="ipV4"
                        onBlur={handleBlur}
                        // disabled={!checked}
                    />
                    <Alert name="ipV4"/>
                    {/* {(isEmpty() && !values.checked) ? null : <Alert name="ipV4" />} */}
                </Form.Item>

                <Form.Item label="Порт">
                    <InputTT
                        type="number"
                        placeholder="Укажите порт устройства (например, 1234)"
                        value={values.port}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="port"
                        // disabled={!checked}
                    />
                    <Alert name="port"/>
                    {/* {(isEmpty() && !values.checked) ? null : <Alert name="port" /> } */}
                </Form.Item>

                <Form.Item label="Адрес устройства">
                    <InputTT
                        type="number"
                        placeholder="Укажите адреса устройства"
                        value={values.deviceAddress}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="deviceAddress"
                        // disabled={!checked}
                    />
                    <Alert name="deviceAddress"/>
                    {/* {(isEmpty() && !values.checked) ? null : <Alert name="deviceAddress" />} */}
                </Form.Item>

                <Wrap
                    style={{
                        background: ' rgba(255, 140, 104, 0.16)',
                        marginTop: '24px',
                        padding: '24px',
                    }}
                >
                    Подключение к новому прибору может занять до 30 минут.
                </Wrap>
            </div>
            <div hidden={Number(tab) !== 3}>
                <Title color="black">Компонент в разработке </Title>
            </div>
            <div hidden={Number(tab) !== 4}>
                <Title color="black">Компонент в разработке </Title>
            </div>

            <div style={{padding: '32px 0'}}>
                <ButtonTT
                    color="blue"
                    style={{marginRight: '16px'}}
                    type="submit"
                >
                    Сохранить
                </ButtonTT>

                <NavLink to={`/calculators/${id}`}>
                    <ButtonTT color="white" type="button">
                        Отмена
                    </ButtonTT>
                </NavLink>
            </div>
        </form>
    )
}

export default EditCalculatorForm
