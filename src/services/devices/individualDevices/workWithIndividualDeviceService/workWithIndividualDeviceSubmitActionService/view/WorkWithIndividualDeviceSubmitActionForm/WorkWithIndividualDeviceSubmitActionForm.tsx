import React, { FC } from 'react';
import { WorkWithIndividualDeviceSubmitActionFormProps } from './WorkWithIndividualDeviceSubmitActionForm.types';
import { Title } from './WorkWithIndividualDeviceSubmitActionForm.styled';
import { CommonInfo } from 'ui-kit/shared/CommonInfo';
import { getTimeStringByUTC } from 'utils/getTimeStringByUTC';
import { ResourceInfo } from 'ui-kit/shared/ResourceInfo';
import { WorkWithIndividualDeviceType } from '../../../workWithIndividualDeviceService.types';
import { WorkWithIndividualDeviceInputs } from '../../../view/WorkWithIndividualDevicePage/WorkWithIndividualDeviceForm/WorkWithIndividualDeviceInputs';
import {
  NewIndividualDeviceTitleLookup,
  OldIndividualDeviceTitleLookup,
} from '../../../view/WorkWithIndividualDevicePage/WorkWithIndividualDeviceForm/WorkWithIndividualDeviceForm.constants';

export const WorkWithIndividualDeviceSubmitActionForm: FC<
  WorkWithIndividualDeviceSubmitActionFormProps
> = ({ contractors, mountPlaces, typeOfAction, individualDevice, form }) => {
  const isCheck = typeOfAction === WorkWithIndividualDeviceType.check;

  if (!form) return null;

  return (
    <>
      <Title>1. Общие данные о приборе</Title>
      <CommonInfo
        items={[
          {
            key: 'Ресурс',
            value: (
              <>{form.resource && <ResourceInfo resource={form.resource} />}</>
            ),
          },
          {
            key: 'Модель прибора',
            value: form.model,
          },
          { key: 'Серийный номер', value: form.serialNumber },
          {
            key: 'Место установки',
            value:
              form.mountPlaceId &&
              (mountPlaces || []).find((elem) => elem.id === form.mountPlaceId)
                ?.description,
          },
          {
            key: 'Разрядность',
            value: form.bitDepth,
          },
          {
            key: 'Множитель',
            value: form.scaleFactor,
          },
          {
            key: 'Дата ввода в эксплуатацию',
            value:
              form.lastCommercialAccountingDate &&
              getTimeStringByUTC(
                form.lastCommercialAccountingDate,
                'DD.MM.YYYY',
              ),
          },
          {
            key: 'Диспетчеризация',
            value: form.isPolling ? 'Да' : 'Нет',
          },
          {
            key: 'Дата последней поверки прибора',
            value:
              form.lastCheckingDate &&
              getTimeStringByUTC(form.lastCheckingDate, 'DD.MM.YYYY'),
          },
          {
            key: 'Дата следующей поверки прибора',
            value:
              form.futureCheckingDate &&
              getTimeStringByUTC(form.futureCheckingDate, 'DD.MM.YYYY'),
          },
          {
            key: 'Пломба',
            value: form.sealNumber,
          },
          {
            key: 'Дата установки пломбы',
            value:
              form.sealInstallationDate &&
              getTimeStringByUTC(form.sealInstallationDate, 'DD.MM.YYYY'),
          },
          {
            key: 'Монтажная организация',
            value: (contractors || []).find(
              (elem) => elem.id === form.contractorId,
            )?.name,
          },
        ]}
      />

      <Title>2. Показания по приборам</Title>
      {!isCheck && (
        <WorkWithIndividualDeviceInputs
          model={individualDevice.model || ''}
          resource={individualDevice.resource}
          serialNumber={individualDevice.serialNumber || ''}
          rateType={individualDevice.rateType}
          readings={form.oldDeviceReadings}
          title={OldIndividualDeviceTitleLookup[typeOfAction]}
          disabled
        />
      )}

      <WorkWithIndividualDeviceInputs
        model={form.model}
        resource={form.resource}
        serialNumber={form.serialNumber}
        rateType={form.rateType}
        readings={form.newDeviceReadings}
        title={NewIndividualDeviceTitleLookup[typeOfAction]}
        disabled
      />
    </>
  );
};
