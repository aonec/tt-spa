import React, { FC, ReactNode } from 'react';
import { Empty } from 'antd';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { PageHeader } from '01/shared/ui/PageHeader';
import { HeaderInfoString } from 'ui-kit/shared_components/HeaderInfoString';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import {
  Title,
  ContentWrapper,
  TabsWrapper,
  Wrapper,
} from './NodeProfilePage.styled';
import {
  NodeProfilePageProps,
  PipeNodeProfileSection,
} from './NodeProfilePage.types';
import { getHousingStockItemAddress } from 'utils/getHousingStockItemAddress';
import { HeaderInfoStringWrapper } from 'ui-kit/shared_components/GoBack/GoBack.styled';
import { Tabs } from 'ui-kit/Tabs';
import { LinkCard } from 'ui-kit/shared_components/LinkCard';
import { CommonInfoTab } from './CommonInfoTab';
import { HousingMeteringDeviceReadingsContainer } from 'services/devices/housingMeteringDeviceReadingsService';
import { getDeviceIds } from 'services/devices/housingMeteringDeviceReadingsService/housingMeteringDeviceReadingsService.utils';
import { DisplayNodesStatisticsContainer } from 'services/displayNodesStatisticsService';

export const NodeProfilePage: FC<NodeProfilePageProps> = ({
  isLoading,
  pipeNode,
  section = PipeNodeProfileSection.Common,
  handleChangeTab,
}) => {
  const address = pipeNode?.address?.address;

  const contentComponents: {
    [key in PipeNodeProfileSection]: ReactNode;
  } = {
    [PipeNodeProfileSection.Common]: pipeNode && (
      <CommonInfoTab pipeNode={pipeNode} />
    ),
    [PipeNodeProfileSection.Readings]: pipeNode && (
      <HousingMeteringDeviceReadingsContainer
        nodeId={pipeNode.id}
        resource={pipeNode.resource}
        deviceIds={getDeviceIds(pipeNode)}
      />
    ),
    [PipeNodeProfileSection.Stats]: pipeNode && (
      <DisplayNodesStatisticsContainer
        nodeId={pipeNode.id}
        pipeCount={pipeNode.communicationPipes?.length || 0}
      />
    ),
    [PipeNodeProfileSection.Connection]: <></>,
    [PipeNodeProfileSection.Related]: <></>,
    [PipeNodeProfileSection.Checks]: <></>,
    [PipeNodeProfileSection.Documents]: <></>,
  };

  const contentComponent = contentComponents[section];

  return (
    <WithLoader isLoading={isLoading}>
      {pipeNode && (
        <div>
          <GoBack />
          <PageHeader
            title={
              <Title>
                <ResourceIconLookup
                  resource={pipeNode.resource}
                  style={{ transform: 'scale(1.2)' }}
                />
                <div>Узел {pipeNode.number}</div>
              </Title>
            }
            isTopMargin
            contextMenu={{
              menuButtons: [],
            }}
          />
          <HeaderInfoStringWrapper>
            <HeaderInfoString>
              <div>{address?.mainAddress?.city}</div>
              <div>
                {address?.mainAddress &&
                  getHousingStockItemAddress(address?.mainAddress)}
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
              <Tabs.TabPane
                tab="Ввод показаний"
                key={PipeNodeProfileSection.Readings}
              />
              <Tabs.TabPane
                tab="Настройки соединения"
                key={PipeNodeProfileSection.Connection}
              />
              <Tabs.TabPane
                tab="Подключенные приборы"
                key={PipeNodeProfileSection.Related}
              />
              <Tabs.TabPane
                tab="Документы"
                key={PipeNodeProfileSection.Documents}
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
                link={`/tasks`}
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
