// import { User } from "@prisma/client";
// import { jwtSecret } from "../config/config";

// export const generateToken = (
//   userId: string,
//   type?: string,
//   secret = jwtSecret
// ) => {
//   const payload = {
//     sub: userId,
//     type,
//   };
//   return jwt.sign(payload, secret);
// };

// export const generateAuthTokens = async (user: User) => {
//   const accessToken = generateToken(
//     user.id,
//     accessTokenExpires,
//     tokenTypes.ACCESS
//   );

//   await saveToken(
//     refreshToken,
//     user.id,
//     refreshTokenExpires,
//     tokenTypes.REFRESH
//   );

//   return {
//     access: {
//       token: accessToken,
//       expires: accessTokenExpires.toDate(),
//     },
//     refresh: {
//       token: refreshToken,
//       expires: refreshTokenExpires.toDate(),
//     },
//   };
// };
