import React, { FC } from 'react';
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
  ResourceSelectWrapper,
  Symbol,
  Value,
  Wrapper,
} from './UniqueWorkingRange.styled';
import { UniqueWorkingRangeProps } from './UniqueWorkingRange.types';
import {
  ENodeWorkingRangeSeason,
  ENodeWorkingRangeType,
  EResourceType,
} from 'myApi';
import { useFormik } from 'formik';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { PageHeader } from '01/shared/ui/PageHeader';
import { Tabs } from 'ui-kit/Tabs';
import { ResourceSelect } from 'ui-kit/shared_components/ResourceSelect';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';

export const UniqueWorkingRange: FC<UniqueWorkingRangeProps> = ({
  handleOnSearchDataChange,
  housingStockUniqueWorkingRange,
  isLoading,
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

  const { values, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      nodeResourceType: EResourceType.ColdWaterSupply,
      season: ENodeWorkingRangeSeason.HeatingSeason,
      housingStockId: 0,
    },
    enableReinitialize: true,
    onSubmit: (data) => {
      handleOnSearchDataChange(data);
      console.log(data);
    },
  });

  const isElectricity =
    (values.nodeResourceType as EResourceType) === EResourceType.Electricity;

  return (
    <Wrapper>
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
        <ResourceSelectWrapper>
          <ResourceSelect
            resource={values.nodeResourceType}
            onChange={(value) => {
              setFieldValue('nodeResourceType', value);
              handleSubmit();
            }}
          />
        </ResourceSelectWrapper>
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
    </Wrapper>
  );
};
