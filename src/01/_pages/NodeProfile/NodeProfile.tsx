import React from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import { Grid } from '../../_components/Grid';
import Documents from './components/Documents';
import { Loader } from '../../components';
import { Alert } from 'antd';
import NodeRelatedDevices from '../../tt-components/NodeRelatedDevices';
import Information from './components/Information';
import { NodeConnection } from '../../tt-components/NodeConnection';
import Tabs from '../../tt-components/Tabs';
import HousingMeteringDeviceReadings from '../../features/housingMeteringDeviceReadings/components';
import { NodeChecksContainer } from '01/features/nodes/nodeChecks/displayNodeChecks/NodeChecksContainer';
import { SidePanel } from '01/shared/ui/SidePanel';
import { RegisterNodeOnCommercialAccountingModalContainer } from '01/features/nodes/changeNodeStatusService/nodeCommercialRegistrationService';
import { ContentProps } from './NodeProfile.types';
import { DisplayNodesStatisticsContainer } from 'services/displayNodesStatisticsService';
import { HousingMeteringDeviceReadingsContainer } from 'services/devices/housingMeteringDeviceReadingsService';

export const Content: React.FC<ContentProps> = React.memo(
  ({ tabItems, node, loading, nodeId, path }) => {
    if (loading) {
      return <Loader size={'32'} show />;
    }
    if (!node) {
      return null;
    }

    const { resource, communicationPipes, nodeStatus, calculator } = node;

    const isVisible =
      resource && communicationPipes && communicationPipes.length > 0;

    return (
      <>
        <RegisterNodeOnCommercialAccountingModalContainer
          nodeStatus={nodeStatus?.value}
          resource={resource}
        />
        <Header node={node} nodeId={Number(nodeId)} />
        <Tabs tabItems={tabItems} tabsType={'route'} />
        <Grid>
          <Route path={path} exact>
            <Information calculator={calculator} node={node} />
          </Route>
          <Route path={`${path}/stats`} exact>
            {isVisible ? (
              <>
                <DisplayNodesStatisticsContainer
                  nodeId={Number(nodeId)}
                  pipeCount={communicationPipes?.length || 0}
                />
              </>
            ) : (
              <>
                <Alert
                  message="Ошибка"
                  description="На сервере произошла непредвиденная ошибка. В скором времени она будет устранена."
                  type="error"
                  showIcon
                  closable
                  style={{ marginBottom: 24, marginTop: 24 }}
                />
              </>
            )}
          </Route>
          <Route path={`${path}/readings`} exact>
            {/* <HousingMeteringDeviceReadings
              nodeId={Number(nodeId)}
              resource={resource}
            /> */}
            <HousingMeteringDeviceReadingsContainer
              nodeId={Number(nodeId)}
              resource={resource}
            />
          </Route>
          <Route path={`${path}/connection`} exact>
            <NodeConnection node={node} edit={false} />
          </Route>
          <Route path={`${path}/related`} exact>
            <NodeRelatedDevices node={node} />
          </Route>
          <Route path={`${path}/documents`} exact>
            <Documents />
          </Route>
          <Route path={`/nodes/:nodeId/checks`} exact>
            <NodeChecksContainer />
          </Route>
          <SidePanel title="Архив" link={`/nodeArchive/${nodeId}`} />
        </Grid>
      </>
    );
  }
);
