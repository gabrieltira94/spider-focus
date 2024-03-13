import { ListItemText, ListItemTextProps, styled } from "@mui/material";

export const StyledTaskListItemText = styled(ListItemText)<ListItemTextProps>((({ theme }) => ({
  '.MuiListItemText-primary': {
    color: 'rgb(30, 31, 29)',
  },
  '.MuiListItemText-secondary': {
    fontStyle: "oblique"
  }
})));