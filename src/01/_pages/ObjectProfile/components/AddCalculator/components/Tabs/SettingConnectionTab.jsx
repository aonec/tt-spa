import React from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import {
  Label, InputTT, Wrap, InputWrap,
} from '01/tt-components';
import _ from 'lodash';
import { onChangeFormValueByPath } from '../../store/actions';

const SettingConnectionTab = () => {
  const dispatch = useDispatch();
  const { port, ipV4 } = useSelector((state) => state.calc);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <InputWrap>
        <Label color="grey" htmlFor="#resource">
          IP адрес вычислителя
        </Label>
        <InputTT
          id="ipV4"
          type="text"
          required
          value={ipV4}
          placeholder="192.168.0.1"
          onChange={(event) => {
            const { value } = event.target;
            const path = 'ipV4';
            dispatch(onChangeFormValueByPath(path, value));
            // onChangeFormValueByPath(path, value);
          }}
        />
      </InputWrap>

      <InputWrap>
        <Label color="grey" htmlFor="#resource">
          Порт
        </Label>
        <InputTT
          id="port"
          type="number"
          required
          placeholder="1234"
          value={port}
          onChange={(event) => {
            const { value } = event.target;
            const path = 'port';
            dispatch(onChangeFormValueByPath(path, Number(value)));
            // onChangeFormValueByPath(path, Number(value));
          }}
        />
      </InputWrap>

      <Wrap
        style={{
          background: ' rgba(255, 140, 104, 0.16)',
          marginTop: '24px',
          padding: '24px',
        }}
      >
        Подключение к новому прибору может занять до 30 минут.
      </Wrap>
    </div>
  );
};

// const mapDispatchToProps = (dispatch) => ({
//   onChangeFormValueByPath: (path, value) => {
//     dispatch({
//       type: "CALC_UPDATE_FORM_VALUE_BY_PATH",
//       payload: { path, value },
//     });
//   },
// });

// export default connect(
//   null,
//   mapDispatchToProps
// )(SettingConnectionTab);

export default connect()(SettingConnectionTab);

// export default SettingConnectionTab;
