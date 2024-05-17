import React, { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
  Grid,
  Typography,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import PrimaryButton from "../../components/Button/PrimaryButton";
import { fetchCities, fetchStates } from "../../services/ibgeService";
import { State } from "../../types/ibgeTypes";
import { City } from "../../types/ibgeTypes";
import { DonationPoint } from "../../types/pointTypes";
import { fetchDonationPoints } from "../../services/api";
import Point from "../../components/Point/Point";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const DonationPointsList: React.FC = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [donationPoints, setDonationPoints] = useState<DonationPoint[]>([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchDonationPoints(
          selectedState,
          selectedCity,
          page
        );
        setDonationPoints(response.data);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Failed to fetch donation points:", error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedState && selectedCity) {
      fetchData();
    }
  }, [page, selectedState, selectedCity]);

  const handleSearch = async () => {
    if (!selectedState || !selectedCity) {
      console.error("Please select both state and city.");
      return;
    }

    setPage(1);
  };

  const handleStateChange = async (state: string) => {
    setSelectedState(state);
    setSelectedCity("");

    if (state) {
      setLoadingCities(true);
      try {
        const citiesData = await fetchCities(state);
        setCities(citiesData);
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      } finally {
        setLoadingCities(false);
      }
    } else {
      setCities([]);
    }
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
        Pesquisar pontos de doação
      </Typography>

      <Container id='donationPointsContainer'>
        <Grid container spacing={2} alignItems='center' justifyContent='center'>
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
                onChange={(e) => setSelectedCity(e.target.value as string)}
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
            <PrimaryButton text='Pesquisar' onClick={handleSearch} />
          </Grid>
        </Grid>

        {loading ? (
          <CircularProgress />
        ) : totalPages === 0 && selectedCity ? (
          <Typography variant='body1' gutterBottom>
            Que pena, ainda não existem pontos de coleta cadastrados para essa
            cidade :(
          </Typography>
        ) : donationPoints.length > 0 ? (
          <div>
            <Grid item xs={12} sx={{ textAlign: "right" }}>
              <Typography variant='body1' gutterBottom>
                <Button
                  variant='outlined'
                  disabled={page === 1}
                  onClick={() => setPage((prevPage) => prevPage - 1)}
                  style={{ color: page === 1 ? "default" : "#2e7d31" }}
                >
                  <NavigateBeforeIcon />
                </Button>{" "}
                <Button
                  variant='outlined'
                  disabled={page === totalPages}
                  onClick={() => setPage((prevPage) => prevPage + 1)}
                  style={{ color: page === totalPages ? "default" : "#2e7d31" }}
                >
                  <NavigateNextIcon />
                </Button>
              </Typography>
            </Grid>

            {donationPoints.map((point) => (
              <Box key={point.id} mb={2}>
                <Point point={point} />
              </Box>
            ))}

            <Grid item xs={12} sx={{ textAlign: "right" }}>
              <Typography variant='body1' gutterBottom>
                <Button
                  variant='outlined'
                  disabled={page === 1}
                  onClick={() => setPage((prevPage) => prevPage - 1)}
                  style={{ color: page === 1 ? "default" : "#2e7d31" }}
                >
                  <NavigateBeforeIcon />
                </Button>{" "}
                <Button
                  variant='outlined'
                  disabled={page === totalPages}
                  onClick={() => setPage((prevPage) => prevPage + 1)}
                  style={{ color: page === totalPages ? "default" : "#2e7d31" }}
                >
                  <NavigateNextIcon />
                </Button>
              </Typography>
            </Grid>
          </div>
        ) : null}
      </Container>
    </div>
  );
};

export default DonationPointsList;
