import React, {
  useState, useRef, useContext, useEffect,
} from 'react';
import $ from 'jquery';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import '01/tt-components/antd.scss';
import {
  Modal,
  ModalWrap,
  ModalTop,
  ModalMain,
  ModalBottom,
  ModalClose,
} from '01/tt-components/Modal';

import { store } from '01/App/App';

import { Title, ButtonTT } from '../../../../tt-components';
import TabsComponent from './components/Tabs/Main';

export const AddDeviceContext = React.createContext();

const ModalCalculator = (props) => {
  const { onChangeFormValueByPath, reducerCalc } = props;
  const { 0: objid } = useParams();
  const [currentTabKey, setTab] = useState('1');
  const modalRef = React.createRef();

  useEffect(() => {
    const name = 'housingStockId';
    const value = Number(objid);
    onChangeFormValueByPath(name, value);
  }, []);

  function handleChangeTab(value) {
    setTab(value);
  }

  const handleNext = () => {
    setTab(String(Number(currentTabKey) + 1));
  };

  const renderNextButton = () => {
    if (currentTabKey === '3') {
      return null;
    }
    return (
      <ButtonTT
        color="blue"
        style={{ marginLeft: '16px' }}
        onClick={handleNext}
      >
        Далее
      </ButtonTT>
    );
  };

  const renderSubmitButton = () => {
    if (currentTabKey !== '3') {
      return null;
    }
    return (
      <ButtonTT
        color="blue"
        style={{ marginLeft: '16px' }}
        onClick={handleSubmit}
      >
        Выгрузить
      </ButtonTT>
    );
  };

  const hideMe = () => {
    $('#add-calculator').css('display', 'none');
  };

  const buttonHandler = () => {
    console.log(reducerCalc);
  };

  const handleSubmit = async () => {
    alert('Cейчас будем отправлять данные!');
    try {
      console.log(store.getState());
      // const res = await axios.post('Calculators', reference.current);
      const res = await axios.post('Calculators', reducerCalc);
      alert('Вычислитель успешно создан !');
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      alert(
        'Что-то пошло не так: попробуйте исправить CЕРИЙНЫЙ НОМЕР И АДРЕС УСТРОЙСТВА',
      );
      throw new Error(error);
    }
  };

  return (
    <AddDeviceContext.Provider value={{}}>
      <Modal id="add-calculator" ref={modalRef}>
        <ModalWrap>
          <ModalClose getModal={modalRef} />
          <ModalTop>
            <Title size="middle" color="black">
              Добавление нового вычислителя
            </Title>
            <button onClick={buttonHandler}>getKey</button>
          </ModalTop>
          <ModalMain>
            <TabsComponent
              currentTabKey={currentTabKey}
              handleChangeTab={handleChangeTab}
            />
          </ModalMain>

          <ModalBottom>
            <ButtonTT color="white" onClick={hideMe}>
              Отмена
            </ButtonTT>
            {renderNextButton()}
            {renderSubmitButton()}
          </ModalBottom>
        </ModalWrap>
      </Modal>
    </AddDeviceContext.Provider>
  );
};

function mapStateToProps(state) {
  return {
    reducerCalc: state.reducerCalc,
  };
}

const mapDispatchToProps = (dispatch) => ({
  onChangeFormValueByPath: (path, value) => {
    dispatch({
      type: 'CALC_UPDATE_FORM_VALUE_BY_PATH',
      payload: { path, value },
    });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalCalculator);
