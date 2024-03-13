import { Box, BoxProps, styled } from "@mui/material";

export const StyledTimerContainer = styled(Box)<BoxProps>((({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.up('xs')]: {
    width: '90%'
  },
  [theme.breakpoints.up('sm')]: {
    width: '80%'
  }
})));