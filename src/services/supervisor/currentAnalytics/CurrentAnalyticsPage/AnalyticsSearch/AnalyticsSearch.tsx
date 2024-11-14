import { FC } from 'react';
import { Wrapper } from './AnalyticsSearch.styled';
import { Props } from './AnalyticsSearch.types';
import { RangePicker } from 'ui-kit/RangePicker';
import { Select } from 'ui-kit/Select';
import { StyledMenuButton } from 'ui-kit/ContextMenuButton/ContextMenuButton.styled';
import { ResetIcon } from 'ui-kit/icons';
import { Tooltip } from 'antd';
import { AddressTreeSelect } from 'ui-kit/shared/AddressTreeSelect';
import dayjs from 'dayjs';

export const AnalyticsSearch: FC<Props> = ({
  dashboardFilters,
  setDashboardFilters,
  resetDashboardFilters,
}) => {
  return (
    <Wrapper>
      <RangePicker
        small
        format="DD.MM.YYYY"
        value={
          Boolean(dashboardFilters.From && dashboardFilters.To)
            ? [dayjs(dashboardFilters.From), dayjs(dashboardFilters.To)]
            : [null, null]
        }
        onChange={(value) => {
          setDashboardFilters({
            From: value?.[0]?.toISOString(),
            To: value?.[1]?.toISOString(),
          });
        }}
      />
      <Select placeholder="Город" small />
      <Select
        placeholder="УК"
        small
        // value={dashboardFilters.addressHousingManagementId}
        // onChange={(value) =>
        //   setDashboardFilters({ addressHousingManagementId: value as any })
        // }
        allowClear
      ></Select>
      <AddressTreeSelect
        small
        placeholder="Адрес"
        selectedHousingStockIds={dashboardFilters.BuildingIds || []}
        treeData={[]}
        onChange={(values) => {
          setDashboardFilters({ BuildingIds: values });
        }}
      />
      <Tooltip title="Сбросить фильтры">
        <StyledMenuButton size="small" onClick={resetDashboardFilters}>
          <ResetIcon />
        </StyledMenuButton>
      </Tooltip>
    </Wrapper>
  );
};
