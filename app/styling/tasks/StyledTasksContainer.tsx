import { Box, BoxProps, styled } from "@mui/material";

export const StyledTasksContainer = styled(Box)<BoxProps>(({ theme }) => ({
  color: 'rgb(187, 187, 187)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: 10,
  [theme.breakpoints.up('xs')]: {
    width: '90%',
  },
  [theme.breakpoints.up('sm')]: {
    width: '80%',
  }
}));