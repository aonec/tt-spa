import React from "react";
import './modal.scss'
import { Icon } from "../../../../_components/Icon";
import $ from "jquery";
import Page1 from "./components/Page1";
import Page2 from "./components/Page2";
import TabsComponent from "./components/Tabs";

export const ModalODPU = () => {

  const nextOrDone  = () => {
    console.log("nextOrDone")
  }
  const hideMe = () => {
    $('.overlay').css('display', 'none');
  };

  console.log("ModalODPU'")
  return (
    <div className="overlay">
      <div className="modal-odpu-add">
        <Icon
          className="modal__close"
          icon="close"
          color="#272F5A"
          onClick={hideMe}
        />
        <h2 className={'title-32'}>Добавление нового ОДПУ</h2>
        {/*<Page1 />*/}
      <TabsComponent />

        <div className="modal__bottom">
          <button
            className="modal__button modal__button_cancel"
            onClick={hideMe}
          >
            Отмена
          </button>
          <button
            className="modal__button modal__button_ok"
            onClick={nextOrDone}
          >
            Далее
          </button>
        </div>

      </div>
    </div>
  )
}

export default ModalODPU;