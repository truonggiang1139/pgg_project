const API_HOST = "https://api-training.hrm.div4.pgtest.co/api/v1";

export const API_PATHS = {
  signIn: `${API_HOST}/login`,
  employee: `${API_HOST}/employee`,
  marriage: `${API_HOST}/marriage`,
  position: `${API_HOST}/position`,
  department: `${API_HOST}/department`,
  grade: `${API_HOST}/grade`,
  benefit: `${API_HOST}/benefit`,
  uploadContract: `${API_HOST}/contract/save-multiple`,
  uploadDoc: `${API_HOST}/employee-document/upload`
};
