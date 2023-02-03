import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import AppM from './AppM'


import { ChakraProvider, theme } from '@chakra-ui/react'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AppM/>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
