import { FC, useMemo } from 'react';
import { Wrapper } from './AnalyticsSearch.styled';
import { EDateRange, Props } from './AnalyticsSearch.types';
import { RangePicker } from 'ui-kit/RangePicker';
import { Select } from 'ui-kit/Select';
import { StyledMenuButton } from 'ui-kit/ContextMenuButton/ContextMenuButton.styled';
import { ResetIcon } from 'ui-kit/icons';
import { Tooltip } from 'antd';
import { AddressTreeSelect } from 'ui-kit/shared/AddressTreeSelect';
import { getTreeDataOfManagementFirms } from './AnalyticsSearch.utils';
import dayjs from 'dayjs';

export const AnalyticsSearch: FC<Props> = ({
  managementFirms,
  dashboardFilters,
  setDashboardFilters,
  resetDashboardFilters,
  isCommon,
}) => {
  const treeData = useMemo(
    () => getTreeDataOfManagementFirms(managementFirms),
    [managementFirms],
  );

  return (
    <Wrapper>
      {!isCommon && (
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
      )}
      {isCommon && (
        <Select
          placeholder="Выберите"
          small
          onChange={(value) => {
            if (value === EDateRange.Week) {
              setDashboardFilters({
                From: dayjs().subtract(1, 'week').startOf('day').toISOString(),
                To: dayjs().startOf('day').toISOString(),
              });
            }
            if (value === EDateRange.Month) {
              setDashboardFilters({
                From: dayjs().subtract(1, 'month').startOf('day').toISOString(),
                To: dayjs().startOf('day').toISOString(),
              });
            }
            if (value === EDateRange.Quarter) {
              setDashboardFilters({
                From: dayjs()
                  .subtract(3, 'months')
                  .startOf('day')
                  .toISOString(),
                To: dayjs().startOf('day').toISOString(),
              });
            }
          }}
        >
          <Select.Option key={EDateRange.Week} value={EDateRange.Week}>
            Последние 7 дней
          </Select.Option>
          <Select.Option key={EDateRange.Month} value={EDateRange.Month}>
            Последний месяц
          </Select.Option>
          <Select.Option key={EDateRange.Quarter} value={EDateRange.Quarter}>
            Последний квартал
          </Select.Option>
        </Select>
      )}
      <Select placeholder="Город" small />
      <Select
        placeholder="УК"
        small
        value={dashboardFilters.addressHousingManagementId}
        onChange={(value) =>
          setDashboardFilters({ addressHousingManagementId: value as any })
        }
        allowClear
      >
        {managementFirms?.map((elem) => (
          <Select.Option key={elem.id} value={elem.id}>
            {elem.name}
          </Select.Option>
        ))}
      </Select>
      <AddressTreeSelect
        small
        placeholder="Адрес"
        selectedHousingStockIds={dashboardFilters.BuildingIds || []}
        treeData={treeData}
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
