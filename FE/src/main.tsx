import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import { rootReducer } from './store/rootReducer.ts'
import { configureStore } from '@reduxjs/toolkit'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#1d1d1d', // Atur warna latar belakang global di sini bg={'#1d1d1d'}
      },
    },
  },
})

const store = configureStore( {
  reducer: rootReducer
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ChakraProvider>
    </Router>
  </React.StrictMode>,
)
