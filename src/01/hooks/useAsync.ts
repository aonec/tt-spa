import React, {Dispatch} from "react";

interface StateInterface {
    status: 'idle' | 'pending' | 'resolved' | 'rejected'
    data: any
    error: any
}

const defaultInitialState: StateInterface = {status: 'idle', data: null, error: null}

function useSafeDispatch(dispatch: any) {
    const mounted = React.useRef(false)
    React.useLayoutEffect(() => {
        mounted.current = true
        return () => {
            mounted.current = false
        }
    }, [])
    return React.useCallback(
      (...args) => (mounted.current ? dispatch(...args) : void 0),
      [dispatch],
    )
}

 export function useAsync(initialState = defaultInitialState) {
    const initialStateRef = React.useRef({
        ...defaultInitialState,
        ...initialState,
    })
    const [{status, data, error}, setState] = React.useReducer(
      (s: StateInterface, a: StateInterface) => ({...s, ...a}),
      initialStateRef.current,
    )

    const safeSetState = useSafeDispatch(setState)

    const run = React.useCallback(
      promise => {
          if (!promise || !promise.then) {
              throw new Error(
                `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`,
              )
          }
          safeSetState({status: 'pending'})
          return promise.then(
              (data: any) => {
                safeSetState({data, status: 'resolved'})
                return data
            },
              (error: any) => {
                safeSetState({status: 'rejected', error})
                return error
            }
          )
      },
      [safeSetState],
    )

    const setData = React.useCallback(data => safeSetState({data}), [
        safeSetState,
    ])
    const setError = React.useCallback(error => safeSetState({error}), [
        safeSetState,
    ])
    const reset = React.useCallback(() => safeSetState(initialStateRef.current), [
        safeSetState,
    ])

    return {
        // using the same names that react-query uses for convenience
        isIdle: status === 'idle',
        isLoading: status === 'pending',
        isError: status === 'rejected',
        isSuccess: status === 'resolved',

        setData,
        setError,
        error,
        status,
        data,
        run,
        reset,
    }
}