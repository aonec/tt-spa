import React, { FC } from 'react';
import { WorkWithIndividualDeviceSubmitActionFormProps } from './WorkWithIndividualDeviceSubmitActionForm.types';
import { useForm } from 'effector-forms';
import { Title } from './WorkWithIndividualDeviceSubmitActionForm.styled';
import { CommonInfo } from 'ui-kit/sharedComponents/CommonInfo';
import { getTimeStringByUTC } from 'utils/getTimeStringByUTC';
import { ResourceInfo } from 'ui-kit/sharedComponents/ResourceInfo';
import { WorkWithIndividualDeviceType } from '../../../workWithIndividualDeviceService.types';
import { WorkWithIndividualDeviceInputs } from '../../../view/WorkWithIndividualDevicePage/WorkWithIndividualDeviceForm/WorkWithIndividualDeviceInputs';
import {
  NewIndividualDeviceTitleLookup,
  OldIndividualDeviceTitleLookup,
} from '../../../view/WorkWithIndividualDevicePage/WorkWithIndividualDeviceForm/WorkWithIndividualDeviceForm.constants';

export const WorkWithIndividualDeviceSubmitActionForm: FC<
  WorkWithIndividualDeviceSubmitActionFormProps
> = ({ form, contractors, mountPlaces, typeOfAction, individualDevice }) => {
  const { fields } = useForm(form);

  const isCheck = typeOfAction === WorkWithIndividualDeviceType.check;

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
              getTimeStringByUTC(
                fields.lastCommercialAccountingDate.value,
                'DD.MM.YYYY',
              ),
          },
          {
            key: 'Диспетчеризация',
            value: fields.isPolling.value ? 'Да' : 'Нет',
          },
          {
            key: 'Дата последней поверки прибора',
            value:
              fields.lastCheckingDate.value &&
              getTimeStringByUTC(fields.lastCheckingDate.value, 'DD.MM.YYYY'),
          },
          {
            key: 'Дата следующей поверки прибора',
            value:
              fields.futureCheckingDate.value &&
              getTimeStringByUTC(fields.futureCheckingDate.value, 'DD.MM.YYYY'),
          },
          {
            key: 'Пломба',
            value: fields.sealNumber.value,
          },
          {
            key: 'Дата установки пломбы',
            value:
              fields.sealInstallationDate.value &&
              getTimeStringByUTC(
                fields.sealInstallationDate.value,
                'DD.MM.YYYY',
              ),
          },
          {
            key: 'Монтажная организация',
            value: (contractors || []).find(
              (elem) => elem.id === fields.contractorId.value,
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
          readings={fields.oldDeviceReadings.value}
          title={OldIndividualDeviceTitleLookup[typeOfAction]}
          disabled
        />
      )}

      <WorkWithIndividualDeviceInputs
        model={fields.model.value}
        resource={fields.resource.value}
        serialNumber={fields.serialNumber.value}
        rateType={fields.rateType.value}
        readings={fields.newDeviceReadings.value}
        title={NewIndividualDeviceTitleLookup[typeOfAction]}
        disabled
      />
    </>
  );
};
