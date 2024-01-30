import { Box, Pagination, Typography } from "@mui/material";
import { useState } from "react";
import { CommentPaginationProps } from "../../models/comment/CommentPaginationProps";

// Ensure that metaData is not null or undefined
const CommentPagination: React.FC<CommentPaginationProps> = ({ metaData, onPageChange, productId }) => {
  // Destructure metaData or provide default values
  const { pageSize, currentPage, totalCount, totalPages } = metaData ?? { pageSize: 1, currentPage: 1, totalCount: 0, totalPages: 1 };

  // Set up state for current page number
  const [pageNumber, setPageNumber] = useState(currentPage);

  // Handle page change event
  function handlePageChange(page: number, pageSize: number, productId: number) {
    setPageNumber(page);
    onPageChange(page, pageSize, productId);
  }

  return (
    <Box display='flex' justifyContent='space-between' alignItems='center' sx={{ marginBottom: 3 }}>
      {/* Display comment range */}
      <Typography variant='body1'>
        Displaying {(currentPage - 1) * pageSize + 1}-
        {currentPage * pageSize > totalCount!
          ? totalCount
          : currentPage * pageSize
        } of {totalCount} comments
      </Typography>

      {/* Pagination component */}
      <Pagination
        color='secondary'
        size='large'
        count={totalPages}
        page={pageNumber}
        onChange={(_e, page) => handlePageChange(page, totalPages, productId)}
      />
    </Box>
  );
};

export default CommentPagination;
