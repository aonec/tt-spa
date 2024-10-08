import React, { FC, useMemo } from 'react';
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
  Value,
} from './GroupWorkingRange.styled';
import { GroupWorkingRangeProps } from './GroupWorkingRange.types';
import {
  ENodeWorkingRangeSeason,
  ENodeWorkingRangeType,
  EResourceType,
} from 'api/types';
import { useFormik } from 'formik';
import { GoBack } from 'ui-kit/shared/GoBack';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { Select } from 'ui-kit/Select';
import { ResourceSelectSC } from 'ui-kit/shared/ResourceSelectSC';

export const GroupWorkingRange: FC<GroupWorkingRangeProps> = ({
  groupWorkingRange,
  handleOnSearchDataChange,
  isLoading,
  houseManagements,
}) => {
  const allowableError =
    groupWorkingRange &&
    groupWorkingRange.nodeWorkingRanges?.find(
      (range) =>
        range.nodeWorkingRangeType === ENodeWorkingRangeType.AllowableError,
    );

  const criticalError = groupWorkingRange?.nodeWorkingRanges?.find(
    (range) =>
      range.nodeWorkingRangeType === ENodeWorkingRangeType.CriticalError,
  );

  const massOfFeedFlowMagistral =
    groupWorkingRange &&
    groupWorkingRange.nodeWorkingRanges?.find(
      (range) =>
        range.nodeWorkingRangeType ===
        ENodeWorkingRangeType.MassOfFeedFlowMagistral,
    );

  const massOfFeedBackFlowMagistral =
    groupWorkingRange &&
    groupWorkingRange.nodeWorkingRanges?.find(
      (range) =>
        range.nodeWorkingRangeType ===
        ENodeWorkingRangeType.MassOfFeedBackFlowMagistral,
    );

  const deltaMassOfMagistral =
    groupWorkingRange &&
    groupWorkingRange.nodeWorkingRanges?.find(
      (range) =>
        range.nodeWorkingRangeType ===
        ENodeWorkingRangeType.DeltaMassOfMagistral,
    );

  const { values, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      nodeResourceType: EResourceType.ColdWaterSupply,
      season: ENodeWorkingRangeSeason.HeatingSeason,
      houseManagementId: '',
    },
    enableReinitialize: true,
    onSubmit: (data) => {
      handleOnSearchDataChange(data);
    },
  });

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
      <PageHeaderSC title="Групповые рабочие диапазоны" />
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
          }}
        />

        <Select
          small
          onChange={(value) => {
            setFieldValue('houseManagementId', value);
            handleSubmit();
          }}
          placeholder="Выберите"
        >
          {houseManagements.map((management) => {
            return (
              <Select.Option key={management.id} value={management.id}>
                Домоуправление "{management.name}"
              </Select.Option>
            );
          })}
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
