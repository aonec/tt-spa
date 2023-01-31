import { EditNodeCalculatorConnectionContainer } from '01/features/nodes/editNode/editNodeCalculatorConnection/EditNodeCalculatorConnectionContainer';
import { Alert } from '01/shared/ui/Alert';
import { PageHeader } from '01/shared/ui/PageHeader';
import React, { FC } from 'react';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { HeaderInfoString } from 'ui-kit/shared_components/HeaderInfoString';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';
import { NodeEditGrouptype } from '../../editNodeService.constants';
import { EditNodeCommonInfo } from './EditNodeCommonInfo';
import { NodeRegistrationTypeLookup } from './EditNodePage.constants';
import {
  CommonInfoWrapper,
  ContentWrapper,
  ErrorContentWrapper,
  LinkText,
} from './EditNodePage.styled';
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

  const isIncorrectConfig =
    node?.validationResult?.errors?.length !== 0 ||
    node?.validationResult?.warnings?.length !== 0;

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
          <CommonInfoWrapper>
            {isIncorrectConfig && (
              <Alert type="incorrect" color="FC525B">
                <ErrorContentWrapper>
                  <span>
                    Данные с вычислителя не обрабатываются, так как узел не
                    соответвует выбранной конфигурации. Добавьте недостающий
                    прибор во вкладке “Подключенные приборы”
                  </span>
                  <LinkText
                    onClick={() => setGrouptype(NodeEditGrouptype.Devices)}
                  >
                    Перейти
                  </LinkText>
                </ErrorContentWrapper>
              </Alert>
            )}
            <EditNodeCommonInfo
              node={node}
              openAddNewZonesModal={openAddNewZonesModal}
              nodeZones={nodeZones}
              formId={formId}
              updateNode={updateNode}
            />
          </CommonInfoWrapper>
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
