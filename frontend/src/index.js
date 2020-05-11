import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';

document.addEventListener("DOMContentLoaded", () => {
  let store;
  
  if (localStorage.jwtToken){                               //check token in local storage
    setAuthToken(localStorage.jwtToken);                    //set common header
    const decodedUser = jwt_decode(localStorage.jwtToken);  //get user info
    const preLoadedState = {
      session: {
        isAuthenticated: true,
        user: decodedUser
      }
    };
    store = configureStore(preLoadedState);
    const currentTime = Date.now() / 1000;
    if (decodedUser.exp < currentTime){
      store.dispatch(logout());
      window.location.href = '/login';
    }
  } else {                                                  //first time user
    store = configureStore({});
  }

  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store} />, root);

});


// import './index.css';
// import App from './App';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );