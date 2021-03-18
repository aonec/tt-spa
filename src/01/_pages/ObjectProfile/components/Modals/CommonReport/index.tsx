import React, {Dispatch, SetStateAction, useState} from 'react';
import {
    StyledFooter,
    StyledModal,
    ButtonTT,
    StyledModalBody,
    StyledFormPage,
    InputTT, Title, styles, RangePickerTT, SelectTT, MultiSelectTT,
} from '../../../../../tt-components'

import {Form, Radio, Select} from 'antd'
import {StyledRadio} from "../../../../../tt-components/Radio";
import {serviceZoneList} from "../../../../../tt-components/localBases";
import moment from "moment";

interface ModalPropsInterface {
    visible: boolean
    setVisible: Dispatch<SetStateAction<boolean>>
}

const ModalCommonReport = ({visible, setVisible}: ModalPropsInterface) => {
    const handleCancel = () => {
        setVisible(false)
    }

    const RegistrationForm = () => {
        const [form] = Form.useForm();
        const [isDisabled, setIsDisabled] = useState(true);
        const onFinish = (values: any) => {
            console.log('Success:', values);
            console.log(form.getFieldValue(['periodDisabled']))
        };

        const onFinishFailed = (errorInfo: any) => {
            console.log('Failed:', errorInfo);
        };

        const onPeriodChange = (event: any) => {
            const period = event.target.value;
            console.log('onPeriodChange', period);
            switch (period) {
                case 'currentMonth':
                    console.log('currentMonth');
                    form.setFieldsValue({dates: [moment().startOf('month'), moment()]})
                    setIsDisabled(true)
                    break;
                case 'previousMonth':
                    console.log('previousMonth');
                    form.setFieldsValue({dates: [moment().subtract(1, 'months').startOf('month'), moment().startOf('month')]})
                    setIsDisabled(true)
                    break;
                case 'customPeriod':
                    console.log('customPeriod');
                    setIsDisabled(false)
                    break;

                default:
                    alert("Нет таких значений");
            }
        }
        return (
            <Form
                initialValues={{
                    test: 'test',
                    name: 'Сводный_отчёт_Мира_6.xlsx',
                    address: 'Нижнекамск, пр. Мира, 6',
                    period: 'currentMonth',
                    dates: [moment().startOf('month'), moment()],
                    detailing: 'daily',
                    periodDisabled: true

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
                                disabled
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
                                // size={"48px"}
                                // value={[values.begin, values.end]}
                                placeholder={['Дата Начала', 'Дата окончания']}
                                disabled={isDisabled}
                                onChange={(event) => {
                                    // datePickerHandler(event)
                                }}
                                // disabled={values.customPeriodDisabled}
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
            visible={true}
            width={800}
            footer={null}
            onCancel={handleCancel}
        >
            <RegistrationForm/>

        </StyledModal>
    )
}

export default ModalCommonReport;