import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";

const StyledPrimaryButton = styled(Button)({
  marginBottom: "10px",
  width: "-webkit-fill-available",
  backgroundColor: "#40943e",
  "&:hover": {
    backgroundColor: "#2e7d31",
  },
  fontSize: "14px",
});

interface PrimaryButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  text,
  onClick,
  disabled,
}) => {
  return (
    <StyledPrimaryButton
      variant='contained'
      color='primary'
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </StyledPrimaryButton>
  );
};

export default PrimaryButton;
