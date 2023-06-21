import React, { FC } from 'react';
import {
  LeftValue,
  ReadingValue,
  RightValue,
  StyledFile,
  StyledReadingsValues,
  Title,
} from './PreviewModalForm.styled';
import { ILine, PreviewModalFormProps } from './PreviewModalForm.types';
import { ResourceInfo } from 'ui-kit/shared_components/ResourceInfo';
import { getDate, getMountPlaceById, toArray } from './PreviewModalForm.utils';
import { getInputBorderColor } from 'services/meters/individualDeviceMetersInputService/view/MetersInputsBlock/MetersInputsBlock.styled';
import { BaseIndividualDeviceReadingsCreateRequest } from 'myApi';
import { Line } from 'victory';
import { Document } from 'ui-kit/DocumentsService';
import { FileIcon } from 'ui-kit/icons';

export const PreviewModalForm: FC<PreviewModalFormProps> = ({
  documents,
  formData,
  mountPlaces,
}) => {
  if (!formData) return null;

  const getStartupReadingsString = (
    value: BaseIndividualDeviceReadingsCreateRequest,
    color?: string | null,
  ) => {
    const values = toArray(value, false);

    const filteredValues = values.filter(Boolean);

    if (!filteredValues.length) return null;

    return (
      <StyledReadingsValues colorText={color || null}>
        {values.map((elem, index) =>
          elem ? (
            <ReadingValue colorText={color || null}>
              <LeftValue>{index + 1}:</LeftValue>
              <RightValue>{elem}</RightValue>
            </ReadingValue>
          ) : null,
        )}
      </StyledReadingsValues>
    );
  };

  const res = { value1: formData.startupReadings.value1 };

  const lines: ILine[] = [
    {
      name: 'Ресурс',
      value: <ResourceInfo resource={formData.resource} />,
    },
    {
      name: 'Модель прибора',
      value: formData.model,
    },
    { name: 'Серийный номер', value: formData.serialNumber },
    {
      name: 'Место установки',
      value: getMountPlaceById(formData.mountPlaceId || null, mountPlaces),
    },
    {
      name: 'Разрядность',
      value: formData.bitDepth,
    },
    {
      name: 'Множитель',
      value: formData.scaleFactor,
    },
    {
      name: 'Первичные показания прибора',
      value: getStartupReadingsString(
        formData.startupReadings,
        getInputBorderColor({ resource: formData.resource }),
      ),
    },
    {
      name: 'Текущие показания прибора',
      value: getStartupReadingsString(
        formData.defaultReadings!,
        getInputBorderColor({ resource: formData.resource }),
      ),
    },
    { name: 'Диспетчеризация', value: formData.isPolling ? 'Да' : 'Нет' },
    {
      name: 'Дата ввода в эксплуатацию',
      value: getDate(formData.openingDate || null),
    },
    {
      name: 'Дата последней поверки прибора',
      value: getDate(formData.lastCheckingDate),
    },
    {
      name: 'Дата следующей поверки прибора',
      value: getDate(formData.futureCheckingDate),
    },
    {
      name: 'Пломба',
      value: formData.sealNumber,
    },
    {
      name: 'Дата установки пломбы',
      value: getDate(formData.sealInstallationDate || null),
    },
  ];

  const renderLine = ({ name, value }: ILine) => (
    <Line key={name}>
      <div>{name}</div>
      <div>{value || '—'}</div>
    </Line>
  );

  const renderFile = (document: Document[]) => (
    <StyledFile>
      <FileIcon />
      {document[0].name}
    </StyledFile>
  );

  return (
    <>
      <Title>1. Общие данные о приборе</Title>

      {lines.map(renderLine)}

      {/* { documents?.length && <Title>2. Документы</Title>}

      {files.map(renderFile)} */}
    </>
  );
};
