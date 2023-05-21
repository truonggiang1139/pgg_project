import { Pagination, PaginationItem } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import First from "../../assets/First.svg";
import Next from "../../assets/Next.svg";
import Previous from "../../assets/Previous.svg";
import Last from "../../assets/Last.svg";
import { dataFromSelector, dataToSelector, lastPageSelector, totalSelector } from "../../redux/employeeSelector";
import { useLocation, useNavigate } from "react-router-dom";
const TablePagination = () => {
  const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    navigate(`/employee?search=${searchValue}&page=${page}`);
  };
  const lastPage = useSelector(lastPageSelector);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search.split("?")[1]);
  const searchValue = String(searchParams.get("search"));
  const pageValue = Number(searchParams.get("page"));
  const dataFrom = useSelector(dataFromSelector);
  const dataTo = useSelector(dataToSelector);
  const total = useSelector(totalSelector);
  const navigate = useNavigate();
  return (
    <div className="h-55  flex items-center gap-2.5">
      <Pagination
        onChange={handleChangePage}
        count={lastPage}
        page={pageValue}
        shape="rounded"
        showFirstButton
        showLastButton
        renderItem={(item) => (
          <PaginationItem
            slots={{
              first: () => <img src={First} />,
              next: () => <img src={Next} />,
              previous: () => <img src={Previous} />,
              last: () => <img src={Last} />
            }}
            sx={{
              height: "35px",
              width: "48px",
              "&.MuiPaginationItem-root:focus": {
                outline: "none"
              },
              "&.MuiPaginationItem-root:not(.MuiPaginationItem-firstLast, .MuiPaginationItem-previousNext, .MuiPaginationItem-ellipsis)":
                {
                  backgroundColor: "rgb(241, 243, 245)",
                  color: "rgb(104, 112, 118)"
                },
              "&.MuiPaginationItem-root.Mui-selected": {
                background: "rgb(230, 232, 235)",
                color: "rgb(17, 24, 28)",
                fontWeight: "600",
                outline: "none"
              },
              "&.MuiButtonBase-root": {
                background: "rgb(255,255,255)"
              }
            }}
            {...item}
          />
        )}
      />
      {!!total && (
        <div className="h-9 rounded-md bg-total px-3 py-2 text-sm text-gray">
          {dataFrom} - {dataTo} of {total}
        </div>
      )}
    </div>
  );
};

export default TablePagination;
