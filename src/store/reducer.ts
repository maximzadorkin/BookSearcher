import { combineReducers } from 'redux'
import { reducer as BooksReducer } from './reducers/Books'

const reducer = combineReducers({
    books: BooksReducer,
})

export { reducer }
