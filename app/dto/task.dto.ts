export interface Task {
  id: string;
  position: number;
  title: string;
  pomodoros: number;
  pomodorosDone: number;
  isDone: boolean;
  isHidden: boolean;
}

export enum TasksKeys {
  Tasks = 'tasks',
  ActiveTask = 'activeTask'
}