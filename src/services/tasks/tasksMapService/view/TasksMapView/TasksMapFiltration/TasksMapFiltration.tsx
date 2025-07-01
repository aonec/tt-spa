import React, { FC, useState } from 'react';
import { ChevronUp } from 'react-bootstrap-icons';
import { SearchIcon } from 'ui-kit/icons';
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
import { ItemPanelsSelect } from 'ui-kit/shared/ItemPanelsSelect';
import {
  BuildingWithTasksResponse,
  EResourceType,
  EStageTimeStatus,
  ETaskEngineeringElement,
} from 'api/types';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import {
  ResourceMapNamesDictionary,
  EngineeringElementLookUp,
} from 'dictionaries';
import { useFormik } from 'formik';
import { Radio, Space } from 'antd';
import { HousingStockTasks } from './HousingStockTasks';
import { Select } from 'ui-kit/Select';
import { HideExtendedSearchButton } from 'ui-kit/ExtendedSearch/ExtendedSearch.styled';
import { FilterButtonForMap } from 'ui-kit/shared/filterButton/FIlterButton';
import { useUnit } from 'effector-react';
import { tasksMapService } from 'services/tasks/tasksMapService';
import { useAutocompleteOptions } from './TasksMapFiltration.utils';

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
  housingStocksWithTasks,
  handleSelectObject,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const { values, setFieldValue, handleSubmit, resetForm } = useFormik({
    initialValues: filtrationValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      applyFilters(values);
    },
  });

  const handleSetCoordinates = useUnit(
    tasksMapService.inputs.handleSetCoordinates,
  );

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

  const searchResult = useAutocompleteOptions(
    search,
    housingStocksWithTasks,
    10,
  );

  const searchOptions = searchResult?.options ?? [];

  return (
    <Wrapper>
      {!isOpen && (
        <>
          <FilterHeader>
            <FilterButtonForMap
              isLoading={isLoadingHousingStocksWithTasks}
              onClick={() => setIsOpen(true)}
              isActiveFilters={[
                filtrationValues.resourceTypes.join(''),
                filtrationValues.timeStatus,
                filtrationValues.type,
              ].some(Boolean)}
            />
            <SearchInput
              options={searchOptions}
              value={search}
              onSearch={setSearch}
              small
              placeholder="Введите адрес"
              suffixIcon={<SearchIcon />}
              onSelect={(_, object) => {
                const building = object as BuildingWithTasksResponse;

                handleSelectObject(building);

                const coordinates = building.building?.coordinates;

                if (coordinates) {
                  handleSetCoordinates([
                    coordinates.latitude,
                    coordinates.longitude,
                  ]);
                }
              }}
              allowClear
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
              size="s"
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
                small
                placeholder="Выберите"
                value={values.engineeringElement || ''}
                onChange={(value) => {
                  setFieldValue('engineeringElement', value || null);
                  setFieldValue('type', null);
                }}
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
                small
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
                small
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
            <Button size="s" type="ghost" onClick={() => setIsOpen(false)}>
              Отмена
            </Button>
            <Button
              size="s"
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
