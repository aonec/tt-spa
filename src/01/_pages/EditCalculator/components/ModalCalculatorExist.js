import { ButtonTT, Header, StyledFooter, StyledModal, StyledModalBody, Title } from "../../../tt-components";
import React, { useContext } from "react";
import { EditCalculatorContext } from "../index";
import {Link} from 'react-router-dom'


export const ModalCalculatorExist = () => {
  const { alertVisible, setAlertVisible, existCalculator } = useContext(EditCalculatorContext);
  function handleCancel(){
    setAlertVisible(false)
  }
  return (
    <StyledModal
      width={800}
      visible={alertVisible}
      footer={null}
      onCancel={handleCancel}
      onOk={handleCancel}
    >
      <StyledModalBody>
        <Header>В системе уже есть устройство с совпадающими настройками соединения</Header>
        {existCalculator === null ? null : <Link to={`/calculators/${existCalculator}`}>{`Вычислитель с id: ${existCalculator}`}</Link>}
      </StyledModalBody>
      <StyledFooter>
        <ButtonTT color={'white'} type='button' onClick={handleCancel}>Отмена</ButtonTT>
        <ButtonTT color={'red'} type='button' style={{marginLeft: 16}} onClick={handleCancel}>Изменить настройки соединения</ButtonTT>
      </StyledFooter>
    </StyledModal>
  )
}

export default ModalCalculatorExist
