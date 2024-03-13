import React from 'react';
import { render } from '@testing-library/react';
import Header from './header';

describe('Header', () => {
  it('se renderiza sin fallar', () => {
    render(<Header />);
  });
});