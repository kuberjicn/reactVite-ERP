import React from 'react';
import { Pagination } from 'react-bootstrap';
import "./pagination.css";
const CustomPagination = ({ page, totalPages, onPageChange }) => {
  const handlePageChange = (newPage) => {
    console.log(newPage, totalPages)
    if (newPage > 0 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <>
    
   
   
    <Pagination >
      
      <Pagination.First className='mpage' onClick={() => handlePageChange(1)} disabled={page === 1} />
      <Pagination.Prev className='mpage' onClick={() => handlePageChange(page - 1)} disabled={page === 1} />
      <Pagination.Item className='mpage' active>{page}</Pagination.Item>
      <Pagination.Next className='mpage' onClick={() => handlePageChange(Number(page) + 1)} disabled={page === totalPages} />
      <Pagination.Last className='mpage' onClick={() => handlePageChange(totalPages)} disabled={page === totalPages} />
    </Pagination>
    </>
  );
};

export default CustomPagination;
