import * as jwt from "jsonwebtoken";

export const secret = "this-is-secret-key";

export interface ITokenPayload {
  "user-id": string;
}

export const tokenService = {
  generateAccessToken(payload: ITokenPayload) {
    return jwt.sign(payload, secret, {
      expiresIn: "7d",
    });
  },

  generateRefreshToken(payload: ITokenPayload) {
    return jwt.sign(payload, secret, {
      expiresIn: "30d",
    });
  },

  verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, secret);
      return decoded;
    } catch (error) {
      return null;
    }
  },
};
