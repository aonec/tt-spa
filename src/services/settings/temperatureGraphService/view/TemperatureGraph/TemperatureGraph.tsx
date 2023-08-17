import React, { FC } from 'react';
import { TemperatureGraphProps } from './TemperatureGraph.types';
import { Table } from '../../../../../ui-kit/Table/Table';
import {
  Footer,
  InputSc,
  PageWrapper,
  WrapperCelsius,
  WrapperMultiHeader,
  WrapperT3,
  WrapperTime,
  WrapperUnderscore,
} from './TemperatureGraph.styled';
import { CriticalTemperaturePanel } from '../criticalTemperatureDeviationService/view/CriticalTemperaturePanel';
import { Button } from 'ui-kit/Button';
import { TemperatureNormativeResponse } from 'api/types';
import { useFormik } from 'formik';

export const TemperatureGraph: FC<TemperatureGraphProps> = ({
  temperatureNormative: temperatureNormatives,
  isEditing,
  handleEditTemperatureNormative,
}) => {
  const { values, setFieldValue, handleSubmit, handleReset } = useFormik<
    TemperatureNormativeResponse[]
  >({
    initialValues: temperatureNormatives,
    enableReinitialize: true,
    onSubmit: () => {},
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
            render: (data) => (
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
                    const updatedValues = values.map((temperatureNormative) => {
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
                    });

                    setFieldValue('temperatureNormatives', updatedValues);
                  }}
                />
              ) : (
                data.heatFeedFlowTemperature
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
            render: (data) => (
              <WrapperTime>
                <div>{data.dayFeedBackFlowTemperature}</div>
                <div>{data.nightFeedBackFlowTemperature}</div>
              </WrapperTime>
            ),
          },
        ]}
        elements={values}
      />

      {isEditing && (
        <Footer>
          <Button
            type="ghost"
            onClick={() => {
              // handleReset('F');
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
