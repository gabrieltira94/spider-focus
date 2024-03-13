import { useEffect, MouseEvent, useState } from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import SkipNextIcon from '@mui/icons-material/SkipNext';

import { useTimerContext } from "@/app/hooks/TimerContext";
import { useTasksContext } from "@/app/hooks/TasksContext";
import { ViewTypes } from "@/app/dto/timer.dto";
import { getPaddedNumber } from "@/app/utils/timeHelper";
import TooltipWrapper from "@/app/components/TooltipWrapper";
import { useSettingsContext } from "@/app/hooks/SettingsContext";


export default function Time() {
  const { seconds, minutes, isActive, view, setMinutes, setSeconds, setIsActive, setNextView, increaseCurrentRound } = useTimerContext();
  const { processOnRoundEnd } = useTasksContext();
  const { clickSound, clickVolume, roundEndSound, roundEndVolume } = useSettingsContext();
  const [roundEndAudio, setRoundEndAudio] = useState<HTMLAudioElement>();
  const [clickAudio, setClickAudio] = useState<HTMLAudioElement>();

  useEffect(() => {
    const audioBuilder = (sound: string, volume: number): HTMLAudioElement => {
      const audioObj = new Audio(`/audio/${sound}`);
      audioObj.volume = volume;

      return audioObj;
    };

    setRoundEndAudio(audioBuilder(roundEndSound, roundEndVolume));
    setClickAudio(audioBuilder(clickSound, clickVolume));
  }, [clickSound, clickVolume, roundEndSound, roundEndVolume]);

  useEffect(() => {
    addShortcut();

    let interval: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          // Timer is complete
          roundEndAudio?.play();

          clearInterval(interval);
          setIsActive(false);
          onRoundEnd();
        }
      }, document.hidden ? 980 : 1000);
    } else {
      // @ts-ignore
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);


  const addShortcut = () => {
    window.document.body.onkeyup = function (e) {
      if (e.key == " " || e.code == "Space") {
        e.preventDefault();
        e.stopPropagation();
        setIsActive(!isActive);
      }
    };

    window.document.body.onkeydown = function (e) {
      if (e.key == " " || e.code == "Space")
        e.preventDefault();
    };
  };

  const toggleTimer = async (event: MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.blur();

    clickAudio?.play();
    setIsActive(!isActive);
  };

  const onRoundEnd = () => {
    if (view !== ViewTypes.Pomodoro) {
      increaseCurrentRound();
      processOnRoundEnd();
    }

    setNextView();
  };

  const handlePlayNext = () => onRoundEnd();

  return (
    <>
      <Box display='flex' flexDirection='column' alignItems='center'>

        <Typography
          variant="h1"
          color={useTheme().palette.primary.main}
          sx={{ fontWeight: '500' }}
        >
          {getPaddedNumber(minutes)}:{getPaddedNumber(seconds)}
        </Typography>

        <Box>
          <TooltipWrapper description="Use Spacebar shortcut to Start/Pause">
            <Button
              variant="contained"
              color={isActive ? "secondary" : 'secondary'}
              size={isActive ? 'small' : 'medium'}
              onClick={toggleTimer}
            >
              {isActive ? 'Pause' : 'Start'}
            </Button>
          </TooltipWrapper>

          {isActive &&
            <SkipNextIcon
              fontSize='large'
              color='info'
              onClick={handlePlayNext}
              sx={{ cursor: 'pointer', verticalAlign: 'middle' }}
            />
          }
        </Box>
      </Box>
    </>
  );
}