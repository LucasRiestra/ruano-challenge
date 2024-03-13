import React from 'react';
import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import Series from './series';
import '@testing-library/jest-dom'

test('renders TileView', () => {
  render(
    <RecoilRoot>
      <Series />
    </RecoilRoot>
  );
  
  const tileElements = screen.getAllByText(/SERIES/i);
  expect(tileElements.length).toBeGreaterThan(0);
  tileElements.forEach(element => {
    expect(element).toBeInTheDocument();
  });
});