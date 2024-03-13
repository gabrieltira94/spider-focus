import { ListItem, ListItemProps, styled } from "@mui/material";

export const StyledTaskListItem = styled(ListItem)<ListItemProps>((({ theme }) => ({
  // backgroundColor: 'azure',
  backgroundColor: theme.palette.secondary.main,
  borderRadius: '20px',
  margin: '0.5rem 0',
  "&.done": {
    backgroundColor: theme.palette.success.light,
    fontStyle: 'italic',
    color: 'GrayText',
  },
  "&.active": {
    backgroundColor: theme.palette.primary.light
  },
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark,

    "&.done": {
      backgroundColor: theme.palette.success.light,
    },
    "&.active": {
      backgroundColor: theme.palette.primary.dark
    },
  },
  "&:active": {
    backgroundColor: 'rgba(196, 204, 197, 0.6)'
  }
})));