import request from "@/api/request";
import { useTokenStore } from "@/stores/token";

export const getZones = (params) => {
  const token = useTokenStore();

  return request({
    url: "/zone",
    params,
  });
};
