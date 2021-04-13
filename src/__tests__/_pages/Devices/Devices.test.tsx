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
import { BrowserRouter as Router } from 'react-router-dom';
import thunkMiddleWare from 'redux-thunk';
import rootReducer from '../../../01/Redux/rootReducer';
import { devicesAPI } from '../../../01/_api/devices_page';
import userEvent from '@testing-library/user-event/dist';
import _ from 'lodash';
import { Objects } from '../../../01/_pages/Objects';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

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
    return (
      <Router>
        <Provider store={store}>{children}</Provider>
      </Router>
    );
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
const calculatorsResponseAfterSearch = _.cloneDeep(calculatorsResponse);
calculatorsResponseAfterSearch.successResponse.items[0].address.street =
  'Космонавтов';

const calculatorResponseAfterFilter = _.cloneDeep(calculatorsResponse);
calculatorResponseAfterFilter.successResponse.items[0].address.street =
  'Патриса Лумумбы';

const server = setupServer(
  rest.get(
    'https://transparent-staging.herokuapp.com/api/Calculators/',
    (req, res, ctx) => {
      const query = req.url.searchParams;
      const pageNumber = query.get('pageNumber');
      const pageSize = query.get('pageSize');
      const Question = query.get('Question');
      const Destination = query.get('OrderBy.Destination');
      const Rule = query.get('OrderBy.Rule');
      if (Question === null) {
        return res(ctx.json(calculatorsResponse));
      }
      if (
        Question ===
          calculatorsResponseAfterSearch.successResponse.items[0]
            .serialNumber &&
        !Destination
      ) {
        return res(ctx.json(calculatorsResponseAfterSearch));
      }
      if (Destination === 'Ascending' && Rule === 'Street') {
        return res(ctx.json(calculatorResponseAfterFilter));
      }
    }
  )
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

test('thunk called with right arguments', async () => {
  jest.spyOn(devicesAPI, 'getDevices');
  render(<DevicesFromSearch />);

  expect(screen.getByText('ЗАГРУЗКА...')).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.getByText('ЗАГРУЗКА...'));
  expect(screen.queryByText('ЗАГРУЗКА...')).not.toBeInTheDocument();

  expect(devicesAPI.getDevices).toHaveBeenCalledTimes(1);
  expect(devicesAPI.getDevices).toHaveBeenCalledWith(1, 5, {
    searchTerm: '',
    expirationDate: '',
    destination: '',
    rule: '',
  });
  userEvent.click(
    screen.getByRole('combobox', {
      name: /сортировать по:/i,
    })
  );

  expect(screen.getByText(/улице \(возр\.\)/i)).toBeInTheDocument();

  fireEvent.click(screen.getByText(/улице \(возр\.\)/i));
  await waitFor(() =>
    expect(screen.getByText('ЗАГРУЗКА...')).toBeInTheDocument()
  );
  expect(devicesAPI.getDevices).toHaveBeenCalledTimes(2);
  expect(devicesAPI.getDevices).toHaveBeenCalledWith(1, 5, {
    searchTerm: '',
    expirationDate: '',
    destination: 'Ascending',
    rule: 'Street',
  });
  await waitForElementToBeRemoved(() => screen.getByText('ЗАГРУЗКА...'));
  expect(screen.queryByText('ЗАГРУЗКА...')).not.toBeInTheDocument();
});

test('can load page and search for devices', async () => {
  render(<DevicesFromSearch />);

  expect(
    screen.getByRole('heading', {
      name: /Приборы/i,
    })
  ).toBeInTheDocument();

  expect(screen.getByText('ЗАГРУЗКА...')).toBeInTheDocument();

  await waitForElementToBeRemoved(() => screen.getByText('ЗАГРУЗКА...'));
  expect(screen.queryByText('ЗАГРУЗКА...')).not.toBeInTheDocument();
  await waitFor(() => {
    expect(
      screen.getByText(
        calculatorsResponse.successResponse.items[0].address.street,
        { exact: false }
      )
    ).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(
      screen.getByText(
        calculatorsResponse.successResponse.items[1].address.street,
        { exact: false }
      )
    ).toBeInTheDocument();
  });

  userEvent.type(
    screen.getByRole('textbox'),
    calculatorsResponseAfterSearch.successResponse.items[0].serialNumber
  );

  await waitFor(() => {
    expect(screen.getByText('ЗАГРУЗКА...')).toBeInTheDocument();
  });
  await waitForElementToBeRemoved(() => screen.getByText('ЗАГРУЗКА...'));
  expect(screen.queryByText('ЗАГРУЗКА...')).not.toBeInTheDocument();

  await waitFor(() => {
    expect(
      screen.getByText(
        calculatorsResponseAfterSearch.successResponse.items[0].address.street,
        { exact: false }
      )
    ).toBeInTheDocument();
  });

  userEvent.click(
    screen.getByRole('combobox', {
      name: /сортировать по:/i,
    })
  );

  fireEvent.click(screen.getByText(/улице \(возр\.\)/i));

  await waitFor(() => {
    expect(screen.getByText('ЗАГРУЗКА...')).toBeInTheDocument();
  });
  await waitForElementToBeRemoved(() => screen.getByText('ЗАГРУЗКА...'));
  expect(screen.queryByText('ЗАГРУЗКА...')).not.toBeInTheDocument();
  screen.debug(null, 50000);

  await waitFor(() => {
    expect(
      screen.getByText(
        calculatorResponseAfterFilter.successResponse.items[0].address.street,
        { exact: false }
      )
    ).toBeInTheDocument();
  });
});

test('can load page and search for devices', async () => {
  render(<Objects />);
});
