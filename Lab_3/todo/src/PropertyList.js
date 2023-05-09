import React from 'react';
import { Box, Text } from '@chakra-ui/react';

function PropertyList(props) {
  return (
    <>
      {props.properties.map((property) => (
        <Box key={property.id} borderWidth={1} p={4} borderRadius="md">
          <Text fontSize="xl" fontWeight="bold">
            {property.city} - {property.bedrooms} pokoje
          </Text>
          <Text mt={2}>{property.description}</Text>
          <Text fontSize="xl" fontWeight="bold">{property.price} zł</Text>
        </Box>
      ))}
    </>
  );
}

export default PropertyList;
