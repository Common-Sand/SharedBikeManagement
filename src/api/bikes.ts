import request from "@/api/request";
import { useTokenStore } from "@/stores/token";

export const getBikes = (params) => {
  const token = useTokenStore();

  return request({
    url: "/bike",
    params,
  });
};

export const updateBike = () => {
  return request({
    url: "bike",
    method: "PUT",
  });
};
