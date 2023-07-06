import React, { FC, useMemo } from 'react';
import { WorkWithIndividualDeviceSubmitActionFormProps } from './WorkWithIndividualDeviceSubmitActionForm.types';
import { useForm } from 'effector-forms';
import { Title } from './WorkWithIndividualDeviceSubmitActionForm.styled';
import { CommonInfo } from 'ui-kit/shared_components/CommonInfo';
import { getTimeStringByUTC } from 'utils/getTimeStringByUTC';
import { ResourceInfo } from 'ui-kit/shared_components/ResourceInfo';
import { WorkWithIndividualDeviceType } from '../../../workWithIndividualDeviceService.types';
import { WorkWithIndividualDeviceInputs } from '../../../view/WorkWithIndividualDevicePage/WorkWithIndividualDeviceForm/WorkWithIndividualDeviceInputs';

export const WorkWithIndividualDeviceSubmitActionForm: FC<
  WorkWithIndividualDeviceSubmitActionFormProps
> = ({ form, contractors, mountPlaces, typeOfAction, individualDevice }) => {
  const { fields } = useForm(form);

  const isCheck = typeOfAction === WorkWithIndividualDeviceType.check;
  const isSwitch = typeOfAction === WorkWithIndividualDeviceType.switch;
  const isReopen = typeOfAction === WorkWithIndividualDeviceType.reopen;

  const oldDeviceInputTitle = useMemo(() => {
    if (isSwitch) {
      return 'Заменяемый прибор';
    } else if (isReopen) {
      return 'Прибор до переоткрытия';
    }
    return '';
  }, [isSwitch, isReopen]);

  const newDeviceInputTitle = useMemo(() => {
    if (isSwitch) {
      return 'Новый прибор';
    } else if (isCheck) {
      return 'Прибор после поверки';
    } else if (isReopen) {
      return 'Прибор после переоткрытия';
    }
    return '';
  }, [isReopen, isSwitch, isCheck]);

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
          title={oldDeviceInputTitle}
          disabled
        />
      )}

      <WorkWithIndividualDeviceInputs
        model={fields.model.value}
        resource={fields.resource.value}
        serialNumber={fields.serialNumber.value}
        rateType={fields.rateType.value}
        readings={fields.newDeviceReadings.value}
        title={newDeviceInputTitle}
        disabled
      />
    </>
  );
};
