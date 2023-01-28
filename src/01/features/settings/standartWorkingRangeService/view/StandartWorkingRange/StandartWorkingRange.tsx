import React, { FC } from 'react';
import {
  ErrorBlockGrid,
  ErrorFieldName,
  FieldGrid,
  FieldName,
  LoaderWrapper,
  Margin,
  Padding,
  RangeBlockGrid,
  RangeFieldName,
  Symbol,
  Value,
  Wrapper,
} from './StandartWorkingRange.styled';
import { StandartWorkingRangeProps } from './StandartWorkingRange.types';
import { PageHeader } from '01/shared/ui/PageHeader';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { Tabs } from 'ui-kit/Tabs';
import { ResourceSelect } from 'ui-kit/shared_components/ResourceSelect';
import { useFormik } from 'formik';
import {
  ENodeWorkingRangeSeason,
  ENodeWorkingRangeType,
  EResourceType,
} from 'myApi';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';

export const StandartWorkingRange: FC<StandartWorkingRangeProps> = ({
  handleOnSearchDataChange,
  standartWorkingRange,
  isLoading,
}) => {
  const allowableError =
    standartWorkingRange &&
    standartWorkingRange.nodeWorkingRanges?.find(
      (range) =>
        range.nodeWorkingRangeType === ENodeWorkingRangeType.AllowableError,
    );

  const criticalError = standartWorkingRange?.nodeWorkingRanges?.find(
    (range) =>
      range.nodeWorkingRangeType === ENodeWorkingRangeType.CriticalError,
  );

  const massOfFeedFlowMagistral =
    standartWorkingRange &&
    standartWorkingRange.nodeWorkingRanges?.find(
      (range) =>
        range.nodeWorkingRangeType ===
        ENodeWorkingRangeType.MassOfFeedFlowMagistral,
    );

  const massOfFeedBackFlowMagistral =
    standartWorkingRange &&
    standartWorkingRange.nodeWorkingRanges?.find(
      (range) =>
        range.nodeWorkingRangeType ===
        ENodeWorkingRangeType.MassOfFeedBackFlowMagistral,
    );

  const deltaMassOfMagistral =
    standartWorkingRange &&
    standartWorkingRange.nodeWorkingRanges?.find(
      (range) =>
        range.nodeWorkingRangeType ===
        ENodeWorkingRangeType.DeltaMassOfMagistral,
    );

  const { values, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      nodeResourceType: EResourceType.ColdWaterSupply,
      season: ENodeWorkingRangeSeason.HeatingSeason,
    },
    enableReinitialize: true,
    onSubmit: (data) => {
      handleOnSearchDataChange(data);
    },
  });

  const isElectricity =
    (values.nodeResourceType as EResourceType) === EResourceType.Electricity;

  return (
    <Wrapper>
      <Margin>
        <GoBack />
      </Margin>
      <PageHeader title="Стандартные рабочие диапазоны" />
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

      <Padding>
        <ResourceSelect
          resource={values.nodeResourceType}
          onChange={(value) => {
            setFieldValue('nodeResourceType', value);
            handleSubmit();
          }}
        />
      </Padding>

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
                <Value>{allowableError?.min}</Value>
                <Value>{allowableError?.max}</Value>
              </FieldGrid>
              <FieldGrid>
                <ErrorFieldName>Критичное значение погрешностей</ErrorFieldName>
                <Value>{criticalError?.min}</Value>
                <Value>{criticalError?.max}</Value>
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
                      {massOfFeedFlowMagistral?.measureUnit})
                    </FieldName>
                  </RangeFieldName>
                  <Value>{massOfFeedFlowMagistral?.min || 9}</Value>
                  <Value>{massOfFeedFlowMagistral?.max || 10}</Value>
                </FieldGrid>
              )}

              {massOfFeedBackFlowMagistral && (
                <FieldGrid>
                  <RangeFieldName>
                    <Symbol>M2</Symbol>
                    <FieldName>
                      Масса подающей магистрали (
                      {massOfFeedBackFlowMagistral?.measureUnit})
                    </FieldName>
                  </RangeFieldName>
                  <Value>{massOfFeedBackFlowMagistral?.min || 9}</Value>
                  <Value>{massOfFeedBackFlowMagistral?.max || 10}</Value>
                </FieldGrid>
              )}

              {deltaMassOfMagistral && (
                <FieldGrid>
                  <RangeFieldName>
                    <Symbol>ΔM</Symbol>
                    <FieldName>
                      Масса подающей магистрали (
                      {deltaMassOfMagistral?.measureUnit})
                    </FieldName>
                  </RangeFieldName>
                  <Value>{deltaMassOfMagistral?.min || 9}</Value>
                  <Value>{deltaMassOfMagistral?.max || 10}</Value>
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
