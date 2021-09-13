import { $individualDeviceMountPlaces } from '01/features/individualDeviceMountPlaces/displayIndividualDeviceMountPlaces/models';
import { FileData } from '01/hooks/useFilesUpload';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { Footer, Header, StyledModal } from '01/shared/ui/Modal/Modal';
import { ButtonTT } from '01/tt-components';
import { allResources } from '01/tt-components/localBases';
import { useForm } from 'effector-forms/dist';
import { useStore } from 'effector-react';
import moment from 'moment';
import { EResourceType, IndividualDeviceMountPlaceListResponse } from 'myApi';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import {
  $isCheckCreationDeviceFormDataModalOpen,
  addIndividualDeviceForm,
  cancelCheckingButtonClicked,
  confirmCreationNewDeviceButtonClicked,
  createIndividualDeviceFx,
  readingValueValidate,
} from '../models';
import { FileIcon, TrashIcon } from '../icons';
import { Loader } from '01/components';
import { StockIconTT } from '01/_pages/Devices/components/DeviceBlock/DeviceBlock';
import DeviceIcons from '01/_components/DeviceIcons';
import { $contractors } from '01/features/contractors/displayContractors/models';

interface ILine {
  name: string;
  value: ReactNode;
}

interface RemoveFile {
  removeFile: () => void;
}

export const CheckFormValuesModal = () => {
  const { fields } = useForm(addIndividualDeviceForm);
  const mountPlaces = useStore($individualDeviceMountPlaces);

  const pending = useStore(createIndividualDeviceFx.pending);

  const isOpen = useStore($isCheckCreationDeviceFormDataModalOpen);
  const onCancel = () => cancelCheckingButtonClicked();
  const contractors = useStore($contractors);

  const deviceIcon = DeviceIcons[fields.resource.value! || ''];

  const lines: ILine[] = [
    {
      name: 'Ресурс',
      value: (
        <Flex>
          <StockIconTT dark icon={deviceIcon?.icon} fill={deviceIcon?.color} />
          <Space />
          <div>{getResourceName(fields.resource.value)}</div>
        </Flex>
      ),
    },
    {
      name: 'Модель прибора',
      value: fields.model.value,
    },
    { name: 'Серийный номер', value: fields.serialNumber.value },
    {
      name: 'Место установки',
      value: getMountPlaceById(fields.mountPlaceId.value, mountPlaces),
    },
    {
      name: 'Разрядность',
      value: fields.bitDepth.value,
    },
    {
      name: 'Множитель',
      value: fields.scaleFactor.value,
    },
    {
      name: 'Текущие показания прибора',
      value: getStartupReadingsString(
        fields.defaultReadings.value,
        deviceIcon?.color
      ),
    },
    {
      name: 'Дата ввода в эксплуатацию',
      value: getDate(fields.lastCommercialAccountingDate.value),
    },
    {
      name: 'Дата последней поверки прибора',
      value: getDate(fields.lastCheckingDate.value),
    },
    {
      name: 'Дата следующей поверки прибора',
      value: getDate(fields.futureCheckingDate.value),
    },
    {
      name: 'Пломба',
      value: fields.magneticSealTypeName.value,
    },
    {
      name: 'Дата установки пломбы',
      value: getDate(fields.magneticSealInstallationDate.value),
    },
    {
      name: 'Монтажная организация',
      value: contractors?.find((elem) => elem.id === fields.contractorId.value)
        ?.name,
    },
  ];

  const files: (FileData & RemoveFile)[] = toArray<FileData>(
    fields.documentsIds.value
  )
    .filter((elem) => elem?.fileResponse)
    .map((elem) => ({
      ...elem,
      removeFile() {
        fields.documentsIds.onChange({
          ...fields.documentsIds.value,
          [elem.__name__!]: null,
        } as any);
      },
    }));

  return (
    <StyledModal
      width={800}
      visible={isOpen}
      onCancel={onCancel}
      title={<Header>Поверка прибора</Header>}
      footer={
        <Footer>
          <ButtonTT color="white" key="back" onClick={onCancel}>
            Отмена
          </ButtonTT>
          <ButtonTT
            color="blue"
            key="submit"
            disabled={pending}
            onClick={confirmCreationNewDeviceButtonClicked}
          >
            {pending ? <Loader show /> : 'Поверить'}
          </ButtonTT>
        </Footer>
      }
    >
      <Title>1. Общие данные о приборе</Title>

      {lines.map(renderLine)}

      <Space style={{ height: 30 }} />

      {!!files.length && <Title>2. Документы</Title>}

      {files.map(renderFile)}
    </StyledModal>
  );
};

const Title = styled.h3`
  margin-bottom: 15px;
`;

const Line = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 2fr;
  border-bottom: 1px solid lightgray;
  padding: 15px;
`;

const StyledFile = styled(Flex)`
  justify-content: space-between;
  background-color: #272f5a08;
  border-radius: 4px;
  margin-bottom: 6px;
  padding: 15px;

  .File__name {
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0em;
    color: #272f5ab2;
  }
`;

const renderLine = ({ name, value }: ILine) => (
  <Line key={name}>
    <div>{name}</div>
    <div>{value || '—'}</div>
  </Line>
);

const renderFile = (file: FileData & RemoveFile) => (
  <StyledFile>
    <Flex className="File__name">
      <FileIcon />
      <Space />
      {file?.fileResponse?.name}
    </Flex>
    <TrashIcon style={{ cursor: 'pointer' }} onClick={file.removeFile} />
  </StyledFile>
);

function getResourceName(resource: EResourceType | null) {
  if (!resource) return null;

  return allResources.find((elem) => elem.value === resource)?.label || null;
}

function getMountPlaceById(
  id: number | null,
  places: IndividualDeviceMountPlaceListResponse[] | null
): string | null {
  if (!id || !places) return null;

  return places.find((elem) => elem.id === id)?.description || null;
}

function getDate(dateString: string | null) {
  if (!dateString) return null;

  const date = moment(dateString);

  if (!date.isValid) return null;

  return date.format('DD.MM.YYYY');
}

export function toArray<T>(
  obj: object,
  setName: boolean = true
): (T & { __name__?: string })[] {
  const arr = Object.keys(obj).map((name) => {
    const value = (obj as any)[name];
    if (!setName) return value;

    const res = {
      ...value,
    };

    if (setName) {
      res.__name__ = name;
    }

    return res;
  });

  return arr;
}

function getStartupReadingsString(
  value: { [key: string]: number | null },
  color?: string | null
) {
  const values = toArray<number | null>(value, false);

  const filteredValues = values.filter(readingValueValidate);

  if (!filteredValues.length) return null;

  const StyledReadingsValues = styled.div`
    border: 1px solid ${color || 'gray'};
    border-left-width: 3px;
    padding-left: 10px;
    border-radius: 8px;
    width: min-content;
    min-width: 150px;
  `;

  const ReadingValue = styled(Flex)`
    justify-content: space-between;
    border-bottom: 1px solid ${color || 'gray'};

    padding: 5px 5px 5px 0;

    &:last-child {
      border-bottom: none;
    }
  `;

  return (
    <StyledReadingsValues>
      {values.map((elem, index) =>
        readingValueValidate(elem) ? (
          <ReadingValue>
            <div style={{ color: 'lightgray', fontWeight: 600 }}>
              {index + 1}:
            </div>
            <div style={{ marginRight: '0 10px 0 30px' }}>{elem}</div>
          </ReadingValue>
        ) : null
      )}
    </StyledReadingsValues>
  );
}
