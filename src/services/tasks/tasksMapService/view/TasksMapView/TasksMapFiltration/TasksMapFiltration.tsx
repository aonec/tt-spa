import React, { FC, useState } from 'react';
import { ChevronUp } from 'react-bootstrap-icons';
import { SearchIcon } from 'ui-kit/icons';
import { FilterButton, SelectSC } from '01/shared/ui/Fields';
import { HideExtendedSearchButton } from '01/shared/ui/ExtendedSearch/components';
import {
  CloseIconSC,
  ExtendedFiltration,
  FilterHeader,
  SearchInput,
  Wrapper,
} from './TasksMapFiltration.styled';
import { TasksMapFiltrationProps } from './TasksMapFiltration.types';
import { Button } from 'ui-kit/Button';
import { FormItem } from 'ui-kit/FormItem';
import { ItemPanelsSelect } from 'ui-kit/shared_components/ItemPanelsSelect';
import { EResourceType } from 'myApi';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { ResourceMapNamesDictionary } from 'dictionaries';
import { useFormik } from 'formik';

export const TasksMapFiltration: FC<TasksMapFiltrationProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { values, setFieldValue } = useFormik({
    initialValues: {
      resource: [] as EResourceType[],
    },
    onSubmit: () => void 0,
  });

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
              <SelectSC placeholder="Выберите"></SelectSC>
            </FormItem>
            <FormItem label="Тип ресурса">
              <ItemPanelsSelect<EResourceType>
                items={[
                  EResourceType.ColdWaterSupply,
                  EResourceType.HotWaterSupply,
                  EResourceType.Heat,
                  EResourceType.Electricity,
                ].map((resource) => ({
                  key: resource,
                  icon: <ResourceIconLookup resource={resource} />,
                  title: ResourceMapNamesDictionary[resource],
                }))}
                selected={values.resource}
                onChange={(value) => setFieldValue('resource', value)}
              />
            </FormItem>
          </ExtendedFiltration>
        </>
      )}
    </Wrapper>
  );
};
