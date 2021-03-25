import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from 'react';
import {
    StyledFooter,
    StyledModal,
    ButtonTT,
    StyledModalBody,
    StyledFormPage,
    InputTT, Title, styles, RangePickerTT, SelectTT,
    StyledRadio, SwitchTT, DatePickerTT,
} from '../../../../../tt-components'

import {Divider, Form, Radio} from 'antd'

import moment from "moment";
import {getReports} from "../../../apiObjects";
import {GroupReportFormResponse} from "../../../../../../myApi";
import {useAsync} from "../../../../../hooks/useAsync";
import {allResources, resources} from "../../../../../tt-components/localBases";
import {getArchive} from "../../../../CalculatorProfile/components/Modals/ModalCalculatorReport/apiCalculatorReport";
import styled from "styled-components";


interface ModalPropsInterface {
    visible: boolean
    setVisible: Dispatch<SetStateAction<boolean>>
}

interface ReportsInterface {
    reports: GroupReportFormResponse;
    setReports: Dispatch<SetStateAction<GroupReportFormResponse>>
}

// GroupReportFormResponse
const ModalGroupReport = ({visible, setVisible}: ModalPropsInterface) => {

    const {data, status, run} = useAsync()
    // console.log("data", data)
    const handleCancel = () => {
        setVisible(false)
    }

    useEffect(() => {
        run(getReports())
    }, [])


    const GroupForm = () => {
        console.log("data", data)
        const reportName = `Выгрузка группового отчёта`
        const {groupReports, nodeResourceTypes, nodeStatuses} = data;
        // console.log("groupReports", groupReports)
        console.log("nodeResourceTypes", nodeResourceTypes)
        // console.log("nodeStatuses", nodeStatuses)

        const groupReportsOptions = groupReports.map((group: any) => {
            const {houseManagementId, title, id} = group
            return {value: id === null ? houseManagementId : id, label: title}
        })
        console.log(groupReportsOptions);

        const nodeResourceTypesOptions = nodeResourceTypes.map((nodeResourceType: any) => {
            const {Key, Value} = nodeResourceType
            return {value: Key, label: Value}
        })

        const nodeStatusesOptions = nodeStatuses.map((nodeStatus: any) => {
            const {Key, Value} = nodeStatus
            return {value: Key, label: Value}
        })

        console.log("groupReportsOptions", groupReportsOptions)


        const [form] = Form.useForm();
        const {setFieldsValue, getFieldsValue, getFieldValue, validateFields, getFieldsError} = form;
        const [isDisabled, setIsDisabled] = useState(true);

        const [subscription, setSubscription] = useState(false);

        const onFinish = (values: any) => {
            const begin = moment(getFieldValue('dates')[0]).format('YYYY-MM-DD');
            const end = moment(getFieldValue('dates')[1]).format('YYYY-MM-DD');
            if (subscription) {
                console.log("C подпиской")
                const link = `Reports/GetGroupReport?houseManagementId=${values.group}&NodeResourceType=${values.resource}&NodeStatus=${values.category}&Subscription.Email=${values.email}&Subscription.Type=${values.subscribePeriod}&ReportType=${values.detailing}&From=${begin}&To=${end}`

                console.log(link)
                getArchive(link).then((response: any) => {
                    const url = window.URL.createObjectURL(new Blob([response]));
                    const link = document.createElement('a');
                    link.href = url;
                    const fileName = `Report.zip`;
                    link.setAttribute('download', fileName);
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                });

            }
            if (!subscription) {
                console.log("Без подписки");
                const link = `Reports/GetGroupReport?houseManagementId=${values.group}&NodeResourceType=${values.resource}&NodeStatus=${values.category}&ReportType=${values.detailing}&From=${begin}&To=${end}`

                getArchive(link).then((response: any) => {
                    const url = window.URL.createObjectURL(new Blob([response]));
                    const link = document.createElement('a');
                    link.href = url;
                    const fileName = `Report.zip`;
                    link.setAttribute('download', fileName);
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                });
            }


            // console.log('Success:', values);

            // // const template = 'http://transparent-staging.herokuapp.com/api/Reports/GetGroupReport?GroupReportId=5689e08a-800f-4839-a159-59c4f8fc971a&NodeResourceType=ColdWaterSupply&NodeStatus=Registered&ReportType=daily&From=2021-03-10&To=2021-03-19'
            //
            // const link = `Reports/GetGroupReport?GroupReportId=${values.group}&NodeResourceType=${values.resource}&NodeStatus=${values.category}&ReportType=${values.detailing}&From=${begin}&To=${end}`
            // // const test = `Reports/GetGroupReport?NodeResourceTypes=Heat&NodeStatus=Registered&Subscription.Email=name%40email.ru&Subscription.Type=OncePerTwoWeeks&ReportType=daily&From=1&To=2"`
            // const test = `Reports/GetGroupReport?NodeResourceTypes=${values.resource}&NodeStatus=${values.category}&Subscription.Email=${values.email}&Subscription.Type=OncePerTwoWeeks&ReportType=daily&From=1&To=2"`
            //
            // console.log("link", link)
            // const name = 'Reports.zip'
            //


        };

        const onFinishFailed = (errorInfo: any) => {
            console.log('Failed:', errorInfo);
        };

        const onPeriodChange = (event: any) => {
            const period = event.target.value;
            switch (period) {
                case 'currentMonth':
                    setFieldsValue({dates: [moment().startOf('month'), moment()]})
                    setIsDisabled(true)
                    break;
                case 'previousMonth':
                    setFieldsValue({dates: [moment().subtract(1, 'months').startOf('month'), moment().startOf('month')]})
                    setIsDisabled(true)
                    break;
                case 'customPeriod':
                    setIsDisabled(false)
                    break;
                default:
                    alert("Не выбран период!");
            }
        }
        const initialValues = {
            name: reportName,
            address: 'addressString',
            period: 'currentMonth',
            dates: [moment().startOf('month'), moment()],
            detailing: 'daily',
            hidden: true,
            subscribePeriod: 'OncePerMonth',
            nextDate: undefined,
            // email: 'maratismodest@gmail.com',
            buttonEnabled: false
        }

        const handleSwitch = (event: boolean) => {
            console.log(event)
            setSubscription(prevState => !prevState);
        }

        const onChange = (allFields: any) => {
            console.log("allFields", allFields)
        }

        const onFormLayoutChange = (currentField: any, allFields: any) => {
            console.log("onFormLayoutChange", currentField, allFields)
            console.log("formHasErrors", formHasErrors())
            console.log("getFieldsError()", getFieldsError())

        }

        const formHasErrors = () => getFieldsError().some((item) => item.errors.length > 0)

        return (
            <Form
                initialValues={initialValues}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                form={form}
                requiredMark={false}
                onFieldsChange={(_, allFields) => {
                    onChange(allFields);
                }}
                onValuesChange={onFormLayoutChange}
                scrollToFirstError
            >
                <StyledModalBody>
                    <Title size="middle" color="black">
                        Выгрузка группового отчёта
                    </Title>
                    <StyledFormPage>

                        <Form.Item
                            name="group"
                            label="Группа" style={styles.w100}
                            rules={[{required: true, message: 'Выберите Группу'}]}
                        >
                            <SelectTT
                                options={groupReportsOptions}

                            />
                        </Form.Item>

                        <Form.Item
                            name="name"
                            label="Название отчёта" style={styles.w100}
                        >
                            <InputTT
                                readOnly
                            />
                        </Form.Item>

                        <Form.Item
                            name="resource"
                            label="Ресурс" style={styles.w49}
                            rules={[{required: true, message: 'Выберите Ресурс'}]}

                        >
                            <SelectTT
                                options={nodeResourceTypesOptions}
                            />
                        </Form.Item>

                        <Form.Item
                            name="category"
                            label="Категория узлов" style={styles.w49}
                            rules={[{required: true, message: 'Категория узлов'}]}
                        >
                            <SelectTT
                                options={nodeStatusesOptions}
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
                            rules={[{required: true, message: 'Укажите детализацию отчета'}]}
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

                        <Divider/>
                        <div style={{display: 'flex', alignItems: 'baseline', width: '100%'}}>

                            <Form.Item name='subscribe'>
                                <SwitchTT onChange={handleSwitch}/>
                            </Form.Item>
                            <div style={{paddingLeft: 16}}>
                                <SwitchHeader>
                                    Регулярная выгрузка отчёта
                                </SwitchHeader>
                                <SwitchSubheader>
                                    Групповой отчёт будет приходить вам и подрядчикам на почту в выбранную дату
                                </SwitchSubheader>
                            </div>
                        </div>


                    </StyledFormPage>

                    <StyledFormPage hidden={false}>
                        <Form.Item label='Email' style={styles.w49} name='email'
                                   rules={subscription ? [{
                                       required: true,
                                       type: 'email',
                                       message: 'введите email в формате: name@domain.ru'
                                   }] : [{}]}

                        >
                            < InputTT readOnly={!subscription}/>
                        </Form.Item>

                        <Form.Item label='Подрядчики' style={styles.w49}>
                            <SelectTT/>
                        </Form.Item>

                        <Form.Item
                            name='nextDate'
                            label='Дата следующей выгрузки отчёта'
                            style={styles.w49}
                            required
                            rules={subscription ? [{required: true, message: 'Дата следующей выгрузки отчёта!'}] : [{}]}
                        >
                            <DatePickerTT format='DD.MM.YYYY'
                            />
                        </Form.Item>

                        <Form.Item
                            label="Период"
                            style={styles.w100}
                            name='subscribePeriod'
                            rules={[{required: true, message: 'Укажите Период'}]}
                        >
                            <Radio.Group>
                                <StyledRadio value="OncePerTwoWeeks">1 раз в 2 недели</StyledRadio>
                                <StyledRadio value="OncePerMonth">1 раз в месяц</StyledRadio>
                                <StyledRadio value="OncePerQuarter">1 раз в квартал</StyledRadio>
                            </Radio.Group>
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
                        htmlType="submit"
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
            {status === 'error' ? <div style={{background: 'red'}}>ОШИБКА</div> : null}
            {status === 'pending' || status === 'idle' ? <div>ЗАГРУЗКА...</div> : null}
            {status === 'resolved' ? <GroupForm/> : null}
        </StyledModal>
    )


}

const SwitchHeader = styled.h4`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
  color: var(--color-primary-90);
  padding: 0;
  margin: 0;
`
const SwitchSubheader = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: var(--color-primary-90);
`


export default ModalGroupReport;