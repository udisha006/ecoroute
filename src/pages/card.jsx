import React from "react";
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

import { useNavigate } from 'react-router-dom';

function Card(props) {
  const { tittle,click } = props;
  const navigate = useNavigate();

 function gotoPage(event, click) {
        navigate(click);
  } 

  return (
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
          {tittle}
        </Text>
        
        

        <Button colorScheme='blue' maxWidth="100px" type='submit' onClick={gotoPage({click})}>
                Click me!
        </Button>
      </Stack>
    </Box>
  );
}

export default Card;
