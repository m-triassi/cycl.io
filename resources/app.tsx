import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {BrowserRouter} from 'react-router-dom'
import rootReducer from './models'
import './app.css'
import 'alpinejs'
import {BasicLayout} from './components'

const store = createStore(rootReducer,
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <BasicLayout />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'))
