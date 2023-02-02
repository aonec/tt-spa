import React, { FC, ReactNode, useCallback, useMemo } from 'react';
import { stringifyUrl } from 'query-string';
import { Empty, Tooltip, message } from 'antd';

import { GoBack } from 'ui-kit/shared_components/GoBack';
import { HeaderInfoString } from 'ui-kit/shared_components/HeaderInfoString';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { Tabs } from 'ui-kit/Tabs';
import { LinkCard } from 'ui-kit/shared_components/LinkCard';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { PageHeader } from '01/shared/ui/PageHeader';
import { NodeConnection } from '01/tt-components/NodeConnection';
import { NodeChecksContainer } from '01/features/nodes/nodeChecks/displayNodeChecks/NodeChecksContainer';
import { ENodeRegistrationType } from 'myApi';
import { HousingMeteringDeviceReadingsContainer } from 'services/devices/housingMeteringDeviceReadingsService';
import { getDeviceIds } from 'services/devices/housingMeteringDeviceReadingsService/housingMeteringDeviceReadingsService.utils';
import { DisplayNodesStatisticsContainer } from 'services/displayNodesStatisticsService';

import {
  Title,
  ContentWrapper,
  TabsWrapper,
  Wrapper,
  HeaderWrapper,
  HeaderInfoStringWrapper,
  AdditionalAddress,
  IncorrectConfigurationIconSC,
  NodeNumberWrapper,
} from './NodeProfilePage.styled';
import {
  NodeProfilePageProps,
  PipeNodeProfileSection,
} from './NodeProfilePage.types';
import { getHousingStockItemAddress } from 'utils/getHousingStockItemAddress';
import { CommonInfoTab } from './CommonInfoTab';
import { HousingMeteringDevicesList } from './HousingMeteringDevicesList';

export const NodeProfilePage: FC<NodeProfilePageProps> = ({
  isLoading,
  pipeNode,
  section = PipeNodeProfileSection.Common,
  handleChangeTab,
  handleEditNode,
  openChangeNodeStatusModal,
  openChangeNodeTypeModal,
}) => {
  const address = pipeNode?.address?.address;

  const contentComponents = useMemo(() => {
    if (!pipeNode) return;

    const dictionary: {
      [key in PipeNodeProfileSection]: ReactNode;
    } = {
      [PipeNodeProfileSection.Common]: <CommonInfoTab pipeNode={pipeNode} />,
      [PipeNodeProfileSection.Readings]: (
        <HousingMeteringDeviceReadingsContainer
          nodeId={pipeNode.id}
          resource={pipeNode.resource}
          deviceIds={getDeviceIds(pipeNode)}
        />
      ),
      [PipeNodeProfileSection.Stats]: (
        <DisplayNodesStatisticsContainer
          nodeId={pipeNode.id}
          pipeCount={pipeNode.communicationPipes?.length || 0}
        />
      ),
      [PipeNodeProfileSection.Connection]: <NodeConnection node={pipeNode} />,
      [PipeNodeProfileSection.Related]: (
        <HousingMeteringDevicesList
          configuration={pipeNode.configuration}
          communicationPipes={pipeNode.communicationPipes || []}
        />
      ),
      [PipeNodeProfileSection.Checks]: (
        <NodeChecksContainer pipeNodeId={pipeNode.id} />
      ),
      [PipeNodeProfileSection.Documents]: <></>,
    };

    return dictionary;
  }, [pipeNode]);

  const contentComponent = contentComponents && contentComponents[section];

  const isShowReadingsTab =
    pipeNode?.calculator === null ||
    pipeNode?.calculator?.isConnected === false;

  const isNodeCommercial =
    pipeNode?.registrationType === ENodeRegistrationType.Commercial;

  const isIncorrectConfig =
    pipeNode?.validationResult?.errors?.length !== 0 ||
    pipeNode?.validationResult?.warnings?.length !== 0;

  const handleClickChangeNodeType = useCallback(() => {
    if (
      pipeNode &&
      pipeNode?.registrationType !== ENodeRegistrationType.Technical
    ) {
      return openChangeNodeTypeModal(pipeNode);
    }
    return message.error('Техническийй тип узла нельзя изменить!');
  }, [pipeNode, openChangeNodeTypeModal]);

  return (
    <WithLoader isLoading={isLoading}>
      {pipeNode && (
        <div>
          <GoBack />
          <HeaderWrapper>
            <PageHeader
              title={
                <Title>
                  <ResourceIconLookup
                    resource={pipeNode.resource}
                    style={{ transform: 'scale(1.2)' }}
                  />
                  <NodeNumberWrapper>
                    Узел {pipeNode.number}
                    {isIncorrectConfig && (
                      <Tooltip title="Проверьте конфигурацию узла">
                        <IncorrectConfigurationIconSC />
                      </Tooltip>
                    )}
                  </NodeNumberWrapper>
                </Title>
              }
              contextMenu={{
                menuButtons: [
                  {
                    title: 'Редактировать узел',
                    onClick: handleEditNode,
                  },
                  {
                    title: 'Сменить статус узла',
                    onClick: () => openChangeNodeStatusModal(pipeNode),
                    hidden: !isNodeCommercial,
                  },
                  {
                    title: 'Изменить тип узла',
                    onClick: handleClickChangeNodeType,
                    color: 'danger',
                  },
                ],
              }}
            />
          </HeaderWrapper>
          <HeaderInfoStringWrapper>
            <HeaderInfoString>
              <div>{address?.mainAddress?.city}</div>
              <div>
                {address?.mainAddress &&
                  getHousingStockItemAddress(address?.mainAddress)}{' '}
                {address?.additionalAddresses?.map((address) => (
                  <AdditionalAddress>
                    {getHousingStockItemAddress(address)}
                  </AdditionalAddress>
                ))}
              </div>
            </HeaderInfoString>
          </HeaderInfoStringWrapper>
          <TabsWrapper>
            <Tabs
              activeKey={section}
              onChange={(activeKey) =>
                handleChangeTab(activeKey as PipeNodeProfileSection)
              }
            >
              <Tabs.TabPane
                tab="Общие данные"
                key={PipeNodeProfileSection.Common}
              />
              <Tabs.TabPane
                tab="Статистика"
                key={PipeNodeProfileSection.Stats}
              />
              {isShowReadingsTab && (
                <Tabs.TabPane
                  tab="Ввод показаний"
                  key={PipeNodeProfileSection.Readings}
                />
              )}
              <Tabs.TabPane
                tab="Настройки соединения"
                key={PipeNodeProfileSection.Connection}
              />
              <Tabs.TabPane
                tab="Подключенные приборы"
                key={PipeNodeProfileSection.Related}
              />
              <Tabs.TabPane
                tab="История проверок"
                key={PipeNodeProfileSection.Checks}
              />
            </Tabs>
          </TabsWrapper>
          <Wrapper>
            <ContentWrapper>{contentComponent}</ContentWrapper>
            <div>
              <LinkCard
                text="Архив"
                link={`/nodeArchive/${pipeNode.id}`}
                showLink={true}
              />
              <LinkCard
                text={`Задачи: ${pipeNode.numberOfTasks}`}
                link={stringifyUrl({
                  url: '/tasks/list/Observing',
                  query: { pipeNodeId: pipeNode.id },
                })}
                showLink={Boolean(pipeNode.numberOfTasks)}
              />
            </div>
          </Wrapper>
        </div>
      )}
      {!pipeNode && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
    </WithLoader>
  );
};
