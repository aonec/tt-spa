import styles from "./DeviceSearchForm.module.scss"
import React, {useRef, useState} from "react";
import {getDevicesBySerialNumber, setCurrentPage} from "../../../../Redux/reducers/reducerDevicesPage";
import {useDispatch} from "react-redux";
import {Form, Input, Button, Checkbox, Tooltip, Select} from 'antd';
import { UserOutlined, LockOutlined, SearchOutlined } from '@ant-design/icons';
import {Icon} from "../../../../_components/Icon";
import {EditButtonWrap} from "../../../DeviceProfile/components/EditButton";
import {setSearchTerm, setExpirationDate} from "../../devicesSearchReducer"

const { Option } = Select;


const DeviceSearchForm = ({searchState, dispatchSearchState}) => {


    const dispatch = useDispatch();

    const onValuesChangeHandler = (e) => {
        let previousValue = e.target.defaultValue;
        let targetValue = e.target.value;
        if (previousValue.length < 4 && targetValue.length < 4) {
            return
        } else if (targetValue.length >= 4) {
            dispatchSearchState(setSearchTerm(targetValue));
        } else {
            dispatchSearchState(setSearchTerm(''));
        }
        dispatch(setCurrentPage(1))
    }

    const handleOnChange = (value, event) => {
        dispatchSearchState(setExpirationDate(value))
    }


    return (
        <Form
            id="searchForm"
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onChange={onValuesChangeHandler}
            style={{marginBottom: 20}}
        >
            <div style={{display: 'grid', gridTemplateColumns: '0.5fr 8fr 3.5fr'}}>
                <Form.Item
                    name="advancedButton"
                    style={{marginRight: 16}}
                >
                    <Tooltip title="Расширенный поиск">
                        <Button type="secondary" shape="square" icon={ <Icon icon="filter" />} disabled/>
                    </Tooltip>
                </Form.Item>

                <Form.Item
                    name="search"
                    rules={[{ required: true, message:  'Введите серийный номер прибора' }]}
                    style={{marginRight: 16}}
                >
                    <Input className={styles.input} value={searchState.searchTerm} placeholder="Введите серийный номер прибора" prefix={<Icon icon="search" />} />
                </Form.Item>

                <Form.Item
                    name="sortBy"
                >
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <label htmlFor="sortBy" style={{minWidth: 120, marginRight: 8}}>Сортировать по:</label>
                        <Select id="sortBy" defaultValue="lastCheckingDate" style={{ width: '61%' }} disabled>
                            <Option value="lastCheckingDate">Дате поверки</Option>
                        </Select>
                    </div>
                </Form.Item>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                <Form.Item
                    name="lastCheckingDate"
                    style={{width: '100%', marginRight: 25 }}
                >
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <label htmlFor="expirationDate" style={{minWidth: 152, marginRight: 8}}>Истекает дата поверки: </label>
                        <Select id="expirationDate" style={{ width: '55%' }} onSelect={(value, event) => handleOnChange(value, event)}>
                            <Option value={0}>Ближайший месяц</Option>
                            <Option value={1}>В следующие два месяца</Option>
                            <Option value={2}>Истекла</Option>
                        </Select>
                    </div>
                </Form.Item>

                <Form.Item
                    name="deviceDiameter"
                    style={{width: '100%' }}
                >
                    <div style={{display: 'flex', alignItems: 'center'}}>

                        <label htmlFor="deviceDiameter"
                               style={{width: '30%', minWidth: 120}}>Диаметр прибора </label>
                        <div style={{display: 'flex', width: '70%'}}>
                            <Select id="minValue"
                                    defaultValue="0"
                                    style={{width: '50%', marginRight: 8}}
                                    disabled >
                                <Option value="0">От 0</Option>
                            </Select>

                            <Select id="maxValue"
                                    defaultValue="До 255"
                                    style={{width: '50%'}}
                                    disabled>
                                <Option value="255">До 255</Option>
                            </Select>
                        </div>

                    </div>
                </Form.Item>

                {/*<Form.Item style={{width: '20%'}}>*/}
                {/*    <Button type="primary" htmlType="submit" style={{width: '100%'}}>*/}
                {/*        Поиск*/}
                {/*    </Button>*/}
                {/*</Form.Item>*/}
            </div>


        </Form>


    )
}

export default DeviceSearchForm;



