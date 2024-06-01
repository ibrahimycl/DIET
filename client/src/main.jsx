import ReactDOM from 'react-dom/client'
import App from './pages/App.jsx'
import './style/index.css'
import store from "./stores/index.js"
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import AuthInitializer from './pages/Auth/authInitializer.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthInitializer/>
      <App />
    </BrowserRouter>
  </Provider>
)
