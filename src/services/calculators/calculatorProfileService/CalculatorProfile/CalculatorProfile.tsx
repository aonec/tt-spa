import { stringifyUrl } from 'query-string';
import React, { FC, ReactElement, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CommonInfo } from 'ui-kit/shared/CommonInfo';
import { GoBack } from 'ui-kit/shared/GoBack';
import { LinkCard } from 'ui-kit/shared/LinkCard';
import { getBuildingAddress } from 'utils/getBuildingAddress';
import { getTimeStringByUTC } from 'utils/getTimeStringByUTC';
import { CalculatorProfileGrouptype } from '../calculatorProfileService.constants';
import { CalculatorCommentContainer } from './calculatorCommentService';
import {
  AdditionalInfoWrapper,
  AddressLinkWrapper,
  Content,
  ContentWrapper,
  CalculatorIconSC,
  TabsSC,
  PanelsWrapper,
  PageHeaderSC,
} from './CalculatorProfile.styled';
import { CalculatorProfileProps } from './CalculatorProfile.types';
import { ConnectionInfo } from './ConnectionInfo';
import { DocumentsPanel } from './DocumentsPanel';
import { NodeDocumentsList } from './NodeDocumentsList';
import { RelatedNodesList } from './RelatedNodesList';
import { ContextMenuButtonColor } from 'ui-kit/ContextMenuButton/ContextMenuButton.types';
import { EHouseCategory, TaskGroupingFilter } from 'api/types';

export const CalculatorProfile: FC<CalculatorProfileProps> = ({
  calculator,
  currentGrouptype = CalculatorProfileGrouptype.Common,
  setGrouptype,
  handleOpenCloseCalculatorModal,
  handleOpenCheckCalculatorModal,
  handleOpenConsumptionReportModal,
  openDevicesListModal,
  isPermitionToCalculatorActions,
}) => {
  const navigate = useNavigate();

  const {
    id,
    model,
    serialNumber,
    address,
    documents,
    numberOfTasks,
    comment,
  } = calculator;

  const headerTitle = useMemo(
    () => `${model} (${serialNumber})`,
    [model, serialNumber],
  );

  const buildingProfilePath = useMemo(() => {
    if (calculator?.address?.houseCategory === EHouseCategory.Living) {
      return 'livingProfile';
    }
    return 'nonResidentialProfile';
  }, [calculator]);

  const commonInfo = useMemo(
    () => (
      <CommonInfo
        items={[
          {
            key: 'Адрес',
            value: (
              <>
                {calculator?.address && (
                  <AddressLinkWrapper
                    to={`/buildings/${buildingProfilePath}/${calculator.address?.id}`}
                  >
                    {getBuildingAddress(calculator.address, true)}
                  </AddressLinkWrapper>
                )}
              </>
            ),
          },
          {
            key: 'Дата поверки прибора',
            value: calculator?.lastCheckingDate
              ? getTimeStringByUTC(calculator.lastCheckingDate, 'DD.MM.YYYY')
              : null,
          },
          {
            key: 'Дата следующей поверки прибора',
            value: calculator?.futureCheckingDate
              ? getTimeStringByUTC(calculator.futureCheckingDate, 'DD.MM.YYYY')
              : null,
          },
        ]}
      />
    ),
    [calculator, buildingProfilePath],
  );

  const menuButtons = useMemo(
    () => ({
      menuButtons: [
        {
          title: 'Редактировать вычислитель',
          onClick: () => navigate(`/calculators/${calculator.id}/edit`),
          hidden: !isPermitionToCalculatorActions,
        },
        {
          title: 'Поверить вычислитель',
          onClick: () => handleOpenCheckCalculatorModal(calculator),
          hidden: !isPermitionToCalculatorActions,
        },
        {
          title: 'Выгрузить отчёт об общедомовом потреблении',
          onClick: () => handleOpenConsumptionReportModal(),
          hidden: !isPermitionToCalculatorActions,
        },
        {
          title: 'Снять вычислитель с учёта',
          onClick: () => handleOpenCloseCalculatorModal(calculator),
          color: ContextMenuButtonColor.danger,
          hidden: !isPermitionToCalculatorActions,
        },
      ],
    }),
    [
      handleOpenCheckCalculatorModal,
      handleOpenCloseCalculatorModal,
      calculator,
      navigate,
      handleOpenConsumptionReportModal,
      isPermitionToCalculatorActions,
    ],
  );

  const contentComponents: {
    [key in CalculatorProfileGrouptype]: ReactElement;
  } = useMemo(() => {
    const { documents, nodes, connection, isConnected } = calculator;
    return {
      [CalculatorProfileGrouptype.Common]: <>{commonInfo}</>,
      [CalculatorProfileGrouptype.Connection]: (
        <ConnectionInfo
          connection={connection}
          isConnected={isConnected || false}
        />
      ),
      [CalculatorProfileGrouptype.Nodes]: (
        <RelatedNodesList
          nodes={nodes}
          openDevicesListModal={openDevicesListModal}
        />
      ),
      [CalculatorProfileGrouptype.Documents]: (
        <NodeDocumentsList documents={documents || []} />
      ),
    };
  }, [calculator, commonInfo, openDevicesListModal]);

  const component = contentComponents[currentGrouptype];

  const tabItems = useMemo(
    () => [
      { label: 'Общие данные', key: CalculatorProfileGrouptype.Common },
      {
        label: 'Настройки соединения',
        key: CalculatorProfileGrouptype.Connection,
      },
      { label: 'Узлы', key: CalculatorProfileGrouptype.Nodes },
      { label: 'Документы', key: CalculatorProfileGrouptype.Documents },
    ],
    [],
  );

  return (
    <div>
      <GoBack />
      <PageHeaderSC
        title={
          <>
            <CalculatorIconSC />
            {headerTitle}
          </>
        }
        contextMenu={menuButtons}
      />
      <AdditionalInfoWrapper>
        <>{getBuildingAddress(address, true)}</>
      </AdditionalInfoWrapper>
      <TabsSC
        activeKey={currentGrouptype}
        onChange={(grouptype) =>
          setGrouptype(grouptype as CalculatorProfileGrouptype)
        }
        items={tabItems}
      />
      <ContentWrapper>
        <Content>{component}</Content>
        <PanelsWrapper>
          <CalculatorCommentContainer comment={comment} calculatorId={id} />
          <LinkCard
            text={`Задачи: ${numberOfTasks}`}
            link={stringifyUrl({
              url: `/tasks/list/${TaskGroupingFilter.Executing}`,
              query: { calculatorId: id },
            })}
            showLink={Boolean(numberOfTasks)}
          />
          <DocumentsPanel
            handleClick={() =>
              setGrouptype(CalculatorProfileGrouptype.Documents)
            }
            documents={documents || []}
          />
        </PanelsWrapper>
      </ContentWrapper>
    </div>
  );
};
