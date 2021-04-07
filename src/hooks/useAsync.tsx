import React, { Reducer, useReducer, useCallback } from 'react'

type State<T> = {
  data: null | T
  status: string
  error: null | string
}

type Action<T> =
  | { type: 'pending' }
  | { type: 'resolved'; data: T }
  | { type: 'rejected'; error: string }

function asyncReducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case 'pending': {
      return { status: 'pending', data: null, error: null }
    }
    case 'resolved': {
      return { status: 'resolved', data: action.data, error: null }
    }
    case 'rejected': {
      return { status: 'rejected', data: null, error: action.error }
    }
  }
}

function useAsync<T>() {
  const [state, dispatch] = useReducer<Reducer<State<T>, Action<T>>>(
    asyncReducer,
    {
      status: 'idle',
      data: null,
      error: null,
    }
  )

  const { data, error, status } = state

  const run = useCallback((promise: Promise<T>) => {
    dispatch({ type: 'pending' })
    promise.then(
      (data) => {
        dispatch({ type: 'resolved', data })
      },
      (error: Error) => {
        dispatch({ type: 'rejected', error: error.message })
      }
    )
  }, [])

  return {
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',
    error,
    status,
    data,
    run,
  }
}

export { useAsync }
