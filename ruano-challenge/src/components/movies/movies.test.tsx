import React from 'react';
import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import Movies from './movies';
import '@testing-library/jest-dom'

test('renders TileView', () => {
  render(
    <RecoilRoot>
      <Movies />
    </RecoilRoot>
  );
  
  const tileElements = screen.getAllByText(/MOVIES/i);
  expect(tileElements.length).toBeGreaterThan(0);
  tileElements.forEach(element => {
    expect(element).toBeInTheDocument();
  });
});