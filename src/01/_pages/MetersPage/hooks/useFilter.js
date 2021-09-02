import axios from '01/axios';
import React from 'react';
import { useHistory } from 'react-router';
import { $existingStreets } from '01/features/housingStocks/displayHousingStockStreets/model';
import { useStore } from 'effector-react';
import { $apartment } from '01/features/apartments/displayApartment/models';
import { useEffect } from 'react';

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

  const apartment = useStore($apartment);

  useEffect(() => {
    if (apartment && apartment.housingStock)
      dispatch({
        type: 'change',
        payload: {
          street: apartment.housingStock.street,
          house: apartment.housingStock.number,
          apart: apartment.apartmentNumber,
        },
      });
  }, [apartment]);

  useEffect(() => {}, []);

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

  const streets = useStore($existingStreets);

  const enterKeyDownHandler = (callback) => (e) => {
    if (e.key !== 'Enter') return;

    callback();
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
        onKeyDown: enterKeyDownHandler(
          () =>
            streets[0] &&
            dispatch({ type: 'change', payload: { street: streets[0] } })
        ),
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
        onKeyDown: (e) => e.target.value && onApartmentKeyHandler(e),
      },
    ].map((elem) => ({
      ...elem,
      [elem.name]: state[elem.name],
      onChange: (value) => onChange(value, elem.name),
      value: state[elem.name],
      onFocus: elem.onFocus
        ? elem.onFocus
        : (name) =>
            dispatch({
              type: name === 'street' ? 'reset' : 'change',
              payload: { [name]: '' },
            }),
    })),
  };
};
