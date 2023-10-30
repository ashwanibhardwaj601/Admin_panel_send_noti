import React, { useEffect, useState } from 'react';
import './Pushnotification.css';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Container,
  Stack,
} from '@chakra-ui/react';
import Multiselect from 'multiselect-react-dropdown';
import axios from 'axios';
import ErrorPopup from './ErrorPopup';

const Pushnotification = () => {
  const [title, setTitle] = useState('');
  const [error, seterror] = useState(null);
  const [show, setshow] = useState(false);
  const [body, setBody] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const[color,setColor]=useState();
  const [selectedOptionsArray, setSelectedOptionsArray] = useState([]);

  const onSelect = (selectedList, selectedItem) => {
    setSelectedValues(selectedList);
    console.log(selectedValues);
  };

  const onRemove = (selectedList, removedItem) => {
    setSelectedValues(selectedList);
    setOptions([...options, removedItem]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const selectedOptionNames = selectedValues.map(item => item.token);
    setSelectedOptionsArray(selectedOptionNames);
    console.log('Selected Tokensggjghjtj:', selectedOptionNames);

    const response = await axios.post('https://rocknwoods.website:3000/api/sendmsg', {
      title,
      body,
      token: selectedOptionNames,
    });
    seterror(response?.data?.result);
    setColor("blue")
    console.log('message:', response?.data);
    setshow(true);
  };

  const handletoken = async () => {
    try {
      const response = await axios.get('https://rocknwoods.website:3000/api/gettoken');

      setOptions(response?.data?.result?.token);
      console.log(options);
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };
  function closeErrorPopup() {
    setshow(false);
  }

  useEffect(() => {
    handletoken();
  }, []);

  return (
    <div>
      <Container pt={['8', '16']} h={'100vh'}>
        <form onSubmit={handleSubmit}>
          <Box p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
            <FormControl id="title">
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Enter title"
                p="7"
                fontSize="2xl"
              />
            </FormControl>

            <FormControl mt={4} id="body">
              <FormLabel>Body</FormLabel>
              <Textarea
                value={body}
                onChange={e => setBody(e.target.value)}
                placeholder="Enter body"
                rows="10"
              />
            </FormControl>

            <FormControl mt={4} id="country">
              <FormLabel>Select Token</FormLabel>
              <Multiselect
                options={options}
                selectedValues={selectedValues}
                onSelect={onSelect}
                onRemove={onRemove}
                displayValue="token"
                placeholder="Select Token"
              />
            </FormControl>

            <Button
              mt={4}
              colorScheme="blue"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Container>
      {show && <ErrorPopup message={error} onClose={closeErrorPopup} colors={color} />}
    </div>
  );
};

export default Pushnotification;
