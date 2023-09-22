import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { AppState, AppDispatch } from './store/store'

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector