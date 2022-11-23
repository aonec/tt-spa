import { EditNodeCalculatorConnectionContainer } from '01/features/nodes/editNode/editNodeCalculatorConnection/EditNodeCalculatorConnectionContainer';
import { PageHeader } from '01/shared/ui/PageHeader';
import React, { FC } from 'react';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';
import { NodeEditGrouptype } from '../../editNodeService.constants';
import { EditNodeCommonInfo } from './EditNodeCommonInfo';
import {
  AddressWrapper,
  HeaderWrapper,
  ResourceIconWrapper,
  TabsSC,
} from './EditNodePage.styled';
import { EditNodePageProps } from './EditNodePage.types';
const { TabPane } = TabsSC;

export const EditNodePage: FC<EditNodePageProps> = ({
  node,
  grouptype,
  setGrouptype,
}) => {
  const { number, address, resource } = node;

  return (
    <>
      <GoBack />
      <HeaderWrapper>
        <ResourceIconWrapper>
          <ResourceIconLookup resource={resource} />
        </ResourceIconWrapper>
        <PageHeader title={`Узел ${number}. Редактирование`} />
      </HeaderWrapper>
      <AddressWrapper to={`/objects/profile/${address?.id}`}>
        {getHousingStockAddress(address, true)}
      </AddressWrapper>

      <TabsSC
        activeKey={grouptype}
        onChange={(grouptype) => setGrouptype(grouptype as NodeEditGrouptype)}
      >
        <TabPane tab="Общая информация" key={NodeEditGrouptype.CommonInfo}>
          <EditNodeCommonInfo />
        </TabPane>
        <TabPane tab="Настройки соединения" key={NodeEditGrouptype.Connection}>
          <EditNodeCalculatorConnectionContainer />
        </TabPane>
        <TabPane
          tab="Подключенные приборы"
          key={NodeEditGrouptype.Devices}
        ></TabPane>
        <TabPane tab="Документы" key={NodeEditGrouptype.Documents}></TabPane>
      </TabsSC>
    </>
  );
};
