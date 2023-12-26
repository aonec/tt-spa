import React, { FC, ReactNode, useMemo } from 'react';
import { GoBack } from 'ui-kit/shared/GoBack';
import { HeaderInfoString } from 'ui-kit/shared/HeaderInfoString';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import { getBuildingAddress } from 'utils/getBuildingAddress';
import { NodeEditGrouptype } from '../../editNodeService.constants';
import { EditNodeCommonInfo } from './EditNodeCommonInfo';
import {
  CommonInfoWrapper,
  ContentWrapper,
  PageHeaderSC,
} from './EditNodePage.styled';
import {
  AddressWrapper,
  ResourceIconWrapper,
  TabsSC,
} from './EditNodePage.styled';
import { EditNodePageProps } from './EditNodePage.types';
import { EditNodeRelatedDevices } from './EditNodeRelatedDevices';
import { EditNodeUploadDocumentsContainer } from './editNodeUploadDocumentsService';
import { IncorrectConfigAlert } from './IncorrectConfigAlert';
import { NodeRegistrationTypeLookup } from 'dictionaries';
import { EditCalculatorConnection } from './EditCalculatorConnection/EditCalculatorConnection';
import { EHouseCategory } from 'api/types';

const formId = 'edit-node-page';

export const EditNodePage: FC<EditNodePageProps> = ({
  node,
  grouptype,
  setGrouptype,
  openAddNewZonesModal,
  nodeZones,
  refetchNode,
  updateNode,
  handleOpenCreateCalculatorModal,
  calculators,
  isUpdateLoading,
  openRemoveConnectionModal,
}) => {
  const { title, address, resource, registrationType } = node;

  const isIncorrectConfig =
    node?.validationResult?.errors?.length !== 0 ||
    node?.validationResult?.warnings?.length !== 0;

  const validationResultArray = useMemo(() => {
    const { validationResult } = node;
    return [
      ...(validationResult?.errors || []),
      ...(validationResult?.warnings || []),
    ];
  }, [node]);

  const buildingProfilePath = useMemo(() => {
    if (address?.houseCategory === EHouseCategory.Living) {
      return 'livingProfile';
    }
    return 'nonResidentialProfile';
  }, [address]);

  const tabItems = useMemo(
    () => [
      { label: 'Общая информация', key: NodeEditGrouptype.CommonInfo },
      { label: 'Настройки соединения', key: NodeEditGrouptype.Connection },
      { label: 'Подключенные приборы', key: NodeEditGrouptype.Devices },
      { label: 'Документы', key: NodeEditGrouptype.Documents },
    ],
    [],
  );

  const components: { [key in NodeEditGrouptype]: ReactNode } = useMemo(
    () => ({
      [NodeEditGrouptype.CommonInfo]: (
        <>
          <CommonInfoWrapper>
            {isIncorrectConfig && (
              <IncorrectConfigAlert
                validationResultArray={validationResultArray}
                description="Данные с вычислителя не обрабатываются, так как узел не соответствует
          выбранной конфигурации. Исправьте следующие ошибки:"
              />
            )}
            <EditNodeCommonInfo
              node={node}
              openAddNewZonesModal={openAddNewZonesModal}
              nodeZones={nodeZones}
              formId={formId}
              updateNode={updateNode}
              isLoading={isUpdateLoading}
            />
          </CommonInfoWrapper>
        </>
      ),
      [NodeEditGrouptype.Connection]: (
        <CommonInfoWrapper>
          <EditCalculatorConnection
            handleOpenCreateCalculatorModal={handleOpenCreateCalculatorModal}
            node={node}
            handleUpdateNodeConnection={updateNode}
            calculators={calculators}
            isLoading={isUpdateLoading}
            openRemoveConnectionModal={() => openRemoveConnectionModal(node)}
          />
        </CommonInfoWrapper>
      ),
      [NodeEditGrouptype.Devices]: (
        <ContentWrapper>
          <EditNodeRelatedDevices node={node} />
        </ContentWrapper>
      ),
      [NodeEditGrouptype.Documents]: (
        <ContentWrapper>
          <EditNodeUploadDocumentsContainer />
        </ContentWrapper>
      ),
    }),
    [
      calculators,
      node,
      isUpdateLoading,
      openRemoveConnectionModal,
      isIncorrectConfig,
      nodeZones,
      handleOpenCreateCalculatorModal,
      updateNode,
      validationResultArray,
      openAddNewZonesModal,
    ],
  );

  return (
    <>
      <GoBack />
      <PageHeaderSC
        title={
          <>
            <ResourceIconWrapper>
              <ResourceIconLookup resource={resource} />
            </ResourceIconWrapper>
            Узел {title}. Редактирование
          </>
        }
      />
      {address && (
        <AddressWrapper to={`/buildings/${buildingProfilePath}/${address?.id}`}>
          <HeaderInfoString>
            <>{getBuildingAddress(address, true)}</>
            <>{NodeRegistrationTypeLookup[registrationType]} узел</>
          </HeaderInfoString>
        </AddressWrapper>
      )}

      <TabsSC
        activeKey={grouptype}
        onChange={(grouptype) => setGrouptype(grouptype as NodeEditGrouptype)}
        items={tabItems}
      />
      {components[grouptype]}
    </>
  );
};
