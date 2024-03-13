import { Box, useTheme } from "@mui/material";
import { ReactNode } from "react";
import { Property } from 'csstype';

interface Props {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
  color?: Property.Color;
}

export default function MenuSetting(props: Props) {
  const { palette } = useTheme();
  const { label, icon, color, onClick } = props;

  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        cursor: 'pointer',
        fontStyle: 'italic',
        textAlign: 'center',
        fontFamily: 'Roboto',
        p: 1.5,
        color: color || palette.text.secondary,
        ':hover': {
          backgroundColor: palette.text.whiteGrey
        }
      }}
    >
      {icon}{label}
    </Box>
  );
}