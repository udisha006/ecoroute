import React from 'react'
import { ChakraProvider, SimpleGrid, Container } from "@chakra-ui/react";
//import Card from "./card";
import {
    Box,
    Flex,
    AspectRatio,
    Image,
    Text,
    Link,
    Button,
    Stack
  } from "@chakra-ui/react";

import BgImg from '../assets/bg.png'
import { useNavigate } from 'react-router-dom';

function Choice () {
const navigate = useNavigate();
    
function handleClickSetJourney(event) {
    navigate("/");
}

function handleClickFindEV(event) {
    navigate("/nearme");
}

function handleClickMyInfo(event) {
    navigate("/");
}
  return (
    <div>
        <ChakraProvider>
      <Container maxW="80rem" centerContent>
        <SimpleGrid columns={3} spacing={10}>
        <Box
            p={4}
            display={{ md: "flex" }}
            maxWidth="32rem"
            borderWidth={1}
            margin={2}
        >
      
      <Stack
            align={{ base: "center", md: "stretch" }}
            textAlign={{ base: "center", md: "left" }}
            mt={{ base: 4, md: 0 }}
            ml={{ md: 6 }}
        >
        <Text
            fontWeight="bold"
            textTransform="uppercase"
            fontSize="lg"
            letterSpacing="wide"
            color="teal.600"
        >
          SET JOURNEY
        </Text>

        <Image
            
            src="..assets/charger.png"
            
        />
        
        

             <Button colorScheme='blue' maxWidth="100px" type='submit' onClick={handleClickSetJourney}>
                Click me!
            </Button>
            </Stack>
        </Box>


        <Box
            p={4}
            display={{ md: "flex" }}
            maxWidth="32rem"
            borderWidth={1}
            margin={2}
    >
      
      <Stack
            align={{ base: "center", md: "stretch" }}
            textAlign={{ base: "center", md: "left" }}
            mt={{ base: 4, md: 0 }}
            ml={{ md: 6 }}
      >
        <Text
            fontWeight="bold"
            textTransform="uppercase"
            fontSize="lg"
            letterSpacing="wide"
            color="teal.600"
        >
          FIND EV STATION
        </Text>
        
        

             <Button colorScheme='blue' maxWidth="100px" type='submit' onClick={handleClickFindEV}>
                Click me!
            </Button>
            </Stack>
        </Box>
        
        <Box
            p={4}
            display={{ md: "flex" }}
            maxWidth="32rem"
            borderWidth={1}
            margin={2}
    >
      
      <Stack
            align={{ base: "center", md: "stretch" }}
            textAlign={{ base: "center", md: "left" }}
            mt={{ base: 4, md: 0 }}
            ml={{ md: 6 }}
      >
        <Text
            fontWeight="bold"
            textTransform="uppercase"
            fontSize="lg"
            letterSpacing="wide"
            color="teal.600"
        >
          MY INFO
        </Text>
        
        

             <Button colorScheme='blue' maxWidth="100px" type='submit' onClick={handleClickMyInfo}>
                Click me!
            </Button>
            </Stack>
        </Box>


        </SimpleGrid>
      </Container>
    </ChakraProvider>
      
    </div>
  )
}

export default Choice
