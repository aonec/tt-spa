import React, {Dispatch, SetStateAction} from 'react';
import {
    StyledFooter,
    StyledModal,
    ButtonTT,
    StyledModalBody,
    StyledFormPage,
    InputTT, Title, styles, RangePickerTT, SelectTT,
} from '../../../../../tt-components'

import {Form, Radio} from 'antd'
import {StyledRadio} from "../../../../../tt-components/Radio";
import {serviceZoneList} from "../../../../../tt-components/localBases";

interface ModalPropsInterface {
    visible: boolean
    setVisible: Dispatch<SetStateAction<boolean>>
}

const ModalCommonReport = ({visible, setVisible}: ModalPropsInterface) => {
    const handleCancel = () => {
        setVisible(false)
    }
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <StyledModal
            visible={true}
            width={800}
            footer={null}
            onCancel={handleCancel}
        >
            <Form
                initialValues={{
                    test: 'test',
                    name: 'Сводный_отчёт_Мира_6.xlsx',
                    address: 'Нижнекамск, пр. Мира, 6',

                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
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

                        <Form.Item label="Зоны" style={styles.w100}>

                            <SelectTT
                                options={serviceZoneList}
                                placeholder={'Выберите одну или несколько зон'}
                            />
                        </Form.Item>

                        <Form.Item label="Тип архива" style={styles.w49}>
                            <Radio.Group
                                defaultValue="currentMonth"
                                size="large"
                                // onChange={(event) => onPeriodChange(event)}
                            >
                                <StyledRadio value="currentMonth" checked>
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
                        >
                            <Radio.Group
                                defaultValue="daily"
                                size="large"
                                // onChange={(event) => onDetailChange(event)}
                            >
                                <StyledRadio value="hourly">Часовая</StyledRadio>
                                <StyledRadio value="daily" checked>
                                    Суточная
                                </StyledRadio>

                            </Radio.Group>
                        </Form.Item>
                        

                        <Form.Item label="Период выгрузки" style={{width: '300px'}}>
                            <RangePickerTT
                                format="DD.MM.YYYY"
                                allowClear={false}
                                // size={"48px"}
                                // value={[values.begin, values.end]}
                                placeholder={['Дата Начала', 'Дата окончания']}
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

        </StyledModal>
    )
}

export default ModalCommonReport;