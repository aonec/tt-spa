import moment from 'moment';
import _ from 'lodash';

function randomInteger(min, max) {
  // случайное число от min до (max+1)
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

const initialState = {
  calculatorId: 1553976,
  checkingDate: moment().toISOString(),
  connection: {
    ipV4: '192.168.1.1',
    deviceAddress: randomInteger(1, 255),
    port: 0,
  },
  futureCheckingDate: moment().toISOString(),
  futureCommercialAccountingDate: moment().toISOString(),
  housingMeteringDeviceType: 'FlowMeter',
  housingStockId: 0,
  lastCommercialAccountingDate: moment().toISOString(),
  model: 'TEST',
  pipe: {
    entryNumber: 1,
    hubNumber: 1,
    pipeNumber: 1,
    magistral: 'FeedFlow',
  },
  resource: 'ColdWaterSupply',
  serialNumber: '',
};

export default function reducerDev(state = initialState, action) {
  const { connection, pipe } = state;
  const { ipV4, deviceAddress, port } = connection;
  let {
    entryNumber, hubNumber, pipeNumber, magistral,
  } = pipe;

  if (action.type === 'CALC_UPDATE_FORM_VALUE_BY_PATH2') {
    const newState = _.cloneDeep(state);
    const {
      payload: { path, value },
    } = action;

    switch (path[0]) {
      case 'pipeNumber':
        pipeNumber = value;
        _.set(newState, 'pipe', {
          entryNumber, hubNumber, pipeNumber, magistral,
        });
        return newState;
      case 'magistral':
        magistral = value;
        _.set(newState, 'pipe', {
          entryNumber, hubNumber, pipeNumber, magistral,
        });
        return newState;
      case 'entryNumber':
        entryNumber = value;
        _.set(newState, 'pipe', {
          entryNumber, hubNumber, pipeNumber, magistral,
        });
        return newState;

      case 'hubNumber':
        hubNumber = value;
        _.set(newState, 'pipe', {
          entryNumber, hubNumber, pipeNumber, magistral,
        });
        return newState;

      default:
        _.set(newState, path, value);
    }

    return newState;
  }

  return state;
}

// const TEST = {
//   calculatorId: 193130939,
//   checkingDate: '2020-09-25T12:55:18.417Z',
//   connection: {
//     ipV4: '192.168.0.82',
//     deviceAddress: 201,
//     port: 1234,
//   },
//   futureCheckingDate: '2020-09-25T12:55:18.417Z',
//   futureCommercialAccountingDate: '2020-09-25T12:55:18.417Z',
//   housingMeteringDeviceType: 'FlowMeter',
//   housingStockId: 485,
//   lastCommercialAccountingDate: '2020-09-25T12:55:18.417Z',
//   model: 'TEST',
//   pipe: {
//     entryNumber: 1,
//     hubNumber: 1,
//     pipeNumber: 1,
//     magistral: 'FeedFlow',
//   },
//   resource: 'ColdWaterSupply',
//   serialNumber: '193130939',
// };
