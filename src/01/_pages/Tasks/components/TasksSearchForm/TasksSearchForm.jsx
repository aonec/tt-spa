import React from 'react';
import {
  Button, Form, Input, Select, Tooltip,
} from 'antd';
import { Icon } from '../../../../_components/Icon';
import styles from '../../../Devices/components/DeviceSearchForm/DeviceSearchForm.module.less';

import { setCurrentPage } from '../../../../Redux/reducers/reducerDevicesPage';
import { setHouseNumber, setStreet } from '../../../../Redux/reducers/objectsSearchReducer';
import {setSearchTerm, setTaskType, setTasks, setTaskId} from './tasksSearchReducer';
import { setDevicesFilter } from '../../../Devices/devicesSearchReducer';

const TasksSearchForm = ({ searchState, dispatchSearchState }) => {

  // onValuesChangeHandler пока не используется
  const onValuesChangeHandler = (changedValues, allValues) => {
    // const changedParam = Object.keys(changedValues)[0];
    // const previousValue = searchState[changedParam] || '';
    const targetValue = Object.values(changedValues)[0];
    dispatchSearchState(setTaskId(targetValue));
    // if (previousValue.length < 4 && targetValue.length < 4) {
    //
    // } else
    //   if (targetValue.length >= 4) {
    //   dispatchSearchState(setTaskId(targetValue));
    // } else {
    //   dispatchSearchState(setTaskId(''));
    // }
    // dispatch(setCurrentPage(1))
  };

  const handleOnSortChange = (value) => {
    dispatchSearchState(setTaskType(value));
    // dispatch(setCurrentPage(1));
  };

  const TaskTypeList = [
    { value: 0, label: 'Показать все' },
    { value: 1, label: 'Неполадки с вычислителем' },
    { value: 2, label: 'Неполадки с ОДПУ' },
    { value: 3, label: 'Отсутствие подключения с вычислителем' },
    { value: 4, label: 'Проверка ИПУ' },
  ];

  return (
    <Form
      id="searchForm"
      // name="normal_login"
      // className="login-form"
      initialValues={{ remember: true }}
      onValuesChange={onValuesChangeHandler}
            // style={{marginTop: 20, marginBottom: 20}}
      style={{ margin: '20px auto' }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '0.5fr 7fr 4.5fr' }}>
        <Form.Item
          name="advancedButton"
          style={{ marginRight: 16 }}
        >
          <Tooltip title="Расширенный поиск">
            <Button type="secondary" shape="square" icon={<Icon icon="filter" />} disabled />
          </Tooltip>
        </Form.Item>

        {/*<Form.Item*/}
        {/*  name="Street"*/}
        {/*  rules={[{ required: true, message: 'Введите название улицы' }]}*/}
        {/*  style={{ marginRight: 16 }}*/}
        {/*>*/}
        {/*  /!* <Input className={styles.input} value={searchState.street} placeholder="Название улицы"/> *!/*/}
        {/*  <Input className={styles.input} value={1} placeholder="Название улицы" disabled />*/}
        {/*</Form.Item>*/}

        <Form.Item
            name="TaskId"
            rules={[{ required: true, message: 'Введите номер задачи' }]}
            style={{ marginRight: 16 }}
        >
          {/* <Input className={styles.input} value={searchState.street} placeholder="Название улицы"/> */}
          <Input className={styles.input} value={searchState.taskId} placeholder="Номер задачи"/>
        </Form.Item>

        <Form.Item
          name="sortByTaskType"
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label htmlFor="sortByTaskType" style={{ minWidth: 85, marginRight: 8 }}>Тип задачи:</label>
            <Select
              id="sortByTaskType"
              options={TaskTypeList}
              defaultValue={0}
              onSelect={handleOnSortChange}
            />
          </div>
        </Form.Item>
      </div>

    </Form>

  );
};

export default TasksSearchForm;

{ /* <Form.Item */ }
{ /*    name="sortBy" */ }
{ /* > */ }
{ /*    <div style={{display: 'flex', alignItems: 'center'}}> */ }
{ /*        <Select id="sortBy" defaultValue="lastCheckingDate" style={{marginRight: 8}} disabled> */ }
{ /*            <Option value="lastCheckingDate">Город</Option> */ }
{ /*        </Select> */ }
{ /*    </div> */ }
{ /* </Form.Item> */ }

{ /* <Form.Item */ }
{ /*    name="sortBy" */ }
{ /* > */ }
{ /*    <div style={{display: 'flex', alignItems: 'center'}}> */ }
{ /*        <label htmlFor="sortBy" style={{minWidth: 110, marginRight: 8}}>Сортировать по:</label> */ }
{ /*        <Select id="sortBy" defaultValue="lastCheckingDate" style={{ width: '61%' }} disabled> */ }
{ /*            <Option value="lastCheckingDate">Дате создания</Option> */ }
{ /*        </Select> */ }
{ /*    </div> */ }
{ /* </Form.Item> */ }

{ /* <Option value="0">Показать все</Option> */ }
{ /* <Option value="1">Неполадки с вычислителем</Option> */ }
{ /* <Option value="2">Неполадки с ОДПУ</Option> */ }
{ /* <Option value="3">Отсутствие подключения с вычислителем</Option> */ }
{ /* <Option value="4">Проверка ИПУ</Option> */ }
{ /* </Select> */ }
