import React from 'react'
import ReactDOM from 'react-dom'
import AppM from './AppM'
import { Route, Routes, BrowserRouter  } from "react-router-dom";
import Welcome from './pages/welcome'
import Choice from './pages/choice'
import Nearme from './pages/nearme'

import { ChakraProvider, theme } from '@chakra-ui/react'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
    
      
      <BrowserRouter>
      <Routes>
         <Route path="/" element={<AppM />} />

         <Route path="Welcome" element={<Welcome />} />
         <Route path="Choice" element={<Choice />} />
         <Route path="Nearme" element={<Nearme />} />
         

      </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
