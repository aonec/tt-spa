import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from 'react';
import {
    StyledFooter,
    StyledModal,
    ButtonTT,
    StyledModalBody,
    StyledFormPage,
    InputTT, Title, styles, RangePickerTT, SelectTT,
} from '../../../../../tt-components'

import {Form, Radio, Select} from 'antd'
import {StyledRadio} from "../../../../../tt-components/Radio";
import moment from "moment";
import {getReports} from "../../../apiObjects";
import {GroupReportFormResponse, GroupReportResponse} from "../../../../../../myApi";
import {useAsync} from "../../../../../hooks/useAsync";
import {allResources} from "../../../../../tt-components/localBases";
import {getArchive} from "../../../../CalculatorProfile/components/Modals/ModalCalculatorReport/apiCalculatorReport";
import axios from "../../../../../axios";


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

    // const [reports, setReports] = useState<ReportsInterface>();
    const {data, status = 'error', run} = useAsync()
    console.log("data", data)
    const handleCancel = () => {
        setVisible(false)
    }

    useEffect(() => {
        run(getReports())
    }, [])


    const reportName = `Выгрузка группового отчёта`

    const GroupForm = () => {
        console.log("data", data)
        const {groupReports, nodeResourceTypes, nodeStatuses} = data;
        console.log("groupReports", groupReports)
        console.log("nodeResourceTypes", nodeResourceTypes)
        console.log("nodeStatuses", nodeStatuses)

        const groupReportsOptions = groupReports.map((group: any) => {
            const {houseManagementId, title, id} = group
            return {value: id === null ? houseManagementId : id , label: title}
        })

        const nodeResourceTypesOptions = nodeResourceTypes.map((nodeResourceType: any) => {
            const {Key, Value} = nodeResourceType
            return {value: Key, label: Value}
        })

        const nodeStatusesOptions = nodeStatuses.map((nodeStatus: any) => {
            const {Key, Value} = nodeStatus
            return {value: Key, label: Value}
        })


        console.log("groupReportsOptions", groupReportsOptions)


        async function getArchive(link = '') {
            try {
                const res = await axios.get(link, {
                    responseType: 'blob',
                })
                return res
            } catch (error) {
                console.log(error)
                throw {
                    resource: 'tasks',
                    message: 'Произошла ошибка при загрузке данных по задачам',
                }
            }
        }


        const [form] = Form.useForm();
        const {setFieldsValue, getFieldsValue, getFieldValue} = form;
        const [isDisabled, setIsDisabled] = useState(true);
        const onFinish = (values: any) => {
            console.log('Success:', values);
            const begin = moment(getFieldValue('dates')[0]).format('YYYY-MM-DD');
            const end = moment(getFieldValue('dates')[1]).format('YYYY-MM-DD');
            // const template = 'http://transparent-staging.herokuapp.com/api/Reports/GetGroupReport?GroupReportId=5689e08a-800f-4839-a159-59c4f8fc971a&NodeResourceType=ColdWaterSupply&NodeStatus=Registered&ReportType=daily&From=2021-03-10&To=2021-03-19'
            const link = `Reports/GetGroupReport?GroupReportId=${values.group}&NodeResourceType=${values.resource}&NodeStatus=${values.category}&ReportType=${values.detailing}&From=${begin}&To=${end}`
            console.log("link",link)
            const name = 'Reports'
            getArchive(link).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response]));
                const link = document.createElement('a');
                link.href = url;
                // const fileName = `${street}, ${housingStockNumber} - ${translate(
                //     resource,
                // )} с ${beginName} по ${endName}, ${translate(resource)}.xlsx`;
                link.setAttribute('download', name);
                document.body.appendChild(link);
                link.click();
                link.remove();
            });
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
        }


        return (
            <Form
                initialValues={initialValues}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                form={form}
                requiredMark={false}
            >
                <StyledModalBody>
                    <Title size="middle" color="black">
                        Выгрузка группового отчёта
                    </Title>
                    <StyledFormPage>

                        <Form.Item
                            name="group"
                            label="Группа" style={styles.w100}
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
                        >
                            <SelectTT
                                options={allResources}
                            />
                        </Form.Item>

                        <Form.Item
                            name="category"
                            label="Категория узлов" style={styles.w49}
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
            {status === 'error' ? <div style={{background: 'red'}}>ОШИБКА</div> : null}
            {status === 'pending' || status === 'idle' ? <div>ЗАГРУЗКА...</div> : null}
            {status === 'resolved' ? <GroupForm/> : null}
        </StyledModal>
    )


}

export default ModalGroupReport;