import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Filter } from './filter';

describe('Filter', () => {
  const setItems = jest.fn();
  const items = [
    { 
      title: 'Title 1', 
      description: 'Description 1', 
      programType: 'Type 1', 
      images: { 'Poster Art': { url: 'Image 1', width: 100, height: 100 } }, 
      releaseYear: 2020 
    },
    { 
      title: 'Title 2', 
      description: 'Description 2', 
      programType: 'Type 2', 
      images: { 'Poster Art': { url: 'Image 2', width: 100, height: 100 } }, 
      releaseYear: 2019 
    },
    { 
      title: 'Title 3', 
      description: 'Description 3', 
      programType: 'Type 3', 
      images: { 'Poster Art': { url: 'Image 3', width: 100, height: 100 } }, 
      releaseYear: 2021 
    },
  ];

  it('se renderiza sin fallar', () => {
    render(<Filter items={items} setItems={setItems} />);
  });
  });