import React from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { styled } from "@mui/system";
import CharityLogo from "../../assets/charity.svg";
import PrimaryButton from "../../components/Button/PrimaryButton";

const StyledCharityLogo = styled("img")({
  width: "100%",
  height: "auto",
});

const Home: React.FC = () => {
  const navigate = useNavigate();

  const redirectToDonationPointsList = () => {
    navigate("/donationPointsList");
  };

  const redirectToDonationPointForm = () => {
    navigate("/createDonationPoint");
  };

  return (
    <Container
      sx={{
        maxWidth: "100%",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        <Typography
          variant='h1'
          component='div'
          sx={{
            fontSize: { xs: "5vw", md: "3vw" },
            fontWeight: "700",
            marginRight: "20px",
          }}
        >
          Ajude a espalhar esperança.
        </Typography>

        <Container
          sx={{
            width: "250px",
          }}
        >
          <StyledCharityLogo src={CharityLogo} alt='Charity' />
        </Container>
      </Container>

      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <PrimaryButton
          text='Onde doar ?'
          onClick={redirectToDonationPointsList}
        />
        <PrimaryButton
          text='Cadastrar Local de Coleta'
          onClick={redirectToDonationPointForm}
        />
      </Container>
    </Container>
  );
};

export default Home;
