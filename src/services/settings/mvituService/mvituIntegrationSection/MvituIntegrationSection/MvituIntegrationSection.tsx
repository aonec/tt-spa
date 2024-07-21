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

export const MvituIntegrationSection: FC<Props> = () => {
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
          { label: 'Адрес', size: '400px', render: () => <></> },
          { label: 'Рес.', size: '100px', render: () => <></> },
          { label: 'Наименование узла', size: '200px', render: () => <></> },
          { label: 'Статус интеграции', size: '150px', render: () => <></> },
          {
            label: 'Дата последнего передан. архива',
            size: '300px',
            render: () => <></>,
          },
        ]}
        elements={[]}
      />
    </Wrapper>
  );
};
