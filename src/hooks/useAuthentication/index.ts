export const useAuthentication = () => {
  const userLogged = sessionStorage.getItem("@USER_CREDENTIALS");

  return {
    userLogged: userLogged ? JSON.parse(userLogged) : null,
    status: userLogged ? "authenticated" : "unauthenticated",
  };
};
