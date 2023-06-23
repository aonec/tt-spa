import React, { FC, useCallback, useMemo, useState } from 'react';
import {
  CancelAllText,
  ContentWrapper,
  CountWrapper,
  Footer,
  HeaderWrapper,
  ListHeaderWrapper,
  LoaderWrapper,
  RootWrapperTitle,
  SelectAllText,
  TreeSC,
  Wrapper,
} from './DistributeAppointmentsPanel.styled';
import { DistributeAppointmentsPanelProps } from './DistributeAppointmentsPanel.types';
import type { DataNode } from 'antd/es/tree';
import { Input } from 'ui-kit/Input';
import {
  getParentNode,
  prepareAppointmentsToTree,
} from './DistributeAppointmentsPanel.utils';
import { countSimilarityPoints } from 'utils/countSimilarityPoints';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { Empty } from 'antd';
import { Button } from 'ui-kit/Button';
import { getCountText } from 'utils/getCountText';
import { AppointmentsCountTexts } from './DistributeAppointmentsPanel.constants';

export const DistributeAppointmentsPanel: FC<
  DistributeAppointmentsPanelProps
> = ({
  appointmentsInDistrict,
  selectedAppointmentsIds,
  handleSelectAppointments,
  isLoadingAppointments,
  handleUnselectDistrict,
  openDistributeAppointmentsModal,
}) => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);

  const isAppointmentsExist = appointmentsInDistrict.length !== 0;

  const preparedTreeData = useMemo(
    () => prepareAppointmentsToTree(appointmentsInDistrict),
    [appointmentsInDistrict],
  );

  const appointmentsList = useMemo(
    () =>
      preparedTreeData.reduce((acc, elem) => {
        if (elem.children) {
          return [...acc, ...elem.children];
        }
        return acc;
      }, [] as DataNode[]),
    [preparedTreeData],
  );

  const handleChangeInputValue = useCallback(
    (value: string) => {
      let maxSimilarityPoints = 0;

      const newExpandedKeys = appointmentsList.reduce((acc, item) => {
        const parent = getParentNode(item.key, preparedTreeData);

        if (!parent?.title) {
          return acc;
        }

        const similarityPoints = countSimilarityPoints(
          value,
          `${parent.title} ${item.title}`,
        );
        if (similarityPoints > 0) {
          if (similarityPoints > maxSimilarityPoints) {
            maxSimilarityPoints = similarityPoints;
          }

          return [...acc, { key: String(parent.title), similarityPoints }];
        }

        return acc;
      }, [] as { key: string; similarityPoints: number }[]);

      const preparedNewKeys = newExpandedKeys.reduce(
        (acc, { key, similarityPoints }) => {
          if (similarityPoints === maxSimilarityPoints) {
            return [...acc, key];
          }
          return acc;
        },
        [] as React.Key[],
      );

      setExpandedKeys(preparedNewKeys);
    },
    [appointmentsList, preparedTreeData],
  );

  return (
    <Wrapper>
      {isLoadingAppointments && (
        <LoaderWrapper>
          <WithLoader isLoading />
        </LoaderWrapper>
      )}
      {!isLoadingAppointments && (
        <>
          {isAppointmentsExist && (
            <>
              <HeaderWrapper>
                <Input
                  small
                  placeholder="Введите адрес"
                  onChange={(e) => handleChangeInputValue(e.target.value)}
                />
                <ListHeaderWrapper>
                  <SelectAllText
                    onClick={() =>
                      handleSelectAppointments(
                        appointmentsList.map((elem) => String(elem.key)),
                      )
                    }
                  >
                    Выбрать все ({appointmentsInDistrict.length})
                  </SelectAllText>
                  <CancelAllText onClick={() => handleSelectAppointments([])}>
                    Отменить выбор
                  </CancelAllText>
                </ListHeaderWrapper>
              </HeaderWrapper>
              <ContentWrapper>
                <TreeSC
                  selectable={false}
                  checkable={true}
                  treeData={preparedTreeData}
                  titleRender={(elem) => {
                    if (elem.key !== elem.title) {
                      return elem.title;
                    }
                    return (
                      <RootWrapperTitle>
                        {elem.title}
                        <CountWrapper>
                          Заявки: {(elem.children || []).length}
                        </CountWrapper>
                      </RootWrapperTitle>
                    );
                  }}
                  onCheck={(_, info) => {
                    const { checkedNodes } = info;
                    const filteredNodes = checkedNodes.filter((elem) =>
                      Boolean(elem.key !== elem.title),
                    );

                    handleSelectAppointments(
                      filteredNodes.map((elem) => String(elem.key)),
                    );
                  }}
                  onExpand={setExpandedKeys}
                  expandedKeys={expandedKeys}
                  checkedKeys={selectedAppointmentsIds}
                />
              </ContentWrapper>
              <Footer>
                <Button
                  type="ghost"
                  size="small"
                  onClick={handleUnselectDistrict}
                >
                  Назад
                </Button>
                <Button
                  onClick={openDistributeAppointmentsModal}
                  size="small"
                  disabled={!selectedAppointmentsIds.length}
                >
                  Распределить{' '}
                  {Boolean(selectedAppointmentsIds.length) &&
                    `${selectedAppointmentsIds.length} 
                      ${getCountText(
                        selectedAppointmentsIds.length,
                        AppointmentsCountTexts,
                      )}`}
                </Button>
              </Footer>
            </>
          )}
          {!isAppointmentsExist && (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Нет записей на опломбировке на выбранную дату"
            />
          )}
        </>
      )}
    </Wrapper>
  );
};
