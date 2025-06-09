import * as jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = 'ACCESS_TOKEN_SECRET'; // Thay bằng secret thực tế
const REFRESH_TOKEN_SECRET = 'REFRESH_TOKEN_SECRET'; // Thay bằng secret thực tế

export const generateAccessToken = (userId: number): string => {
  return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' }); // Access Token sống 15 phút
};

export const generateRefreshToken = (userId: number): string => {
  return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' }); // Refresh Token sống 7 ngày
};

export const verifyAccessToken = (token: string): any => {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (error) {
    throw new Error('Invalid Access Token');
  }
};

export const verifyRefreshToken = (token: string): any => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
  } catch (error) {
    throw new Error('Invalid Refresh Token');
  }
};