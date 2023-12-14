import { cookies } from "next/headers";

export const sendToken = async( user: any) => {
  const token = user.getJWTToken();
  cookies().set("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
  });
  cookies().set('user',JSON.stringify(user),{
    httpOnly: true,
    expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
  })

};
