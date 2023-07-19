import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function CustomPagination({ currentPage, totalPages, color, onChange }) {
  return (
    <Stack spacing={1}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={onChange}
        color={color}
        showFirstButton
        showLastButton
      />
    </Stack>
  );
}

export default CustomPagination;
