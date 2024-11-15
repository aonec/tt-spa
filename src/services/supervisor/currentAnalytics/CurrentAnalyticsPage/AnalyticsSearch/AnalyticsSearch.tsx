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

export const AnalyticsSearch: FC<Props> = ({
  dashboardFilters,
  setDashboardFilters,
  resetDashboardFilters,
  isCommon,
  selectValue,
  setValue,
}) => {
  const { existingCities } = useUnit({
    existingCities: addressSearchService.outputs.$existingCities,
  });

  return (
    <Wrapper>
      {!isCommon && (
        <RangePicker
          small
          format="DD.MM.YYYY"
          value={
            Boolean(dashboardFilters.From && dashboardFilters.To)
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
          disabledDate={(date) => date.isAfter(dayjs())}
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
              setValue && setValue(value);
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
              setValue && setValue(value);
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
              setValue && setValue(value);
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
        onChange={(city) => setDashboardFilters({ City: city as string })}
      >
        {existingCities?.map((city) => (
          <Select.Option key={city} value={city}>
            {city}
          </Select.Option>
        ))}
      </Select>
      <Select placeholder="УК" small allowClear></Select>
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
