import React from 'react';

const initialState = {
  city: '',
  street: '',
  house: '',
  apart: '',
  question: '',
};

function filterReducer(state, action) {
  const { payload, type } = action;
  switch (type) {
    case 'change':
      return { ...state, ...payload };

    default:
      break;
  }
}

export const useFilter = (pageDispatch = () => {}) => {
  const [state, dispatch] = React.useReducer(filterReducer, initialState);
  const { city, street, house, apart, question } = state;

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (street || house || question) {
        pageDispatch({
          type: 'get_apartments',
          params: {
            Street: street,
            HousingStockNumber: house,
            Question: question,
          },
        });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [city, street, house, question]);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch({ type: 'change', payload: { [name]: value } });
  };

  return {
    filter: apart,
    inputs: [
      {
        name: 'city',
        value: city,
        placeholder: 'Город',
        onChange,
        disabled: true,
      },
      {
        name: 'street',
        value: street,
        placeholder: 'Улица',
        onChange,
      },
      {
        name: 'house',
        value: house,
        placeholder: 'Дом',
        onChange,
      },
      {
        name: 'apart',
        value: apart,
        placeholder: 'Кв.',
        onChange,
      },
      {
        name: 'question',
        value: question,
        placeholder: 'Л/С или ФИО',
        onChange,
      },
    ],
  };
};
