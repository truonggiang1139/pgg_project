import { RootState } from "../store";

export const employeeListSelector = (state: RootState) => state.employeeList.employeeList;
export const loadingSelector = (state: RootState) => state.employeeList.loading;
export const lastPageSelector = (state: RootState) => state.employeeList.lastPage;
export const totalSelector = (state: RootState) => state.employeeList.total;
export const dataFromSelector = (state: RootState) => state.employeeList.dataFrom;
export const dataToSelector = (state: RootState) => state.employeeList.dataTo;
