import { FC } from 'react';
import { Wrapper } from './AnalyticsSearch.styled';
import { Props } from './AnalyticsSearch.types';
import { RangePicker } from 'ui-kit/RangePicker';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import { StyledMenuButton } from 'ui-kit/ContextMenuButton/ContextMenuButton.styled';
import { ResetIcon } from 'ui-kit/icons';
import { Tooltip } from 'antd';

export const AnalyticsSearch: FC<Props> = () => {
  return (
    <Wrapper>
      <RangePicker small format="DD.MM.YYYY" />
      <Select placeholder="Округ" small />
      <Select placeholder="Район" small />
      <Select placeholder="УК" small />
      <Input placeholder="Адрес" small />
      <Tooltip title="Сбросить фильтры">
        <StyledMenuButton size="small">
          <ResetIcon />
        </StyledMenuButton>
      </Tooltip>
    </Wrapper>
  );
};
