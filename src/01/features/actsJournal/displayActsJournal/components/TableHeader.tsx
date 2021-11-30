import { Grid } from '01/shared/ui/Layout/Grid';
import React from 'react';
import styled from 'styled-components';
import { FilterButton } from './filterButton/FIlterButton';
import { useStore } from 'effector-react';
import { $actTypes } from '../../displayActTypes/models';
import { Checkbox } from 'antd';
import { Space, SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { $actResources } from '../../displayActResources/models';
import { getIconFromResource } from './ApartmentActsList';
import { Flex } from '01/shared/ui/Layout/Flex';

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

  const CheckboxWrap = styled.div`
    margin-bottom: 9px;
    width: 90px;

    &:last-child {
      margin-bottom: none;
    }
  `;

  return (
    <FilterButton>
      <div>
        {resources?.map((elem) => (
          <CheckboxWrap>
            <Checkbox>{elem.value}</Checkbox>
          </CheckboxWrap>
        ))}
      </div>
      <div style={{ marginTop: -10 }}>
        <SpaceLine />
      </div>
      <div
        className="ant-btn-link"
        style={{ marginTop: -5, cursor: 'pointer' }}
      >
        Сбросить
      </div>
    </FilterButton>
  );
};

const TypeDocumentExtendedSearch = () => {
  const actTypes = useStore($actTypes);

  const CheckboxWrap = styled.div`
    margin-bottom: 9px;

    &:last-child {
      margin-bottom: none;
    }
  `;

  return (
    <FilterButton>
      <div>
        {actTypes?.map((elem) => (
          <CheckboxWrap>
            <Checkbox>{elem.value}</Checkbox>
          </CheckboxWrap>
        ))}
      </div>
      <div style={{ marginTop: -10 }}>
        <SpaceLine />
      </div>
      <div
        className="ant-btn-link"
        style={{ marginTop: -5, cursor: 'pointer' }}
      >
        Сбросить
      </div>
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
