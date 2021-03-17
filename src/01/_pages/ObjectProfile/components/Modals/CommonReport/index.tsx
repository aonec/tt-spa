import React, {Dispatch, SetStateAction} from 'react';
import {
    StyledFooter,
    StyledModal,
    ButtonTT,
    StyledModalBody,
    StyledFormPage,
    InputTT, Title, styles, RangePickerTT,
} from '../../../../../tt-components'

import {Form, Radio} from 'antd'
import {StyledRadio} from "../../../../../tt-components/Radio";

interface ModalPropsInterface {
    visible: boolean
    setVisible: Dispatch<SetStateAction<boolean>>
}

const ModalCommonReport = ({visible, setVisible}: ModalPropsInterface) => {
    const handleCancel = () => {
        setVisible(false)
    }
    return (
        <StyledModal
            visible={visible}
            width={800}
            footer={null}
            onCancel={handleCancel}
        >
            <StyledModalBody>
                <Title size="middle" color="black">
                    Выгрузка сводного отчёта
                </Title>
                <StyledFormPage>
                    <Form.Item label="Название отчёта" style={styles.w100}>
                        <InputTT
                            value="Сводный_отчёт.xlsx"
                        />
                    </Form.Item>

                    <Form.Item label="Город" style={styles.w49}>
                        <InputTT
                            value="Нижнекамск"
                        />
                    </Form.Item>

                    <Form.Item label="Адрес" style={styles.w49}>
                        <InputTT
                            value="Адрес"
                        />
                    </Form.Item>

                    <Form.Item label="Зоны" style={styles.w100}>
                        <InputTT
                            value="Зоны"
                        />
                    </Form.Item>
                    <div id="period_and_type " style={{ display: 'flex', width: '100%' }}>
                        <Form.Item label="Тип архива" style={{ width: '50%' }}>
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
                            style={{ width: '50%' }}
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
                    </div>

                    <Form.Item label="Период выгрузки" style={{ width: '300px' }}>
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


        </StyledModal>
    )
}

export default ModalCommonReport;