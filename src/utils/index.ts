import "dotenv/config";
import jwt from "jsonwebtoken";

export const errorResponse = (message: string) => ({
  success: false,
  message,
});
export const successResponse = (data: unknown) => ({
  success: true,
  data,
});

// const signRefreshToken = handle => jwt.sign({ handle }, process.env.JWT_SECRET_REFRESH, {
//   expiresIn: '7d'
// });

// const signAccessToken = (id, handle, role = 'user', is_verified) => jwt.sign({ id, handle, role, is_verified }, process.env.JWT_SECRET_ACCESS, {
//   expiresIn: '15min'
// });

export const signRefreshToken = (email: string) => {
  try {
    const refreshSecret = process.env.JWT_SECRET_REFRESH;
    if (!refreshSecret) {
      throw new Error("refresh secret not found");
    }
    return jwt.sign({ email }, refreshSecret, {
      expiresIn: "7d",
    });
  } catch (error) {
    return error;
  }
};

export const signAccessToken = (id: string, email: string) => {
  try {
    const accessSecret = process.env.JWT_SECRET_ACCESS;
    if (!accessSecret) {
      throw new Error("access secret not found");
    }
    return jwt.sign({ email, id }, accessSecret, {
      expiresIn: "15min",
    });
  } catch (error) {
    return error;
  }
};
