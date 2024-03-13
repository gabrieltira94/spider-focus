import InfoIcon from '@mui/icons-material/Info';
import { StyledTooltip } from "@/app/styling/StyledTooltip";

interface Props {
  description: string;
  color?: string;
}

export default function TooltipIcon(props: Props) {
  const { description } = props;

  return (
    <StyledTooltip title={description} placement="top" arrow>
      <InfoIcon color='disabled' sx={{ mr: 1 }} />
    </StyledTooltip>
  );
}