import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';

function PropertyList(props) {
  const addToCart = (property) => {
    props.dispatch({ type: 'ADD_TO_CART', payload: property });
  };

  const removeFromCart = (propertyId) => {
    props.dispatch({ type: 'REMOVE_FROM_CART', payload: propertyId });
  };

  return (
    <>
      {props.properties.map((property) => (
        <Box key={property.id} borderWidth={1} p={4} borderRadius="md">
          <Text fontSize="xl" fontWeight="bold">
            {property.city} - {property.bedrooms} pokoje
          </Text>
          <Text mt={2}>{property.description}</Text>
          <Text fontSize="xl" fontWeight="bold">{property.price} zł</Text>
          <Button size="sm" colorScheme="teal" onClick={() => addToCart(property)}>
            Dodaj do koszyka
          </Button>
          <Button size="sm" colorScheme="teal" variant="outline" onClick={() => removeFromCart(property.id)}>
            Usuń z koszyka
          </Button>
        </Box>
      ))}
    </>
  );
}

export default PropertyList;
