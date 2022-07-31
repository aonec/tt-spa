import React from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { $actTypes } from '../../displayActTypes/models';
import { Checkbox } from 'antd';
import { $actResources } from '../../displayActResources/models';
import { ActOrderFieldName, expandedFilterForm, searchForm } from '../models';
import { useForm } from 'effector-forms/dist';
import { ReactComponent as SortIcon } from './filterButton/assets/sortArrows.svg';
import { ReactComponent as SortIconTop } from './filterButton/assets/sortArrowsTop.svg';
import { ReactComponent as SortIconBottom } from './filterButton/assets/sortArrowsBottom.svg';
import { EActResourceType, EActType, EOrderByRule } from '../../../../../api/types';
import { FilterExtendedSearch } from '../../../../../ui-kit/shared_components/FilterExtendedSearch';
import { Grid } from '../../../../shared/ui/Layout/Grid';


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

  const handleUpdateResources = (resources: EActResourceType[]) => {
    allowedActResources.onChange(resources);
  };

  return (
    <FilterExtendedSearch
      allowedFilters={resources}
      handleUpdate={handleUpdateResources}
      selectedFilters={allowedActResources.value}
    />
  );
};

const TypeDocumentExtendedSearch = () => {
  const actTypes = useStore($actTypes);
  const {
    fields: { allowedActTypes },
  } = useForm(expandedFilterForm);

  const handleUpdateActTypes = (actTypes: EActType[]) => {
    allowedActTypes.onChange(actTypes);
  };

  return (
    <FilterExtendedSearch
      allowedFilters={actTypes}
      handleUpdate={handleUpdateActTypes}
      selectedFilters={allowedActTypes.value}
    />
  );
};

export const gridTemp = '0.63fr 0.7fr 1.4fr 0.7fr 2.1fr 1fr';

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
