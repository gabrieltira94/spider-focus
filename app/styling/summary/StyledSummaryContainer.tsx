import { Box, BoxProps, alpha, styled } from "@mui/material";

export const StyledSummaryContainer = styled(Box)<BoxProps>((({ theme }) => ({
  width: '80',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 20,
  borderTop: '2px solid azure',
  borderBottomLeftRadius: '20px',
  borderBottomRightRadius: '20px',
  background: alpha(theme.palette.background.timer, 0.7),
  [theme.breakpoints.up('xs')]: {
    width: '90%',
  },
  [theme.breakpoints.up('sm')]: {
    width: '80%',
  }
})));