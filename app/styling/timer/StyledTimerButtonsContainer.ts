import { Box, BoxProps, styled } from "@mui/material";

export const StyledTimerButtonsContainer = styled(Box)<BoxProps>((({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly'
})));