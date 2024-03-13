import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Pagination from './pagination';
import '@testing-library/jest-dom';

describe('Pagination', () => {
  it('changes pages correctly', () => {
    const { getByText, rerender } = render(
      <Pagination>
        {({ currentPage, nextPage, prevPage }) => (
          <div>
            <button onClick={prevPage}>Previous</button>
            <span>{currentPage}</span>
            <button onClick={nextPage}>Next</button>
          </div>
        )}
      </Pagination>
    );

    expect(getByText('1')).toBeInTheDocument();

    fireEvent.click(getByText('Next'));
    rerender(
      <Pagination>
        {({ currentPage, nextPage, prevPage }) => (
          <div>
            <button onClick={prevPage}>Previous</button>
            <span>{currentPage}</span>
            <button onClick={nextPage}>Next</button>
          </div>
        )}
      </Pagination>
    );
    expect(getByText('2')).toBeInTheDocument();

    fireEvent.click(getByText('Previous'));
    rerender(
      <Pagination>
        {({ currentPage, nextPage, prevPage }) => (
          <div>
            <button onClick={prevPage}>Previous</button>
            <span>{currentPage}</span>
            <button onClick={nextPage}>Next</button>
          </div>
        )}
      </Pagination>
    );
    expect(getByText('1')).toBeInTheDocument();
  });
});