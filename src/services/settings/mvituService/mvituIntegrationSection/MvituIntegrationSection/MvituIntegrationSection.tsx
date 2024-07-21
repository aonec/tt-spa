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
        columns={[{ label: 'Адрес', size: '500px', render: () => <></> }]}
        elements={[]}
      />
    </Wrapper>
  );
};
