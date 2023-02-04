import React from 'react'
import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    HStack,
    IconButton,
    Input,
    SkeletonText,
    Text,
    ChakraProvider
  } from '@chakra-ui/react'
  import { FaLocationArrow, FaTimes } from 'react-icons/fa'
  import BgImg from '../assets/bg.png'
 

const Welcome = () => {
  return (
    
    <ChakraProvider>
    
        <Box position='absolute' left={0} top={0} h='100%' w='100%' _before={{
          content: '""',
          bgImage:
            "../assets/bg.png",
          bgSize: "cover",
          pos: "absolute",
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          opacity: 0.9
        }}
          >
    <h1>heloo</h1>
        </Box>
      
    </ChakraProvider>
  )
}

export default Welcome
