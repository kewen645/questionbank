import ReactDOM from 'react-dom'
import BaseRouter from './router'
import { Provider } from 'react-redux'
import store from './store'
import 'reset-css'
import 'lib-flexible'

ReactDOM.render(
  <Provider store={store}>
    <BaseRouter />
  </Provider>
  , document.getElementById('root')
)