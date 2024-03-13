import { Box, BoxProps, styled } from "@mui/material";

export const StyledAddTaskArea = styled(Box)<BoxProps>((({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: `${theme.spacing(2)} 0`,
  margin: `${theme.spacing(2)} 0`,
  cursor: 'pointer',
  border: '2px dashed grey',
  borderRadius: theme.spacing(2)
})));