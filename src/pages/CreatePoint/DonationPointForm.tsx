import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Grid,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from "@mui/material";
import { City, State } from "../../types/ibgeTypes";
import { fetchCities, fetchStates } from "../../services/ibgeService";
import PrimaryButton from "../../components/Button/PrimaryButton";

const DonationPointForm: React.FC = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    uf: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStateChange = async (state: string) => {
    setSelectedState(state);
    setSelectedCity("");

    if (state) {
      setLoadingCities(true);
      try {
        const citiesData = await fetchCities(state);
        setCities(citiesData);
        // Atualiza o campo 'uf' no formulário
        setForm((prevState) => ({
          ...prevState,
          uf: state,
        }));
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      } finally {
        setLoadingCities(false);
      }
    } else {
      setCities([]);
      // Limpa o campo 'uf' no formulário se nenhum estado estiver selecionado
      setForm((prevState) => ({
        ...prevState,
        uf: "",
      }));
    }
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    // Atualiza o campo 'cidade' no formulário
    setForm((prevState) => ({
      ...prevState,
      cidade: city,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(form);
  };

  useEffect(() => {
    const fetchStatesData = async () => {
      setLoadingStates(true);
      try {
        const statesData = await fetchStates();
        setStates(statesData);
      } catch (error) {
        console.error("Failed to fetch states:", error);
      } finally {
        setLoadingStates(false);
      }
    };

    fetchStatesData();
  }, []);

  return (
    <div>
      <Typography
        variant='h5'
        gutterBottom
        sx={{ textAlign: "center", margin: "12px 0" }}
      >
        Cadastrar ponto de doação
      </Typography>
      <Container id='donationPointsContainer'>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name='nome'
                label='Nome'
                variant='outlined'
                fullWidth
                required
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='telefone'
                label='Telefone'
                variant='outlined'
                fullWidth
                required
                onChange={handleChange}
                inputProps={{
                  maxLength: 11,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='rua'
                label='Rua'
                variant='outlined'
                fullWidth
                required
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='numero'
                label='Número'
                variant='outlined'
                fullWidth
                required
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='bairro'
                label='Bairro'
                variant='outlined'
                fullWidth
                required
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id='state-select-label'>Estado</InputLabel>
                <Select
                  labelId='state-select-label'
                  id='state-select'
                  value={selectedState}
                  label='Estado'
                  onChange={(e) => handleStateChange(e.target.value as string)}
                >
                  {loadingStates ? (
                    <MenuItem disabled>Carregando estados...</MenuItem>
                  ) : (
                    states.map((state) => (
                      <MenuItem key={state.id} value={state.sigla}>
                        {state.nome}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id='city-select-label'>Cidade</InputLabel>
                <Select
                  labelId='city-select-label'
                  id='city-select'
                  value={selectedCity}
                  label='Cidade'
                  onChange={(e) => handleCityChange(e.target.value as string)}
                >
                  {loadingCities ? (
                    <MenuItem disabled>Carregando cidades...</MenuItem>
                  ) : (
                    cities.map((city) => (
                      <MenuItem key={city.id} value={city.nome}>
                        {city.nome}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <PrimaryButton type='submit' text='Cadastrar' />
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default DonationPointForm;
