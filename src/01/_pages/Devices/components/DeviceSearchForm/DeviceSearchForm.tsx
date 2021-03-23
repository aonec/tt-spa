import styles from './DeviceSearchForm.module.scss';
import './DeviceSearchForm.module.scss';
import React, {Dispatch} from 'react';
import {
    setCurrentPage,
} from '../../../../Redux/reducers/reducerDevicesPage';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Tooltip, Select } from 'antd';
import { Icon } from '../../../../_components/Icon';
import {
    setSearchTerm,
    setExpirationDate,
    setLowerDiameterRange,
    setUpperDiameterRange,
    setDevicesFilter, DeviceSearchReducerStateType, FilterParameterType, DeviceSearchActionTypes,
} from '../../devicesSearchReducer';

const { Option } = Select;

interface DeviceSearchFormPropsInterface {
    searchState: Partial<DeviceSearchReducerStateType>
    dispatchSearchState: Dispatch<DeviceSearchActionTypes>
}

const DeviceSearchForm = ({ searchState, dispatchSearchState }: DeviceSearchFormPropsInterface) => {
    const dispatch = useDispatch()

    const onValuesChangeHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
        const targetValue = e.target.value
        dispatchSearchState(setSearchTerm(targetValue))
        dispatch(setCurrentPage(1))
    }

    const handleOnExpirationChange = (value: string) => {
        dispatchSearchState(setExpirationDate(value))
        dispatch(setCurrentPage(1))
    }

    const handleOnSortChange = (value: FilterParameterType) => {
        dispatchSearchState(setDevicesFilter(value))
        dispatch(setCurrentPage(1))
    }

    return (
        <Form
            id="searchForm"
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onChange={onValuesChangeHandler}
            style={{ marginBottom: 20, marginTop: 10 }}
        >
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '0.5fr 8fr 3.5fr',
                }}
            >
                <Form.Item name="advancedButton" style={{ marginRight: 16 }}>
                    <Tooltip title="Расширенный поиск">
                        <Button
                            icon={<Icon icon="filter" />}
                            disabled
                        />
                    </Tooltip>
                </Form.Item>

                <Form.Item
                    name="search"
                    rules={[
                        {
                            required: true,
                            message: 'Введите серийный номер прибора',
                        },
                    ]}
                    style={{ marginRight: 16 }}
                >
                    <Input
                        className={styles.input}
                        value={searchState.searchTerm}
                        placeholder="Введите серийный номер прибора"
                        prefix={<Icon icon="search" />}
                    />
                </Form.Item>

                <Form.Item name="sortBy">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label
                            htmlFor="sortBy"
                            style={{ minWidth: 120, marginRight: 8 }}
                        >
                            Сортировать по:
                        </label>
                        <Select id="sortBy" onSelect={handleOnSortChange}>
                            <Option value="descendingFutureCheckingDate">
                                Дате поверки (уб.)
                            </Option>
                            <Option value="ascendingFutureCheckingDate">
                                Дате поверки (возр.)
                            </Option>
                            <Option value="descendingStreet">
                                Улице (уб.)
                            </Option>
                            <Option value="ascendingStreet">
                                Улице (возр.)
                            </Option>
                        </Select>
                    </div>
                </Form.Item>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                <Form.Item
                    name="lastCheckingDate"
                    style={{ width: '100%', marginRight: 25 }}
                >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label
                            htmlFor="expirationDate"
                            style={{ minWidth: 152, marginRight: 8 }}
                        >
                            Истекает дата поверки:{' '}
                        </label>
                        <Select
                            id="expirationDate"
                            style={{ width: '55%', marginRight: 16 }}
                            onSelect={handleOnExpirationChange}
                        >
                            <Option value={0}>Ближайший месяц</Option>
                            <Option value={1}>В следующие два месяца</Option>
                            <Option value={2}>Истекла</Option>
                        </Select>
                    </div>
                </Form.Item>

                <Form.Item name="deviceDiameter" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label
                            htmlFor="deviceDiameter"
                            style={{ width: '30%', minWidth: 120 }}
                        >
                            Диаметр прибора{' '}
                        </label>
                        <div style={{ display: 'flex', width: '70%' }}>
                            <Select
                                showSearch
                                placeholder="Select a person"
                                id="minValue"
                                defaultValue="0"
                                style={{ width: '50%', marginRight: 8 }}
                                disabled
                            >
                                <Option value="0">От 0</Option>
                            </Select>

                            <Select
                                showSearch
                                placeholder="Select a person"
                                optionFilterProp="children"
                                id="maxValue"
                                defaultValue="255"
                                style={{ width: '50%' }}
                                disabled
                            >
                                <Option value="255">До 255</Option>
                            </Select>
                        </div>
                    </div>
                </Form.Item>
            </div>
        </Form>
    )
}

export default DeviceSearchForm