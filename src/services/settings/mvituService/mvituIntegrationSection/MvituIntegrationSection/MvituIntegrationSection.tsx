import { FC } from 'react';
import { Switch } from 'antd';
import {
  IntegrationPanel,
  IntegrationPanelTitle,
  SearchWrapper,
  Wrapper,
} from './MvituIntegrationSection.styled';
import { Props } from './MvituIntegrationSection.types';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import { Table } from 'ui-kit/Table';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import { NodeIntegrationStatus } from './NodeIntegrationStatus';

export const MvituIntegrationSection: FC<Props> = ({ mvituNodesList }) => {
  return (
    <Wrapper>
      <IntegrationPanel>
        <IntegrationPanelTitle>Интеграция с ВИС МВИТУ</IntegrationPanelTitle>
        <Switch />
      </IntegrationPanel>
      <SearchWrapper>
        <Input placeholder="Адрес" small />
        <Select placeholder="Статус" small />
      </SearchWrapper>
      <Table
        floating
        columns={[
          {
            label: 'Адрес',
            size: '350px',
            render: (item) => <>{item.building?.addressStr}</>,
          },
          {
            label: 'Рес.',
            size: '100px',
            render: (item) => <ResourceIconLookup resource={item.resource} />,
          },
          {
            label: 'Наименование узла',
            size: '200px',
            render: (item) => <>Узел {item.title}</>,
          },
          {
            label: 'Статус интеграции',
            size: '150px',
            render: (item) => (
              <>
                <NodeIntegrationStatus status={item.status} />
              </>
            ),
          },
        ]}
        elements={mvituNodesList?.items || []}
      />
    </Wrapper>
  );
};
