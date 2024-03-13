import { styled, TooltipProps, Tooltip, tooltipClasses } from "@mui/material";

export const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontFamily: 'Roboto',
    fontSize: 13,
    backgroundColor: theme.palette.background.tooltip,
    color: 'rgba(0, 255, 255, 0.9)',
    boxShadow: '7px 5px 5px black',
    top: 5
  },
}));