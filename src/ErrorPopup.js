import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';

const ErrorPopup = ({ message, onClose,colors}) => {
  return (
    <Box
      position="fixed"
      top="5%"
      left="50%"
      transform="translate(-50%, -50%)"
      padding="5"
      background={colors}
  
      color="white"
      borderRadius="md"
      boxShadow="lg"
      zIndex="9999"
    >
      <Text>{message}</Text>
      <Button onClick={onClose} colorScheme="red" size="sm">
        Close
      </Button>
    </Box>
  );
};

export default ErrorPopup;
