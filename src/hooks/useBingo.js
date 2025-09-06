import { useReducer } from 'react'

export function useBingo(initialState, reducer) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return { state, dispatch }
}
