import React, { useState } from 'react';
import { ComponentMeta } from '@storybook/react';
import { AddressTreeSelect } from '.';
import {
  prepareAddressesForTreeSelect,
  prepareAddressesWithParentsForTreeSelect,
} from './AddressTreeSelect.utils';
import { TreeData } from './AddressTreeSelect.constants.stories';
import { Wrapper } from './AddressTreeSelect.styled.stories';
import { FormItem } from 'ui-kit/FormItem';
import { StreetWithBuildingNumbersResponse } from 'myApi';

export default {
  title: 'AddressTreeSelect',
  component: AddressTreeSelect,
  parameters: { layout: 'centered' },
} as ComponentMeta<typeof AddressTreeSelect>;

export const Form = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  return (
    <Wrapper>
      <FormItem>
        <AddressTreeSelect
          selectedHousingStockIds={selectedIds}
          onChange={(ids) => setSelectedIds(ids)}
          treeData={prepareAddressesForTreeSelect({
            items: TreeData[0].streets as StreetWithBuildingNumbersResponse[],
          })}
        />
      </FormItem>
    </Wrapper>
  );
};

export const Search = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  return (
    <Wrapper>
      <FormItem>
        <AddressTreeSelect
          small
          selectedHousingStockIds={selectedIds}
          onChange={(ids) => setSelectedIds(ids)}
          placeholder="Выберите из списка"
          treeData={prepareAddressesWithParentsForTreeSelect(TreeData)}
        />
      </FormItem>
    </Wrapper>
  );
};
