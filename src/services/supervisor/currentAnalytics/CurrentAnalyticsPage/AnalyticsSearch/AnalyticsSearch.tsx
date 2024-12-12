import { FC } from 'react';
import { Wrapper } from './AnalyticsSearch.styled';
import { EDateRange, Props } from './AnalyticsSearch.types';
import { RangePicker } from 'ui-kit/RangePicker';
import { Select } from 'ui-kit/Select';

import { StyledMenuButton } from 'ui-kit/ContextMenuButton/ContextMenuButton.styled';
import { ResetIcon } from 'ui-kit/icons';
import { Tooltip } from 'antd';
import { AddressTreeSelect } from 'ui-kit/shared/AddressTreeSelect';
import dayjs from 'dayjs';
import { useUnit } from 'effector-react';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';
import { Segmented } from 'ui-kit/Segmented';
import { currentAnalyticsService } from '../../currentAnalyticsService.models';

export const AnalyticsSearch: FC<Props> = ({
  dashboardFilters,
  setDashboardFilters,
  resetDashboardFilters,
  isCommon,
  selectValue,
  setValue,
  organizationsList,
}) => {
  const { existingCities, periodType, setPeriodType } = useUnit({
    existingCities: addressSearchService.outputs.$existingCities,
    periodType: currentAnalyticsService.outputs.$periodType,
    setPeriodType: currentAnalyticsService.inputs.setPeriodType,
  });

  return (
    <Wrapper isCommon={Boolean(isCommon)}>
      {!isCommon && (
        <Segmented
          active={periodType}
          items={[
            {
              title: 'На сегодня',
              name: 'today',
            },
            {
              title: 'Период',
              name: 'period',
            },
          ]}
          onChange={setPeriodType}
        />
      )}
      {!isCommon && (
        <RangePicker
          disabled={periodType === 'today'}
          small
          format="DD.MM.YYYY"
          value={
            dashboardFilters.From && dashboardFilters.To
              ? [
                  dayjs(dashboardFilters.From).utc(),
                  dayjs(dashboardFilters.To).utc(),
                ]
              : [null, null]
          }
          onChange={(value) => {
            setDashboardFilters({
              From: value?.[0]?.startOf('day').utc(true).toISOString(),
              To: value?.[1]?.endOf('day').utc(true).toISOString(),
            });
          }}
          disabledDate={(date) => {
            const now = dayjs();
            return date.isAfter(now) || date.isSame(now, 'day');
          }}
        />
      )}
      {isCommon && (
        <Select
          placeholder="Выберите"
          small
          value={selectValue}
          onChange={(value) => {
            if (value === EDateRange.Week) {
              setDashboardFilters({
                From: dayjs()
                  .subtract(1, 'week')
                  .startOf('day')
                  .utc(true)
                  .toISOString(),
                To: dayjs().endOf('day').utc(true).toISOString(),
              });
              if (setValue) setValue(value);
            }
            if (value === EDateRange.Month) {
              setDashboardFilters({
                From: dayjs()
                  .subtract(1, 'month')
                  .startOf('day')
                  .utc(true)
                  .toISOString(),
                To: dayjs().endOf('day').utc(true).toISOString(),
              });
              if (setValue) setValue(value);
            }
            if (value === EDateRange.Quarter) {
              setDashboardFilters({
                From: dayjs()
                  .subtract(3, 'months')
                  .startOf('day')
                  .utc(true)
                  .toISOString(),
                To: dayjs().endOf('day').utc(true).toISOString(),
              });
              if (setValue) setValue(value);
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

      <Select
        placeholder="Город"
        small
        value={dashboardFilters.City}
        allowClear
        onChange={(city) =>
          setDashboardFilters({ City: city as string, ManagementFirmId: null })
        }
      >
        {existingCities?.map((city) => (
          <Select.Option key={city} value={city}>
            {city}
          </Select.Option>
        ))}
      </Select>
      <Select
        placeholder="УК"
        small
        allowClear
        value={dashboardFilters.ManagementFirmId}
        onChange={(value) =>
          setDashboardFilters({ ManagementFirmId: value as number })
        }
      >
        {organizationsList?.items?.map((elem) => (
          <Select key={elem.id} value={elem.id}>
            {elem.name}
          </Select>
        ))}
      </Select>
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
