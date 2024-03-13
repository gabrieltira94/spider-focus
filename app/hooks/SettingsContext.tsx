import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

import { Settings, SettingsKeys } from '@/app/dto/settings.dto';
import IndexedDBWrapper, { IDBData, Stores } from '@/app/utils/IndexedDBWrapper';

interface ContextState extends Settings {
  updateSettings: (settings: Settings) => Promise<void>;
}

const contextState: ContextState = {
  pomodoroTime: 25,
  shortBreakTime: 5,
  longBreakTime: 15,
  autoPlay: false,
  longBreakInterval: 4,
  clickSound: 'click.mp3',
  clickVolume: 1,
  roundEndSound: 'round-end-simple-clean.mp3',
  roundEndVolume: 1,
  updateSettings: async settings => { }
};

const SettingsContext = createContext(contextState);

const SettingsProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [db] = useState(new IndexedDBWrapper(Stores.Settings));
  const [pomodoroTime, setPomodoroTime] = useState(contextState.pomodoroTime);
  const [shortBreakTime, setShortBreakTime] = useState(contextState.shortBreakTime);
  const [longBreakTime, setLongBreakTime] = useState(contextState.longBreakTime);
  const [autoPlay, setAutoPlay] = useState(contextState.autoPlay);
  const [longBreakInterval, setLongBreakInterval] = useState(contextState.longBreakInterval);
  const [clickSound, setClickSound] = useState(contextState.clickSound);
  const [clickVolume, setClickVolume] = useState(contextState.clickVolume);
  const [roundEndSound, setRoundEndSound] = useState(contextState.roundEndSound);
  const [roundEndVolume, setRoundEndVolume] = useState(contextState.roundEndVolume);

  useEffect(() => {
    loadDBData();
  }, []);

  const loadDBData = async () => {
    const dbPomodoro = await db.fetch<number>(SettingsKeys.Pomodoro);
    const dbShort = await db.fetch<number>(SettingsKeys.Short);
    const dbLong = await db.fetch<number>(SettingsKeys.Long);
    const dbAutoplay = await db.fetch<boolean>(SettingsKeys.Autoplay);
    const dbLongInterval = await db.fetch<number>(SettingsKeys.LongInterval);
    const dbClickSound = await db.fetch<string>(SettingsKeys.ClickSound);
    const dbClickVolume = await db.fetch<number>(SettingsKeys.ClickVolume);
    const dbRoundEndSound = await db.fetch<string>(SettingsKeys.RoundEndSound);
    const dbRoundEndVolume = await db.fetch<number>(SettingsKeys.RoundEndVolume);

    if (dbPomodoro)
      setPomodoroTime(dbPomodoro.value);
    if (dbShort)
      setShortBreakTime(dbShort.value);
    if (dbLong)
      setLongBreakTime(dbLong.value);
    if (dbAutoplay)
      setAutoPlay(dbAutoplay.value);
    if (dbLongInterval)
      setLongBreakInterval(dbLongInterval.value);
    if (dbClickSound)
      setClickSound(dbClickSound.value);
    if (dbClickVolume)
      setClickVolume(dbClickVolume.value);
    if (dbRoundEndSound)
      setRoundEndSound(dbRoundEndSound.value);
    if (dbRoundEndVolume)
      setRoundEndVolume(dbRoundEndVolume.value);
  };

  const updateSettings = async (settings: Settings) => {
    const settingsData: IDBData<number | string | boolean>[] = [
      { id: SettingsKeys.Pomodoro, value: settings.pomodoroTime },
      { id: SettingsKeys.Short, value: settings.shortBreakTime },
      { id: SettingsKeys.Long, value: settings.longBreakTime },
      { id: SettingsKeys.Autoplay, value: settings.autoPlay },
      { id: SettingsKeys.LongInterval, value: settings.longBreakInterval },
      { id: SettingsKeys.ClickSound, value: settings.clickSound },
      { id: SettingsKeys.ClickVolume, value: settings.clickVolume },
      { id: SettingsKeys.RoundEndSound, value: settings.roundEndSound },
      { id: SettingsKeys.RoundEndVolume, value: settings.roundEndVolume },
    ];

    await db.addMultiple(settingsData);

    setPomodoroTime(settings.pomodoroTime);
    setShortBreakTime(settings.shortBreakTime);
    setLongBreakTime(settings.longBreakTime);
    setAutoPlay(settings.autoPlay);
    setLongBreakInterval(settings.longBreakInterval);
    setClickSound(settings.clickSound);
    setClickVolume(settings.clickVolume);
    setRoundEndSound(settings.roundEndSound);
    setRoundEndVolume(settings.roundEndVolume);
  };

  return (
    <SettingsContext.Provider value={{
      pomodoroTime,
      shortBreakTime,
      longBreakTime,
      autoPlay,
      longBreakInterval,
      clickSound,
      clickVolume,
      roundEndSound,
      roundEndVolume,
      updateSettings
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

const useSettingsContext = () => useContext(SettingsContext);

export { useSettingsContext, SettingsProvider };
