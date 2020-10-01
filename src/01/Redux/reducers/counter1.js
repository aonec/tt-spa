const initialState = {
  counter: 0,
};

export default function counter1(state = initialState, action) {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        counter: state.counter + 1,
      };
    case 'SUB':
      return {
        ...state,
        counter: state.counter - 1,
      };
    case 'ADD_NUMBER':
      return {
        ...state,
        counter: state.counter + action.payload,
      };
    default:
      return state;
  }
}
