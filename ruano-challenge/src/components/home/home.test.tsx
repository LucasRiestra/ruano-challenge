import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './home';
import '@testing-library/jest-dom'


describe('Home', () => {
  it('se renderiza sin fallar', () => {
    render(
      <Router>
        <Home />
      </Router>
    );
  });

  it('renderiza las CardData', () => {
    render(
      <Router>
        <Home />
      </Router>
    );
    const seriesElements = screen.getAllByText(/SERIES/i);
    const moviesElements = screen.getAllByText(/MOVIES/i);
    expect(seriesElements.length).toBeGreaterThan(0);
    seriesElements.forEach(element => {
      expect(element).toBeInTheDocument();
    });
    expect(moviesElements.length).toBeGreaterThan(0);
    moviesElements.forEach(element => {
      expect(element).toBeInTheDocument();
    });
  });
});