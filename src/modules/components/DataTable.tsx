import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { Button, Checkbox } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import addIcon from "../../assets/iconAdd.svg";
import deleteIcon from "../../assets/iconDelete.svg";
import deleteIconDisable from "../../assets/iconDeleteDisable.svg";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import CircularProgress from "@mui/material/CircularProgress";
import iconNodata from "../../assets/iconNoData.svg";
import "../../App.scss";
import classNames from "classnames";
import TablePagination from "./TablePagination";
import { useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { deleteEmployee, getEmployeeList } from "../../redux/employeeListSlice";
import { employeeListSelector, lastPageSelector, loadingSelector } from "../../redux/employeeSelector";

const DataTable = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dataEmployee = useSelector(employeeListSelector);
  const loading = useSelector(loadingSelector);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search.split("?")[1]);
  const searchValue = String(searchParams.get("search"));
  const pageValue = Number(searchParams.get("page"));
  const lastPage = useSelector(lastPageSelector);
  useEffect(() => {
    if (lastPage && lastPage < pageValue) {
      navigate(`/employee?search=${searchValue}&page=${lastPage}`);
    } else {
      dispatch(
        getEmployeeList({
          query: searchValue === "null" ? "" : searchValue,
          page: pageValue == 0 ? 1 : pageValue
        })
      );
    }
  }, [dispatch, searchValue, pageValue, lastPage]);

  const handleDelete = async () => {
    await dispatch(deleteEmployee(selected));
    await dispatch(getEmployeeList({ query: searchValue, page: pageValue }));
    setSelected([]);
  };
  const columns = [
    { field: "NIK", headerName: "NIK", width: 95 },
    { field: "Name", headerName: "Name", width: 170 },
    { field: "Gender", headerName: "Gender", width: 70 },
    { field: "BankCardNo", headerName: "Bank Card No.", width: 140 },
    { field: "BankAccountNo", headerName: "Bank Account No.", width: 160 },
    { field: "FamilyCardNo", headerName: "Family Card No.", width: 150 },
    { field: "MarriageStatus", headerName: "Marriage Status", width: 150 },
    { field: "MotherName", headerName: "Mother Name", width: 150 },
    { field: "Placeofbirth", headerName: "Place of birth", width: 130 },
    { field: "Dateofbirth", headerName: "Date of birth", width: 130 },
    { field: "HomeAddress", headerName: "Home Address", width: 300 },
    {
      field: "NationalCardIDNo",
      headerName: "National Card ID No.",
      width: 180
    },
    { field: "DateStart", headerName: "Date Start", width: 110 },
    { field: "FirstContract", headerName: "First Contract", width: 130 },
    { field: "SecondContract", headerName: "Second Contract", width: 150 },
    { field: "EndContract", headerName: "End Contract", width: 150 },
    { field: "Department", headerName: "Department", width: 150 },
    { field: "EmployeeType", headerName: "Employee Type", width: 140 },
    { field: "SalaryRp", headerName: "Salary Rp.", width: 110 },
    { field: "Position", headerName: "Position", width: 150 },
    { field: "OTPaid", headerName: "O/T Paid", width: 100 },
    { field: "Mealpaid", headerName: "Meal paid", width: 100 },
    { field: "MealRp", headerName: "Meal Rp.", width: 100 },
    { field: "Grading", headerName: "Grading", width: 80 }
  ];

  // checkbox
  const isSelected = (id: number) => selected.indexOf(id) !== -1;
  const handleClick = (id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };
  const handleAdd = () => {
    navigate(`/employee/create-or-update`);
  };
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = dataEmployee.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  return (
    <Box className=" w-full rounded-xl bg-dataTable p-2 ">
      <div className="flex justify-end">
        <Button
          startIcon={<img src={addIcon} />}
          className="mr-1 h-9 w-24 rounded-md bg-blue-50 normal-case text-blue-500 outline-none hover:bg-blue-100"
          onClick={handleAdd}
        >
          Add
        </Button>
        <Button
          disabled={!!!selected.length}
          onClick={handleDelete}
          startIcon={!!!selected.length ? <img src={deleteIconDisable} /> : <img src={deleteIcon} />}
          className={classNames("h-9 w-24 rounded-md normal-case   outline-none", {
            "bg-slate-100": !!!selected.length,
            "bg-red-50 text-red-500 hover:bg-red-100 ": !!!!selected.length
          })}
        >
          Delete
        </Button>
      </div>
      <hr
        style={{
          margin: "10px 0px",
          flexShrink: "0",
          borderWidth: "0px 0px thin",
          borderStyle: "solid",
          borderColor: "rgba(193, 200, 205, 0.24)"
        }}
      />
      <div className="relative overflow-auto">
        <TableContainer className="table__custom h-600 ">
          <Table stickyHeader aria-label="sticky table" className="rounded-lg border border-white" size="small">
            <TableHead sx={{ borderRadius: "12px" }}>
              <TableRow
                sx={{
                  "& th": { backgroundColor: "rgb(236,238,240)", border: "1px white solid", fontSize: "14px" },
                  "& th:first-of-type": { borderTopLeftRadius: "12px" },
                  "& th:last-child": { borderTopRightRadius: "12px" }
                }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    inputProps={{
                      "aria-label": "select all desserts"
                    }}
                    indeterminate={selected.length > 0 && selected.length < dataEmployee.length}
                    checked={dataEmployee.length > 0 && selected.length === dataEmployee.length}
                    onChange={handleSelectAllClick}
                    indeterminateIcon={<IndeterminateCheckBoxIcon sx={{ color: "rgb(48 164 108)" }} />}
                  />
                </TableCell>
                {columns.map((column, index) => (
                  <TableCell key={index} style={{ minWidth: `${column.width}px`, fontWeight: "bold" }}>
                    {column.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataEmployee.map((row, index) => {
                const isItemSelected = isSelected(row.id);

                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    onClick={() => handleClick(row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    onDoubleClick={() => {
                      navigate(`/employee/create-or-update/${row.id}`);
                    }}
                    className={selected.includes(row.id) ? "selected" : ""}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId
                        }}
                      />
                    </TableCell>
                    <TableCell width={300}>{row.staff_id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{!row.gender ? "Male" : "Female"}</TableCell>
                    <TableCell>{row.card_number}</TableCell>
                    <TableCell>{row.bank_account_no}</TableCell>
                    <TableCell>{row.family_card_number}</TableCell>
                    <TableCell>{row.marriage_code}</TableCell>
                    <TableCell>{row.mother_name}</TableCell>
                    <TableCell>{row.pob}</TableCell>
                    <TableCell>{row.dob}</TableCell>
                    <TableCell>{row.home_address_1}</TableCell>
                    <TableCell>{row.nc_id}</TableCell>
                    <TableCell>{row.contract_start_date}</TableCell>
                    {row?.contracts.length > 0 ? (
                      <TableCell>{row.contracts[0].contract_date}</TableCell>
                    ) : (
                      <TableCell></TableCell>
                    )}
                    {row?.contracts.length > 1 ? (
                      <TableCell>{row.contracts[1].contract_date}</TableCell>
                    ) : (
                      <TableCell></TableCell>
                    )}
                    {row?.contracts.length > 2 ? <TableCell>??</TableCell> : <TableCell></TableCell>}
                    <TableCell>{row.department_id}</TableCell>
                    <TableCell>{row.basic_salary}</TableCell>
                    <TableCell>{row.position_name}</TableCell>
                    <TableCell>{row.position_name}</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>{row.meal_allowance}</TableCell>
                    <TableCell>{row.grade_name}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {!loading && dataEmployee.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <img src={iconNodata} />
            <div className="mt-30 text-center text-base font-normal leading-5">NoData</div>
            <div className="text-gray-500 mt-5 text-center font-sans text-base font-normal leading-6 tracking-tighter">
              Your record will be synced here once it ready
            </div>
          </div>
        )}
        {loading && (
          <div className="absolute inset-0 flex h-full  bg-loading">
            <CircularProgress size={32} sx={{ margin: "auto" }} />
          </div>
        )}
      </div>
      <hr
        style={{
          margin: "10px 0px",
          flexShrink: "0",
          borderWidth: "0px 0px thin",
          borderStyle: "solid",
          borderColor: "rgba(193, 200, 205, 0.24)"
        }}
      />
      <TablePagination />
    </Box>
  );
};

export default DataTable;
