import request from "@/api/request";

export const login = (data) => {
  return request({
    method: "POST",
    url: "/user/login",
    data: {
      username: data.username,
      password: data.password,
    },
  });
};
