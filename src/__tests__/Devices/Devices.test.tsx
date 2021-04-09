//@ts-nocheck

import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  fireEvent,
  screen,
  waitForElementToBeRemoved,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DevicesFromSearch from '01/_pages/Devices';
import { render as rtlRender } from '@testing-library/react';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
// Import your own reducer
import reducer from '../reducer';
import rootReducer from '../../01/Redux/rootReducer';
import thunkMiddleWare from 'redux-thunk';
import sinon from 'sinon';

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

delete global.window.location;
const href = 'http://localhost:3000';
global.window.location = { href };
global.window.location.replace = () => {};
// Make sure you import sinon

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function render(
  ui,
  {
    initialState,
    store = createStore(
      rootReducer,
      composeEnhancers(applyMiddleware(thunkMiddleWare))
    ),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

const calculatorsResponse = {
  successResponse: {
    totalItems: 472,
    pageNumber: 1,
    pageSize: 5,
    items: [
      {
        connection: { ipV4: '', port: null, deviceAddress: null },
        isConnected: false,
        hasTasks: null,
        address: {
          id: 556,
          city: 'Нижнекамск',
          street: 'Баки Урманче',
          housingStockNumber: '28',
          corpus: null,
        },
        hubs: [
          {
            hub: {
              entryNumber: 2,
              hubNumber: null,
              pipeNumber: 5,
              magistral: 'FeedFlow',
            },
            diameter: '50',
            resource: 'ColdWaterSupply',
            housingMeteringDeviceType: 'FlowMeter',
            id: 2543038,
            transactionType: null,
            model: 'РС (72-А)',
            serialNumber: '044467',
            managementFirm: {
              id: 4,
              name: 'ООО УК"ПЖКХ-17"',
              phoneNumber: null,
              information: null,
              timeZoneOffset: '03:00:00',
            },
            lastCommercialAccountingDate: '2016-01-12T03:00:00',
            futureCommercialAccountingDate: '2019-08-07T03:00:00',
            lastCheckingDate: '2015-08-07T03:00:00',
            futureCheckingDate: '2019-08-07T03:00:00',
            closingDate: null,
          },
        ],
        nodes: [
          {
            id: 1603,
            number: 1,
            nodeStatus: 'Сдан на коммерческий учет',
            resource: 'ColdWaterSupply',
            serviceZone: 'Апартаменты',
            lastCommercialAccountingDate: '2016-01-12T00:00:00',
            futureCommercialAccountingDate: '2019-08-07T00:00:00',
            calculatorId: 2538345,
            communicationPipes: [
              {
                id: 2539648,
                number: 5,
                entryNumber: 2,
                hubNumber: null,
                magistral: 'FeedFlow',
                devices: [
                  {
                    hub: {
                      entryNumber: 2,
                      hubNumber: null,
                      pipeNumber: 5,
                      magistral: 'FeedFlow',
                    },
                    diameter: '50',
                    resource: 'ColdWaterSupply',
                    housingMeteringDeviceType: 'FlowMeter',
                    id: 2543038,
                    transactionType: null,
                    model: 'РС (72-А)',
                    serialNumber: '044467',
                    managementFirm: {
                      id: 4,
                      name: 'ООО УК"ПЖКХ-17"',
                      phoneNumber: null,
                      information: null,
                      timeZoneOffset: '03:00:00',
                    },
                    lastCommercialAccountingDate: '2016-01-12T03:00:00',
                    futureCommercialAccountingDate: '2019-08-07T03:00:00',
                    lastCheckingDate: '2015-08-07T03:00:00',
                    futureCheckingDate: '2019-08-07T03:00:00',
                    closingDate: null,
                  },
                ],
              },
            ],
          },
        ],
        id: 2538345,
        transactionType: null,
        model: 'ТВ-7',
        serialNumber: '12000275',
        managementFirm: {
          id: 4,
          name: 'ООО УК"ПЖКХ-17"',
          phoneNumber: null,
          information: null,
          timeZoneOffset: '03:00:00',
        },
        lastCommercialAccountingDate: '2016-01-12T00:00:00',
        futureCommercialAccountingDate: '2019-08-07T00:00:00',
        lastCheckingDate: '2015-11-16T00:00:00',
        futureCheckingDate: '2019-11-16T00:00:00',
        closingDate: null,
      },
      {
        connection: { ipV4: null, port: null, deviceAddress: null },
        isConnected: true,
        hasTasks: null,
        address: {
          id: 245,
          city: 'Нижнекамск',
          street: 'Шинников',
          housingStockNumber: '44',
          corpus: null,
        },
        hubs: [
          {
            hub: {
              entryNumber: 2,
              hubNumber: null,
              pipeNumber: 5,
              magistral: 'FeedFlow',
            },
            diameter: '50',
            resource: 'ColdWaterSupply',
            housingMeteringDeviceType: 'FlowMeter',
            id: 2545921,
            transactionType: null,
            model: 'ПРЭМ',
            serialNumber: '263854',
            managementFirm: {
              id: 4,
              name: 'ООО УК"ПЖКХ-17"',
              phoneNumber: null,
              information: null,
              timeZoneOffset: '03:00:00',
            },
            lastCommercialAccountingDate: '2019-02-27T03:00:00',
            futureCommercialAccountingDate: '2019-10-20T03:00:00',
            lastCheckingDate: '2015-10-20T03:00:00',
            futureCheckingDate: '2019-10-20T03:00:00',
            closingDate: null,
          },
        ],
        nodes: [
          {
            id: 322,
            number: 1,
            nodeStatus: 'Сдан на коммерческий учет',
            resource: 'ColdWaterSupply',
            serviceZone: 'Апартаменты',
            lastCommercialAccountingDate: '2019-02-27T00:00:00',
            futureCommercialAccountingDate: '2019-10-20T00:00:00',
            calculatorId: 2538948,
            communicationPipes: [
              {
                id: 2541656,
                number: 5,
                entryNumber: 2,
                hubNumber: null,
                magistral: 'FeedFlow',
                devices: [
                  {
                    hub: {
                      entryNumber: 2,
                      hubNumber: null,
                      pipeNumber: 5,
                      magistral: 'FeedFlow',
                    },
                    diameter: '50',
                    resource: 'ColdWaterSupply',
                    housingMeteringDeviceType: 'FlowMeter',
                    id: 2545921,
                    transactionType: null,
                    model: 'ПРЭМ',
                    serialNumber: '263854',
                    managementFirm: {
                      id: 4,
                      name: 'ООО УК"ПЖКХ-17"',
                      phoneNumber: null,
                      information: null,
                      timeZoneOffset: '03:00:00',
                    },
                    lastCommercialAccountingDate: '2019-02-27T03:00:00',
                    futureCommercialAccountingDate: '2019-10-20T03:00:00',
                    lastCheckingDate: '2015-10-20T03:00:00',
                    futureCheckingDate: '2019-10-20T03:00:00',
                    closingDate: null,
                  },
                ],
              },
            ],
          },
        ],
        id: 2538948,
        transactionType: null,
        model: 'ТВ-7.04.1',
        serialNumber: '14015563',
        managementFirm: {
          id: 4,
          name: 'ООО УК"ПЖКХ-17"',
          phoneNumber: null,
          information: null,
          timeZoneOffset: '03:00:00',
        },
        lastCommercialAccountingDate: '2019-02-27T03:00:00',
        futureCommercialAccountingDate: '2019-10-20T03:00:00',
        lastCheckingDate: '2015-12-12T03:00:00',
        futureCheckingDate: '2019-12-12T03:00:00',
        closingDate: null,
      },
    ],
    totalPages: 95,
    hasPreviousPage: false,
    hasNextPage: true,
    nextPageNumber: 2,
    previousPageNumber: 1,
  },
};

const server = setupServer(
  rest.get('Calculators/?pageNumber=1&pageSize=5', (req, res, ctx) => {
    return res(ctx.json({ ...calculatorsResponse.successResponse }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('loads and displays greeting', async () => {
  render(<DevicesFromSearch />);
  // await waitForElementToBeRemoved(() => screen.getByText(/загрузка/i));

  expect(
    screen.getByRole('heading', {
      name: /Приборы/i,
    })
  ).toBeInTheDocument();

  // screen.debug(null, 20000);

  // await waitForElementToBeRemoved(() => {
  //   screen.getByText(/загрузка/i);
  // });

  // await waitFor(() => {
  //   expect(screen.queryByText(/загрузка/i)).not.toBeInTheDocument();
  // });

  await waitForElementToBeRemoved(screen.queryByText(/загрузка.../i));

  // expect(screen.queryByText(/загрузка/i)).not.toBeInTheDocument();

  // fireEvent.click(screen.getByText('Load Greeting'));
  // screen.debug();
  // await waitFor(screen.getByLabelText(/загрузка/i));
  // await waitFor(() => screen.getByRole('heading'));

  // expect(screen.getByRole('heading')).toHaveTextContent('hello there');
  // expect(screen.getByRole('button')).toHaveAttribute('disabled');
});

// test('handles server error', async () => {
//   server.use(
//     rest.get('/greeting', (req, res, ctx) => {
//       return res(ctx.status(500));
//     })
//   );
//
//   fireEvent.click(screen.getByText('Load Greeting'));
//
//   await waitFor(() => screen.getByRole('alert'));
//
//   expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!');
//   expect(screen.getByRole('button')).not.toHaveAttribute('disabled');
// });
