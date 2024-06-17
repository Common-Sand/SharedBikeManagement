import request from "@/api/request";

export const getRiders = (params) => {
  return request({
    url: "/riders",
    params,
  });
};
