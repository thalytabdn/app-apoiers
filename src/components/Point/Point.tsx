import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { DonationPoint } from "../../types/pointTypes";

interface PointProps {
  point: DonationPoint;
}

const Point: React.FC<PointProps> = ({ point }) => {
  const ruaCapitalized = point.rua.charAt(0).toUpperCase() + point.rua.slice(1);

  return (
    <Card>
      <CardContent>
        <Typography variant='h5' component='div'>
          {point.nome}
        </Typography>

        <Typography variant='body2' color='text.secondary'>
          {point.cidade} - {point.uf}
        </Typography>

        <Typography variant='body2' color='text.secondary'>
          {ruaCapitalized}, {point.numero}
        </Typography>

        <Typography variant='body2' color='text.secondary'>
          Bairro: {point.bairro}
        </Typography>

        <Typography variant='body2' color='text.secondary'>
          Telefone: {point.telefone}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Point;
