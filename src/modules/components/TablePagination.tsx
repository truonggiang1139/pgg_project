import { Pagination, PaginationItem } from "@mui/material";
import React from "react";
const TablePagination = (dataEmployee: any) => {
  const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {};

  return (
    <div className="h-55  flex items-center gap-2.5">
      <Pagination
        onChange={handleChangePage}
        count={9} // rowsPerPage={rowsPerPage} // rowsPerPageOptions={[]}
        shape="rounded"
        showFirstButton
        showLastButton
        renderItem={(item) => (
          <PaginationItem
            sx={{
              height: "35px",
              width: "54px",
              "&.MuiPaginationItem-root:not(.MuiPaginationItem-firstLast, .MuiPaginationItem-previousNext, .MuiPaginationItem-ellipsis)":
                {
                  backgroundColor: "rgb(241, 243, 245)",
                  color: "rgb(104, 112, 118)"
                },
              "&.MuiPaginationItem-root.Mui-selected": {
                background: "rgb(230, 232, 235)",
                color: "rgb(17, 24, 28)",
                fontWeight: "600"
              }
            }}
            {...item}
          />
        )}
      />
    </div>
  );
};

export default TablePagination;
