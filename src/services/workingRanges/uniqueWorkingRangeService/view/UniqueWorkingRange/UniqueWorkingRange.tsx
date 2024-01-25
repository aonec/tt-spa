import React, { FC, useEffect, useMemo } from 'react';
import {
  ErrorBlockGrid,
  ErrorFieldName,
  FieldGrid,
  FieldName,
  FilterBlock,
  LoaderWrapper,
  PageHeaderSC,
  RangeBlockGrid,
  RangeFieldName,
  Symbol,
  TabsSC,
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
} from 'api/types';
import { useFormik } from 'formik';
import { GoBack } from 'ui-kit/shared/GoBack';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { ResourceSelectSC } from 'ui-kit/shared/ResourceSelectSC';
import { Select } from 'ui-kit/Select';

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
        range.nodeWorkingRangeType === ENodeWorkingRangeType.AllowableError,
    );

  const criticalError = housingStockUniqueWorkingRange?.nodeWorkingRanges?.find(
    (range) =>
      range.nodeWorkingRangeType === ENodeWorkingRangeType.CriticalError,
  );

  const massOfFeedFlowMagistral =
    housingStockUniqueWorkingRange &&
    housingStockUniqueWorkingRange.nodeWorkingRanges?.find(
      (range) =>
        range.nodeWorkingRangeType ===
        ENodeWorkingRangeType.MassOfFeedFlowMagistral,
    );

  const massOfFeedBackFlowMagistral =
    housingStockUniqueWorkingRange &&
    housingStockUniqueWorkingRange.nodeWorkingRanges?.find(
      (range) =>
        range.nodeWorkingRangeType ===
        ENodeWorkingRangeType.MassOfFeedBackFlowMagistral,
    );

  const deltaMassOfMagistral =
    housingStockUniqueWorkingRange &&
    housingStockUniqueWorkingRange.nodeWorkingRanges?.find(
      (range) =>
        range.nodeWorkingRangeType ===
        ENodeWorkingRangeType.DeltaMassOfMagistral,
    );

  const handleOnSubmit = (data: UniqueWorkingRangeType) => {
    const { housingStockIdHash, nodeId, nodeResourceType, season } = data;

    const chosenBuilding = preparedAddresses
      .flatMap((addressStreet) => addressStreet.children)
      .find((preparedAddress) => preparedAddress?.value === housingStockIdHash);

    const housingStockId = chosenBuilding?.buildingId;

    !nodeId &&
      housingStockId &&
      handleOnSearchDataChange({
        nodeResourceType,
        season,
        housingStockId,
      });

    nodeId && handleNodeChoosen({ season, nodeId });
  };

  const { values, handleSubmit, setFieldValue } =
    useFormik<UniqueWorkingRangeType>({
      initialValues: {
        nodeResourceType: EResourceType.ColdWaterSupply,
        season: ENodeWorkingRangeSeason.HeatingSeason,
        housingStockIdHash: null,
        nodeId: null,
      },
      enableReinitialize: true,
      onSubmit: (data) => handleOnSubmit(data),
    });

  const housingStockId = useMemo(() => {
    const chosenBuilding = preparedAddresses
      .flatMap((addressStreet) => addressStreet.children)
      .find(
        (preparedAddress) =>
          preparedAddress?.value === values.housingStockIdHash,
      );

    return chosenBuilding?.buildingId;
  }, [values.housingStockIdHash, preparedAddresses]);

  useEffect(() => {
    housingStockId && handleFetchNodes(housingStockId);
  }, [housingStockId, handleFetchNodes]);

  const preparedNodes = nodes?.reduce((acc, node) => {
    if (node.resource === values.nodeResourceType) {
      return [...acc, { value: node.id, nodeTitle: node.title }];
    }
    return acc;
  }, [] as { value: number; nodeTitle: string | null }[]);

  const isElectricity =
    (values.nodeResourceType as EResourceType) === EResourceType.Electricity;

  const tabItems = useMemo(
    () => [
      {
        label: 'Отопительный сезон',
        key: ENodeWorkingRangeSeason.HeatingSeason,
      },
      {
        label: 'Межотопительный сезон',
        key: ENodeWorkingRangeSeason.InterHeating,
      },
    ],
    [],
  );

  return (
    <>
      <GoBack />
      <PageHeaderSC title="Уникальные рабочие диапазоны" />
      <TabsSC
        onChange={(value) => {
          setFieldValue('season', value);
          handleSubmit();
        }}
        activeKey={values.season}
        items={tabItems}
      />

      <FilterBlock>
        <ResourceSelectSC
          resource={values.nodeResourceType}
          onChange={(value) => {
            setFieldValue('nodeResourceType', value);
            handleSubmit();
            setFieldValue('nodeId', null);
          }}
        />

        <Select
          small
          placeholder="Выберите город"
          value={selectedCity || undefined}
          onChange={(city) => {
            setSelectedCity(city as string);
            setFieldValue('housingStockId', null);
            setFieldValue('nodeId', null);
          }}
        >
          {existingCities?.map((city) => (
            <Select.Option key={city} value={city}>
              {city}
            </Select.Option>
          ))}
        </Select>

        <TreeSelectSC
          placeholder="Выберите улицу"
          value={values.housingStockIdHash || undefined}
          onChange={(value) => {
            setFieldValue('housingStockIdHash', value || null);
            handleSubmit();
            setFieldValue('nodeId', null);
          }}
          showSearch
          showArrow
          treeCheckable={false}
          treeData={preparedAddresses}
        />

        <Select
          small
          placeholder="Выберите узел"
          value={values.nodeId || undefined}
          onChange={(nodeId) => {
            setFieldValue('nodeId', nodeId);
            handleSubmit();
          }}
        >
          {preparedNodes?.map((node) => (
            <Select.Option key={node.value} value={node.value}>
              {`Узел  ${node.nodeTitle}`}
            </Select.Option>
          ))}
        </Select>
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
