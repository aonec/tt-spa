import { FC, useMemo } from 'react';
import { Wrapper } from './AnalyticsSearch.styled';
import { Props } from './AnalyticsSearch.types';
import { RangePicker } from 'ui-kit/RangePicker';
import { Select } from 'ui-kit/Select';
import { StyledMenuButton } from 'ui-kit/ContextMenuButton/ContextMenuButton.styled';
import { ResetIcon } from 'ui-kit/icons';
import { Tooltip } from 'antd';
import { AddressTreeSelect } from 'ui-kit/shared/AddressTreeSelect';
import { getTreeDataOfManagementFirms } from './AnalyticsSearch.utils';

export const AnalyticsSearch: FC<Props> = ({ managementFirms }) => {
  const treeData = useMemo(
    () => getTreeDataOfManagementFirms(managementFirms),
    [managementFirms],
  );

  return (
    <Wrapper>
      <RangePicker small format="DD.MM.YYYY" />
      <Select placeholder="Округ" small />
      <Select placeholder="Район" small />
      <Select placeholder="УК" small>
        {managementFirms?.map((elem) => (
          <Select.Option key={elem.id} value={elem.id}>
            {elem.name}
          </Select.Option>
        ))}
      </Select>
      <AddressTreeSelect
        small
        placeholder="Адрес"
        selectedHousingStockIds={[]}
        treeData={treeData}
        onChange={(values) => {}}
        // setFieldValue('housingStockIds', values)
      />
      <Tooltip title="Сбросить фильтры">
        <StyledMenuButton size="small">
          <ResetIcon />
        </StyledMenuButton>
      </Tooltip>
    </Wrapper>
  );
};
