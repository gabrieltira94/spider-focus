import { Box, Divider, Typography, useTheme } from "@mui/material";

import { useSettingsContext } from "@/app/hooks/SettingsContext";
import { useTasksContext } from "@/app/hooks/TasksContext";
import { useTimerContext } from "@/app/hooks/TimerContext";
import { ViewTypes } from "@/app/dto/timer.dto";
import { getDecimals } from "@/app/utils/timeHelper";
import Metadata from "@/app/Metadata";
import { StyledSummaryContainer } from "@/app/styling/summary/StyledSummaryContainer";

export default function SummaryView() {
  const { getTotalLeftPomodoros, getDonePomodoros, activeTask } = useTasksContext();
  const { pomodoroTime } = useSettingsContext();
  const { minutes, seconds, view } = useTimerContext();
  const { palette } = useTheme();

  const getMinutesElapsed = () => {
    if (view === ViewTypes.Pomodoro)
      return pomodoroTime - minutes;

    return pomodoroTime;
  };

  const getSecondsElapsed = () => {
    if (view === ViewTypes.Pomodoro)
      return 60 - seconds;

    return 0;
  };

  const getRawHoursLeft = () => (getTotalLeftPomodoros() * pomodoroTime - getMinutesElapsed()) / 60;

  const getHoursLeft = () => Math.trunc(getRawHoursLeft());


  const getMinutesLeft = () => {
    const rawHours = getRawHoursLeft();
    const rawHoursDecimals = getDecimals(rawHours);
    const decimalsToMinutes = Math.round(rawHoursDecimals * 60);

    return decimalsToMinutes;
  };

  const getETA = () => {
    const minutesToAdd = (getTotalLeftPomodoros() * pomodoroTime) * 60 * 1000;
    const minutesElapsedMillis = getMinutesElapsed() * 60 * 1000;
    const secondsElapsedMillis = getSecondsElapsed() * 1000;

    const epoch = new Date().getTime() + minutesToAdd - minutesElapsedMillis - secondsElapsedMillis;
    const ETA = new Date(epoch);


    return ETA.toLocaleTimeString();
  };

  const getTimeLeftMessage = () => {
    const hoursLeftMessage = getHoursLeft() > 0 ? `${getHoursLeft()}h ` : '';

    return `(${hoursLeftMessage}${getMinutesLeft()}m)`;
  };

  const getOverADayMessage = () => {
    const currentHour = new Date().getHours();
    const hoursLeftRounded = Math.round(getRawHoursLeft());
    const finishHours = currentHour + hoursLeftRounded;

    if (finishHours < 24)
      return '';
    else if (finishHours < 48)
      return '(tomorrow)';
    else
      return `(${Math.ceil(getHoursLeft() / 24)} days later)`;
  };

  const getWorkedTime = () => (getDonePomodoros() * pomodoroTime / 60);

  return (
    <>
      <Metadata minutes={minutes} seconds={seconds} view={view} activeTask={activeTask} />

      {getTotalLeftPomodoros() > 0 &&
        <>
          <StyledSummaryContainer>
            <Box my={0.5} display='flex' flexDirection={{ xs: 'column', sm: 'row' }} alignItems='center'>
              <Typography variant="subtitle1" color={palette.secondary.main} mr={1}>
                Done by:
              </Typography>

              <Typography variant="h6" color='white'>
                {getETA()} {getOverADayMessage()} {getTimeLeftMessage()}
              </Typography>
            </Box>

            <Box my={0.5} display='flex' flexDirection={{ xs: 'column', sm: 'row' }} alignItems='center'>
              <Typography variant="subtitle1" color={palette.secondary.main} mr={1}>
                Remaining Pomodoros:
              </Typography>

              <Typography variant="h6" color='white'>
                {getTotalLeftPomodoros()}
              </Typography>
            </Box>

            {getWorkedTime() > 0 &&
              <Box my={0.5} display='flex' flexDirection={{ xs: 'column', sm: 'row' }} alignItems='center'>
                <Typography variant="subtitle1" color={palette.info.main} mr={1}>
                  Effective worked time:
                </Typography>

                <Typography variant="h6" color='white'>
                  {getWorkedTime().toFixed(1)}h
                </Typography>
              </Box>
            }
          </StyledSummaryContainer>
        </>
      }
    </>
  );
}