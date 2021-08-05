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

export const useFilter = (pageDispatch = () => {}) => {
  const [state, dispatch] = React.useReducer(filterReducer, initialState);
  const { city, street, house, apart, question, corpus } = state;

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (street || house || question || corpus || apart) {
        pageDispatch({
          type: 'get_apartments',
          params: {
            Street: street,
            HousingStockNumber: house,
            Question: question,
            Corpus: corpus,
            ApartmentNumber: apart,
          },
        });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [city, street, house, question, corpus, apart]);

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
        name: 'corpus',
        placeholder: 'Корпус',
      },
      {
        name: 'apart',
        placeholder: 'Кв.',
      },
      {
        name: 'question',
        placeholder: 'Л/С или ФИО',
      },
    ].map((elem) => ({
      ...elem,
      [elem.name]: state[elem.name],
      onChange,
      value: state[elem.name],
      onFocus: (e) =>
        dispatch({
          type: e.target.name === 'street' ? 'reset' : 'change',
          payload: { [elem.name]: '' },
        }),
    })),
  };
};
