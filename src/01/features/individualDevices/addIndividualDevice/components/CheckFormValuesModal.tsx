import { $individualDeviceMountPlaces } from '01/features/individualDeviceMountPlaces/displayIndividualDeviceMountPlaces/models';
import { Footer, Header, StyledModal } from '01/shared/ui/Modal/Modal';
import { ButtonTT } from '01/tt-components';
import { resources } from '01/tt-components/localBases';
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
} from '../models';

interface ILine {
  name: string;
  value: ReactNode;
}

export const CheckFormValuesModal = () => {
  const { fields } = useForm(addIndividualDeviceForm);
  const isOpen = useStore($isCheckCreationDeviceFormDataModalOpen);
  const onCancel = () => cancelCheckingButtonClicked();
  const mountPlaces = useStore($individualDeviceMountPlaces);

  const lines: ILine[] = [
    {
      name: 'Ресурс',
      value: getResourceName(fields.resource.value),
    },
    {
      name: 'Модель прибора',
      value: fields.model.value,
    },
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
      name: 'Магнитная пломба',
      value: fields.magneticSealTypeName.value,
    },
    {
      name: 'Дата установки пломбы',
      value: getDate(fields.magneticSealInstallationDate.value),
    },
  ];

  const renderLine = ({ name, value }: ILine) => (
    <Line>
      <div>{name}</div>
      <div>{value || '—'}</div>
    </Line>
  );

  return (
    <StyledModal
      width={800}
      visible={isOpen}
      onCancel={onCancel}
      title={<Header>Добавление нового прибора</Header>}
      footer={
        <Footer>
          <ButtonTT color="white" key="back" onClick={onCancel}>
            Отмена
          </ButtonTT>
          <ButtonTT color="blue" key="submit">
            Создать прибор
          </ButtonTT>
        </Footer>
      }
    >
      <Title>1. Общие данные о приборе</Title>
      {lines.map(renderLine)}
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

function getResourceName(resource: EResourceType | null) {
  if (!resource) return null;

  return resources.find((elem) => elem.value === resource)?.label || null;
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
