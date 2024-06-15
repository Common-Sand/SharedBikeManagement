import request from "@/api/request";

export const register = (username: any, password: any) => {
  return request({
    method: "POST",
    url: "/register",
    data: {
      username: username,
      password: password,
    },
  });
};
