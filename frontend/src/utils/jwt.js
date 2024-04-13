import jwt_decode from 'jwt-decode';

export const decodedJwt = (token) => {
  try {
    return jwt_decode(token);
  } catch (e) {
    return null;
  }
};
