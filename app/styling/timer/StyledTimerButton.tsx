import { Button, ButtonProps, styled } from "@mui/material";

export const StyledTimerButton = styled(Button)<ButtonProps>((({ theme }) => ({
  textTransform: 'none',
  fontWeight: 'bold'
})));