import axios from "axios";
import { DonationPointRequest } from "../types/pointTypes";

export const fetchDonationPoints = async (
  uf: string,
  city: string,
  page: number
) => {
  const response = await axios.get(
    // `http://54.233.194.109:3333/points/${uf}/${city}/{page}`
    `http://localhost:3333/points/${uf}/${city}/${page}`
  );
  return response.data;
};

export const postDonationPoint = async (point: DonationPointRequest) => {
  const response = await axios.post(`http://localhost:3333/points`, point);
  return response.data;
};
