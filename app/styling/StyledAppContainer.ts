import { Box, BoxProps, styled } from "@mui/material";

export const StyledAppContainer = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: 'auto',
  maxWidth: 600,
  overflowY: 'auto',
}));