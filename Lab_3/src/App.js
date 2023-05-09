import React, { useState, useEffect } from 'react';
import {  Box,  Flex,  Input,  Select,  Text,  VStack,  IconButton, useColorMode,} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import PropertyList from './PropertyList';

const properties = [
  {
    id: 1,
    city: 'Białystok',
    bedrooms: 2,
    price: 340000,
    description: 'Mieszkanie z dwoma pokojami oraz pięknym widokiem.',
  },
  {
    id: 2,
    city: 'Warszawa',
    bedrooms: 1,
    price: 480000,
    description: 'Mała kawalerka w centrum Polski.',
  },
  {
    id: 3,
    city: 'Wrocław',
    bedrooms: 3,
    price: 1300000,
    description: 'Średniej wielkości dom na obrzezach Wrocławia.',
  },
  {
    id: 4,
    city: 'Gdańsk',
    bedrooms: 2,
    price: 710000,
    description: 'Mieszkanie z widokiem na morze.',
  },
  {
    id: 5,
    city: 'Sczecin',
    bedrooms: 2,
    price: 510000,
    description: 'Mieszkanie w rodzinnej dzielnicy.',
  },
  {
    id: 6,
    city: 'Bydgoszcz',
    bedrooms: 3,
    price: 813000,
    description: 'Duze mieszkanie w mieście duzego rapera.',
  },
];

function App() {
  const [cityFilter, setCityFilter] = useState('');
  const [bedroomsFilter, setBedroomsFilter] = useState('');
  const [descriptionFilter, setDescriptionFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const { colorMode, toggleColorMode } = useColorMode();

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
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 19 || hour < 6) {
      toggleColorMode('dark');
    }
  }, [toggleColorMode]);

  return (
    <Box p={8}>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="2xl" fontWeight="bold">
          Nieruchomości do kupienia
        </Text>
        <IconButton
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
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
        <Input placeholder="Opis" value={descriptionFilter} onChange={handleDescriptionChange}
/>
<PropertyList properties={filteredProperties} />
</VStack>
</Box>
);
}

export default App;
