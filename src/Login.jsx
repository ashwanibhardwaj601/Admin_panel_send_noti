import React from 'react';
import {
  Box,
  Container,
  FormLabel,
  FormControl,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
  Button,
  HStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorPopup from './ErrorPopup';
const Login = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [loged, setloged] = useState('');
  const [error, setError] = useState(null);
  const[color,setcolor] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (req, res) => {
    try {
      const response = await axios.post('https://rocknwoods.website:3000/auth/login', {
        email,
        password,
      });
      const responsedata = response?.data;
      console.log(responsedata?.status);
      if (responsedata?.status === 'ok') {
        localStorage.setItem("access_token",responsedata?.result?.accessToken);
        navigate('/');
      } else {
        setError(responsedata?.result);
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  function closeErrorPopup() {
    setError(null);
  }

  return (
    <Box
      w={['full', 'md']}
      p={[8, 10]}
      mt={[20, '10vh']}
      mx="auto"
      border={['none', '1px']}
      borderColor={[' ', 'grey.300']}
      borderRadius={10}
    >
      <VStack spacing={4} align="flex-start" w="full">
        <VStack spacing={1} align={['flex-start', 'center']} w="full">
          <Heading>Login</Heading>
          <Text>Enter your e-mail and password to login</Text>
        </VStack>
        <FormControl>
          <FormLabel>E-mail Address</FormLabel>
          <Input
            rounded="none"
            varient="filled"
            onChange={e => setemail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            rounded="none"
            varient="filled"
            type="password"
            onChange={e => setpassword(e.target.value)}
          />
        </FormControl>
        <Button
          rounded="none"
          colorScheme="blue"
          w="full"
          onClick={handleSubmit}
        >
          Login
        </Button>
        <HStack w={'full'} justifyContent={'flex-end'} justifyItems={'center'}>
          <Text textColor={'blue.500'}>Dont have a account?</Text>
          <Link to={'/signup'}>
            <Button w={'-webkit-fit-content'} variant={'ghost'}>
              click here
            </Button>
          </Link>
        </HStack>
      </VStack>
      {error && <ErrorPopup message={error} onClose={closeErrorPopup} />}
    </Box>
  );
};

export default Login;
