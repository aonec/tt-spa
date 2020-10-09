import React from 'react';
import { connect, useSelector } from 'react-redux';
import {
  Label, InputTT, Wrap, InputWrap,
} from '01/tt-components';
import _ from 'lodash';
import { Select } from "antd";

import { magistrals } from '../CalculatorJSON';

const SettingConnectionTab = ({ onChangeFormValueByPath2 }) => {
  const ipV4 = useSelector(
    (state) => _.get(state, ['reducerCalc', 'ipV4']),
    '',
  );

  const port = useSelector(
    (state) => _.get(state, ['reducerCalc', 'port']),
    '',
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>

        <InputWrap>
            <Label color="grey" htmlFor="#resource">
                Выберите вычислитель, к которому подключен прибор
            </Label>
            <InputTT
              id="calculatorId"
              type="number"
              placeholder="Начните вводить серийный номер или IP адрес прибора"
                  onChange={(event) => {
                    const { value } = event.target;
                    const path = ['calculatorId'];
                    onChangeFormValueByPath2(path, Number(value));
                  }}
            />
        </InputWrap>
        <InputWrap>
            <Label color="grey" htmlFor="#resource">
                Номер ввода
            </Label>
            <InputTT
              id="entryNumber"
              type="number"
              required
              defaultValue={1}

              onChange={(event) => {
                  const { value } = event.target;
                  const path = ['entryNumber'];
                  onChangeFormValueByPath2(path, Number(value));
              }}

            />
        </InputWrap>
        <InputWrap>
            <Label color="grey" htmlFor="#resource">
                Номер узла
            </Label>
            <InputTT
              id="hubNumber"
              type="number"
              required
              defaultValue={1}

              onChange={(event) => {
                  const { value } = event.target;
                  const path = ['hubNumber'];
                  onChangeFormValueByPath2(path, Number(value));
              }}

            />
        </InputWrap>
        <InputWrap>
            <Label color="grey" htmlFor="#resource">
                Номер трубы
            </Label>
            <InputTT
              id="pipeNumber"
              type="number"
              required
              defaultValue={1}
              onChange={(event) => {
                  const { value } = event.target;
                  const path = ['pipeNumber'];
                  onChangeFormValueByPath2(path, Number(value));
              }}

            />
        </InputWrap>
        <InputWrap>
            <Label color="grey" htmlFor="#resource">
                Выберите тип ресурса
            </Label>

            <Select
              id="magistral"
              options={magistrals}
              defaultValue={magistrals[0].value}
              onChange={(event) => {
                  const  value  = event;
                  const path = ['magistral'];
                  onChangeFormValueByPath2(path, value);
              }}
            />
        </InputWrap>

    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
    onChangeFormValueByPath2: (path, value) => {
        dispatch({
            type: 'CALC_UPDATE_FORM_VALUE_BY_PATH2',
            payload: { path, value },
        });
    },
});

export default connect(
  null,
  mapDispatchToProps,
)(SettingConnectionTab);

// export default SettingConnectionTab;
