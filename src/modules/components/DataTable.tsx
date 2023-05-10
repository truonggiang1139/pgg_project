import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Button, Checkbox } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_PATHS } from "../../configs/api";
import { Employee } from "../../constants/type";
import addIcon from "../../assets/iconAdd.svg";
import "../../App.css";
import classNames from "classnames";
const DataTable = () => {
  const [selected, setSelected] = useState<readonly number[]>([]);
  const navigate = useNavigate();
  const [dataEmployee, setDataEmployee] = useState<Employee[]>([]);
  useEffect(() => {
    const fetchDataEmployee = async () => {
      let token = Cookies.get("token");

      const res = await axios.get(API_PATHS.employee, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDataEmployee(res.data.data.data);
    };
    fetchDataEmployee();
  }, []);

  const columns = [
    { field: "NIK", headerName: "NIK", width: 150 },
    { field: "Name", headerName: "Name", width: 200 },
    { field: "Gender", headerName: "Gender", width: 120 },
    { field: "BankCardNo", headerName: "Bank Card No.", width: 200 },
    { field: "BankAccountNo", headerName: "Bank Account No.", width: 200 },
    { field: "FamilyCardNo", headerName: "Family Card No.", width: 200 },
    { field: "MarriageStatus", headerName: "Marriage Status", width: 150 },
    { field: "MotherName", headerName: "Mother Name", width: 200 },
    { field: "Placeofbirth", headerName: "Place of birth", width: 200 },
    { field: "Dateofbirth", headerName: "Date of birth", width: 200 },
    { field: "HomeAddress", headerName: "Home Address", width: 300 },
    {
      field: "NationalCardIDNo",
      headerName: "National Card ID No.",
      width: 200
    },
    { field: "DateStart", headerName: "Date Start", width: 200 },
    { field: "FirstContract", headerName: "First Contract", width: 200 },
    { field: "SecondContract", headerName: "Second Contract", width: 200 },
    { field: "EndContract", headerName: "End Contract", width: 200 },
    { field: "Department", headerName: "Department", width: 200 },
    { field: "EmployeeType", headerName: "Employee Type", width: 200 },
    { field: "SalaryRp", headerName: "Salary Rp.", width: 200 },
    { field: "Position", headerName: "Position", width: 200 },
    { field: "OTPaid", headerName: "O/T Paid", width: 150 },
    { field: "Mealpaid", headerName: "Meal paid", width: 150 },
    { field: "MealRp", headerName: "Meal Rp.", width: 150 },
    { field: "Grading", headerName: "Grading", width: 150 }
  ];

  // checkbox
  const isSelected = (id: number) => selected.indexOf(id) !== -1;
  const handleClick = (event: React.MouseEvent, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

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

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = dataEmployee.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  return (
    <Box className="z-10 w-full bg-white p-7 ">
      <div className="flex justify-end">
        <Button
          startIcon={<img src={addIcon} />}
          className="h-9 w-24 rounded-md bg-blue-50 normal-case text-blue-500 outline-none hover:bg-blue-100"
        >
          Add
        </Button>
        <Button
          disabled={!!!selected.length}
          startIcon={<img src={addIcon} className="text-red-300" />}
          className="h-9 w-24 rounded-md  normal-case"
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
      <TableContainer className="h-600 ">
        <Table stickyHeader aria-label="sticky table" className="border border-white">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="success"
                  inputProps={{
                    "aria-label": "select all desserts"
                  }}
                  indeterminate={selected.length > 0 && selected.length < dataEmployee.length}
                  checked={dataEmployee.length > 0 && selected.length === dataEmployee.length}
                  onChange={handleSelectAllClick}
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
                  onClick={(event) => handleClick(event, row.id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                  onDoubleClick={() => {
                    navigate(`/employee/create-or-update/${row.id}`);
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="success"
                      checked={isItemSelected}
                      inputProps={{
                        "aria-labelledby": labelId
                      }}
                    />
                  </TableCell>
                  <TableCell width={300}>{row.staff_id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.gender}</TableCell>
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
                  <TableCell>???</TableCell>
                  <TableCell>???</TableCell>
                  <TableCell>{row.meal_allowance}</TableCell>
                  <TableCell>{row.grade_name}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DataTable;
