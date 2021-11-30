import { Grid } from '01/shared/ui/Layout/Grid';
import React from 'react';
import styled from 'styled-components';
import { FilterButton } from './filterButton/FIlterButton';
import { useStore } from 'effector-react';
import { $actTypes } from '../../displayActTypes/models';
import { Checkbox } from 'antd';
import { $actResources } from '../../displayActResources/models';
import { expandedFilterForm } from '../models';
import { useForm } from 'effector-forms/dist';

export const TableHeader = () => {
  const columnTitles = [
    { text: 'Дата документа' },
    { text: '№ док' },
    { text: 'Тип документа', extended: <TypeDocumentExtendedSearch /> },
    { text: 'Ресурс', extended: <ResourceExtendedSearch /> },
    { text: 'Адрес' },
    { text: 'Дата работ' },
  ];

  return (
    <Wrap temp={gridTemp} gap="15px">
      {columnTitles.map(({ text, extended }) => (
        <Title>
          <div>{text}</div>
          <div>{extended}</div>
        </Title>
      ))}
    </Wrap>
  );
};

const ResourceExtendedSearch = () => {
  const resources = useStore($actResources);
  const {
    fields: { allowedActResources },
  } = useForm(expandedFilterForm);

  const CheckboxWrap = styled.div`
    margin-bottom: 9px;
    width: 90px;

    &:last-child {
      margin-bottom: none;
    }
  `;

  return (
    <FilterButton onClear={() => allowedActResources.onChange([])}>
      {resources?.map((elem) => {
        const checked = allowedActResources.value.includes(elem.key!);
        return (
          <CheckboxWrap>
            <Checkbox
              checked={checked}
              onClick={() =>
                allowedActResources.onChange(
                  checked
                    ? allowedActResources.value.filter(
                        (resource) => resource !== elem.key
                      )
                    : [...allowedActResources.value, elem.key!]
                )
              }
            >
              {elem.value}
            </Checkbox>
          </CheckboxWrap>
        );
      })}
    </FilterButton>
  );
};

const TypeDocumentExtendedSearch = () => {
  const actTypes = useStore($actTypes);
  const {
    fields: { allowedActTypes },
  } = useForm(expandedFilterForm);

  const CheckboxWrap = styled.div`
    margin-bottom: 9px;

    &:last-child {
      margin-bottom: none;
    }
  `;

  return (
    <FilterButton onClear={() => allowedActTypes.onChange([])}>
      {actTypes?.map((elem) => {
        const checked = allowedActTypes.value.includes(elem.key!);

        return (
          <CheckboxWrap>
            <Checkbox
              checked={checked}
              onClick={() =>
                allowedActTypes.onChange(
                  checked
                    ? allowedActTypes.value.filter(
                        (resource) => resource !== elem.key
                      )
                    : [...allowedActTypes.value, elem.key!]
                )
              }
            >
              {elem.value}
            </Checkbox>
          </CheckboxWrap>
        );
      })}
    </FilterButton>
  );
};

export const gridTemp = '0.63fr 0.7fr 1.4fr 0.7fr 2.1fr 0.85fr';

const Wrap = styled(Grid)`
  background: #f3f5f6;
  padding: 15px 0 15px 15px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  color: rgba(39, 47, 90, 0.9);
  font-size: 12px;
`;
