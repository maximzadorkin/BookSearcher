import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createStore, Store } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import { reducer } from './store/reducer'

const store: Store = createStore(reducer)
const app: React.ReactElement = (
    <Provider store={store}>
        <App />
    </Provider>
)
const container: HTMLElement | null = document.body.querySelector('#root')

ReactDOM.render(app, container)
