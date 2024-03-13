import { createTheme } from "@mui/material";

declare module '@mui/material/styles' {
  interface Theme {

  }
  interface PaletteOptions {

  }
  interface TypeBackground {
    timer: string;
    secondaryContainers: string;
    tooltip: string;
  }
  interface TypeText {
    base: string;
    inputTextDark: string;
    inputTextLabel: string;
    actionIcons: string;
    whiteGrey: string;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#D0E37F'
    },
    secondary: {
      main: '#DDB967'
    },
    info: {
      // main: '#D1603D',
      main: '#D7BCC8',
    },
    background: {
      secondaryContainers: '#F0FFFF',
      timer: '#221D23',
      tooltip: '#54414E'
    },
    text: {
      primary: '#2E7A91',
      secondary: '#4F3824',
      base: 'rgb(85, 85, 85)',
      inputTextDark: '#495D63',
      inputTextLabel: '#D1603D',
      actionIcons: '#54414E',
      whiteGrey: '#c0c2c4'
    }
  },
  typography: {
    fontFamily: 'Arial Rounded MT Bold,Helvetica Rounded,Arial,sans-serif'
  },
});