import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { RootState, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import iconDelete from "../../assets/iconDelete.svg";
import { changeEmployeeForm, removeContractFile } from "../../redux/employeeSlice";
export default function ContractTable() {
  const dispatch = useAppDispatch();
  const contracts = useSelector((state: RootState) => state.employee.employeeForm.contracts);
  const header = [
    { field: "id", headerName: "No", width: 50 },
    { field: "name", headerName: "Contract Name", width: 150 },
    { field: "contract_date", headerName: "Sign Date", width: 150 },
    { field: "Action", headerName: "Action.", width: 200 }
  ];
  const handleDeleteContractFile = (id: number, index: number) => {
    const newArray = contracts.filter((contract) => contract.id !== id);
    dispatch(changeEmployeeForm({ target: "contracts", value: newArray }));
    dispatch(removeContractFile(index));
  };
  return (
    <TableContainer className="mx-3 h-200 ">
      <Table className="rounded-lg border border-white" size="small">
        <TableHead sx={{ borderRadius: "12px" }}>
          <TableRow
            sx={{
              "& th": { backgroundColor: "rgb(236,238,240)", border: "1px white solid", fontSize: "14px" },
              "& th:first-of-type": { borderTopLeftRadius: "12px" },
              "& th:last-child": { borderTopRightRadius: "12px" }
            }}
          >
            {header.map((column, index) => (
              <TableCell key={index} style={{ minWidth: `${column.width}px`, fontWeight: "bold" }}>
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {contracts.map((contract, index) => {
            return (
              <TableRow>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{contract.name}</TableCell>
                <TableCell>{contract.contract_date}</TableCell>
                <TableCell>
                  <div className="flex  justify-center">
                    <div className="min-w-100 "></div>
                    <Button
                      className="ml-2 h-6 rounded-md bg-red2 px-3 py-2 normal-case text-required hover:bg-red3 focus:outline-none "
                      onClick={() => {
                        handleDeleteContractFile(contract.id, index);
                      }}
                    >
                      <img src={iconDelete} alt="" />
                      <span className="ml-2">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
