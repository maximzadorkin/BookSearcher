import ActionTypes from '../types/ActionTypes'
import * as Actions from '../actions/Books'
import { Middleware, MiddlewareAPI, Dispatch } from 'redux'
import { TAction, TBook } from '../types/Types'
import API from '../../utils/API'

const detectBookKeyName = (
    lccn: string[],
    isbn: string[]
): [string, string] => {
    if (lccn.length > 0) {
        return [lccn[0], 'lccn']
    } else if (isbn.length > 0) {
        return [isbn[0], 'isbn']
    } else return ['', '']
}

const getBookImgUrl = (lccn: string[], isbn: string[], size: string) => {
    const [key, keyName] = detectBookKeyName(lccn, isbn)
    if (keyName === 'lccn') return API.GetBookCoverImgByLCCN(key, size)
    else if (keyName === 'isbn') return API.GetBookCoverImgByISBN(key, size)
    else return ''
}

const returnArrayFromData = (value: number | string | string[]): string[] => {
    if (typeof value === 'string') return [value]
    else if (typeof value === 'number') return [String(value)]
    else if (value === undefined) return []
    else return value.map((v) => String(v))
}

const fetchSearchedBooks = async (
    search: string,
    storeAPI: any
): Promise<TBook[]> => {
    const requestBooks = await fetch(API.SearchBooks(search))

    if (!requestBooks.ok) {
        storeAPI.dispatch(Actions.setErrorBooksSearching(true))
        return []
    }

    const bodyBooks = await requestBooks.json()
    const books = bodyBooks.docs.map((doc: any) => ({
        title: doc.title,
        author: doc.author_name?.join(', ') || '',
        img_m: getBookImgUrl(
            returnArrayFromData(doc.lccn),
            returnArrayFromData(doc.isbn),
            'M'
        ),
        img_l: getBookImgUrl(
            returnArrayFromData(doc.lccn),
            returnArrayFromData(doc.isbn),
            'L'
        ),
        publicationDate: returnArrayFromData(doc.first_publish_year),
        publisher: returnArrayFromData(doc.publisher),
        ISBN: returnArrayFromData(doc.isbn),
        LCCN: returnArrayFromData(doc.lccn),
    }))
    storeAPI.dispatch(Actions.setErrorBooksSearching(false))
    return books
}

const BooksMiddleware: Middleware =
    (storeAPI: MiddlewareAPI) =>
    (next: Dispatch) =>
    async (action: TAction) => {
        let data
        let state
        switch (action.type) {
            case ActionTypes.SEARCH_BOOKS:
                const date = Date.now()
                storeAPI.dispatch(Actions.setBooksLoading(true))
                storeAPI.dispatch(Actions.setDownloadingDate(date))
                data = await fetchSearchedBooks(action.payload, storeAPI)
                state = storeAPI.getState()
                if (state.books.downloadingDate === date)
                    storeAPI.dispatch(Actions.setBooks(data))
                storeAPI.dispatch(Actions.setBooksLoading(false))
                break
        }

        return next(action)
    }

export default BooksMiddleware
