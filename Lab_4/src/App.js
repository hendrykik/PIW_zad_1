import React, { useState, useEffect, useReducer, createContext } from 'react';
import axios from 'axios';
import { Box, Flex, Input, Select, Text, VStack, IconButton, useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import PropertyList from './PropertyList';
import cartReducer from './cartReducer';

export const UserContext = createContext(null);

function App() {
  const [cityFilter, setCityFilter] = useState('');
  const [bedroomsFilter, setBedroomsFilter] = useState('');
  const [descriptionFilter, setDescriptionFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const { colorMode, toggleColorMode } = useColorMode();
  const [properties, setProperties] = useState([]);
  const [cart, dispatch] = useReducer(cartReducer, []);

  const handleCityChange = (event) => {
    setCityFilter(event.target.value);
  };

  const handleBedroomsChange = (event) => {
    setBedroomsFilter(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescriptionFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const filteredProperties = properties
    .filter((property) => {
      if (cityFilter && !property.city.toLowerCase().includes(cityFilter.toLowerCase())) {
        return false;
      }

      if (bedroomsFilter && property.bedrooms !== parseInt(bedroomsFilter)) {
        return false;
      }

      if (
        descriptionFilter &&
        !property.description.toLowerCase().includes(descriptionFilter.toLowerCase())
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') {
        return a.price - b.price;
      }

      if (sortBy === 'price-desc') {
        return b.price - a.price;
      }

      return 0;
    });

  useEffect(() => {
    axios
      .get('./ogloszenia.json')
      .then((response) => {
        const ogloszeniaZAdresamiEmail = response.data.map((ogloszenie) => ({
          ...ogloszenie,
          email: 'example@example.com' // Przykładowy adres email
        }));

        setProperties(ogloszeniaZAdresamiEmail);
      })
      .catch((error) => {
        console.error('Wystąpił błąd podczas pobierania danych ogłoszeń:', error);
      });
  }, []);

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();

    if ((hour >= 6 && hour < 18 && colorMode === 'dark') || (hour < 6 || hour >= 18 && colorMode === 'light')) {
      toggleColorMode();
    }
  }, []);

  const handleToggleColorMode = () => {
    toggleColorMode();
  };

  return (
    <Box p={8}>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="2xl" fontWeight="bold">
          Nieruchomości do kupienia
        </Text>
        <IconButton
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={handleToggleColorMode}
          aria-label="Zmień tryb jasny/ciemny"
        />
        <Select onChange={handleSortChange} w={48} placeholder="Sortuj po">
          <option value="price-asc">Cena rosnąco</option>
          <option value="price-desc">Cena malejąco</option>
        </Select>
      </Flex>
      <VStack mt={8} spacing={4} alignItems="stretch">
        <Input placeholder="Miasto" value={cityFilter} onChange={handleCityChange} />
        <Select placeholder="Ilość pokoi" value={bedroomsFilter} onChange={handleBedroomsChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </Select>
        <Input placeholder="Opis" value={descriptionFilter} onChange={handleDescriptionChange} />
        <PropertyList properties={filteredProperties} dispatch={dispatch} />
      </VStack>
      <Box mt={8}>
        <Text fontSize="xl" fontWeight="bold">
          Koszyk:
        </Text>
        {cart.map((property) => (
          <Box key={property.id} borderWidth={1} p={4} borderRadius="md">
            <Text fontSize="xl" fontWeight="bold">
              {property.city} - {property.bedrooms} pokoje
            </Text>
            <Text mt={2}>{property.description}</Text>
            <Text fontSize="xl" fontWeight="bold">
              {property.price} zł
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default App;
