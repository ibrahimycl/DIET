import ReactDOM from 'react-dom/client'
import App from './pages/App.jsx'
import './style/index.css'
import store from "./stores/index.js"
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
