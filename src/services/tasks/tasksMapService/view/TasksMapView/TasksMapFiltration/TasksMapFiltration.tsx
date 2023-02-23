import React, { FC, useState } from 'react';
import { ChevronUp } from 'react-bootstrap-icons';
import { SearchIcon } from 'ui-kit/icons';
import { FilterButton, SelectSC } from '01/shared/ui/Fields';
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
  EActResourceType,
  EResourceType,
  ETaskEngineeringElement,
} from 'myApi';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import {
  ResourceMapNamesDictionary,
  EngineeringElementLookUp,
} from 'dictionaries';
import { useFormik } from 'formik';
import { Checkbox, Space } from 'antd';

export const TasksMapFiltration: FC<TasksMapFiltrationProps> = ({
  taskTypes,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { values, setFieldValue } = useFormik({
    initialValues: {
      resource: null as EResourceType | null,
    },
    onSubmit: () => void 0,
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
        <FilterHeader>
          <FilterButton onClick={() => setIsOpen(true)} />
          <SearchInput
            placeholder="Введите номер задачи или адрес"
            prefix={<SearchIcon />}
          />
        </FilterHeader>
      )}
      {isOpen && (
        <>
          <FilterHeader>
            <HideExtendedSearchButton onClick={() => setIsOpen(false)}>
              <ChevronUp />
            </HideExtendedSearchButton>
            <Button type="ghost" icon={<CloseIconSC />} size="small">
              Очистить
            </Button>
          </FilterHeader>
          <ExtendedFiltration>
            <FormItem label="Элемент инженерной сети">
              <SelectSC placeholder="Выберите" value="">
                <SelectSC.Option value="" key="">
                  Все
                </SelectSC.Option>
                {Object.values(ETaskEngineeringElement).map((elem) => {
                  return (
                    <SelectSC.Option value={elem} key={elem}>
                      {EngineeringElementLookUp[elem]}
                    </SelectSC.Option>
                  );
                })}
              </SelectSC>
            </FormItem>
            <FormItem label="Тип ресурса">
              <ItemPanelsSelect<EResourceType | null>
                items={[
                  {
                    key: null,
                    icon: (
                      <ResourceIconLookup resource={EActResourceType.All} />
                    ),
                    title: 'Все',
                  },
                  ...baseResourceOptions,
                ]}
                selected={values.resource}
                onChange={(value) => setFieldValue('resource', value)}
              />
            </FormItem>
            <FormItem label="Статус задачи">
              <Checkbox.Group>
                <Space direction="vertical">
                  <Checkbox>В процессе</Checkbox>
                  <Checkbox>Истекает срок исполнения</Checkbox>
                  <Checkbox>Просроченная</Checkbox>
                </Space>
              </Checkbox.Group>
            </FormItem>
            <FormItem label="Тип задачи">
              <SelectSC placeholder="Выберите тип">
                {taskTypes &&
                  taskTypes.map(({ value, key }) => (
                    <SelectSC.Option key={key!} value={key!}>
                      {value}
                    </SelectSC.Option>
                  ))}
              </SelectSC>
            </FormItem>
            <FormItem label="Исполнитель">
              <SearchInput
                placeholder="Выберите из списка"
                prefix={<SearchIcon />}
              />
            </FormItem>
          </ExtendedFiltration>
          <Footer>
            <Button size="small" type="ghost">
              Отмена
            </Button>
            <Button size="small">Применить фильтр</Button>
          </Footer>
        </>
      )}
    </Wrapper>
  );
};
