import React, { ChangeEvent, FC, useCallback, useState } from 'react';
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
  WrapperCelsius,
  WrapperMultiHeader,
  WrapperT3,
  WrapperTime,
  WrapperUnderscore,
  WrapperValue,
} from './TemperatureGraph.styled';
import { CriticalTemperaturePanel } from '../criticalTemperatureDeviationService/view/CriticalTemperaturePanel';
import { Button } from 'ui-kit/Button';
import {
  TemperatureNormativeRow,
  TemperatureNormativeUpdateRequest,
} from 'api/types';

export const TemperatureGraph: FC<TemperatureGraphProps> = ({
  temperatureNormative: initialTemperatureNormatives,
  isEditing,
  handleEditTemperatureNormative,
  setEditedTemperatureNormative,
  isLoading,
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

  const [columnError, setColumnError] = useState<
    { [outdoorTemperature: number]: EDayPartError[] }[]
  >([]);

  console.log(columnError);

  const handleChangeInput = useCallback(
    (
      inputValue,
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
              [fieldName]: Number(inputValue.target.value),
            };
          }
        },
      );

      setFieldValue('temperatureNormativesArr', updatedValues);
    },
    [setFieldValue, values.temperatureNormativesArr],
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
          />
          <InputSc
            type="number"
            suffix={<WrapperCelsius>°C</WrapperCelsius>}
            value={data[secondInputFieldName]}
            onChange={(inputValue) =>
              handleChangeInput(inputValue, data, secondInputFieldName)
            }
            onBlur={(onBlurData: ChangeEvent<HTMLInputElement>) => {
              const currentTemperatureNormative =
                values.temperatureNormativesArr.find(
                  (temperatureNormative) =>
                    temperatureNormative.outdoorTemperature ===
                    data.outdoorTemperature,
                )!;

              if (
                currentTemperatureNormative.nightFeedBackFlowTemperature &&
                currentTemperatureNormative.nightFeedBackFlowTemperature >
                  Number(onBlurData.target.value)
              ) {
                setColumnError([
                  ...columnError,
                  {
                    [data.outdoorTemperature!]: [EDayPartError.night],
                  },
                ]);
                return message.error('AAAA');
              }
            }}
            // isError={() => {
            //   data.outdoorTemperature;

            //   columnError.find(
            //     (err) =>
            //       Number(Object.keys(err)[0]) === data.outdoorTemperature!,
            //   );
            // }}
          />
        </InputsContainer>
      ) : (
        <WrapperTime>
          <div>{data[firstInputFieldName]}</div>
          <div>{data[secondInputFieldName]}</div>
        </WrapperTime>
      ),
    [handleChangeInput, isEditing, values.temperatureNormativesArr],
  );

  return (
    <PageWrapper>
      <CriticalTemperaturePanel />
      <Table
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
            type="primary"
            isLoading={isLoading}
            onClick={() => handleSubmit()}
          >
            Сохранить
          </Button>
        </Footer>
      )}
    </PageWrapper>
  );
};
