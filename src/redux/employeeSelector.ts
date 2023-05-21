import { RootState } from "../store";

export const employeeListSelector = (state: RootState) => state.employee.employeeList;
export const querySelector = (state: RootState) => state.employee.query;
export const pageSelector = (state: RootState) => state.employee.page;
export const loadingSelector = (state: RootState) => state.employee.loading;
export const lastPageSelector = (state: RootState) => state.employee.lastPage;
export const totalSelector = (state: RootState) => state.employee.total;
export const dataFromSelector = (state: RootState) => state.employee.dataFrom;
export const dataToSelector = (state: RootState) => state.employee.dataTo;
