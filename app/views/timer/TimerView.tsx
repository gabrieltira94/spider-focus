import { Box, Typography, useTheme } from "@mui/material";

import { useTasksContext } from "@/app/hooks/TasksContext";
import { useTimerContext } from "@/app/hooks/TimerContext";
import Time from "@/app/views/timer/Time";
import TimerButton from "@/app/views/timer/TimerButton";
import { ViewTypes } from "@/app/dto/timer.dto";
import { Tooltips, getMotivationalPomodoro, getMotivationalShortBreak } from "@/app/utils/messages";
import { useEffect, useState } from "react";
import { StyledTimerContainer } from "@/app/styling/timer/StyledTimerContainer";
import { StyledTimerButtonsContainer } from "@/app/styling/timer/StyledTimerButtonsContainer";
import TooltipWrapper from "@/app/components/TooltipWrapper";

export default function TimerView() {
  const { activeTask } = useTasksContext();
  const { palette: { background } } = useTheme();
  const { currentRound, view, setView, resetRounds } = useTimerContext();
  const [motivationalMessage, setMotivationalMessage] = useState<string>('');

  useEffect(() => {
    setMotivationalMessage(loadMessage());
  }, [view, activeTask]);

  const loadMessage = () => {
    if (activeTask)
      return `${activeTask.title}`;

    switch (view) {
      case ViewTypes.Pomodoro:
        return getMotivationalPomodoro();
      case ViewTypes.ShortBreak:
        return `Tip: ${getMotivationalShortBreak()}`;
      case ViewTypes.LongBreak:
        return 'This is some real progress, enjoy your long break!';
    }
  };

  return (
    <StyledTimerContainer>

      <Box bgcolor={background.timer} width='100%' borderRadius='10px' py={1.5}>
        <StyledTimerButtonsContainer>
          <TimerButton view={ViewTypes.Pomodoro} currentView={view} setView={setView} />
          <TimerButton view={ViewTypes.ShortBreak} currentView={view} setView={setView} />
          <TimerButton view={ViewTypes.LongBreak} currentView={view} setView={setView} />
        </StyledTimerButtonsContainer>

        <Time />
      </Box>

      <Box display='flex' flexDirection='column' alignItems='center' my={2}>
        <Box onClick={resetRounds} sx={{ cursor: 'pointer' }}>
          <TooltipWrapper description={Tooltips.Timer.Counter}>
            <Typography sx={{ color: useTheme().palette.info.main, fontWeight: '600' }}>#{currentRound}</Typography>
          </TooltipWrapper>
        </Box>
        <Typography color="GrayText" fontWeight={500} variant="caption">{motivationalMessage}</Typography>
      </Box>
    </StyledTimerContainer >
  );
}