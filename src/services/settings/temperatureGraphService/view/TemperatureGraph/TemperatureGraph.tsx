import React, { FC } from 'react';
import { TemperatureGraphProps } from './TemperatureGraph.types';
import { Table } from '../../../../../ui-kit/Table/Table';
import {
  Footer,
  InputSc,
  InputScShort,
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
import { TemperatureNormativeResponse } from 'api/types';
import { useFormik } from 'formik';

export const TemperatureGraph: FC<TemperatureGraphProps> = ({
  temperatureNormative: initialTemperatureNormatives,
  isEditing,
  handleEditTemperatureNormative,
}) => {
  const { values, setFieldValue, handleSubmit, handleReset } = useFormik<{
    temperatureNormativesArr: TemperatureNormativeResponse[];
  }>({
    initialValues: { temperatureNormativesArr: initialTemperatureNormatives },
    enableReinitialize: true,
    onSubmit: (data) => {
      console.log(data);
    },
  });

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
              isEditing ? (
                <InputsContainer>
                  <InputScShort
                    type="number"
                    suffix={<WrapperCelsius>°C</WrapperCelsius>}
                    value={data.dayFeedFlowTemperature}
                    onChange={(inputValue) => {
                      const updatedValues = values.temperatureNormativesArr.map(
                        (temperatureNormative) => {
                          if (temperatureNormative.id !== data.id) {
                            return temperatureNormative;
                          } else {
                            return {
                              ...temperatureNormative,
                              dayFeedFlowTemperature: Number(
                                inputValue.target.value,
                              ),
                            };
                          }
                        },
                      );

                      setFieldValue('temperatureNormativesArr', updatedValues);
                    }}
                  />
                  <InputScShort
                    type="number"
                    suffix={<WrapperCelsius>°C</WrapperCelsius>}
                    value={data.nightFeedFlowTemperature}
                    onChange={(inputValue) => {
                      const updatedValues = values.temperatureNormativesArr.map(
                        (temperatureNormative) => {
                          if (temperatureNormative.id !== data.id) {
                            return temperatureNormative;
                          } else {
                            return {
                              ...temperatureNormative,
                              nightFeedFlowTemperature: Number(
                                inputValue.target.value,
                              ),
                            };
                          }
                        },
                      );

                      setFieldValue('temperatureNormativesArr', updatedValues);
                    }}
                  />
                </InputsContainer>
              ) : (
                <WrapperTime>
                  <div>{data.dayFeedFlowTemperature}</div>
                  <div>{data.nightFeedFlowTemperature}</div>
                </WrapperTime>
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
                  onChange={(inputValue) => {
                    const updatedValues = values.temperatureNormativesArr.map(
                      (temperatureNormative) => {
                        if (temperatureNormative.id !== data.id) {
                          return temperatureNormative;
                        } else {
                          return {
                            ...temperatureNormative,
                            heatFeedFlowTemperature: Number(
                              inputValue.target.value,
                            ),
                          };
                        }
                      },
                    );

                    setFieldValue('temperatureNormativesArr', updatedValues);
                  }}
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
              isEditing ? (
                <InputsContainer>
                  <InputScShort
                    type="number"
                    suffix={<WrapperCelsius>°C</WrapperCelsius>}
                    value={data.dayFeedBackFlowTemperature}
                    onChange={(inputValue) => {
                      const updatedValues = values.temperatureNormativesArr.map(
                        (temperatureNormative) => {
                          if (temperatureNormative.id !== data.id) {
                            return temperatureNormative;
                          } else {
                            return {
                              ...temperatureNormative,
                              dayFeedBackFlowTemperature: Number(
                                inputValue.target.value,
                              ),
                            };
                          }
                        },
                      );

                      setFieldValue('temperatureNormativesArr', updatedValues);
                    }}
                  />
                  <InputScShort
                    type="number"
                    suffix={<WrapperCelsius>°C</WrapperCelsius>}
                    value={data.nightFeedBackFlowTemperature}
                    onChange={(inputValue) => {
                      const updatedValues = values.temperatureNormativesArr.map(
                        (temperatureNormative) => {
                          if (temperatureNormative.id !== data.id) {
                            return temperatureNormative;
                          } else {
                            return {
                              ...temperatureNormative,
                              nightFeedBackFlowTemperature: Number(
                                inputValue.target.value,
                              ),
                            };
                          }
                        },
                      );

                      setFieldValue('temperatureNormativesArr', updatedValues);
                    }}
                  />
                </InputsContainer>
              ) : (
                <WrapperTime>
                  <div>{data.dayFeedBackFlowTemperature}</div>
                  <div>{data.nightFeedBackFlowTemperature}</div>
                </WrapperTime>
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
          <Button type="primary" onClick={() => handleSubmit()}>
            Сохранить
          </Button>
        </Footer>
      )}
    </PageWrapper>
  );
};
