import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useFormik } from 'formik';
import { message } from 'antd';
import {
  EDayPartError,
  ETemteratureTypes,
  TemperatureGraphProps,
} from './TemperatureGraph.types';
import { Table } from '../../../../../ui-kit/Table/Table';
import {
  Footer,
  InputSc,
  InputsContainer,
  PageWrapper,
  PlusIconSC,
  WrapperCelsius,
  WrapperMultiHeader,
  WrapperT3,
  WrapperTime,
  WrapperUnderscore,
  WrapperValue,
  activeRowCSS,
} from './TemperatureGraph.styled';
import { Button } from 'ui-kit/Button';
import {
  TemperatureNormativeRow,
  TemperatureNormativeUpdateRequest,
} from 'api/types';
import { ErrorColumnType } from '../../temperatureGraphService.types';
import { CriticalTemperaturePanel } from '../CriticalTemperaturePanel';
import { ContextMenuButton } from 'ui-kit/ContextMenuButton';
import { ContextMenuButtonColor } from 'ui-kit/ContextMenuButton/ContextMenuButton.types';
import { CheckLg, DashLg } from 'react-bootstrap-icons';
import { NewTemperatureRowForm } from './NewTemperatureRowForm';
import { temperatureGraphService } from '../../temperatureGraphService.models';

export const TemperatureGraph: FC<TemperatureGraphProps> = ({
  temperatureNormative: initialTemperatureNormatives,
  isEditing,
  handleEditTemperatureNormative,
  setEditedTemperatureNormative,
  isLoading,
  errorColumns,
  temperatureLimits,
  setEditDeviationModalOpen,
  deletingRowIds,
  toggleDeletingRows,
  handleDeleteRows,
  isLoadingDeliting,
  handleCreateRow,
}) => {
  const { values, setFieldValue, handleSubmit, handleReset } = useFormik<{
    temperatureNormativesArr: TemperatureNormativeRow[];
  }>({
    initialValues: { temperatureNormativesArr: initialTemperatureNormatives },
    enableReinitialize: true,
    onSubmit: (data) => {
      const { temperatureNormativesArr } = data;
      const requestData = {
        updateRows: temperatureNormativesArr,
      } as TemperatureNormativeUpdateRequest;
      setEditedTemperatureNormative(requestData);
    },
  });

  const [isNewLine, setIsNewLine] = useState(false);

  useEffect(() => {
    return temperatureGraphService.inputs.updateTemperatureNormativeFx.doneData.watch(
      () => {
        setIsNewLine(false);
        message.success('Новая строка сохранена!');
      },
    ).unsubscribe;
  }, [setIsNewLine]);

  const isDeletingMod = Boolean(deletingRowIds.length);

  const [columnErrors, setColumnErrors] = useState<ErrorColumnType[]>([]);

  useEffect(() => setColumnErrors(errorColumns), [errorColumns]);

  const getDayTime = (inputFieldName: ETemteratureTypes) => {
    const isDay = [
      ETemteratureTypes.dayFeedBackFlowTemperature,
      ETemteratureTypes.dayFeedFlowTemperature,
    ].includes(inputFieldName);

    return isDay ? EDayPartError.day : EDayPartError.night;
  };

  const getValidationPassed = (
    inputFieldName: ETemteratureTypes,
    onBlurData: ChangeEvent<HTMLInputElement>,
    currentTemperatureNormative?: TemperatureNormativeRow,
  ) => {
    if (inputFieldName === ETemteratureTypes.dayFeedFlowTemperature) {
      return Boolean(
        currentTemperatureNormative?.dayFeedBackFlowTemperature &&
          currentTemperatureNormative.dayFeedBackFlowTemperature >
            Number(onBlurData.target.value),
      );
    }
    if (inputFieldName === ETemteratureTypes.dayFeedBackFlowTemperature) {
      return Boolean(
        currentTemperatureNormative?.dayFeedFlowTemperature &&
          currentTemperatureNormative.dayFeedFlowTemperature <
            Number(onBlurData.target.value),
      );
    }
    if (inputFieldName === ETemteratureTypes.nightFeedFlowTemperature) {
      return Boolean(
        currentTemperatureNormative?.nightFeedBackFlowTemperature &&
          currentTemperatureNormative.nightFeedBackFlowTemperature >
            Number(onBlurData.target.value),
      );
    }
    if (inputFieldName === ETemteratureTypes.nightFeedBackFlowTemperature) {
      return Boolean(
        currentTemperatureNormative?.nightFeedFlowTemperature &&
          currentTemperatureNormative.nightFeedFlowTemperature <
            Number(onBlurData.target.value),
      );
    }
    return true;
  };

  const handlePassValidation = (
    currentColumnError: ErrorColumnType | undefined,
    columnErrors: ErrorColumnType[],
    data: TemperatureNormativeRow,
    dayTime: EDayPartError,
  ) => {
    if (currentColumnError) {
      currentColumnError[data.outdoorTemperature!].push(dayTime);
      setColumnErrors([...columnErrors, currentColumnError]);
    } else {
      setColumnErrors([
        ...columnErrors,
        {
          [data.outdoorTemperature!]: [dayTime],
        },
      ]);
    }

    message.error(
      'Температура на обратной магистрали должна быть меньше, чем на подающей',
    );
  };

  const handleNoPassValidation = (
    currentColumnError: ErrorColumnType | undefined,
    columnErrors: ErrorColumnType[],
    data: TemperatureNormativeRow,
    dayTime: EDayPartError,
  ) => {
    if (!currentColumnError) return;

    const filteredDayPart = currentColumnError[data.outdoorTemperature!].filter(
      (dayPart) => dayPart !== dayTime,
    );

    const filteredColumnErrors = columnErrors.filter(
      (columnError) =>
        Number(Object.keys(columnError)[0]) !== data.outdoorTemperature!,
    );

    if (filteredDayPart.length) {
      setColumnErrors([
        ...filteredColumnErrors,
        {
          [data.outdoorTemperature!]: filteredDayPart,
        },
      ]);
    } else {
      setColumnErrors(filteredColumnErrors);
    }
  };

  const handleOnBlur = useCallback(
    (
      onBlurData: ChangeEvent<HTMLInputElement>,
      data: TemperatureNormativeRow,
      inputFieldName: ETemteratureTypes,
    ) => {
      const currentTemperatureNormative = values.temperatureNormativesArr.find(
        (temperatureNormative) =>
          temperatureNormative.outdoorTemperature === data.outdoorTemperature,
      );

      const currentColumnError = columnErrors.find(
        (columnError) => columnError[data.outdoorTemperature!],
      );

      const dayTime = getDayTime(inputFieldName);

      const isPassValidation = getValidationPassed(
        inputFieldName,
        onBlurData,
        currentTemperatureNormative,
      );

      if (isPassValidation) {
        handlePassValidation(currentColumnError, columnErrors, data, dayTime);
      } else {
        handleNoPassValidation(currentColumnError, columnErrors, data, dayTime);
      }
    },
    [columnErrors, values.temperatureNormativesArr],
  );

  const handleChangeInput = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      data: TemperatureNormativeRow,
      fieldName: ETemteratureTypes,
    ) => {
      const updatedValues = values.temperatureNormativesArr.map(
        (temperatureNormative) => {
          if (
            temperatureNormative.outdoorTemperature !== data.outdoorTemperature
          ) {
            return temperatureNormative;
          } else {
            return {
              ...temperatureNormative,
              [fieldName]: Number(e.target.value),
            };
          }
        },
      );

      setFieldValue('temperatureNormativesArr', updatedValues);
    },
    [setFieldValue, values.temperatureNormativesArr],
  );

  const isError = useCallback(
    (fieldName: ETemteratureTypes, data: TemperatureNormativeRow) => {
      const currentColumnErr = columnErrors.find(
        (err) => Number(Object.keys(err)[0]) === data.outdoorTemperature!,
      );

      const dayTime = getDayTime(fieldName);
      const dayParts =
        currentColumnErr && currentColumnErr[data.outdoorTemperature!];
      const isCurrentIncludeErr = dayParts?.includes(dayTime);

      return Boolean(isCurrentIncludeErr);
    },
    [columnErrors],
  );

  const renderDoubledColumns = useCallback(
    (
      data: TemperatureNormativeRow,
      firstInputFieldName: ETemteratureTypes,
      secondInputFieldName: ETemteratureTypes,
    ) =>
      isEditing ? (
        <InputsContainer>
          <InputSc
            type="number"
            suffix={<WrapperCelsius>°C</WrapperCelsius>}
            value={data[firstInputFieldName]}
            onChange={(inputValue) =>
              handleChangeInput(inputValue, data, firstInputFieldName)
            }
            onBlur={(onBlurData: ChangeEvent<HTMLInputElement>) =>
              handleOnBlur(onBlurData, data, firstInputFieldName)
            }
            isErr={isError(firstInputFieldName, data)}
          />
          <InputSc
            type="number"
            suffix={<WrapperCelsius>°C</WrapperCelsius>}
            value={data[secondInputFieldName]}
            onChange={(inputValue) =>
              handleChangeInput(inputValue, data, secondInputFieldName)
            }
            onBlur={(onBlurData: ChangeEvent<HTMLInputElement>) =>
              handleOnBlur(onBlurData, data, secondInputFieldName)
            }
            isErr={isError(secondInputFieldName, data)}
          />
        </InputsContainer>
      ) : (
        <WrapperTime>
          <div>{data[firstInputFieldName]}</div>
          <div>{data[secondInputFieldName]}</div>
        </WrapperTime>
      ),
    [handleChangeInput, handleOnBlur, isEditing, isError],
  );

  return (
    <PageWrapper>
      <CriticalTemperaturePanel
        temperatureLimits={temperatureLimits}
        setEditDeviationModalOpen={setEditDeviationModalOpen}
      />

      <Table
        extraHeader={
          isNewLine && (
            <NewTemperatureRowForm
              onCancel={() => setIsNewLine(false)}
              temp={'190px 280px 160px 280px 60px'}
              handleCreateRow={handleCreateRow}
            />
          )
        }
        rowStyles={(rowData) => {
          if (typeof rowData?.outdoorTemperature !== 'number') return '';

          const isDeleted = deletingRowIds.includes(
            rowData?.outdoorTemperature,
          );

          return isDeleted ? activeRowCSS : '';
        }}
        isSticky
        columns={[
          {
            label: 'Т наружного воздуха',
            size: '190px',
            render: (data) => data.outdoorTemperature,
          },
          {
            label: (
              <WrapperMultiHeader>
                <WrapperUnderscore>
                  Температура в подающем трубопроводе, t<sub>1</sub>
                </WrapperUnderscore>

                <WrapperTime>
                  <div>День</div>
                  <div>Ночь</div>
                </WrapperTime>
              </WrapperMultiHeader>
            ),
            size: '280px',
            render: (data) =>
              renderDoubledColumns(
                data,
                ETemteratureTypes.dayFeedFlowTemperature,
                ETemteratureTypes.nightFeedFlowTemperature,
              ),
          },
          {
            label: (
              <WrapperT3>
                Т подающая в системе отопления, t<sub>3</sub>
              </WrapperT3>
            ),
            size: '160px',
            render: (data) =>
              isEditing ? (
                <InputSc
                  type="number"
                  suffix={<WrapperCelsius>°C</WrapperCelsius>}
                  value={data.heatFeedFlowTemperature}
                  onChange={(inputValue) =>
                    handleChangeInput(
                      inputValue,
                      data,
                      ETemteratureTypes.heatFeedFlowTemperature,
                    )
                  }
                />
              ) : (
                <WrapperValue>{data.heatFeedFlowTemperature}</WrapperValue>
              ),
          },
          {
            label: (
              <WrapperMultiHeader>
                <WrapperUnderscore>
                  Температура в обратном трубопроводе, t<sub>2</sub>
                </WrapperUnderscore>

                <WrapperTime>
                  <div>День</div>
                  <div>Ночь</div>
                </WrapperTime>
              </WrapperMultiHeader>
            ),
            size: '280px',
            render: (data) =>
              renderDoubledColumns(
                data,
                ETemteratureTypes.dayFeedBackFlowTemperature,
                ETemteratureTypes.nightFeedBackFlowTemperature,
              ),
          },
          {
            label: (
              <>
                {!(isDeletingMod || isNewLine) && (
                  <Button
                    icon={<PlusIconSC />}
                    size="s"
                    onClick={() => setIsNewLine(true)}
                  />
                )}
              </>
            ),
            size: '60px',
            hidden: isEditing,
            render: (data) => {
              const outdorTemperature = data.outdoorTemperature;

              if (typeof outdorTemperature !== 'number') return null;

              const isSelected = deletingRowIds.includes(outdorTemperature);

              const toggleDeletion = () =>
                toggleDeletingRows(outdorTemperature);

              const contextMenu = (
                <ContextMenuButton
                  size="small"
                  menuButtons={[
                    {
                      title: 'Удалить строку',
                      color: ContextMenuButtonColor.danger,
                      hidden: isNewLine,
                      onClick: toggleDeletion,
                    },
                  ]}
                />
              );

              if (!isDeletingMod) return contextMenu;

              if (!isSelected)
                return (
                  <Button
                    type="ghost"
                    size="s"
                    icon={<CheckLg />}
                    onClick={toggleDeletion}
                  />
                );

              if (isSelected)
                return (
                  <Button
                    size="s"
                    type="danger"
                    icon={<DashLg />}
                    onClick={toggleDeletion}
                  />
                );
            },
          },
        ]}
        elements={values.temperatureNormativesArr}
      />

      {isEditing && (
        <Footer>
          <Button
            type="ghost"
            onClick={() => {
              handleReset(null);
              handleEditTemperatureNormative(false);
            }}
          >
            Отмена
          </Button>
          <Button
            isLoading={isLoading}
            onClick={() => handleSubmit()}
            disabled={Boolean(columnErrors.length)}
          >
            Сохранить
          </Button>
        </Footer>
      )}
      {Boolean(deletingRowIds.length) && (
        <Footer>
          <Button type="ghost" onClick={() => toggleDeletingRows(null)}>
            Отмена
          </Button>
          <Button
            type="danger"
            isLoading={isLoadingDeliting}
            onClick={handleDeleteRows}
            disabled={Boolean(columnErrors.length)}
          >
            Удалить
          </Button>
        </Footer>
      )}
    </PageWrapper>
  );
};
