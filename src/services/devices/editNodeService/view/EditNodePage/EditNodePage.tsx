import { EditNodeCalculatorConnectionContainer } from '01/features/nodes/editNode/editNodeCalculatorConnection/EditNodeCalculatorConnectionContainer';
import { PageHeader } from '01/shared/ui/PageHeader';
import React, { FC } from 'react';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { HeaderInfoString } from 'ui-kit/shared_components/HeaderInfoString';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';
import { NodeEditGrouptype } from '../../editNodeService.constants';
import { EditNodeCommonInfo } from './EditNodeCommonInfo';
import { NodeRegistrationTypeLookup } from './EditNodePage.constants';
import { ContentWrapper } from './EditNodePage.styled';
import {
  AddressWrapper,
  HeaderWrapper,
  ResourceIconWrapper,
  TabsSC,
} from './EditNodePage.styled';
import { EditNodePageProps } from './EditNodePage.types';
import { EditNodeRelatedDevices } from './EditNodeRelatedDevices';
import { EditNodeUploadDocumentsContainer } from './editNodeUploadDocumentsService';
const { TabPane } = TabsSC;

export const EditNodePage: FC<EditNodePageProps> = ({
  node,
  grouptype,
  setGrouptype,
  openAddNewZonesModal,
  nodeZones,
  magistrals,
  refetchNode,
  updateNode,
}) => {
  const { number, address, resource, registrationType } = node;

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
        <HeaderInfoString>
          <>{getHousingStockAddress(address, true)}</>
          <>{NodeRegistrationTypeLookup[registrationType]}</>
        </HeaderInfoString>
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
            updateNode={updateNode}
          />
        </TabPane>

        <TabPane tab="Настройки соединения" key={NodeEditGrouptype.Connection}>
          <ContentWrapper>
            <EditNodeCalculatorConnectionContainer />
          </ContentWrapper>
        </TabPane>

        <TabPane tab="Подключенные приборы" key={NodeEditGrouptype.Devices}>
          <ContentWrapper>
            <EditNodeRelatedDevices
              node={node}
              magistrals={magistrals}
              refetchNode={refetchNode}
            />
          </ContentWrapper>
        </TabPane>

        <TabPane tab="Документы" key={NodeEditGrouptype.Documents}>
          <ContentWrapper>
            <EditNodeUploadDocumentsContainer />
          </ContentWrapper>
        </TabPane>
      </TabsSC>
    </>
  );
};
