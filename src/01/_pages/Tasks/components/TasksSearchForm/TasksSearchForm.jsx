import React from "react"
import {Button, Form, Input, Select, Tooltip} from "antd";
import {Icon} from "../../../../_components/Icon";
import styles from "../../../Devices/components/DeviceSearchForm/DeviceSearchForm.module.less";

import {setCurrentPage} from "../../../../Redux/reducers/reducerDevicesPage";
import {setHouseNumber, setStreet} from "../../../Objects/ObjectsSearchForm/objectsSearchReducer";
import {setSearchTerm, setTaskType} from "./tasksSearchReducer";
import {setDevicesFilter} from "../../../Devices/devicesSearchReducer";
const { Option } = Select;

const TasksSearchForm = ({searchState, dispatchSearchState}) => {



    const onValuesChangeHandler = (changedValues, allValues) => {
        debugger;
        const changedParam = Object.keys(changedValues)[0]
        let previousValue = searchState[changedParam] || '';
        let targetValue = Object.values(changedValues)[0]


        if (previousValue.length < 4 && targetValue.length < 4) {
            return
        } else if (targetValue.length >= 4) {
            dispatchSearchState(setSearchTerm(targetValue));
        } else {
            dispatchSearchState(setSearchTerm(''));
        }
        // dispatch(setCurrentPage(1))
    }

    const handleOnSortChange = (value) => {
        dispatchSearchState(setTaskType(value));
        // dispatch(setCurrentPage(1));
    }


    return (
        <Form
            id="searchForm"
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onValuesChange={onValuesChangeHandler}
            // style={{marginTop: 20, marginBottom: 20}}
            style={{margin: '20px auto'}}
        >
            <div style={{display: 'grid', gridTemplateColumns: '0.5fr 7fr 4.5fr'}}>
                <Form.Item
                    name="advancedButton"
                    style={{marginRight: 16}}
                >
                    <Tooltip title="Расширенный поиск">
                        <Button type="secondary" shape="square" icon={ <Icon icon="filter" />} disabled/>
                    </Tooltip>
                </Form.Item>

                {/*<Form.Item*/}
                {/*    name="sortBy"*/}
                {/*>*/}
                {/*    <div style={{display: 'flex', alignItems: 'center'}}>*/}
                {/*        <Select id="sortBy" defaultValue="lastCheckingDate" style={{marginRight: 8}} disabled>*/}
                {/*            <Option value="lastCheckingDate">Город</Option>*/}
                {/*        </Select>*/}
                {/*    </div>*/}
                {/*</Form.Item>*/}

                <Form.Item
                    name="Street"
                    rules={[{ required: true, message:  "Введите название улицы" }]}
                    style={{marginRight: 16}}
                >
                    {/*<Input className={styles.input} value={searchState.street} placeholder="Название улицы"/>*/}
                    <Input className={styles.input} value={1} placeholder="Название улицы" disabled/>
                </Form.Item>

                <Form.Item
                    name="sortByTaskType"
                >
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <label htmlFor="sortByTaskType" style={{minWidth: 85, marginRight: 8}} >Тип задачи:</label>
                        <Select id="sortByTaskType" onSelect={handleOnSortChange}>
                            <Option value="1">Неполадки с вычислителем</Option>
                            <Option value="2">Неполадки с ОДПУ</Option>
                            <Option value="3" >Отсутствие подключения с вычислителем</Option>
                            <Option value="4">Проверка ИПУ</Option>
                        </Select>
                    </div>
                </Form.Item>

                {/*<Form.Item*/}
                {/*    name="sortBy"*/}
                {/*>*/}
                {/*    <div style={{display: 'flex', alignItems: 'center'}}>*/}
                {/*        <label htmlFor="sortBy" style={{minWidth: 110, marginRight: 8}}>Сортировать по:</label>*/}
                {/*        <Select id="sortBy" defaultValue="lastCheckingDate" style={{ width: '61%' }} disabled>*/}
                {/*            <Option value="lastCheckingDate">Дате создания</Option>*/}
                {/*        </Select>*/}
                {/*    </div>*/}
                {/*</Form.Item>*/}

            </div>


        </Form>



    )
}

export default TasksSearchForm;