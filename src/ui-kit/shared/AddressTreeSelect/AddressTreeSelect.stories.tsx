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
import { StreetWithBuildingNumbersResponse } from 'api/types';

export default {
  title: 'AddressTreeSelect',
  component: AddressTreeSelect,
  parameters: { layout: 'centered' },
} as ComponentMeta<typeof AddressTreeSelect>;

export const Form = () => {
  const [selectedIdsHashs, setSelectedIdsHashs] = useState<string[]>([]);
  return (
    <Wrapper>
      <FormItem>
        <AddressTreeSelect
          selectedHousingStockIdsHashs={selectedIdsHashs}
          onChange={(idsHashs) => setSelectedIdsHashs(idsHashs)}
          treeData={prepareAddressesForTreeSelect({
            items: TreeData[0].streets as StreetWithBuildingNumbersResponse[],
          })}
        />
      </FormItem>
    </Wrapper>
  );
};

export const Search = () => {
  const [selectedIdsHashs, setSelectedIdsHashs] = useState<string[]>([]);

  return (
    <Wrapper>
      <FormItem>
        <AddressTreeSelect
          small
          selectedHousingStockIdsHashs={selectedIdsHashs}
          onChange={(idsHashs) => setSelectedIdsHashs(idsHashs)}
          placeholder="Выберите из списка"
          treeData={prepareAddressesWithParentsForTreeSelect(TreeData)}
        />
      </FormItem>
    </Wrapper>
  );
};
