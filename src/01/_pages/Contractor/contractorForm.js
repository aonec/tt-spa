import { useFormik } from 'formik'
import * as Yup from 'yup'
import { phoneRegExp } from '../../tt-components/localBases'
import { putContractor } from './apiContractor'
import _ from 'lodash'
import { Title } from '../../tt-components/Title'
import { Form } from 'antd'
import { InputTT } from '../../tt-components/InputTT'
import { ButtonTT } from '../../tt-components/ButtonTT'
import React from 'react'
import { Link } from 'react-router-dom'

const ContractorForm = (props) => {
    const { contractor } = props
    const { name, email, id } = contractor
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
            email,
            name,
            id,
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
                id: values.id,
            }
            putContractor(id, form)
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
            <form
                id="modalAddStaffForm"
                onSubmit={handleSubmit}
                style={{ width: 480 }}
            >
                <Title size="middle" color="black">
                    Редактирование подрядчика
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
                        justifyContent: 'flex-start',
                        margin: '32px 0 0 0',
                    }}
                >
                    <ButtonTT
                        color="blue"
                        type="submit"
                        onClick={handleSubmit}
                        style={{ width: 224 }}
                    >
                        Сохранить
                    </ButtonTT>
                    <Link to={'/settings/contractors'}>
                        <ButtonTT color="white" style={{ marginLeft: 16 }}>
                            Отмена
                        </ButtonTT>
                    </Link>
                </div>
            </form>
        </>
    )
}

export default ContractorForm
