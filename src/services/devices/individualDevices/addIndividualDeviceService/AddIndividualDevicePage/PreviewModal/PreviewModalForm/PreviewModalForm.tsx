import React, { FC } from 'react';
import {
  DocName,
  DocumentTitle,
  LeftValue,
  Line,
  ReadingValue,
  RightValue,
  StyledFile,
  StyledReadingsValues,
  Title,
} from './PreviewModalForm.styled';
import {
  EIndividualDeviceDocumentType,
  ILine,
  PreviewModalFormProps,
} from './PreviewModalForm.types';
import { ResourceInfo } from 'ui-kit/shared_components/ResourceInfo';
import { getDate, getMountPlaceById } from './PreviewModalForm.utils';
import { getInputBorderColor } from 'services/meters/individualDeviceMetersInputService/view/MetersInputsBlock/MetersInputsBlock.styled';
import { BaseIndividualDeviceReadingsCreateRequest } from 'myApi';
import { Document } from 'ui-kit/DocumentsService';
import { FileIcon } from 'ui-kit/icons';
import { IndividualDeviceDocumentsDisctionary } from './PreviewModalForm.constants';

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
    const valuesArr = Object.values(value).filter(
      (data) => typeof data === 'number',
    ) as number[];

    const filteredValues = valuesArr.filter(Boolean);

    if (!filteredValues.length) return null;

    return (
      <StyledReadingsValues colorText={color || null}>
        {valuesArr.map((elem, index) =>
          elem ? (
            <ReadingValue colorText={color || null} key={index}>
              <LeftValue>{index + 1}:</LeftValue>
              <RightValue>{elem}</RightValue>
            </ReadingValue>
          ) : null,
        )}
      </StyledReadingsValues>
    );
  };

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

  const renderFile = (doc: [EIndividualDeviceDocumentType, Document[]]) => (
    <StyledFile>
      {IndividualDeviceDocumentsDisctionary[doc[0]]} :
      <DocName>
        <FileIcon />
        {doc[1][0].name}
      </DocName>
    </StyledFile>
  );

  const documentsArr =
    documents &&
    ((Object.entries(documents).filter((doc) => Boolean(doc[1])) || []) as
      | [EIndividualDeviceDocumentType, Document[]][]
      | null);

  const isHaveDocument = Boolean(documentsArr?.length);

  return (
    <>
      <Title>1. Общие данные о приборе</Title>

      {lines.map(renderLine)}

      {isHaveDocument && (
        <>
          <DocumentTitle>2. Документы</DocumentTitle>

          {documentsArr?.map(renderFile)}
        </>
      )}
    </>
  );
};
