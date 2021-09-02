import { $existingStreets } from '01/features/housingStocks/displayHousingStockStreets/model';
import { useStore } from 'effector-react';
import React from 'react';

const initialState = {
  city: '',
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
      return { ...initialState };

    default:
      break;
  }
}

export const useFilter = () => {
  const [state, dispatch] = React.useReducer(filterReducer, initialState);
  const { city, street, house, apart, question, corpus } = state;

  const onChange = (value, name) => {
    dispatch({ type: 'change', payload: { [name]: value } });
  };

  const onApartmentKeyHandler = (e) => {
    if (e.key !== 'Enter') return;

    console.log('runs');
  };

  const streetSuggestions = useStore($existingStreets);

  return {
    state,
    filter: apart,
    inputs: [
      {
        name: 'city',
        placeholder: 'Город',
        disabled: true,
      },
      {
        name: 'street',
        placeholder: 'Улица',
        options: streetSuggestions.map((elem) => ({
          value: elem,
        })),
      },
      {
        name: 'house',
        placeholder: 'Дом',
      },
      {
        name: 'apart',
        placeholder: 'Кв.',
        onKeyDown: onApartmentKeyHandler,
      },
      {
        name: 'question',
        placeholder: 'Л/С или ФИО',
      },
    ].map((elem) => ({
      ...elem,
      [elem.name]: state[elem.name],
      onChange: (value) => onChange(value, elem.name),
      value: state[elem.name],
      onFocus: (name) =>
        dispatch({
          type: name === 'street' ? 'reset' : 'change',
          payload: { [name]: '' },
        }),
    })),
  };
};
