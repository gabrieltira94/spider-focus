import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

import { TimerKeys, ViewTypes } from "@/app/dto/timer.dto";
import { useSettingsContext } from "@/app/hooks/SettingsContext";
import IndexedDBWrapper, { IDBData, Stores } from "@/app/utils/IndexedDBWrapper";

interface ContextState {
  currentRound: number;
  minutes: number;
  seconds: number;
  view: ViewTypes;
  isActive: boolean;
  increaseCurrentRound: () => void;
  setMinutes: (value: number) => void;
  setSeconds: (value: number) => void;
  setNextView: () => void;
  setView: (value: ViewTypes) => void;
  setIsActive: (value: boolean) => void;
  resetRounds: () => void;
}

const contextState: ContextState = {
  currentRound: 1,
  minutes: 25,
  seconds: 0,
  view: ViewTypes.Pomodoro,
  isActive: false,
  increaseCurrentRound: () => { },
  setMinutes: value => { },
  setSeconds: value => { },
  setNextView: () => { },
  setView: view => { },
  setIsActive: value => { },
  resetRounds: () => { }
};

const TimerContext = createContext(contextState);

const TimerProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const { pomodoroTime, longBreakInterval, shortBreakTime, longBreakTime, autoPlay } = useSettingsContext();
  const [db] = useState(new IndexedDBWrapper(Stores.Timer));
  const [currentRound, setCurrentRound] = useState(1);
  const [minutes, setMinutes] = useState(pomodoroTime);
  const [seconds, setSeconds] = useState(0);
  const [view, setView] = useState<ViewTypes>(ViewTypes.Pomodoro);
  const [isActive, setIsActive] = useState(false);
  const [isDbLoaded, setisDbLoaded] = useState(false);

  useEffect(() => {
    loadDBValues();
  }, []);

  useEffect(() => {
    processViewTimes();
  }, [pomodoroTime, shortBreakTime, longBreakTime]);

  useEffect(() => {
    if (!isDbLoaded)
      return;

    processViewTimes();

    updateDB();

    setIsActive(autoPlay);
  }, [view]);

  const loadDBValues = async () => {
    const dbCurrentRound = await db.fetch<number>(TimerKeys.CurrentRound);
    const dbView = await db.fetch<ViewTypes>(TimerKeys.View);

    if (dbCurrentRound)
      setCurrentRound(dbCurrentRound.value);
    if (dbView)
      setView(dbView.value);

    setisDbLoaded(true);
  };

  const updateDB = async () => {
    const settings: IDBData<number | ViewTypes>[] = [
      { id: TimerKeys.CurrentRound, value: currentRound },
      { id: TimerKeys.View, value: view }
    ];

    await db.addMultiple(settings);
  };

  const increaseCurrentRound = () => setCurrentRound(currentRound + 1);

  const setNextView = () => {
    switch (view) {
      case ViewTypes.Pomodoro:

        if (isLongBreakTime())
          return setView(ViewTypes.LongBreak);

        return setView(ViewTypes.ShortBreak);
      case ViewTypes.ShortBreak:
      case ViewTypes.LongBreak:
        return setView(ViewTypes.Pomodoro);
    }
  };

  const processViewTimes = () => {
    switch (view) {
      case ViewTypes.Pomodoro: {
        setMinutes(pomodoroTime);
        break;
      }
      case ViewTypes.ShortBreak: {
        setMinutes(shortBreakTime);
        break;
      }
      case ViewTypes.LongBreak: {
        setMinutes(longBreakTime);
        break;
      }
    }

    setSeconds(0);
  };

  const resetRounds = async () => {
    setCurrentRound(1);
    setView(ViewTypes.Pomodoro);

    const settings: IDBData<number | ViewTypes>[] = [
      { id: TimerKeys.CurrentRound, value: 1 },
      { id: TimerKeys.View, value: ViewTypes.Pomodoro }
    ];

    await db.addMultiple(settings);
  };

  /**
   * Used longBreakInterval + 1 because we have to set Long Break after ${longBreakInterval} X Short Breaks
   */
  const isLongBreakTime = () => currentRound % (longBreakInterval + 1) === 0;

  return (
    <TimerContext.Provider value={{
      currentRound,
      minutes,
      seconds,
      view,
      isActive,
      increaseCurrentRound,
      setMinutes,
      setSeconds,
      setNextView,
      setView,
      setIsActive,
      resetRounds
    }}>
      {children}
    </TimerContext.Provider>
  );
};

const useTimerContext = () => useContext(TimerContext);

export { useTimerContext, TimerProvider };

// function testCannotGohigherThan10(){
//   Jest.mock('react').useState = jest.fn(()=> {10})

//   const {round, setRound } = TestProvider({});
//   setRound(11);
//   expect(round).toBe(10);


// }


