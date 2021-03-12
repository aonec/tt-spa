import React from 'react'
import { Form } from 'antd'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import _ from 'lodash'
import ButtonTT from '../ButtonTT'
import InputTT from '../InputTT'
import Header from '../Header'

const TemplateForm = () => {
    const { id, model, serialNumber, address, hubs } = device

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
            test: undefined,
        },
        validationSchema: Yup.object({
            test: Yup.number()
                .typeError('Выберите узел')
                .min(0, 'Скорее всего, выбран некорректный номер узла')
                .max(10, 'Скорее всего, выбран некорректный номер узла'),
        }),
        onSubmit: async () => {
            someFunc()
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
        <Form id="formTemplate">
            <Header>Выгрузка отчета о общедомовом потреблении</Header>

            <Form.Item label="Название отчета">
                <InputTT value={values.test} onChange={handleChange()} />
            </Form.Item>

            <Form.Item label="Имя">
                <InputTT
                    name="firstName"
                    placeholder="Имя"
                    onChange={handleChange}
                    value={values.firstName}
                />
                <Alert name="firstName" />
            </Form.Item>

            <Form.Item label="Фамилия">
                <InputTT
                    name="lastName"
                    placeholder="Фамилия"
                    onChange={handleChange}
                    value={values.lastName}
                />
                <Alert name="lastName" />
            </Form.Item>

            <Form.Item label="Отчество">
                <InputTT
                    name="middleName"
                    placeholder="Отчество"
                    onChange={handleChange}
                    value={values.middleName}
                />
                <Alert name="middleName" />
            </Form.Item>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <ButtonTT color="white" onClick={handleCancel}>
                    Отмена
                </ButtonTT>
                <ButtonTT
                    color="blue"
                    type="submit"
                    form="formReport"
                    style={{ width: '224px', marginLeft: '16px' }}
                    onClick={handleSubmit}
                >
                    Выгрузить
                </ButtonTT>
            </div>
        </Form>
    )
}

export default TemplateForm
