import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Brasao from "../../assets/brasao.svg";

const StyledAppBar = styled(AppBar)({
  backgroundColor: "#40943e",
});

const StyledBrasao = styled("img")({
  width: "40px",
  height: "auto",
  marginRight: "10px",
});

const Navbar: React.FC = () => {
  return (
    <StyledAppBar position='static'>
      <Toolbar>
        <Link
          to='/app-apoiers'
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <StyledBrasao src={Brasao} alt='Brasão' />
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Apoie RS
          </Typography>
        </Link>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
