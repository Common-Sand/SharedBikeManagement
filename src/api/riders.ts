import request from "@/api/request";
import { useTokenStore } from "@/stores/token";

export const getRiderList = () => {
  return request({
    method:"GET",
    url: "/riders",
    
  });
};
