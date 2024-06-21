import request from "@/api/request";
import qs from "qs";

export const register = (data) => {
  return request({
    method: "POST",
    url: "/user/register",
    // transformRequest: [
    //   function (data) {
    //     return qs.stringify(data);
    //   },
    // ],
    data: {
      username: data.username,
      password: data.password,
    },
  });
};
