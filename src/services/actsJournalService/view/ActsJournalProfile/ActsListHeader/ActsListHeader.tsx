import React, { FC } from 'react';
import { SortButtonSC, Title, Wrapper } from './ActsListHeader.styled';
import { ActsListHeaderProps } from './ActsListHeader.types';
import { FilterExtendedSearch } from 'ui-kit/shared/FilterExtendedSearch';
import { EActResourceType, EActType } from 'api/types';
import { ActTypesNamesLookup } from 'dictionaries';
import { SortButton } from './SortButton';
import { actResourceNames } from '../AddNewActForm/AddNewActForm';

export const ActsListHeader: FC<ActsListHeaderProps> = ({
  setActsFilter,
  filter,
}) => {
  const resources = Object.entries(actResourceNames).map(([key, value]) => ({
    key: key as EActResourceType,
    value,
  }));

  const actTypes = Object.entries(ActTypesNamesLookup).map(([key, value]) => ({
    key: key as EActType,
    value,
  }));

  return (
    <Wrapper>
      <Title>
        Дата акта
        <SortButton
          onChange={(value) =>
            setActsFilter({ ActDateOrderBy: value || undefined })
          }
          value={filter.ActDateOrderBy}
        />
      </Title>
      <Title>
        № док
        <SortButton
          onChange={(value) =>
            setActsFilter({ RegistryNumberOrderBy: value || undefined })
          }
          value={filter.RegistryNumberOrderBy}
        />
      </Title>
      <Title>
        Тип документа
        <FilterExtendedSearch
          allowedFilters={actTypes}
          handleUpdate={(types) => setActsFilter({ ActTypes: types })}
          selectedFilters={filter.ActTypes || []}
        />
      </Title>
      <Title>
        Ресурс
        <FilterExtendedSearch
          allowedFilters={resources}
          handleUpdate={(resources) =>
            setActsFilter({ ActResourceTypes: resources })
          }
          selectedFilters={filter.ActResourceTypes || []}
        />
      </Title>
      <Title>
        Адрес
        <SortButton
          onChange={(value) =>
            setActsFilter({ AddressOrderBy: value || undefined })
          }
          value={filter.AddressOrderBy}
        />
      </Title>
      <Title>
        Дата работ
        <SortButtonSC
          onChange={(value) =>
            setActsFilter({ ActJobDateOrderBy: value || undefined })
          }
          value={filter.ActJobDateOrderBy}
        />
      </Title>
    </Wrapper>
  );
};
