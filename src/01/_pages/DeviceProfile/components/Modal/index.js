import React, {
  useRef, useState, useContext
} from "react";
import './modal.css';
import { Radio, ConfigProvider, DatePicker } from 'antd';
import 'antd/dist/antd.css';
import ruRu from 'antd/es/locale/ru_RU';
import { convertDateOnly } from '01/_api/utils/convertDate'
import { DeviceContext } from '../../DeviceProfile';




export const Popup = () => {
  const {device, building}= useContext(DeviceContext);
  const {id, type, resource, model} = {...device}
  const {number, street} = {...building}



  const options = [
    // { label: 'Месячный', value: 'Apple' },
    // { label: 'Месячный', value: 'Apple' },
    { label: 'Часовые', value: 'hourly' },
    { label: 'Суточный', value: 'daily' },
    // { label: 'Годовой ', value: 'Orange' },
  ];


  //const period = useRef();
  const [period, setPeriod] = useState();
  const [begin, setBegin] = useState()
  const [end, setEnd] = useState()

  const datePickerHandler = (event) => {
    console.log("datePickerHandler")
    console.log(event)

    setBegin(convertDateOnly(event[0]))
    console.log("begin = ", begin)
    setEnd(convertDateOnly(event[1]))
    console.log("end = ", end)

    console.log(device)
    console.log(building)
  }
  const onChange = (e) => {
    console.log('radio3 checked', e.target.value);
    setPeriod(e.target.value);
    console.log("value3", period)
    // this.setState({
    //   value3: e.target.value,
    // });
  }

  const { RangePicker } = DatePicker;
  const downloadReport = () => {
    console.log("downloadReport")
    const link = `http://84.201.132.164:8080/api/reports/xlsx?deviceId=${id}&ereporttype=${period}&resourcetype=heat&entrynumber=1&from=${begin}T00:00:00Z&to=${end}T00:00:00Z`
   // const  link = 'ss'
    const template = 'http://84.201.132.164:8080/api/reports/xlsx?deviceId=1510&ereporttype=daily&resourcetype=heat&entrynumber=1&from=2020-08-15T00:00:00Z&to=2020-08-25T00:00:00Z'
    // window.open(link);
    window.location.assign(link);
    console.log(link)
  }
  const hideMe = () => {
    console.log("hideMe")
    const el = document.querySelector('.overlay');
    el.style.visibility = 'hidden';

  }

  return (
    <div className='overlay' style={{ visibility: "hidden" }}>
      <div className='temp'>
        <div className="modal__top">
          <h3 className='modal__title'>Выгрузить отчет о общедомовом потреблении</h3>
          <div>
            <label for="#input">Название отчета</label>
            <input className='modal__input' id='input' value={`${model}_${street}_${number}.exls`}/>
          </div>
          <div className='period_and_type '>
            <div className='period'><label htmlFor="#period">Период выгрузки</label>
              {/*<input className='modal__input' id='period' value='Период выгрузки'/>*/}
              <ConfigProvider locale={ruRu}>
                <RangePicker
                  // format="YYYY-MM-DD"
                  placeholder={['Дата Начала', 'Дата окончания']}
                  onChange={(event) => {
                    datePickerHandler(event)
                  }}
                />
              </ConfigProvider>
            </div>
            <div className='type'>
              <label htmlFor="#type">Тип архива</label>


              <Radio.Group defaultValue="a" size="large" onChange={(event) => onChange(event)}>
                <Radio.Button value="hourly">Часовой</Radio.Button>
                <Radio.Button value="daily">Суточный</Radio.Button>

              </Radio.Group>


            </div>
          </div>

        </div>


        <div className="modal__bottom">
          <button className="modal__button modal__button_cancel" onClick={hideMe}>Отмена</button>
          <button className="modal__button modal__button_ok" onClick={downloadReport}>Выгрузить</button>
        </div>
      </div>
    </div>
  )
}
export default Popup;