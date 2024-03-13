export enum SettingsKeys {
  Pomodoro = 'pomodoro',
  Short = 'short',
  Long = 'long',
  Autoplay = 'autoplay',
  LongInterval = 'longInterval',
  ClickSound = 'clickSound',
  ClickVolume = 'clickVolume',
  RoundEndSound = 'roundEndSound',
  RoundEndVolume = 'roundEndVolume',
}

export interface Settings {
  pomodoroTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  autoPlay: boolean;
  longBreakInterval: number;
  roundEndVolume: number;
  clickVolume: number;
  roundEndSound: string;
  clickSound: string;
}