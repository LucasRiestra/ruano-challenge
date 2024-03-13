import React, { useState } from 'react';
import { PaginationProps } from '../../interfaces/interfaces';


const Pagination: React.FC<PaginationProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  return children({ currentPage, nextPage, prevPage });
};

export default Pagination;