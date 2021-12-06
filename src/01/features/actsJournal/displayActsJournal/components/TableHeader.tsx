import { Grid } from '01/shared/ui/Layout/Grid';
import React from 'react';
import styled from 'styled-components';
import { FilterButton } from './filterButton/FIlterButton';
import { useStore } from 'effector-react';
import { $actTypes } from '../../displayActTypes/models';
import { Checkbox } from 'antd';
import { $actResources } from '../../displayActResources/models';
import { ActOrderFieldName, expandedFilterForm, searchForm } from '../models';
import { useForm } from 'effector-forms/dist';
import { ReactComponent as SortIcon } from './filterButton/assets/sortArrows.svg';
import { ReactComponent as SortIconTop } from './filterButton/assets/sortArrowsTop.svg';
import { ReactComponent as SortIconBottom } from './filterButton/assets/sortArrowsBottom.svg';
import { EOrderByRule } from 'myApi';

export const TableHeader = () => {
  const columnTitles = [
    { text: 'Дата акта', extended: <SortButton name="ActDateOrderBy" /> },
    { text: '№ док', extended: <SortButton name="RegistryNumberOrderBy" /> },
    { text: 'Тип документа', extended: <TypeDocumentExtendedSearch /> },
    { text: 'Ресурс', extended: <ResourceExtendedSearch /> },
    { text: 'Адрес', extended: <SortButton name="AddressOrderBy" /> },
    {
      text: 'Дата работ',
      extended: (
        <div style={{ margin: '0 15px 0 0' }}>
          <SortButton name="ActJobDateOrderBy" />
        </div>
      ),
    },
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

const SortButton: React.FC<{ name: ActOrderFieldName }> = ({ name }) => {
  const { fields } = useForm(searchForm);

  const field = fields[name];

  const value = field.value;
  const onChange = field.onChange;

  function onClickHandler() {
    console.log('click');

    onChange(
      value === null
        ? EOrderByRule.Ascending
        : value === EOrderByRule.Ascending
        ? EOrderByRule.Descending
        : null
    );
  }

  const Icon =
    value === null
      ? SortIcon
      : value === EOrderByRule.Ascending
      ? SortIconTop
      : SortIconBottom;

  return (
    <div onClick={onClickHandler} style={{ cursor: 'pointer' }}>
      <Icon />
    </div>
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
    <FilterButton
      onClear={() => allowedActResources.onChange([])}
      active={allowedActResources.value.length !== 0}
    >
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
    <FilterButton
      onClear={() => allowedActTypes.onChange([])}
      active={allowedActTypes.value.length !== 0}
    >
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
  user-select: none;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  color: rgba(39, 47, 90, 0.9);
  font-size: 12px;
`;
