import { MenuItem, MenuItemProps, styled } from "@mui/material";

export const StyledSelectMenuItem = styled(MenuItem)<MenuItemProps>(({ theme }) => ({
  '&.MuiMenuItem-root': {
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.24)',
    },

    '&.Mui-selected': {
      backgroundColor: 'rgba(208, 227, 127, 0.78)'
    }
  },
}));