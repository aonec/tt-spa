import React, { FC, useState } from 'react';
import { ChevronUp } from 'react-bootstrap-icons';
import { SearchIcon } from 'ui-kit/icons';
import { FilterButton } from '01/shared/ui/Fields';
import { HideExtendedSearchButton } from '01/shared/ui/ExtendedSearch/components';
import {
  CloseIconSC,
  ExtendedFiltration,
  FilterHeader,
  Footer,
  SearchInput,
  Wrapper,
} from './TasksMapFiltration.styled';
import { TasksMapFiltrationProps } from './TasksMapFiltration.types';
import { Button } from 'ui-kit/Button';
import { FormItem } from 'ui-kit/FormItem';
import { ItemPanelsSelect } from 'ui-kit/shared_components/ItemPanelsSelect';
import {
  EResourceType,
  EStageTimeStatus,
  ETaskEngineeringElement,
} from 'myApi';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import {
  ResourceMapNamesDictionary,
  EngineeringElementLookUp,
} from 'dictionaries';
import { useFormik } from 'formik';
import { Radio, Space } from 'antd';
import { HousingStockTasks } from './HousingStockTasks';
import { Select } from 'ui-kit/Select';

export const TasksMapFiltration: FC<TasksMapFiltrationProps> = ({
  taskTypes,
  filtrationValues,
  applyFilters,
  resetFilters,
  isLoadingHousingStocksWithTasks,
  selectedHousingStock,
  clearSelectedHousingStock,
  task,
  handleClickTask,
  isLoadingTask,
  clearTask,
  organizationUsers,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { values, setFieldValue, handleSubmit, resetForm } = useFormik({
    initialValues: filtrationValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      applyFilters(values);
    },
  });

  const baseResourceOptions = [
    EResourceType.ColdWaterSupply,
    EResourceType.HotWaterSupply,
    EResourceType.Heat,
    EResourceType.Electricity,
  ].map((resource) => ({
    key: resource,
    icon: <ResourceIconLookup resource={resource} />,
    title: ResourceMapNamesDictionary[resource],
  }));

  return (
    <Wrapper>
      {!isOpen && (
        <>
          <FilterHeader>
            <FilterButton
              isLoading={isLoadingHousingStocksWithTasks}
              onClick={() => setIsOpen(true)}
              isActiveFilters={[
                filtrationValues.resourceTypes.join(''),
                filtrationValues.timeStatus,
                filtrationValues.type,
              ].some(Boolean)}
            />
            <SearchInput
              search
              placeholder="Введите номер задачи или адрес"
              prefix={<SearchIcon />}
              disabled
            />
          </FilterHeader>
          {selectedHousingStock && (
            <HousingStockTasks
              selectedHousingStock={selectedHousingStock}
              clearSelectedHousingStock={clearSelectedHousingStock}
              task={task}
              isLoadingTask={isLoadingTask}
              handleClickTask={handleClickTask}
              clearTask={clearTask}
            />
          )}
        </>
      )}
      {isOpen && (
        <>
          <FilterHeader>
            <HideExtendedSearchButton onClick={() => setIsOpen(false)}>
              <ChevronUp />
            </HideExtendedSearchButton>
            <Button
              type="ghost"
              icon={<CloseIconSC />}
              size="small"
              onClick={() => {
                resetForm();
                resetFilters();
              }}
            >
              Очистить
            </Button>
          </FilterHeader>
          <ExtendedFiltration>
            <FormItem label="Элемент инженерной сети">
              <Select
                search
                placeholder="Выберите"
                value={values.engineeringElement || ''}
                onChange={(value) =>
                  setFieldValue('engineeringElement', value || null)
                }
              >
                <Select.Option value="" key="">
                  Все
                </Select.Option>
                {Object.values(ETaskEngineeringElement).map((elem) => {
                  return (
                    <Select.Option value={elem} key={elem}>
                      {EngineeringElementLookUp[elem]}
                    </Select.Option>
                  );
                })}
              </Select>
            </FormItem>
            <FormItem label="Тип ресурса">
              <ItemPanelsSelect<EResourceType | null>
                items={baseResourceOptions}
                selected={values.resourceTypes}
                onChange={(value) => setFieldValue('resourceTypes', value)}
              />
            </FormItem>
            <FormItem label="Статус задачи">
              <Space direction="vertical">
                <Radio
                  checked={values.timeStatus === EStageTimeStatus.Normal}
                  onClick={() =>
                    setFieldValue('timeStatus', EStageTimeStatus.Normal)
                  }
                >
                  В процессе
                </Radio>
                <Radio
                  checked={values.timeStatus === EStageTimeStatus.RunningOut}
                  onClick={() =>
                    setFieldValue('timeStatus', EStageTimeStatus.RunningOut)
                  }
                >
                  Истекает срок исполнения
                </Radio>
                <Radio
                  checked={values.timeStatus === EStageTimeStatus.Expired}
                  onClick={() =>
                    setFieldValue('timeStatus', EStageTimeStatus.Expired)
                  }
                >
                  Просроченная
                </Radio>
              </Space>
            </FormItem>
            <FormItem label="Тип задачи">
              <Select
                search
                placeholder="Выберите тип"
                value={values.type || undefined}
                onChange={(value) => setFieldValue('type', value)}
                allowClear
              >
                {taskTypes &&
                  taskTypes.map(({ value, key }) => (
                    <Select.Option key={key!} value={key!}>
                      {value}
                    </Select.Option>
                  ))}
              </Select>
            </FormItem>
            <FormItem label="Исполнитель">
              <Select
                search
                placeholder="Выберите исполнителя"
                value={values.executorId || undefined}
                onChange={(userId) => setFieldValue('executorId', userId)}
                allowClear
              >
                {organizationUsers.map((user) => (
                  <Select.Option value={user.id} key={user.id}>
                    {user.firstName} {user.lastName}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
          </ExtendedFiltration>
          <Footer>
            <Button size="small" type="ghost" onClick={() => setIsOpen(false)}>
              Отмена
            </Button>
            <Button
              size="small"
              onClick={() => {
                setIsOpen(false);
                handleSubmit();
              }}
            >
              Применить фильтр
            </Button>
          </Footer>
        </>
      )}
    </Wrapper>
  );
};
