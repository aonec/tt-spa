import axios from '01/axios';
import React from 'react';
import { useHistory } from 'react-router';

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
  const { apart, street, house } = state;
  const history = useHistory();

  const onChange = (value, name) => {
    dispatch({ type: 'change', payload: { [name]: value } });
  };

  const onApartmentKeyHandler = async (e) => {
    if (e.key !== 'Enter' || [street, house, apart].some((value) => !value))
      return;

    try {
      const res = await axios.get('Apartments', {
        params: {
          ...{
            Street: street,
            ApartmentNumber: apart,
            HousingStockNumber: house,
            Question: state.question,
          },
          PageSize: 1,
          PageNumber: 1,
        },
      });

      const apartment = res.items[0];

      if (apartment) history.push(`/meters/apartments/${apartment.id}`);

      if (!apartment) history.push(`/meters/apartments/`);
    } catch (error) {}
  };

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
        onKeyDown: onApartmentKeyHandler,
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
