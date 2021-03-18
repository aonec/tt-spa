import React, {Dispatch, SetStateAction, useContext, useState} from 'react';
import {
    StyledFooter,
    StyledModal,
    ButtonTT,
    StyledModalBody,
    StyledFormPage,
    InputTT, Title, styles, RangePickerTT,
} from '../../../../../tt-components'

import {Form, Radio, Select} from 'antd'
import {StyledRadio} from "../../../../../tt-components/Radio";
import moment from "moment";
import {ObjectContext} from "../../../index";

interface ModalPropsInterface {
    visible: boolean
    setVisible: Dispatch<SetStateAction<boolean>>
}

const ModalCommonReport = ({visible, setVisible}: ModalPropsInterface) => {
    const {object} = useContext(ObjectContext)
    const handleCancel = () => {
        setVisible(false)
    }

    const {city, street, number, corpus} = object;
    const reportName = `Сводный_отчёт_${street}_${number}.xlsx`
    const addressString = `${city}, ${street}, ${number}`

    const RegistrationForm = () => {
        const [form] = Form.useForm();
        const [isDisabled, setIsDisabled] = useState(true);
        const onFinish = (values: any) => {
            console.log('Success:', values);
        };

        const onFinishFailed = (errorInfo: any) => {
            console.log('Failed:', errorInfo);
        };

        const onPeriodChange = (event: any) => {
            const period = event.target.value;
            switch (period) {
                case 'currentMonth':
                    form.setFieldsValue({dates: [moment().startOf('month'), moment()]})
                    setIsDisabled(true)
                    break;
                case 'previousMonth':
                    form.setFieldsValue({dates: [moment().subtract(1, 'months').startOf('month'), moment().startOf('month')]})
                    setIsDisabled(true)
                    break;
                case 'customPeriod':
                    setIsDisabled(false)
                    break;
                default:
                    alert("Не выбран период!");
            }
        }

        return (
            <Form
                initialValues={{
                    name: reportName,
                    address: addressString,
                    period: 'currentMonth',
                    dates: [moment().startOf('month'), moment()],
                    detailing: 'daily',
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                form={form}
            >
                <StyledModalBody>
                    <Title size="middle" color="black">
                        Выгрузка сводного отчёта
                    </Title>
                    <StyledFormPage>

                        <Form.Item
                            name="name"
                            label="Название отчёта" style={styles.w100}
                        >
                            <InputTT
                                readOnly
                            />
                        </Form.Item>


                        <Form.Item label="Адрес" name='address' style={styles.w100}>
                            <InputTT
                                disabled
                            />
                        </Form.Item>

                        <Form.Item label="Тип архива" name='period' style={styles.w49}>
                            <Radio.Group
                                onChange={(event: any) => onPeriodChange(event)}
                            >
                                <StyledRadio value="currentMonth">
                                    С начала месяца
                                </StyledRadio>
                                <StyledRadio value="previousMonth">
                                    За прошлый месяц
                                </StyledRadio>
                                <StyledRadio value="customPeriod">
                                    Произвольный период
                                </StyledRadio>

                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            label="Детализация отчета"
                            style={styles.w49}
                            name='detailing'
                        >
                            <Radio.Group>
                                <StyledRadio value="hourly">Часовая</StyledRadio>
                                <StyledRadio value="daily">Суточная</StyledRadio>

                            </Radio.Group>
                        </Form.Item>


                        <Form.Item label="Период выгрузки" name='dates' style={{width: '300px'}}>
                            <RangePickerTT
                                format="DD.MM.YYYY"
                                allowClear={false}
                                placeholder={['Дата Начала', 'Дата окончания']}
                                disabled={isDisabled}
                                disabledDate={current => {
                                    return current && current > moment();
                                }}
                            />
                        </Form.Item>

                    </StyledFormPage>
                </StyledModalBody>
                <StyledFooter modal>
                    <ButtonTT
                        type="button"
                        color="white"
                        onClick={handleCancel}
                        style={{marginLeft: '16px'}}
                    >
                        Отмена
                    </ButtonTT>
                    <ButtonTT
                        color="blue"
                        type="submit"
                        style={{marginLeft: '16px'}}
                        big
                    >
                        Выгрузить отчет
                    </ButtonTT>


                </StyledFooter>
            </Form>
        )
    }

    return (
        <StyledModal
            visible={visible}
            width={800}
            footer={null}
            onCancel={handleCancel}
        >
            <RegistrationForm/>
        </StyledModal>
    )
}

export default ModalCommonReport;