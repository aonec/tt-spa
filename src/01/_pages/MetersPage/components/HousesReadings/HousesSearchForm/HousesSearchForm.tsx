import {setHouseNumber, setStreet} from "../../../../../Redux/reducers/objectsSearchReducer";
import {Button, Form, Input, Select, Tooltip} from "antd";
import {Icon} from "../../../../../_components/Icon";
import styles from "../../../../Devices/components/DeviceSearchForm/DeviceSearchForm.module.less";
import React from "react";
import {HouseSearchType} from '../HousesReadings'

const { Option } = Select;

interface Props {
    searchState: HouseSearchType;
    dispatchSearchState: () => void
}

const HousesSearchForm: React.FC<Props> = ({searchState, dispatchSearchState}) => {


    const onValuesChangeHandler = (changedValues: object) => {
        const changedParam = Object.keys(changedValues)[0]
        // let previousValue = searchState[changedParam];
        let targetValue = Object.values(changedValues)[0]
        let setParam;

        switch (changedParam) {
            case 'Street':
                setParam = setStreet;
                break;
            case 'HousingStockNumber':
                setParam = setHouseNumber;
                break;
        }

            dispatchSearchState(setParam(targetValue))
        // dispatch(setCurrentPage(1))
    }


    return (
        <Form
            id="searchForm"
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onValuesChange={onValuesChangeHandler}
            style={{marginBottom: 20, borderBottom: '1px solid var(--frame)'}}
        >
            <div style={{display: 'grid', gridTemplateColumns: '0.5fr 2fr 4fr 1.5fr 4fr'}}>
                <Form.Item
                    name="advancedButton"
                    style={{marginRight: 16}}
                >
                    <Tooltip title="Расширенный поиск">
                        <Button type="secondary" shape="square" icon={ <Icon icon="filter" />} disabled/>
                    </Tooltip>
                </Form.Item>

                <Form.Item
                    name="sortBy"
                >
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Select id="sortBy" defaultValue="lastCheckingDate" style={{marginRight: 8}} disabled>
                            <Option value="lastCheckingDate">Город</Option>
                        </Select>
                    </div>
                </Form.Item>

                <Form.Item
                    name="Street"
                    rules={[{ required: true, message:  "Введите название улицы" }]}
                    style={{marginRight: 16}}
                >
                    <Input className={styles.input} value={searchState.street} placeholder="Название улицы"/>
                </Form.Item>

                <Form.Item
                    name="HousingStockNumber"
                    rules={[{ required: true, message:  "Дом" }]}
                    style={{marginRight: 24}}
                >
                    <Input className={styles.input} value={searchState.HousingStockNumber} placeholder="Дом" />
                </Form.Item>

                <Form.Item
                    name="sortBy"
                >
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <label htmlFor="sortBy" style={{minWidth: 110, marginRight: 8}}>Сортировать по:</label>
                        <Select id="sortBy" defaultValue="lastCheckingDate" style={{ width: '61%' }} disabled>
                            <Option value="lastCheckingDate">Алфавиту</Option>
                        </Select>
                    </div>
                </Form.Item>

            </div>


        </Form>

    )
}

export default HousesSearchForm;