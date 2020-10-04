import moment from 'moment';
import _ from 'lodash';
import { CHANGE_INPU_VALUE } from './constants';

const initialState = {
	serialNumber: '',
	checkingDate: moment().toISOString(),
	futureCheckingDate: moment().toISOString(),
	lastCommercialAccountingDate: moment().toISOString(),
	connection: {
		ipV4: '192.168.0.1',
		deviceAddress: 0,
		port: 1234
	},
	futureCommercialAccountingDate: { value: '4', label: '4 года', id: 1 },
	housingStockId: 0,
	infoId: {
		value: '1',
		label: 'ТЭМ-106',
		id: 1,
		parent: 'infoId'
	}
};

const calc = (state = initialState, action) => {
	switch (action.type) {
		case CHANGE_INPU_VALUE:
			return { ...state, ...action.payload };
		default:
			return state;
	}
};

export default calc;

// if (path[0] === "port") {
//   port = value;
//   _.set(newState, "connection", { ipV4, deviceAddress, port });
//   return newState;
// }

// if (path[0] === "ipV4") {
//   ipV4 = value;
//   const res = { value, deviceAddress, port };
//   _.set(newState, "connection", { ipV4, deviceAddress, port });
//   return newState;
// }

// const INFO_ID = 'InfoId';
// const SERIAL_NUMBER = 'serialNumber';
// const CHECKING_DATE = 'checkingDate';
// const FUTURE_CHECKING_DATE = 'futureCheckingDate';
// const LAST_COMMERCIAL_ACCOUNTING_DATE = 'lastCommercialAccountingDate';
// const IPV4 = 'ipV4';
// const DEVICE_ADDRESS = 'deviceAddress';
// const PORT = 'port';
// const FUTURE_COMMERCIAL_ACCOUNTING_DATE = 'futureCommercialAccountingDate';
// const HOUSE_STOCKING_ID = 'housingStockId';

// console.log(connection);

// if (action.type === INFO_ID) {
//   return { ...state, infoId: +action.value };
// }
// if (action.type === SERIAL_NUMBER) {
//   // здесь это тоже передается строковым значением
//   return { ...state, serialNumber: `${action.value}` };
// }
// if (action.type === HOUSE_STOCKING_ID) {
//   return { ...state, housingStockId: action.value };
// }
// if (action.type === LAST_COMMERCIAL_ACCOUNTING_DATE) {
//   return { ...state, lastCommercialAccountingDate: action.value };
// }
// if (action.type === CHECKING_DATE) {
//   return { ...state, checkingDate: action.value };
// }
// if (action.type === FUTURE_CHECKING_DATE) {
//   return { ...state, futureCheckingDate: action.value };
// }
// if (action.type === FUTURE_COMMERCIAL_ACCOUNTING_DATE) {
//   return { ...state, futureCommercialAccountingDate: action.value };
// }
// if (action.type === PORT) {
//   port = Number(action.value);
//   return { ...state, connection: { ipV4, deviceAddress, port } };
// }
// if (action.type === IPV4) {
//   ipV4 = `${action.value}`;
//   return { ...state, connection: { ipV4, deviceAddress, port } };
// }
