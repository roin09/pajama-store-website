export const saveAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken") || "";
};
export const removeAccessToken = () => {
  return localStorage.removeItem("accessToken");
};
