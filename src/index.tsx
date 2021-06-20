import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { applyMiddleware, createStore, Store } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import { reducer } from './store/reducer'
import BooksMiddleware from './store/middlewares/Books'

const store: Store = createStore(reducer, applyMiddleware(BooksMiddleware))
const app: React.ReactElement = (
    <Provider store={store}>
        <App />
    </Provider>
)
const container: HTMLElement | null = document.body.querySelector('#root')

ReactDOM.render(app, container)
