import { Box, BoxProps, keyframes, styled } from "@mui/material";

const myEffect = keyframes`
0% {
  opacity: 0;
  transform: translateY(40%);s
}
50% {
  opacity: 0.5;
  transform: translateY(-40%);
}
100% {
  opacity: 1;
  transform: translateY(0);
}
`;

export const StyledCreateTaskContainer = styled(Box)<BoxProps>((({ theme }) => ({
  display: 'flex',
  width: '100%',
  margin: '0.5rem auto',
  borderRadius: '20px',
  backgroundColor: theme.palette.background.secondaryContainers,
  animation: `${myEffect} 300ms ${theme.transitions.easing.easeInOut}`,
  "&:active": {
    backgroundColor: 'azure',
  },
  '.MuiInputBase-input, .MuiFormLabel-colorPrimary': {
    color: theme.palette.text.inputTextDark,

    '&.Mui-focused': {
      color: theme.palette.text.inputTextLabel,
    }
  }
})));