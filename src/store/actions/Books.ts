import ActionTypes from '../types/ActionTypes'
import { TAction, TBook } from '../types/Types'

const setBooksLoading = (value: boolean): TAction => ({
    type: ActionTypes.SET_BOOKS_LOADING,
    payload: value,
})

const searchBooks = (value: string): TAction => ({
    type: ActionTypes.SEARCH_BOOKS,
    payload: value,
})

const setBooks = (books: TBook[]): TAction => ({
    type: ActionTypes.SET_BOOKS,
    payload: books,
})

const setErrorBooksSearching = (value: boolean) => ({
    type: ActionTypes.SET_ERROR_BOOKS_SEARCHING,
    payload: value,
})

const setDownloadingDate = (value: number) => ({
    type: ActionTypes.SET_DOWNLOADING_DATE,
    payload: value,
})

export {
    setBooks,
    searchBooks,
    setBooksLoading,
    setErrorBooksSearching,
    setDownloadingDate,
}
