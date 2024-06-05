export const checkLoggedStorage = () => {
  const data = localStorage.getItem("refresh_token");

  return !!data;
};
