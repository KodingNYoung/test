export function setToken(userToken) {
  sessionStorage.setItem('token', userToken);
}

export function setRole(userRole) {
  sessionStorage.setItem('id', JSON.stringify(userRole));
}

export function getToken() {
  let tokenString = sessionStorage.getItem('token');

  return tokenString;
}

export function getRoles() {
  let tokenString = sessionStorage.getItem('id');

  return tokenString;
}

export function clearToken() {
  sessionStorage.clear();
}
