import { Box, Pagination, Typography } from "@mui/material";
import { useState } from "react";
import { MetaData } from "../../models/pagination";

interface CommentPaginationProps {
    metaData: MetaData | null; // Assuming MetaData is the type for your pagination data
    onPageChange: (page: number, pageSize:number, productId:number) => void;
  }
  
// Ensure that metaData is not null or undefined
const CommentPagination: React.FC<CommentPaginationProps> = ({ metaData, onPageChange }) => {
    const { pageSize, currentPage, totalCount, totalPages } = metaData ?? { pageSize: 1, currentPage: 1, totalCount: 0, totalPages: 1 };
  
    const [pageNumber, setPageNumber] = useState(currentPage);
  
    function handlePageChange(page: number, pageSize: number, productId:number) {
      console.log('metadata:', metaData);
      console.log('Current page: ', currentPage);
      console.log('Page number: ', page);
      setPageNumber(page);
      onPageChange(page,pageSize,productId);
    }
  
    return (
      <Box display='flex' justifyContent='space-between' alignItems='center' sx={{ marginBottom: 3 }}>
        <Typography variant='body1'>
          Displaying {(currentPage - 1) * pageSize + 1}-
          {currentPage * pageSize > totalCount!
            ? totalCount
            : currentPage * pageSize
          } of {totalCount} comments
        </Typography>
        <Pagination
          color='secondary'
          size='large'
          count={totalPages}
          page={pageNumber}
          onChange={(_e, page) => handlePageChange(page,totalPages,1)}
        />
      </Box>
    );
  };
  export default CommentPagination;
