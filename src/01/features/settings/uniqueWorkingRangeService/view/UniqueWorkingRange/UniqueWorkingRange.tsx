import React, { FC, useEffect } from 'react';
import {
  ErrorBlockGrid,
  ErrorFieldName,
  FieldGrid,
  FieldName,
  FilterBlock,
  LoaderWrapper,
  Margin,
  RangeBlockGrid,
  RangeFieldName,
  Symbol,
  TreeSelectSC,
  Value,
} from './UniqueWorkingRange.styled';
import {
  UniqueWorkingRangeProps,
  UniqueWorkingRangeType,
} from './UniqueWorkingRange.types';
import {
  ENodeWorkingRangeSeason,
  ENodeWorkingRangeType,
  EResourceType,
} from 'myApi';
import { useFormik } from 'formik';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { PageHeader } from '01/shared/ui/PageHeader';
import { Tabs } from 'ui-kit/Tabs';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { TreeSelect } from 'antd';
import { SelectSC } from '01/shared/ui/Fields';
import { ResourceSelectSC } from 'ui-kit/shared_components/ResourceSelectSC';

export const UniqueWorkingRange: FC<UniqueWorkingRangeProps> = ({
  handleOnSearchDataChange,
  housingStockUniqueWorkingRange,
  isLoading,
  setSelectedCity,
  preparedAddresses,
  existingCities,
  selectedCity,
  handleFetchNodes,
  nodes,
  handleNodeChoosen,
}) => {
  const allowableError =
    housingStockUniqueWorkingRange &&
    housingStockUniqueWorkingRange.nodeWorkingRanges?.find(
      (range) =>
        range.nodeWorkingRangeType === ENodeWorkingRangeType.AllowableError
    );

  const criticalError = housingStockUniqueWorkingRange?.nodeWorkingRanges?.find(
    (range) =>
      range.nodeWorkingRangeType === ENodeWorkingRangeType.CriticalError
  );

  const massOfFeedFlowMagistral =
    housingStockUniqueWorkingRange &&
    housingStockUniqueWorkingRange.nodeWorkingRanges?.find(
      (range) =>
        range.nodeWorkingRangeType ===
        ENodeWorkingRangeType.MassOfFeedFlowMagistral
    );

  const massOfFeedBackFlowMagistral =
    housingStockUniqueWorkingRange &&
    housingStockUniqueWorkingRange.nodeWorkingRanges?.find(
      (range) =>
        range.nodeWorkingRangeType ===
        ENodeWorkingRangeType.MassOfFeedBackFlowMagistral
    );

  const deltaMassOfMagistral =
    housingStockUniqueWorkingRange &&
    housingStockUniqueWorkingRange.nodeWorkingRanges?.find(
      (range) =>
        range.nodeWorkingRangeType ===
        ENodeWorkingRangeType.DeltaMassOfMagistral
    );

  const {
    values,
    handleSubmit,
    setFieldValue,
  } = useFormik<UniqueWorkingRangeType>({
    initialValues: {
      nodeResourceType: EResourceType.ColdWaterSupply,
      season: ENodeWorkingRangeSeason.HeatingSeason,
      housingStockId: null,
      nodeId: null,
    },
    enableReinitialize: true,
    onSubmit: (data) => {
      const { housingStockId, nodeId, nodeResourceType, season } = data;

      !nodeId &&
        housingStockId &&
        handleOnSearchDataChange({ nodeResourceType, season, housingStockId });

      nodeId && handleNodeChoosen({ season, nodeId });
    },
  });

  useEffect(() => {
    values.housingStockId && handleFetchNodes(values.housingStockId);
  }, [values.housingStockId]);

  const preparedNodes = nodes?.reduce((acc, node) => {
    if (node.resource === values.nodeResourceType) {
      return [...acc, { value: node.id, nodeNumber: node.number }];
    }
    return acc;
  }, [] as { value: number; nodeNumber: number }[]);

  const isElectricity =
    (values.nodeResourceType as EResourceType) === EResourceType.Electricity;

  return (
    <>
      <Margin>
        <GoBack />
      </Margin>
      <PageHeader title="Уникальные рабочие диапазоны" />
      <Margin>
        <Tabs
          onChange={(value) => {
            setFieldValue('season', value);
            handleSubmit();
          }}
          activeKey={values.season}
        >
          <Tabs.TabPane
            tab="Отопительный сезон"
            key={ENodeWorkingRangeSeason.HeatingSeason}
          />
          <Tabs.TabPane
            tab="Межотопительный сезон"
            key={ENodeWorkingRangeSeason.InterHeating}
          />
        </Tabs>
      </Margin>

      <FilterBlock>
        <ResourceSelectSC
          isShadow={false}
          resource={values.nodeResourceType}
          onChange={(value) => {
            setFieldValue('nodeResourceType', value);
            handleSubmit();
            setFieldValue('nodeId', null);
          }}
        />

        <SelectSC
          isShadow={false}
          value={selectedCity || undefined}
          onChange={(city) => {
            setSelectedCity(city as string);
            setFieldValue('nodeId', null);
          }}
          placeholder="Выберите город"
        >
          {existingCities?.map((city) => (
            <SelectSC.Option key={city} value={city}>
              {city}
            </SelectSC.Option>
          ))}
        </SelectSC>

        <TreeSelectSC
          placeholder="Выберите город"
          value={values.housingStockId || undefined}
          onChange={(value) => {
            setFieldValue('housingStockId', value || null);
            handleSubmit();
            setFieldValue('nodeId', null);
          }}
          showSearch
          showArrow
          treeCheckable={false}
          treeData={preparedAddresses}
        />

        <SelectSC
          isShadow={false}
          value={values.nodeId || undefined}
          onChange={(nodeId) => {
            setFieldValue('nodeId', nodeId);
            handleSubmit();
          }}
          placeholder="Выберите узел"
        >
          {preparedNodes?.map((node) => (
            <SelectSC.Option key={node.value} value={node.value}>
              {`Узел  ${node.nodeNumber}`}
            </SelectSC.Option>
          ))}
        </SelectSC>
      </FilterBlock>

      {isLoading && (
        <LoaderWrapper>
          <WithLoader isLoading={isLoading} />
        </LoaderWrapper>
      )}

      {!isLoading && !isElectricity && (
        <>
          <ErrorBlockGrid>
            <div>
              <FieldGrid>
                <ErrorFieldName>
                  Допустимое значение погрешностей
                </ErrorFieldName>
                <Value>{allowableError?.min || '—'}</Value>
                <Value>{allowableError?.max || '—'}</Value>
              </FieldGrid>
              <FieldGrid>
                <ErrorFieldName>Критичное значение погрешностей</ErrorFieldName>
                <Value>{criticalError?.min || '—'}</Value>
                <Value>{criticalError?.max || '—'}</Value>
              </FieldGrid>
            </div>
            <div></div>
          </ErrorBlockGrid>

          <RangeBlockGrid>
            <div>
              {massOfFeedFlowMagistral && (
                <FieldGrid>
                  <RangeFieldName>
                    <Symbol>M1</Symbol>
                    <FieldName>
                      Масса подающей магистрали (
                      {massOfFeedFlowMagistral?.measureUnit || '—'})
                    </FieldName>
                  </RangeFieldName>
                  <Value>{massOfFeedFlowMagistral?.min || '—'}</Value>
                  <Value>{massOfFeedFlowMagistral?.max || '—'}</Value>
                </FieldGrid>
              )}

              {massOfFeedBackFlowMagistral && (
                <FieldGrid>
                  <RangeFieldName>
                    <Symbol>M2</Symbol>
                    <FieldName>
                      Масса подающей магистрали (
                      {massOfFeedBackFlowMagistral?.measureUnit || '—'})
                    </FieldName>
                  </RangeFieldName>
                  <Value>{massOfFeedBackFlowMagistral?.min || '—'}</Value>
                  <Value>{massOfFeedBackFlowMagistral?.max || '—'}</Value>
                </FieldGrid>
              )}

              {deltaMassOfMagistral && (
                <FieldGrid>
                  <RangeFieldName>
                    <Symbol>ΔM</Symbol>
                    <FieldName>
                      Масса подающей магистрали (
                      {deltaMassOfMagistral?.measureUnit || '—'})
                    </FieldName>
                  </RangeFieldName>
                  <Value>{deltaMassOfMagistral?.min || '—'}</Value>
                  <Value>{deltaMassOfMagistral?.max || '—'}</Value>
                </FieldGrid>
              )}
            </div>
            <div></div>
          </RangeBlockGrid>
        </>
      )}
    </>
  );
};
