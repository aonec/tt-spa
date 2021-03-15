import React, { useContext } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import _ from 'lodash'
import { Form } from 'antd'
import {
    ButtonTT,
    SelectTT,
    InputTT,
    Title,
} from '../../../../../tt-components'
import { SettingsContext } from '../../../index'
import { postContractor } from '../../../apiSettings'
import { phoneRegExp } from '../../../../../tt-components/localBases'

const ModalAddContractorForm = () => {
    const { contractor, hideContractor } = useContext(SettingsContext)

    const {
        handleSubmit,
        handleChange,
        values,
        touched,
        errors,
        handleBlur,
        setFieldValue,
    } = useFormik({
        initialValues: {
            email: '',
            role: '',
            phoneNumber: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Строка не должна быть пустой'),
            email: Yup.string()
                .email('Укажите адрес в формате name@mail.ru')
                .required('Строка не должна быть пустой'),
            phoneNumber: Yup.string().matches(
                phoneRegExp,
                'Укажите верно номер телефона'
            ),
        }),
        onSubmit: async () => {
            const form = {
                name: values.name,
                email: values.email,
                phoneNumber: values.phoneNumber,
            }
            postContractor(form)
        },
    })
    const Alert = ({ name }) => {
        const touch = _.get(touched, `${name}`)
        const error = _.get(errors, `${name}`)
        if (touch && error) {
            return <div>{error}</div>
        }
        return null
    }

    return (
        <>
            <form id="modalAddStaffForm" onSubmit={handleSubmit}>
                <Title size="middle" color="black">
                    Добавление нового подрядчика
                </Title>
                <Form.Item label="Имя">
                    <InputTT
                        name="name"
                        placeholder="Инженерный центр"
                        onChange={handleChange}
                        value={values.name}
                    />
                    <Alert name="name" />
                </Form.Item>

                <Form.Item label="Электронная почта">
                    <InputTT
                        name="email"
                        placeholder="qwerty@yandex.ru"
                        onChange={handleChange}
                        value={values.email}
                    />
                    <Alert name="email" />
                </Form.Item>

                <Form.Item label="Контактный телефон">
                    <InputTT
                        name="cellphone"
                        placeholder="8 999 999 99-99"
                        onChange={handleChange}
                        value={values.cellphone}
                        disabled
                    />
                    <Alert name="email" />
                </Form.Item>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        margin: '32px 0 0 0',
                    }}
                >
                    <ButtonTT
                        color="white"
                        onClick={hideContractor}
                        style={{ marginRight: 16 }}
                    >
                        Отмена
                    </ButtonTT>
                    <ButtonTT
                        color="blue"
                        type="submit"
                        onClick={handleSubmit}
                        style={{ width: 224 }}
                    >
                        Добавить
                    </ButtonTT>
                </div>
            </form>
        </>
    )
}

export default ModalAddContractorForm
