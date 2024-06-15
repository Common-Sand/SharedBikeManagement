import request from "@/api/request";

export const login = (username: any, password: any) => {
  return request({
    method: "POST",
    url: "/login",
    data: {
      username: username,
      password: password,
    },
  });
};
