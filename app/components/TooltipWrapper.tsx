import { StyledTooltip } from "@/app/styling/StyledTooltip";
import { ReactElement } from "react";

interface Props {
  description: string;
  children: ReactElement;
  color?: string;
}

export default function TooltipWrapper(props: Props) {
  const { description, children } = props;

  return (
    <StyledTooltip title={description} placement="top" arrow>
      {children}
    </StyledTooltip>
  );
}