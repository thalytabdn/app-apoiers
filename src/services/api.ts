import axios from "axios";
import { DonationPointRequest } from "../types/pointTypes";
import { URL_API } from "./constants";

export const fetchDonationPoints = async (
  uf: string,
  city: string,
  page: number
) => {
  const response = await axios.get(`${URL_API}/points/${uf}/${city}/{page}`);
  return response.data;
};

export const postDonationPoint = async (point: DonationPointRequest) => {
  try {
    const response = await axios.post(`${URL_API}/points`, point);

    return response.data;
  } catch (error: any) {
    return error.response;
  }
};
