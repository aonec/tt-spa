import { EditNodeCalculatorConnectionContainer } from '01/features/nodes/editNode/editNodeCalculatorConnection/EditNodeCalculatorConnectionContainer';
import { PageHeader } from '01/shared/ui/PageHeader';
import { ButtonTT } from '01/tt-components';
import React, { FC, useMemo } from 'react';
import { Button } from 'ui-kit/Button';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';
import { NodeEditGrouptype } from '../../editNodeService.constants';
import { EditNodeCommonInfo } from './EditNodeCommonInfo';
import {
  AddressWrapper,
  ButtonSC,
  FooterWrapper,
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
  openAddNewZonesModal,
  nodeZones,
}) => {
  const { number, address, resource, documents } = node;

  const formId = 'edit-node-page';

  const footer = useMemo(
    () => (
      <FooterWrapper>
        <Button form={formId} type="ghost">
          Отмена
        </Button>

        <ButtonSC form={formId}>Сохранить</ButtonSC>
      </FooterWrapper>
    ),
    [formId]
  );

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
          <EditNodeCommonInfo
            node={node}
            openAddNewZonesModal={openAddNewZonesModal}
            nodeZones={nodeZones}
            formId={formId}
          />
          {footer}
        </TabPane>
        <TabPane tab="Настройки соединения" key={NodeEditGrouptype.Connection}>
          <EditNodeCalculatorConnectionContainer />
        </TabPane>
        <TabPane
          tab="Подключенные приборы"
          key={NodeEditGrouptype.Devices}
        ></TabPane>
        <TabPane tab="Документы" key={NodeEditGrouptype.Documents}>
          {footer}
        </TabPane>
      </TabsSC>
    </>
  );
};
