import React, { FC } from 'react';
import { Switch } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { BaseInfoStageProps } from './BaseInfoStage.types';
import {
  Footer,
  FormHeader,
  FormWrap,
  SwitchWrapper,
  TextWrapper,
  Wrap,
} from './BaseInfoStage.styled';
import { FormItem } from 'ui-kit/FormItem';
import { ResourceSelect } from 'ui-kit/shared_components/ResourceSelect';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { AutoComplete } from 'ui-kit/AutoComplete';
import { Input } from 'ui-kit/Input';
import { Loader } from 'ui-kit/Loader';
import { Select } from 'ui-kit/Select';
import {
  CreateIndividualDeviceRequest,
  EIndividualDeviceRateType,
  EResourceType,
} from 'myApi';
import { DatePickerNative } from 'ui-kit/shared_components/DatePickerNative';
import { getIndividualDeviceRateNumByName } from 'utils/getIndividualDeviceRateNumByName';
import moment from 'moment';
import { getBitDepthAndScaleFactor } from 'utils/getBitDepthAndScaleFactor';
import { addIndividualDeviceService } from '../../../addIndividualDeviceService.model';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from 'ui-kit/Button';

const {
  gates: {
    ContractorsGate,
    IndividualDeviceMountPlacesGate,
    IndividualDevicecModelsGate,
  },
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
}) => {
  const { values, setFieldValue, errors, handleSubmit } = useFormik({
    initialValues: {
      serialNumber: '',

      lastCheckingDate: null as string | null,

      futureCheckingDate: null as string | null,

      lastCommercialAccountingDate: null as string | null,

      bitDepth: null as number | null,

      scaleFactor: null as number | null,

      apartmentId: apartmentId as number | null,

      mountPlaceId: null as number | null,

      model: '',

      startupReadings: {
        value1: null,
        value2: null,
        value3: null,
        value4: null,
      } as {
        [key: string]: number | null;
      },
      // rules: readingsValuesValidators,

      defaultReadings: {
        value1: null,
        value2: null,
        value3: null,
        value4: null,
      } as {
        [key: string]: number | null;
      },
      // rules: readingsValuesValidators,

      rateType: EIndividualDeviceRateType.OneZone as EIndividualDeviceRateType,

      resource: null as EResourceType | null,

      magneticSealInstallationDate: null as null | string,

      sealNumber: null as null | string,

      contractorId: null as number | null,

      isPolling: false,
    },
    validationSchema: yup.object().shape({
      serialNumber: yup.string().required('Это поле обязательно'),
      lastCheckingDate: yup
        .string()
        .nullable()
        .required('Это поле обязательно'),
      futureCheckingDate: yup
        .string()
        .nullable()
        .required('Это поле обязательно'),
      model: yup.string().required('Это поле обязательно'),
      rateType: yup.string().required('Это поле обязательно'),
      resource: yup.string().nullable().required('Это поле обязательно'),
      bitDepth: yup.number().nullable().required('Это поле обязательно'),
      scaleFactor: yup.number().nullable().required('Это поле обязательно'),
      startupReadings: yup.object().shape({
        value1: yup.number().nullable().required('Это поле обязательно'),
        value2: yup.number().nullable().required('Это поле обязательно'),
        value3: yup.number().nullable().required('Это поле обязательно'),
        value4: yup.number().nullable().required('Это поле обязательно'),
      }),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: (data) => {
      const {
        apartmentId,
        bitDepth,
        contractorId,
        defaultReadings,
        futureCheckingDate,
        isPolling,
        lastCheckingDate,
        lastCommercialAccountingDate,
        magneticSealInstallationDate,
        sealNumber,
        model,
        mountPlaceId,
        rateType,
        resource,
        scaleFactor,
        serialNumber,
        startupReadings,
      } = data;

      handleSubmitForm(data as unknown as CreateIndividualDeviceRequest);
    },
  });

  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const isSerialNumberAllreadyExist =
    serialNumberForChecking?.items?.[0]?.serialNumber === values.serialNumber;

  const modelNameDebounced = values.model;

  const onChangeStartupReadings = (valueNumber: 1 | 2 | 3 | 4) => (e: any) =>
    setFieldValue('startupReadings', {
      ...values.startupReadings,
      [`value${valueNumber}`]:
        e.target.value === '' ? null : Number(e.target.value),
    });
  const onChangeDefaultReadings = (valueNumber: 1 | 2 | 3 | 4) => (e: any) =>
    setFieldValue('defaultReadings', {
      ...values.defaultReadings,
      [`value${valueNumber}`]:
        e.target.value === '' ? null : Number(e.target.value),
    });

  const rateNum = getIndividualDeviceRateNumByName(values.rateType);

  const bottomDateFields = (
    <>
      <FormItem label="Дата последней поверки прибора">
        <DatePickerNative
          onChange={(incomingValue: string) => {
            const value = moment(incomingValue);

            setFieldValue('lastCheckingDate', incomingValue);

            const nextCheckingDate = moment(value);

            if (!values.resource) return;

            const nextYear =
              value?.year() +
              (values.resource === EResourceType.Electricity ? 16 : 6);

            nextCheckingDate.set('year', nextYear);

            setFieldValue('futureCheckingDate', nextCheckingDate.format());
          }}
          value={values.lastCheckingDate}
        />
        <ErrorMessage>{errors.lastCheckingDate}</ErrorMessage>
      </FormItem>
      <FormItem label="Дата следующей поверки прибора">
        <DatePickerNative
          onChange={(value) => setFieldValue('futureCheckingDate', value)}
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
          value={values.defaultReadings.value1 || undefined}
        />
        <ErrorMessage>{}</ErrorMessage>
      </FormItem>

      {rateNum >= 2 && (
        <FormItem label="Первичные текущие прибора (Ночь)">
          <Input
            type="number"
            placeholder="Введите текущие показания"
            onChange={onChangeDefaultReadings(2)}
            value={values.defaultReadings.value2 || undefined}
          />
          <ErrorMessage>{}</ErrorMessage>
        </FormItem>
      )}
      {rateNum >= 3 && (
        <FormItem>
          <Input
            type="number"
            placeholder="Введите текущие показания"
            onChange={onChangeDefaultReadings(3)}
            value={values.defaultReadings.value3 || undefined}
          />
          <ErrorMessage>{}</ErrorMessage>
        </FormItem>
      )}
    </>
  );

  return (
    <Wrap>
      <IndividualDevicecModelsGate model={modelNameDebounced} />
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
            size="large"
            value={values.model}
            placeholder="Введите модель прибора"
            onChange={(value) => setFieldValue('model', value)}
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
              <Select.Option value={elem.id}>{elem.description}</Select.Option>
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

        <FormItem label="Множитель">
          <Input
            type="number"
            placeholder="Введите множитель прибора"
            name="scaleFactor"
            onChange={(value) =>
              setFieldValue('scaleFactor', value.target.value)
            }
            value={values.scaleFactor || undefined}
          />
          <ErrorMessage>{errors.scaleFactor}</ErrorMessage>
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
            value={values.startupReadings.value1 || undefined}
          />
          <ErrorMessage>{errors.startupReadings?.value1}</ErrorMessage>
        </FormItem>

        {rateNum >= 2 && (
          <FormItem label="Первичные показания прибора (Ночь)">
            <Input
              type="number"
              placeholder="Введите первичные показания"
              onChange={onChangeStartupReadings(2)}
              value={values.startupReadings.value2 || undefined}
            />
            <ErrorMessage>{errors.startupReadings?.value2}</ErrorMessage>
          </FormItem>
        )}
        {rateNum >= 3 && (
          <FormItem>
            <Input
              type="number"
              placeholder="Введите первичные показания"
              onChange={onChangeStartupReadings(3)}
              value={values.startupReadings.value3 || undefined}
            />
            <ErrorMessage>{}</ErrorMessage>
          </FormItem>
        )}

        {rateNum === 1 && defaultReadingsFields}
      </FormWrap>

      {rateNum !== 1 && <FormWrap>{defaultReadingsFields}</FormWrap>}

      <FormItem label="Дата ввода в эксплуатацию">
        <DatePickerNative
          onChange={(value) =>
            setFieldValue('lastCommercialAccountingDate', value)
          }
          value={values.lastCommercialAccountingDate}
        />
        <ErrorMessage>{errors.lastCommercialAccountingDate}</ErrorMessage>
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
              setFieldValue('magneticSealInstallationDate', value)
            }
            value={values.magneticSealInstallationDate}
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
        <Button type="ghost" onClick={history.goBack}>
          Отмена
        </Button>
        <Button onClick={() => handleSubmit()}>Далее</Button>
      </Footer>
    </Wrap>
  );
};
