import { DatePickerNative, fromEnter } from 'ui-kit/shared/DatePickerNative';
import { useFormik } from 'formik';
import dayjs from 'api/dayjs';
import React, { ChangeEvent, FC, useCallback, useEffect } from 'react';
import { Button } from 'ui-kit/Button';
import {
  AddApartmentActFormik,
  AddNewActFormProps,
} from './AddNewActForm.types';
import {
  ActDate,
  Blue,
  ButtonBlock,
  ButtonBlue,
  ButtonSC,
  ButtonsWrapper,
  Comment,
  Wrapper,
} from './AddNewActForm.styled';
import { Select } from 'ui-kit/Select';
import { Input } from 'ui-kit/Input';
import { ActTypesNamesLookup } from 'dictionaries';
import { useSwitchInputOnEnter } from 'hooks/useSwitchInputOnEnter';
import { AddressIdSearchContainer } from 'services/actsJournalService/addressIdSearchService';
import { EActResourceType } from 'api/types';
import { DocumentPanel } from '../DocumentPanel';
import { actsJournalService } from 'services/actsJournalService/actsJournalService.model';

const dataKey = 'add-new-act';

const {
  inputs: { successUploadFile },
} = actsJournalService;

export const AddNewActForm: FC<AddNewActFormProps> = ({
  addNewAct,
  isCreateLoading,
  actCreated,
  setModalOpen,
  uploadedFile,
  setViewModalOpen,
  handleDeleteDoc,
  resetActAddress,
}) => {
  const { values, submitForm, setFieldValue, setValues, resetForm } =
    useFormik<AddApartmentActFormik>({
      initialValues: {
        actJobDate: '',
        registryNumber: '',
        actResourceType: null,
        actType: null,
        comment: '',
        documentId: null,
      },
      onSubmit: (values) => {
        const { actResourceType, actType } = values;

        if (!actType || !actResourceType) {
          return;
        }
        addNewAct({ ...values, actType, actResourceType });
      },
    });

  const next = useSwitchInputOnEnter(dataKey, false);

  useEffect(
    () =>
      actCreated.watch(() => {
        setValues({
          ...values,
          actJobDate: '',
          registryNumber: '',
          comment: '',
        });
        next(-1);
      }).unsubscribe,
    [setValues, actCreated, values, next],
  );

  useEffect(() => {
    return successUploadFile.watch((data) =>
      setFieldValue('documentId', data[0].id),
    ).unsubscribe;
  }, [successUploadFile]);

  const handleEnterOnRegistryNumberInput = useCallback(() => {
    if (values.actResourceType) {
      return next(2);
    }
    if (values.actType) {
      return next(1);
    }
    return next(0);
  }, [next, values]);

  const handleEnterOnActTypeSelect = useCallback(() => {
    if (values.actResourceType) {
      return next(2);
    }
    return next(1);
  }, [next, values]);

  return (
    <>
      <Wrapper>
        <ActDate>{dayjs().format('DD.MM.YYYY')}</ActDate>

        <Input
          small
          value={values.registryNumber || undefined}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFieldValue('registryNumber', e.target.value)
          }
          placeholder="Введите"
          data-reading-input={dataKey}
          onKeyDown={(e) => fromEnter(handleEnterOnRegistryNumberInput)(e)}
        />
        <Select
          data-reading-input={dataKey}
          value={values.actType || undefined}
          onChange={(actType) => setFieldValue('actType', actType)}
          placeholder="Выберите тип документа"
          onKeyDown={(e) => fromEnter(handleEnterOnActTypeSelect)(e)}
          showAction={['focus']}
          small
        >
          {Object.entries(ActTypesNamesLookup).map(([type, value]) => (
            <Select.Option key={type} value={type}>
              {value}
            </Select.Option>
          ))}
        </Select>
        <Select
          data-reading-input={dataKey}
          value={values.actResourceType || undefined}
          onChange={(resourceType) =>
            setFieldValue('actResourceType', resourceType)
          }
          placeholder="Выберите"
          onKeyDown={(e) => fromEnter(() => next(2))(e)}
          showAction={['focus']}
          small
        >
          {Object.entries(actResourceNames)?.map(([type, value]) => (
            <Select.Option key={type} value={type}>
              {value}
            </Select.Option>
          ))}
        </Select>
        <AddressIdSearchContainer
          dataKey={dataKey}
          onEnter={(index) => {
            next(index + 3);
          }}
        />
        <DatePickerNative
          fullSize
          searchStyle
          value={values.actJobDate}
          onChange={(date) => setFieldValue('actJobDate', date)}
          placeholder="Дата"
          dataKey={dataKey}
          onKeyDown={fromEnter(() => next(6))}
        />
      </Wrapper>

      <Comment
        placeholder="Комментарий"
        autoSize={{ minRows: 2, maxRows: 6 }}
        value={values.comment as string}
        onChange={(value) => {
          if (values.comment?.length === 0 && value.target.value === '\n') {
            return;
          }
          setFieldValue('comment', value.target.value);
        }}
        data-reading-input={dataKey}
      />

      <ButtonBlock>
        {!uploadedFile && (
          <ButtonBlue type="ghost" size="s" onClick={() => setModalOpen(true)}>
            <Blue>+ Добавить скан</Blue>
          </ButtonBlue>
        )}

        {uploadedFile && (
          <DocumentPanel
            name={uploadedFile.name}
            setViewModalOpen={setViewModalOpen}
            handleDeleteDoc={handleDeleteDoc}
            doc={uploadedFile}
          />
        )}

        <ButtonsWrapper>
          <Button
            type="ghost"
            size="s"
            onClick={() => {
              resetForm();
              resetActAddress();
            }}
          >
            Сбросить
          </Button>
          <ButtonSC size="s" onClick={submitForm} isLoading={isCreateLoading}>
            Сохранить
          </ButtonSC>
        </ButtonsWrapper>
      </ButtonBlock>
    </>
  );
};

export const actResourceNames = {
  [EActResourceType.ColdWaterSupply]: 'ХВС',
  [EActResourceType.HotWaterSupply]: 'ГВС',
  [EActResourceType.Electricity]: 'ЭЭ',
  [EActResourceType.Heat]: 'Тепло',
  [EActResourceType.All]: 'Все',
};
