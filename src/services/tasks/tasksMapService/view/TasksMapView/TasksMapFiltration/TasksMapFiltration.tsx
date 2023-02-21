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

export const TasksMapFiltration: FC<TasksMapFiltrationProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

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
            <FormItem label="Тип ресурса"></FormItem>
          </ExtendedFiltration>
        </>
      )}
    </Wrapper>
  );
};
