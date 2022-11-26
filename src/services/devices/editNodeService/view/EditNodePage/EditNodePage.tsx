import { EditNodeCalculatorConnectionContainer } from '01/features/nodes/editNode/editNodeCalculatorConnection/EditNodeCalculatorConnectionContainer';
import { PageHeader } from '01/shared/ui/PageHeader';
import NodeRelatedDevices from '01/tt-components/NodeRelatedDevices';
import ModalAddDevice from '01/_pages/EditNode/components/Modals/ModalAddDevice';
import React, { FC, useState } from 'react';
import { Button } from 'ui-kit/Button';
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
import { EditNodeRelatedDevices } from './EditNodeRelatedDevices';
import { EditNodeUploadDocuments } from './EditNodeUploadDocuments';
const { TabPane } = TabsSC;

export const EditNodePage: FC<EditNodePageProps> = ({
  node,
  grouptype,
  setGrouptype,
  openAddNewZonesModal,
  nodeZones,
  magistrals,
  refetchNode,
}) => {
  const { number, address, resource, documents } = node;

  const formId = 'edit-node-page';

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
        </TabPane>
        <TabPane tab="Настройки соединения" key={NodeEditGrouptype.Connection}>
          <EditNodeCalculatorConnectionContainer />
        </TabPane>
        <TabPane tab="Подключенные приборы" key={NodeEditGrouptype.Devices}>
          <EditNodeRelatedDevices
            node={node}
            magistrals={magistrals}
            refetchNode={refetchNode}
          />
        </TabPane>
        <TabPane tab="Документы" key={NodeEditGrouptype.Documents}>
          <EditNodeUploadDocuments documents={documents || []} />
        </TabPane>
      </TabsSC>
    </>
  );
};
