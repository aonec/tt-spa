import React from 'react';
import { connect, useSelector } from 'react-redux';
import {
  Label, InputTT, Wrap, InputWrap,
} from '01/tt-components';
import _ from 'lodash';
import { Select } from "antd";

const SettingConnectionTab = () => {
  const {
    connection: { port, ipV4 },
    pipe: { magistral },
  } = useSelector((state) => state.deviceReducer);
  const dispatch = useDispatch();

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Form.Item
        name="text"
        label="Выберите вычислитель, к которому подключен прибор"
      >
        <Input
          id="calculatorId"
          type="number"
          placeholder="Начните вводить ID прибора"
          onChange={(event) => {
            const { value } = event.target;
            const path = ['calculatorId'];
            dispatch(onChangeDeviceFormValueByPath(path, Number(value)));
          }}
        />
      </Form.Item>

      <Form.Item name="text" label="Номер ввода">
        <Input
          id="hubNumber"
          type="number"
          placeholder="1"
          onChange={(event) => {
            const { value } = event.target;
            const path = ['pipe', 'entryNumber'];
            dispatch(onChangeDeviceFormValueByPath(path, Number(value)));
          }}
        />
      </Form.Item>

      <Form.Item name="text" label="Номер узла">
        <Input
          id="pipeNumber"
          type="number"
          placeholder="1"
          onChange={(event) => {
            const { value } = event.target;
            const path = ['pipe', 'hubNumber'];
            dispatch(onChangeDeviceFormValueByPath(path, Number(value)));
          }}
        />
      </Form.Item>

      <Form.Item name="text" label="Номер трубы">
        <Input
          id="pipeNumber"
          type="number"
          placeholder="1"
          onChange={(event) => {
            const { value } = event.target;
            const path = ['pipe', 'pipeNumber'];
            dispatch(onChangeDeviceFormValueByPath(path, Number(value)));
          }}
        />
      </Form.Item>

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
