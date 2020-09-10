import React, {
  useRef, useState
} from "react";
import './modal.css';
import { Radio, ConfigProvider, DatePicker } from 'antd';
import 'antd/dist/antd.css';
import ruRu from 'antd/es/locale/ru_RU';


export const Popup = () => {
  const options = [
    // { label: 'Месячный', value: 'Apple' },
    // { label: 'Месячный', value: 'Apple' },
    { label: 'Часовые', value: 'hourly' },
    { label: 'Суточный', value: 'daily' },
    // { label: 'Годовой ', value: 'Orange' },
  ];


  //const period = useRef();
  const [period, setPeriod] = useState();

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
    const link = `http://84.201.132.164:8080/api/reports/xlsx?deviceId=1510&ereporttype=${period}&resourcetype=heat&entrynumber=1&from=2020-08-15T00:00:00Z&to=2020-08-25T00:00:00Z`
    // window.open(link);
    window.location.assign(link);
    console.log(period)
  }

  return (
    <div className='overlay'>
      <div className='temp'>
        <div className="modal__top">
          <h3 className='modal__title'>Выгрузить отчет о общедомовом потреблении</h3>
          <div>
            <label for="#input">Название отчета</label>
            <input className='modal__input' id='input' value='ВКТ-7_проспект Мира_34.exls'/>
          </div>
          <div className='period_and_type '>
          <div className='period'><label htmlFor="#period">Период выгрузки</label>
            {/*<input className='modal__input' id='period' value='Период выгрузки'/>*/}
            <ConfigProvider locale={ruRu}>
            <RangePicker
              // showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              placeholder={['Дата Начала', 'Дата окончания']}
              onChange={(event)=>{console.log(event)}}
            />
            </ConfigProvider>
          </div>
          <div className='type'>
            <label htmlFor="#type">Тип архива</label>

            {/*<Radio.Group id='type' className='modal__radio'*/}
            {/*  options={options}*/}
            {/* onChange={onChange3}*/}
            {/*  value={period}*/}
            {/*  optionType="button"*/}
            {/*/>*/}

            <Radio.Group defaultValue="a" size="large" onChange={(event)=> onChange(event)}>
              <Radio.Button value="hourly">Часовой</Radio.Button>
              <Radio.Button value="daily">Суточный</Radio.Button>

            </Radio.Group>


            </div>
        </div>

      </div>


      <div className="modal__bottom">
        <button className="modal__button modal__button_cancel">Отмена</button>
        <button className="modal__button modal__button_ok" onClick={downloadReport}>Выгрузить</button>
      </div>
    </div>
</div>
)
}
export default Popup;