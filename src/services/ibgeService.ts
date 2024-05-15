import axios from "axios";

export const fetchStates = async () => {
  const response = await axios.get(
    "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
  );
  return response.data;
};

export const fetchCities = async (uf: string) => {
  const response = await axios.get(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
  );
  return response.data;
};
