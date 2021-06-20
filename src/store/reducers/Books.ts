import { Reducer } from 'react'
import { ActionTypes } from '../types/ActionTypes'
import { TBook, TAction } from '../types/Types'

interface IState {
    booksLoading: boolean
    downloadingDate: number
    books: TBook[]
    errorSearchingBooks: boolean
}

const initialState: IState = {
    booksLoading: false,
    downloadingDate: 0,
    books: [],
    errorSearchingBooks: false,
}

const reducer: Reducer<IState, TAction> = (
    state: IState = initialState,
    action: TAction
): IState => {
    switch (action.type) {
        case ActionTypes.SET_BOOKS_LOADING:
            return { ...state, booksLoading: action.payload }
        case ActionTypes.SET_BOOKS:
            return { ...state, books: action.payload }
        case ActionTypes.SET_ERROR_BOOKS_SEARCHING:
            return { ...state, errorSearchingBooks: action.payload }
        case ActionTypes.SET_DOWNLOADING_DATE:
            return { ...state, downloadingDate: action.payload }
        default:
            return state
    }
}

export { IState, reducer }
