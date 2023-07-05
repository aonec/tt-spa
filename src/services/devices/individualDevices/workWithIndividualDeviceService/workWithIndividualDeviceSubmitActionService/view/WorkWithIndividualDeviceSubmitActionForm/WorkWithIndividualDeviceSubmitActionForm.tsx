import React, { FC } from 'react';
import { WorkWithIndividualDeviceSubmitActionFormProps } from './WorkWithIndividualDeviceSubmitActionForm.types';
import { useForm } from 'effector-forms';
import { Title } from './WorkWithIndividualDeviceSubmitActionForm.styled';
import { CommonInfo } from 'ui-kit/shared_components/CommonInfo';
import { getTimeStringByUTC } from 'utils/getTimeStringByUTC';
import { ResourceInfo } from 'ui-kit/shared_components/ResourceInfo';

export const WorkWithIndividualDeviceSubmitActionForm: FC<
  WorkWithIndividualDeviceSubmitActionFormProps
> = ({ form, contractors, mountPlaces }) => {
  const { fields } = useForm(form);

  return (
    <>
      <Title>1. Общие данные о приборе</Title>
      <CommonInfo
        items={[
          {
            key: 'Ресурс',
            value: (
              <>
                {fields.resource.value && (
                  <ResourceInfo resource={fields.resource.value} />
                )}
              </>
            ),
          },
          {
            key: 'Модель прибора',
            value: fields.model.value,
          },
          { key: 'Серийный номер', value: fields.serialNumber.value },
          {
            key: 'Место установки',
            value:
              fields.mountPlaceId.value &&
              (mountPlaces || []).find(
                (elem) => elem.id === fields.mountPlaceId.value,
              )?.description,
          },
          {
            key: 'Разрядность',
            value: fields.bitDepth.value,
          },
          {
            key: 'Множитель',
            value: fields.scaleFactor.value,
          },
          {
            key: 'Дата ввода в эксплуатацию',
            value:
              fields.lastCommercialAccountingDate.value &&
              getTimeStringByUTC(fields.lastCommercialAccountingDate.value),
          },
          {
            key: 'Диспетчеризация',
            value: fields.isPolling.value ? 'Да' : 'Нет',
          },
          {
            key: 'Дата последней поверки прибора',
            value:
              fields.lastCheckingDate.value &&
              getTimeStringByUTC(fields.lastCheckingDate.value),
          },
          {
            key: 'Дата следующей поверки прибора',
            value:
              fields.futureCheckingDate.value &&
              getTimeStringByUTC(fields.futureCheckingDate.value),
          },
          {
            key: 'Пломба',
            value: fields.sealNumber.value,
          },
          {
            key: 'Дата установки пломбы',
            value:
              fields.sealInstallationDate.value &&
              getTimeStringByUTC(fields.sealInstallationDate.value),
          },
          {
            key: 'Монтажная организация',
            value: (contractors || []).find(
              (elem) => elem.id === fields.contractorId.value,
            )?.name,
          },
        ]}
      />
    </>
  );
};
