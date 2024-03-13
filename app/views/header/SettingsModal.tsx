import { Box, Button, Grid, InputAdornment, Modal, Select, Slider, Switch, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { ChangeEvent, useEffect, useState } from "react";
import { boolean, number, object } from "yup";

import { Settings } from "@/app/dto/settings.dto";
import { useSettingsContext } from "@/app/hooks/SettingsContext";
import { StyledSettingsContainer } from "@/app/styling/header/StyledSettingsContainer";
import TooltipIcon from "@/app/components/TooltipIcon";
import { Tooltips } from "@/app/utils/messages";
import { VolumeDown, VolumeUp, PlayArrow, Stop } from "@mui/icons-material";
import { StyledSelectMenuItem } from "@/app/styling/header/StyledSelectMenuItem";
import { isMobile } from "@/app/utils/browserHelper";

interface Props {
  onAction: () => void;
}

const validationSchema = object({
  pomodoroTime: number().typeError('This has to be a number').min(1, 'Let\'s focus for at least a minute'),
  shortBreakTime: number().typeError('This has to be a number').min(1, 'Don\'t be selfish, take at least a minute break'),
  longBreakTime: number().typeError('This has to be a number').min(1, `You certainly need a longer break`),
  autoPlay: boolean(),
  longBreakInterval: number().typeError('This has to be a number').min(2, 'Long break should come at least after a Short break'),
});

const defaultValues: Settings = {
  pomodoroTime: 30,
  shortBreakTime: 5,
  longBreakTime: 15,
  autoPlay: false,
  longBreakInterval: 3,
  clickSound: 'click.mp3',
  clickVolume: 1,
  roundEndSound: 'round-end-simple-clean.mp3',
  roundEndVolume: 1,
};

export default function SettingsModal(props: Props) {
  const { onAction } = props;
  const { pomodoroTime, shortBreakTime, longBreakTime, autoPlay, longBreakInterval, clickSound, clickVolume, roundEndSound, roundEndVolume,
    updateSettings } = useSettingsContext();
  const [initialValues, setInitialValues] = useState(defaultValues);

  useEffect(() => {
    setInitialValues({
      pomodoroTime, shortBreakTime, longBreakTime, autoPlay, longBreakInterval,
      clickSound, clickVolume, roundEndSound, roundEndVolume
    });
  }, [pomodoroTime, shortBreakTime, longBreakTime, autoPlay, longBreakInterval, clickSound, clickVolume, roundEndSound, roundEndVolume]);

  const handleCancel = () => onAction();

  const playSound = (sound: string, volume?: number) => () => {
    const newAudio = new Audio(`/audio/${sound}`);

    if (volume)
      newAudio.volume = volume;

    newAudio.play();
  };

  const handleSubmit = async (values: Settings) => {

    await updateSettings({
      pomodoroTime: Number(values.pomodoroTime),
      shortBreakTime: Number(values.shortBreakTime),
      longBreakTime: Number(values.longBreakTime),
      autoPlay: values.autoPlay,
      longBreakInterval: Number(values.longBreakInterval),
      clickSound: values.clickSound,
      clickVolume: Number(values.clickVolume),
      roundEndSound: values.roundEndSound,
      roundEndVolume: Number(values.roundEndVolume),
    });

    onAction();
  };

  const handleVolumeChange = (
    setFieldValue: (field: string, value: number) => void,
    sound: string
  ) => (event: Event, volume: number | number[]) => {
    const fieldName = (event.target as any).name;

    playSound(sound, volume as number)();

    setFieldValue(fieldName, volume as number);
  };

  return (

    <Modal open onClose={onAction} sx={{ overflowY: 'auto' }}>
      <>
        <Box height={50} />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, setFieldValue, handleChange, handleBlur }) =>

            <StyledSettingsContainer>
              <Form>
                <Grid container px={2} rowSpacing={2}>
                  <Grid item xs={6} sm={4} px={{ xs: 1, sm: 2 }}>
                    <TextField
                      name='pomodoroTime'
                      label='Pomodoro'
                      value={values.pomodoroTime}
                      required
                      error={Boolean(touched && errors.pomodoroTime)}
                      helperText={touched.pomodoroTime && errors.pomodoroTime}
                      variant="filled"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>

                  <Grid item xs={6} sm={4} px={{ xs: 1, sm: 2 }}>
                    <TextField
                      name='shortBreakTime'
                      label='Short Break'
                      value={values.shortBreakTime}
                      required
                      error={Boolean(touched && errors.shortBreakTime)}
                      helperText={touched.shortBreakTime && errors.shortBreakTime}
                      variant="filled"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>

                  <Grid item xs={6} sm={4} px={{ xs: 1, sm: 2 }}>
                    <TextField
                      name='longBreakTime'
                      label='Long Break'
                      value={values.longBreakTime}
                      required
                      error={Boolean(touched && errors.longBreakTime)}
                      helperText={touched.longBreakTime && errors.longBreakTime}
                      variant="filled"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>

                  <Grid item xs={6} sm={5} px={{ xs: 1, sm: 2 }}>
                    <TextField
                      name='longBreakInterval'
                      label='Long Break Interval'
                      value={values.longBreakInterval}
                      required
                      error={Boolean(touched && errors.longBreakInterval)}
                      helperText={touched.longBreakInterval && errors.longBreakInterval}
                      variant="filled"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      InputProps={{
                        startAdornment:
                          <InputAdornment position="start">
                            <TooltipIcon description={Tooltips.SettingsModal.LongBreakInterval} />
                          </InputAdornment>
                      }}
                    />
                  </Grid>

                  <Grid item xs={7} display='flex' alignItems='center' justifyContent='center'>
                    <TooltipIcon description={Tooltips.SettingsModal.AutoPlay} />
                    <Typography variant="subtitle1" fontWeight='400'>Auto play</Typography>
                    <Switch
                      name='autoPlay'
                      checked={values.autoPlay}
                      value={values.autoPlay}
                      onChange={handleChange}
                      color="success"
                    />
                  </Grid>

                  {!isMobile() &&
                    <>
                      <Grid item xs={12}>
                        <Grid container display='flex' alignItems='center' width='100%'>
                          <Grid item xs={12} sm={4} textAlign='center'>
                            <Typography variant="subtitle1" fontWeight='400'>Click Volume</Typography>
                          </Grid>

                          <Grid item xs={12} sm={8} display='flex' alignItems='center' px={1}>
                            <VolumeDown />
                            <Slider
                              value={values.clickVolume}
                              name="clickVolume"
                              onChange={handleVolumeChange(setFieldValue, values.clickSound)}
                              min={0}
                              max={1}
                              step={0.1}
                              valueLabelDisplay="auto"
                              valueLabelFormat={`${values.clickVolume * 100}%`}
                              sx={{ mx: 1 }}
                            />
                            <VolumeUp />
                          </Grid>
                        </Grid>
                      </Grid>


                      <Grid item xs={12}>
                        <Grid container display='flex' alignItems='center' justifyContent='center' width='100%'>
                          <Grid item xs={12} sm={4} textAlign='center'>
                            <Typography variant="subtitle1" fontWeight='400'>Round End Volume</Typography>
                          </Grid>

                          <Grid item xs={12} sm={8} display='flex' alignItems='center' px={1}>
                            <VolumeDown />
                            <Slider
                              value={values.roundEndVolume}
                              name="roundEndVolume"
                              onChange={handleVolumeChange(setFieldValue, values.roundEndSound)}
                              min={0}
                              max={1}
                              step={0.1}
                              valueLabelDisplay="auto"
                              valueLabelFormat={`${values.roundEndVolume * 100}%`}
                              sx={{ mx: 1 }}
                            />
                            <VolumeUp />
                          </Grid>
                        </Grid>
                      </Grid>
                    </>
                  }

                  <Grid item xs={12}>
                    <Grid container display='flex' alignItems='center' width='100%'>

                      <Grid item xs={4} textAlign='center'>
                        <Typography variant="subtitle1" fontWeight='400'>Click Sound</Typography>
                      </Grid>

                      <Grid item xs={8} display='flex' alignItems='center'>
                        <Select
                          value={values.clickSound}
                          name='clickSound'
                          onChange={handleChange}
                          sx={{ mx: 2 }}
                        >
                          <StyledSelectMenuItem value='click.mp3'>Click</StyledSelectMenuItem>
                          <StyledSelectMenuItem value='click-effect.mp3'>Click Effect</StyledSelectMenuItem>
                        </Select>

                        <PlayArrow onClick={playSound(values.clickSound)} />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container display='flex' alignItems='center' width='100%'>

                      <Grid item xs={4} textAlign='center'>
                        <Typography variant="subtitle1" fontWeight='400'>Round End Sound</Typography>
                      </Grid>

                      <Grid item xs={8} display='flex' alignItems='center'>
                        <Select
                          value={values.roundEndSound}
                          name='roundEndSound'
                          onChange={handleChange}
                          sx={{ mx: 2 }}
                        >
                          <StyledSelectMenuItem value='round-end-modern-tech.mp3'>Modern Tech</StyledSelectMenuItem>
                          <StyledSelectMenuItem value='round-end-simple-clean.mp3'>Simple Clean</StyledSelectMenuItem>
                          <StyledSelectMenuItem value='round-end-soft-piano.mp3'>Soft Piano</StyledSelectMenuItem>
                          <StyledSelectMenuItem value='round-end-crystal-logo.mp3'>Crystal Logo</StyledSelectMenuItem>
                          <StyledSelectMenuItem value='round-end-short-success.mp3'>Short Success</StyledSelectMenuItem>
                          <StyledSelectMenuItem value='round-end-simple-notification.mp3'>Simple Notification</StyledSelectMenuItem>
                        </Select>

                        <PlayArrow onClick={playSound(values.roundEndSound)} />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} display='flex' justifyContent='space-evenly' mt={2}>
                    <Button variant="outlined" color="error" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button variant="contained" color="success" type="submit">
                      Save settings
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            </StyledSettingsContainer>
          }
        </Formik>
      </>
    </Modal >
  );
}