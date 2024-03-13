import { Box, BoxProps, styled } from "@mui/material";

export const StyledSettingsContainer = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundColor: theme.palette.background.secondaryContainers,
  color: theme.palette.text.base,
  display: 'flex',
  alignItems: 'center',
  padding: '1.5rem 0',
  margin: 'auto',
  borderRadius: 10,
  [theme.breakpoints.up('xs')]: {
    width: '90%',
  },
  [theme.breakpoints.up('sm')]: {
    width: 500,
  },
  '.MuiInputBase-input, .MuiFormLabel-colorPrimary': {
    color: theme.palette.text.inputTextDark,

    '&.Mui-focused': {
      color: theme.palette.text.primary,
    }
  }
}));