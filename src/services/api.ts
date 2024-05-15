import axios from "axios";

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
