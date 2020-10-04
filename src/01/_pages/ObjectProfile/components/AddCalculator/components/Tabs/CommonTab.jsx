import React, { useContext } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { ConfigProvider, DatePicker, Select } from 'antd';
import ruRu from 'antd/es/locale/ru_RU';
import moment from 'moment';
import { Label, InputTT, Wrap, InputWrap } from '01/tt-components';
import { AddDeviceContext } from '../../index';
import { items, serviceLife } from '../CalculatorJSON';
import { changeInputVal } from '../../store/actions';

const CommonTab = ({ onChangeFormValueByPath }) => {
	const { addPeriod } = useContext(AddDeviceContext);
	const { serialNumber, checkingDate, lastCommercialAccountingDate, futureCommercialAccountingDate, infoId, futureCheckingDate } = useSelector(
		(state) => state.calc
	);
	const dispatch = useDispatch();

	const handleChange = (e) => {
		// e.target.name, e.target.value
		dispatch(changeInputVal(e.target.name, e.target.value));
	};

	const handleSelectChange = (value, option, name) => {
		dispatch(changeInputVal(name, option));
	};

	const handleDateChange = (date, dateString, name) => {
		dispatch(changeInputVal(name, dateString));
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<InputWrap>
				<Label color='grey' htmlFor='#resource'>
					Серийный номер
				</Label>
				<InputTT id='serialNumber' required placeholder='Serial number...' value={serialNumber} name='serialNumber' onChange={(e) => handleChange(e)} />
			</InputWrap>

			<InputWrap>
				<Label color='grey' htmlFor='#type'>
					Тип вычислителя
				</Label>

				<Select
					placeholder='Выберите тип устройства'
					id='infoId'
					// onChange={(event) => {
					//   const value = event;
					//   const path = ['infoId'];
					//   onChangeFormValueByPath(path, Number(value));
					// }}
					name='infoId'
					onChange={(value, option) => handleSelectChange(value, option, 'infoId')}
					options={items}
					defaultValue={items[0].value}
					defaultValue={infoId.value}
				/>
			</InputWrap>

			<InputWrap>
				<Label color='grey' htmlFor='#resource'>
					Дата ввода в эксплуатацию
				</Label>
				<ConfigProvider locale={ruRu}>
					<DatePicker
						id='lastCommercialAccountingDate'
						defaultValue={moment(lastCommercialAccountingDate)}
						name='lastCommercialAccountingDate'
						// onChange={(date) => {
						//   const path = ['lastCommercialAccountingDate'];
						//   const value = date.toISOString();
						//   onChangeFormValueByPath(path, value);
						// }}

						onChange={(date, dateString) => handleDateChange(date, dateString, 'lastCommercialAccountingDate')}
					/>
				</ConfigProvider>
			</InputWrap>

			<InputWrap>
				<Label color='grey' htmlFor='#resource'>
					Дата Поверки
				</Label>
				<ConfigProvider locale={ruRu}>
					<DatePicker
						defaultValue={moment(checkingDate)}
						name='checkingDate'
						// onChange={(date) => {
						//   const path = ['checkingDate'];
						//   const value = date.toISOString();
						//   onChangeFormValueByPath(path, value);
						// }}
						onChange={(date, dateString) => handleDateChange(date, dateString, 'checkingDate')}
					/>
				</ConfigProvider>
			</InputWrap>

			<InputWrap>
				<Label color='grey' htmlFor='#resource'>
					Дата Следующей поверки
				</Label>
				<ConfigProvider locale={ruRu}>
					<DatePicker
						defaultValue={moment(futureCheckingDate)}
						// onChange={(date) => {
						//   const path = ['futureCheckingDate'];
						//   const value = date.toISOString();
						//   onChangeFormValueByPath(path, value);
						// }}
						name='futureCheckingDate'
						onChange={(date, dateString) => handleDateChange(date, dateString, 'futureCheckingDate')}
					/>
				</ConfigProvider>
			</InputWrap>

			<InputWrap>
				<Label color='grey' htmlFor='#resource' className='tt-label'>
					Срок эксплуатации по нормативу
				</Label>
				<Select
					id='futureCommercialAccountingDate'
					// onChange={(value, target) => {
					//   addPeriod(value, 'futureCommercialAccountingDate');
					// }}
					// onChange={(event) => {
					//   const value = moment()
					//     .add(event, 'year')
					//     .toISOString();
					//   const path = ['futureCommercialAccountingDate'];
					//   onChangeFormValueByPath(path, value);
					// }}
					name='futureCommercialAccountingDate'
					onChange={(value, option) => handleSelectChange(value, option, 'futureCommercialAccountingDate')}
					placeholder='Укажите период'
					options={serviceLife}
					defaultValue={futureCommercialAccountingDate.value}
				/>
			</InputWrap>
		</div>
	);
};

// const mapDispatchToProps = (dispatch) => ({
// 	onChangeFormValueByPath: (path, value) => {
// 		dispatch({
// 			type: 'CALC_UPDATE_FORM_VALUE_BY_PATH',
// 			payload: { path, value }
// 		});
// 	}
// });

// export default connect(
// 	null,
// 	mapDispatchToProps
// )(CommonTab);
export default CommonTab;
