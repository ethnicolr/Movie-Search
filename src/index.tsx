import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { AuthProvider } from './context/authContext'
import firebase from 'firebase/app'
import store from './app/store'
import 'firebase/firestore'
import 'firebase/auth'
import * as serviceWorker from './serviceWorker'
import App from './app/App'
import './style/app.css'

const app = firebase.initializeApp({
  apiKey: 'AIzaSyCxdPvr7NzjTO47p9_GCTcoBnSiIGUGxWA',
  authDomain: 'movies-search-35388.firebaseapp.com',
  projectId: 'movies-search-35388',
  storageBucket: 'movies-search-35388.appspot.com',
  messagingSenderId: '558665270121',
  appId: '1:558665270121:web:56e191207195258c4fb3f8',
})

export const auth = app.auth()
export const db = firebase.firestore()

ReactDOM.render(
  <AuthProvider>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </AuthProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
