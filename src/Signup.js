import React, { useEffect } from 'react';
import ErrorPopup from './ErrorPopup';
import {
  Box,
  Container,
  FormLabel,
  FormControl,
  Heading,
  Input,
  HStack,
  Text,
  VStack,
  Button,
} from '@chakra-ui/react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Signup = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [data, setdata] = useState('');
  const [error, setError] = useState(null);
const[color,setcolor] = useState('');
  const navigate = useNavigate();

  const handlesignup = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('https://rocknwoods.website:3000/auth/signup', {
        email,
        password,
      });
      const responseData = response?.data;
      setdata(responseData);
      console.log('iugig', responseData?.result);
      if (responseData.status === 'ok') {
        setError(responseData?.result);
        setcolor("green");
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(responseData?.result);
        setcolor("red");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const closeErrorPopup = () => {
    setError(null);
  };

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
          <Heading>Signup</Heading>
          <Text>Enter your e-mail and password to Signup</Text>
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
          onClick={handlesignup}
        >
          Signup
        </Button>
        <HStack w={'full'} justifyContent={'flex-end'} justifyItems={'center'}>
          <Text textColor={'blue.500'}> Already have an account? </Text>
          <Link to={'/login'}>
            <Button w={'-webkit-fit-content'} variant={'ghost'}>
              Log in
            </Button>
          </Link>
        </HStack>
      </VStack>
      {error && <ErrorPopup message={error} onClose={closeErrorPopup} colors={color} />}
    </Box>
  );
};

export default Signup;
