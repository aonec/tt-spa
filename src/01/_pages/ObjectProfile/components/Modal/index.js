import React, { useEffect, useState } from 'react';
import './modal.scss';
import $ from 'jquery';
import { Icon } from '../../../../_components/Icon';
import TabsComponent from './components/Tabs';

export const AddDeviceContext = React.createContext();

export const ModalODPU = () => {

  const [tab, setTab] = useState(1);
  const [ok, setOk] = useState("Далее")


  function callback(key){
    console.log("Был = ", tab)
    setTimeout(setTab(key))
    console.log("Стал = ", key)
  }


  const nextOrDone = () => {
    console.log('nextOrDone');
    console.log("сейчас номер вкладки = ", tab)
    console.log($('.ant-tabs-tab-active'));


    $('.ant-tabs-tab-active').next().click();


    console.log("tab", tab)

  }
  const postODPU = () => {
    console.log("postODPU")
  }

  const hideMe = () => {
    $('.overlay').css('display', 'none');
  };
  const test = 'test';
  console.log("ModalODPU'");
  return (
    <AddDeviceContext.Provider
      value={{ tab, setTab, callback }}
    >
      <div className="overlay">
        <div className="modal-odpu-add">
          <Icon
            className="modal__close"
            icon="close"
            color="#272F5A"
            onClick={hideMe}
          />
          <h2 className="title-32">Добавление нового ОДПУ</h2>
          <form>
          <TabsComponent/>

          <div className="modal__bottom">
            <button
              className="modal__button modal__button_ok"
              onClick={postODPU}
              type="submit"
            >
              Выгрузить
            </button>

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
              {ok}
            </button>
          </div>
          </form>

        </div>
      </div>
    </AddDeviceContext.Provider>
  );
};

export default ModalODPU;
