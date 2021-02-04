import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import rootReducer from './models'
import './app.css'
import 'alpinejs'
import {BasicLayout} from './components'

const store = createStore(rootReducer,
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const App = () => (
  <Provider store={store}>
    <BasicLayout />
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'))
