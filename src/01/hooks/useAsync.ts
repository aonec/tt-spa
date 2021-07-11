import React from 'react';
import { AxiosResponse } from 'axios';

function useSafeDispatch<Action>(dispatch: React.Dispatch<Action>) {
  const mounted = React.useRef(false);

  React.useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  return React.useCallback(
    (...args: Parameters<React.Dispatch<Action>>) => {
      if (mounted.current) {
        dispatch(...args);
      }
    },
    [dispatch],
  );
}

type AsyncState<DataType> =
  | {
      status: 'idle' | 'pending';
      data?: null;
      error?: null;
    }
  | {
      status: 'resolved';
      data: DataType;
      error: null;
    }
  | {
      status: 'error';
      data: null;
      error: Error;
    };

type AsyncAction<DataType> =
  | {
      type: 'pending';
    }
  | {
      type: 'resolved';
      data: DataType;
    }
  | {
      type: 'error';
      error: Error;
    };

function asyncReducer<DataType>(
  state: AsyncState<DataType>,
  action: AsyncAction<DataType>,
) {
  switch (action.type) {
    case 'pending': {
      return { status: 'pending' as const, data: null, error: null };
    }
    case 'resolved': {
      return { status: 'resolved' as const, data: action.data, error: null };
    }
    case 'error': {
      return { status: 'error' as const, data: null, error: action.error };
    }
    default: {
      throw new Error(`Unhandled action: ${JSON.stringify(action)}`);
    }
  }
}

export function useAsync<DataType>(initialState?: AsyncState<DataType>) {
  const [state, unsafeDispatch] = React.useReducer<
    React.Reducer<AsyncState<DataType>, AsyncAction<DataType>>
  >(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
    ...initialState,
  });

  const dispatch = useSafeDispatch(unsafeDispatch);

  const { data, error, status } = state;

  const run = React.useCallback(
    (promise: Promise<DataType>) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`,
        );
      }
      dispatch({ type: 'pending' });
      return promise.then(
        (data: DataType) => {
          dispatch({ data, type: 'resolved' });
          return data;
        },
        (error: Error) => {
          dispatch({ type: 'error', error });
          return error;
        },
      );
    },
    [dispatch],
  );

  const setData = React.useCallback(
    (data: DataType) => dispatch({ type: 'resolved', data }),
    [dispatch],
  );
  const setError = React.useCallback(
    (error: Error) => dispatch({ type: 'error', error }),
    [dispatch],
  );

  return {
    // using the same names that react-query uses for convenience
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'error',
    isSuccess: status === 'resolved',

    setData,
    setError,
    error,
    status,
    data,
    run,
  };
}
