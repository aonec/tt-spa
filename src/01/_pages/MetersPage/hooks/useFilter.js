import axios from '01/axios';
import React from 'react';
import { useHistory } from 'react-router';
import { $existingStreets } from '01/features/housingStocks/displayHousingStockStreets/model';
import { useStore } from 'effector-react';
import {
  $apartment,
  resetApartment,
} from '01/features/apartments/displayApartment/models';
import { useEffect } from 'react';
import stringSimilarity from 'string-similarity';
import { cities } from '01/features/housingStocks/displayHousingStocks/components/HousingStockFilter/HousingStockFilter';
import { resetIndividualDevices } from '01/features/individualDevices/displayIndividualDevices/models';

const initialState = {
  city: 'Нижнекамск',
  street: '',
  house: '',
  corpus: '',
  apart: '',
  question: '',
};

function filterReducer(state, action) {
  const { payload, type } = action;
  switch (type) {
    case 'change':
      return { ...state, ...payload };

    case 'reset':
      return { ...initialState, city: state.city || initialState.sity };

    default:
      break;
  }
}

export function useStreetAutocomplete(street, streets) {
  const matches =
    typeof street === 'string' && Array.isArray(streets)
      ? stringSimilarity.findBestMatch(
          street,
          typeof streets[0] === 'string' ? streets : ['']
        )
      : null;

  const matchesArray =
    matches?.ratings
      .filter((value) =>
        value.target.toUpperCase().startsWith(String(street.toUpperCase()))
      )
      .sort((a, b) => b.rating - a.rating)
      .map(({ target }) => ({ value: target })) || [];

  const streetMatch = matchesArray[0]?.value;

  return {
    streetMatch,
    options: matchesArray?.length ? [matchesArray[0]] : [],
  };
}

export const useFilter = () => {
  const [state, dispatch] = React.useReducer(filterReducer, initialState);
  const { apart, street, house, city } = state;
  const history = useHistory();

  const apartment = useStore($apartment);

  useEffect(() => {
    if (apartment && apartment.housingStock)
      dispatch({
        type: 'change',
        payload: {
          street: apartment.housingStock.street,
          house: apartment.housingStock.number,
          apart: apartment.apartmentNumber,
          question: apartment.homeowners[0]?.fullName,
        },
      });
  }, [apartment]);

  const onChange = (value, name) => {
    dispatch({ type: 'change', payload: { [name]: value } });
  };

  const onApartmentKeyHandler = async (e, isQuestion = false) => {
    if (e.key !== 'Enter') return;

    if (!isQuestion && [street, house, apart].some((value) => !value)) return;

    try {
      const res = await axios.get('Apartments', {
        params: {
          City: city,
          Street: street,
          ApartmentNumber: apart,
          HousingStockNumber: house,
          Question: state.question,
          PageSize: 1,
          PageNumber: 1,
        },
      });

      const apartment = res.items[0];

      if (apartment) history.push(`/meters/apartments/${apartment.id}`);

      if (!apartment) {
        resetApartment();
        resetIndividualDevices();
        dispatch({ type: 'reset' });
        history.push(`/meters/apartments/`);
      }
    } catch (error) {}
  };

  const streets = useStore($existingStreets);

  const enterKeyDownHandler = (callback) => (e) => {
    if (e.key !== 'Enter') return;

    callback();
  };

  const matches =
    typeof state.street === 'string' && Array.isArray(streets)
      ? stringSimilarity.findBestMatch(
          state.street,
          typeof streets[0] === 'string' ? streets : ['']
        )
      : null;

  const matchesArray =
    matches?.ratings
      .filter((value) =>
        value.target
          .toUpperCase()
          .startsWith(String(state.street.toUpperCase()))
      )
      .sort((a, b) => b.rating - a.rating)
      .map(({ target }) => ({ value: target })) || [];

  const streetMatch = matchesArray[0]?.value;

  return {
    state,
    filter: apart,
    inputs: [
      {
        name: 'city',
        placeholder: 'Город',
        options: cities.map((value) => ({ value })),
      },
      {
        name: 'street',
        placeholder: 'Улица',
        onKeyDown: enterKeyDownHandler(
          () =>
            streetMatch &&
            dispatch({ type: 'change', payload: { street: streetMatch } })
        ),
        options: matchesArray?.length ? [matchesArray[0]] : [],
      },
      {
        name: 'house',
        placeholder: 'Дом',
      },
      {
        name: 'apart',
        placeholder: 'Кв.',
        onKeyDown: onApartmentKeyHandler,
        onFocus: () =>
          dispatch({
            type: 'change',
            payload: { ['question']: '' },
          }),
        onChange: () =>
          dispatch({
            type: 'change',
            payload: { ['question']: '' },
          }),
      },
      {
        name: 'question',
        placeholder: 'Л/С или ФИО',
        onKeyDown: (e) => e.target.value && onApartmentKeyHandler(e, true),
      },
    ].map((elem) => ({
      ...elem,
      [elem.name]: state[elem.name],
      onChange: (value) => {
        elem.onChange && elem.onChange(value);
        onChange(value, elem.name);
      },
      value: state[elem.name],
      onFocus: (name) => {
        elem.onFocus && elem.onFocus();

        dispatch({
          type: name === 'street' ? 'reset' : 'change',
          payload: { [name]: '' },
        });
      },
    })),
  };
};
