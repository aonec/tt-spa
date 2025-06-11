import React, { FC, useState } from 'react';
import { Switch } from 'antd';
import { useFormik } from 'formik';
import { BaseInfoStageProps } from './BaseInfoStage.types';
import {
  Footer,
  FormHeader,
  FormWrap,
  Language,
  SwitchWrapper,
  TextWrapper,
  Wrap,
} from './BaseInfoStage.styled';
import { FormItem } from 'ui-kit/FormItem';
import { ResourceSelect } from 'ui-kit/shared/ResourceSelect';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { AutoComplete } from 'ui-kit/AutoComplete';
import { Input } from 'ui-kit/Input';
import { Loader } from 'ui-kit/Loader';
import { Select } from 'ui-kit/Select';
import {
  CreateIndividualDeviceRequest,
  EIndividualDeviceRateType,
  EResourceType,
} from 'api/types';
import { DatePickerNative } from 'ui-kit/shared/DatePickerNative';
import { getIndividualDeviceRateNumByName } from 'utils/getIndividualDeviceRateNumByName';
import dayjs from 'api/dayjs';
import { getBitDepthAndScaleFactor } from 'utils/getBitDepthAndScaleFactor';
import { addIndividualDeviceService } from '../../../addIndividualDeviceService.model';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'ui-kit/Button';
import { validationSchema } from './BaseInfoStage.constants';
import { languageDetect } from 'utils/languageDetect';

const {
  gates: { ContractorsGate, IndividualDeviceMountPlacesGate },
} = addIndividualDeviceService;

export const BaseInfoStage: FC<BaseInfoStageProps> = ({
  handleFetchSerialNumberForCheck,
  serialNumberForChecking,
  isFetchSerialNumberLoading,
  contractors,
  modelNames,
  mountPlaces,
  handleSubmitForm,
  apartmentId,
  formData,
  handleFetchModels,
}) => {
  const { values, setFieldValue, errors, handleSubmit } = useFormik({
    initialValues: {
      serialNumber: formData?.serialNumber || '',
      lastCheckingDate: formData?.lastCheckingDate || (null as string | null),
      futureCheckingDate:
        formData?.futureCheckingDate || (null as string | null),
      openingDate: formData?.openingDate || (null as string | null),
      bitDepth: formData?.bitDepth || (null as number | null),
      apartmentId: apartmentId as number | null,
      mountPlaceId: formData?.mountPlaceId || (null as number | null),
      model: formData?.model || '',
      rateType:
        formData?.rateType ||
        (EIndividualDeviceRateType.OneZone as EIndividualDeviceRateType),
      startupReadings1:
        formData?.startupReadings.value1 || (null as number | null),
      startupReadings2:
        formData?.startupReadings.value2 || (null as number | null),
      startupReadings3:
        formData?.startupReadings.value3 || (null as number | null),
      defaultReadings1:
        formData?.defaultReadings?.value1 || (null as number | null),
      defaultReadings2:
        formData?.defaultReadings?.value2 || (null as number | null),
      defaultReadings3:
        formData?.defaultReadings?.value3 || (null as number | null),
      resource: formData?.resource || (null as EResourceType | null),
      sealInstallationDate:
        formData?.sealInstallationDate || (null as null | string),
      sealNumber: formData?.sealNumber || (null as null | string),
      contractorId: formData?.contractorId || (null as number | null),
      isPolling: formData?.isPolling || false,
    },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: ({
      defaultReadings1,
      defaultReadings2,
      defaultReadings3,
      startupReadings1,
      startupReadings2,
      startupReadings3,
      ...data
    }) => {
      handleSubmitForm({
        ...data,
        defaultReadings: {
          value1: defaultReadings1,
          value2: defaultReadings2,
          value3: defaultReadings3,
        },
        startupReadings: {
          value1: startupReadings1,
          value2: startupReadings2,
          value3: startupReadings3,
        },
      } as unknown as CreateIndividualDeviceRequest);
    },
  });

  const [language, setLanguage] = useState('unknown');

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const isSerialNumberAllreadyExist =
    serialNumberForChecking?.items?.[0]?.serialNumber === values.serialNumber;

  const onChangeStartupReadings =
    (valueNumber: 1 | 2 | 3) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setFieldValue(
        `startupReadings${valueNumber}`,
        e.target.value === '' ? null : Number(e.target.value),
      );
  const onChangeDefaultReadings =
    (valueNumber: 1 | 2 | 3) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setFieldValue(
        `defaultReadings${valueNumber}`,
        e.target.value === '' ? null : Number(e.target.value),
      );

  const rateNum = getIndividualDeviceRateNumByName(values.rateType);

  const bottomDateFields = (
    <>
      <FormItem label="Дата последней поверки прибора">
        <DatePickerNative
          onChange={(incomingValue: string) => {
            const value = dayjs(incomingValue);

            const formattedDate = value.format('YYYY-MM-DD');

            setFieldValue('lastCheckingDate', formattedDate);

            const nextCheckingDate = dayjs(formattedDate).add(
              values.resource === EResourceType.Electricity ? 16 : 6,
              'year',
            );

            const formattedNextCheckingDate =
              nextCheckingDate.format('YYYY-MM-DD');

            setFieldValue('futureCheckingDate', formattedNextCheckingDate);
          }}
          value={values.lastCheckingDate}
        />
        <ErrorMessage>{errors.lastCheckingDate}</ErrorMessage>
      </FormItem>
      <FormItem label="Дата следующей поверки прибора">
        <DatePickerNative
          onChange={(value) =>
            setFieldValue(
              'futureCheckingDate',
              dayjs(value).format('YYYY-MM-DD'),
            )
          }
          value={values.futureCheckingDate}
        />
        <ErrorMessage>{errors.futureCheckingDate}</ErrorMessage>
      </FormItem>
    </>
  );

  const defaultReadingsFields = (
    <>
      <FormItem
        label={`Текущие показания прибора${rateNum !== 1 ? ' (День)' : ''}`}
      >
        <Input
          type="number"
          placeholder="Введите текущие показания"
          onChange={onChangeDefaultReadings(1)}
          value={values.defaultReadings1 || undefined}
        />
        <ErrorMessage>{errors.defaultReadings1}</ErrorMessage>
      </FormItem>

      {rateNum >= 2 && (
        <FormItem label="Текущие показания прибора (Ночь)">
          <Input
            type="number"
            placeholder="Введите текущие показания"
            onChange={onChangeDefaultReadings(2)}
            value={values.defaultReadings2 || undefined}
          />
          <ErrorMessage>{errors.defaultReadings2}</ErrorMessage>
        </FormItem>
      )}
      {rateNum >= 3 && (
        <FormItem>
          <Input
            type="number"
            placeholder="Введите текущие показания"
            onChange={onChangeDefaultReadings(3)}
            value={values.defaultReadings3 || undefined}
          />
          <ErrorMessage>{errors.defaultReadings3}</ErrorMessage>
        </FormItem>
      )}
    </>
  );

  return (
    <Wrap>
      <IndividualDeviceMountPlacesGate apartmentId={Number(id)} />
      <ContractorsGate />

      <FormHeader>Общие данные о приборе</FormHeader>
      <FormWrap>
        <FormItem label="Тип ресурса">
          <ResourceSelect
            onChange={(value) => {
              setFieldValue('resource', value);

              if (!value) return;

              const { bitDepth, scaleFactor } =
                getBitDepthAndScaleFactor(value);

              setFieldValue('bitDepth', bitDepth);
              setFieldValue('scaleFactor', scaleFactor);
            }}
            resource={values.resource}
          />

          <ErrorMessage>{errors.resource}</ErrorMessage>
        </FormItem>

        <FormItem label="Модель прибора">
          <AutoComplete
            prefix={language !== 'unknown' && <Language>{language}</Language>}
            size="large"
            value={values.model}
            placeholder="Введите модель прибора"
            onChange={(value) => {
              setFieldValue('model', value);
              handleFetchModels(String(value));
              setLanguage(languageDetect(value as string));
            }}
            options={modelNames?.map((elem) => ({ value: elem })) || []}
          />
          <ErrorMessage>{errors.model}</ErrorMessage>
        </FormItem>

        <FormItem label="Серийный номер">
          <Input
            small={false}
            placeholder="Введите серийный номер прибора"
            onChange={(value) =>
              setFieldValue('serialNumber', value.target.value)
            }
            name="serialNumber"
            value={values.serialNumber}
            onBlur={(value) =>
              value.target.value &&
              handleFetchSerialNumberForCheck(value.target.value)
            }
            suffix={<Loader show={isFetchSerialNumberLoading} />}
          />
          <ErrorMessage>{errors.serialNumber}</ErrorMessage>
          {isSerialNumberAllreadyExist && (
            <ErrorMessage>
              Данный серийный номер уже существует в базе
            </ErrorMessage>
          )}
        </FormItem>

        <FormItem label="Место установки">
          <Select
            placeholder="Выберите место установки"
            value={values.mountPlaceId || undefined}
            onChange={(value) => setFieldValue('mountPlaceId', value)}
          >
            {mountPlaces?.map((elem) => (
              <Select.Option value={elem.id} key={elem.id}>
                {elem.description}
              </Select.Option>
            ))}
          </Select>
          <ErrorMessage>{errors.mountPlaceId}</ErrorMessage>
        </FormItem>

        <FormItem label="Разрядность">
          <Input
            type="number"
            placeholder="Введите разрядность прибора"
            name="bitDepth"
            onChange={(value) => setFieldValue('bitDepth', value.target.value)}
            value={values.bitDepth || undefined}
          />
          <ErrorMessage>{errors.bitDepth}</ErrorMessage>
        </FormItem>
      </FormWrap>

      <FormItem label="Тариф прибора">
        <Select
          placeholder="Выберите тариф прибора"
          value={values.rateType}
          onChange={(value) => setFieldValue('rateType', value)}
        >
          <Select.Option value={EIndividualDeviceRateType.OneZone}>
            Одна зона
          </Select.Option>
          <Select.Option value={EIndividualDeviceRateType.TwoZone}>
            Две зоны
          </Select.Option>
          <Select.Option value={EIndividualDeviceRateType.ThreeZone}>
            Три зоны
          </Select.Option>
        </Select>
      </FormItem>

      <FormWrap>
        <FormItem
          label={`Первичные показания прибора${rateNum !== 1 ? ' (День)' : ''}`}
        >
          <Input
            type="number"
            placeholder="Введите первичные показания"
            onChange={onChangeStartupReadings(1)}
            value={values.startupReadings1 || undefined}
          />
          <ErrorMessage>{errors.startupReadings1}</ErrorMessage>
        </FormItem>

        {rateNum >= 2 && (
          <FormItem label="Первичные показания прибора (Ночь)">
            <Input
              type="number"
              placeholder="Введите первичные показания"
              onChange={onChangeStartupReadings(2)}
              value={values.startupReadings2 || undefined}
            />
            <ErrorMessage>{errors.startupReadings2}</ErrorMessage>
          </FormItem>
        )}
        {rateNum >= 3 && (
          <FormItem>
            <Input
              type="number"
              placeholder="Введите первичные показания"
              onChange={onChangeStartupReadings(3)}
              value={values.startupReadings3 || undefined}
            />
            <ErrorMessage>{errors.startupReadings3}</ErrorMessage>
          </FormItem>
        )}

        {rateNum === 1 && defaultReadingsFields}
      </FormWrap>

      {rateNum !== 1 && <FormWrap>{defaultReadingsFields}</FormWrap>}

      <FormItem label="Дата ввода в эксплуатацию">
        <DatePickerNative
          onChange={(value) =>
            setFieldValue('openingDate', dayjs(value).format('YYYY-MM-DD'))
          }
          value={values.openingDate}
        />
        <ErrorMessage>{errors.openingDate}</ErrorMessage>
      </FormItem>

      <SwitchWrapper>
        <Switch
          checked={values.isPolling}
          onChange={(value) => setFieldValue('isPolling', value)}
        />
        <TextWrapper>Дистанционное снятие показаний</TextWrapper>
      </SwitchWrapper>

      <FormWrap>{bottomDateFields}</FormWrap>

      <FormWrap>
        <FormItem label="Пломба">
          <Input
            placeholder="Номер пломбы"
            value={values.sealNumber || undefined}
            onChange={(value) =>
              setFieldValue('sealNumber', value.target.value)
            }
            name="sealNumber"
          />
        </FormItem>

        <FormItem label="Дата установки пломбы">
          <DatePickerNative
            onChange={(value) =>
              setFieldValue(
                'sealInstallationDate',
                dayjs(value).format('YYYY-MM-DD'),
              )
            }
            value={values.sealInstallationDate}
          />
        </FormItem>
      </FormWrap>

      <FormItem label="Монтажная организация">
        <Select
          onChange={(value) => setFieldValue('contractorId', value)}
          value={values.contractorId || void 0}
          placeholder="Выберите монтажную организацию"
        >
          {contractors?.map((elem) => (
            <Select.Option value={elem.id} key={elem.id}>
              {elem.name}
            </Select.Option>
          ))}
        </Select>
      </FormItem>

      <Footer>
        <Button type="ghost" onClick={() => navigate(-1)}>
          Отмена
        </Button>
        <Button onClick={() => handleSubmit()}>Далее</Button>
      </Footer>
    </Wrap>
  );
};
