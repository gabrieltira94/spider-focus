import React, { createContext, useState, PropsWithChildren, useEffect, useContext } from 'react';

import IndexedDBWrapper, { Stores } from '@/app/utils/IndexedDBWrapper';
import { mapPositionByIndex, sortByIsDone, sortByPosition } from '@/app/utils/listHelper';
import { Task, TasksKeys } from '@/app/dto/task.dto';

interface ContextState {
  tasks: Task[],
  activeTask: Task | null,
  handleSetTasks: (tasks: Task[]) => Promise<void>,
  createTask: (task: Task) => Promise<void>,
  updateTask: (taskId: string, props: Partial<Task>) => Promise<void>,
  getDonePomodoros: () => number,
  getTotalLeftPomodoros: () => number,
  handleSetActiveTask: (task: Task) => Promise<void>,
  processDoneTasks: (isDone: boolean, index: number) => Promise<void>;
  handleRemoveTask: (id: string) => Promise<void>;
  handleRemoveTasks: (tasks: Task[]) => Promise<void>;
  processOnRoundEnd: () => Promise<void>;
}

const contextState: ContextState = {
  tasks: [],
  activeTask: null,
  handleSetTasks: async (tasks: Task[]) => { },
  createTask: async (task: Task) => { },
  updateTask: async (taskId: string, props: Partial<Task>) => { },
  getDonePomodoros: () => 0,
  getTotalLeftPomodoros: () => 0,
  handleSetActiveTask: async (task: Task) => { },
  processDoneTasks: async (isDone: boolean, index: number) => { },
  handleRemoveTask: async (id: string) => { },
  handleRemoveTasks: async (tasks: Task[]) => { },
  processOnRoundEnd: async () => { }
};

const TasksContext = createContext(contextState);

const TasksProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [db] = useState(new IndexedDBWrapper(Stores.Tasks));
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  useEffect(() => {
    loadDBData();
  }, []);

  const loadDBData = async () => {
    const dbTasks = await db.fetch<Task[]>(TasksKeys.Tasks);
    const dbActiveTask = await db.fetch<Task>(TasksKeys.ActiveTask);

    if (dbTasks)
      await handleSetTasks(dbTasks.value, dbActiveTask?.value);
  };

  const handleSetTasks = async (newTasks: Task[], dbActiveTask?: Task) => {
    const sortedTasks = mapPositionByIndex(sortByIsDone(sortByPosition((newTasks))));

    setTasks(sortedTasks);

    await handleSetActiveTask(getNewActiveTask(sortedTasks, dbActiveTask));

    await db.add<Task[]>({ id: TasksKeys.Tasks, value: sortedTasks });
  };

  const handleRemoveTask = async (id: string) => {
    const taskIndex = tasks.findIndex(t => t.id === id);
    const newTasks = Array.from(tasks);
    newTasks.splice(taskIndex, 1);

    await db.removeItem(id);
    handleSetTasks(newTasks);
  };

  const handleRemoveTasks = async (tasksToDelete: Task[]) => {
    await db.removeMultiple<Task>(tasksToDelete);

    const remainingTasks = tasks.filter(task => !tasksToDelete.includes(task));
    await handleSetTasks(remainingTasks);
  };

  const processDoneTasks = async (isDone: boolean, index: number) => {
    const newTasks: Task[] = Array.from(tasks);
    const task = newTasks[index];

    if (task.pomodorosDone === task.pomodoros)
      return;
    else
      task.isDone = !isDone;

    await handleSetTasks(newTasks);
  };

  const processOnRoundEnd = async () => {
    const newTasks = tasks.map(task => {
      if (task.id === activeTask?.id) {
        if (task.pomodorosDone + 1 === task.pomodoros)
          task.isDone = true;

        if (task.pomodorosDone < task.pomodoros)
          task.pomodorosDone++;
      }

      return task;
    });

    await handleSetTasks(newTasks);
  };

  const createTask = async (task: Task) => {
    await handleSetTasks([...tasks, task]);
  };

  const updateTask = async (taskId: string, props: Partial<Task>) => {
    const newTasks = tasks.map(task => {
      if (task.id === taskId) {
        task = {
          ...task,
          ...props
        };

        if (task.pomodorosDone === task.pomodoros)
          task.isDone = true;
      }

      return task;
    });

    await handleSetTasks(newTasks);
  };

  const handleSetActiveTask = async (task: Task | null): Promise<void> => {
    if (task === null) {
      setActiveTask(null);
      return db.removeItem(TasksKeys.ActiveTask,);
    }

    if (task.isDone)
      return;


    setActiveTask(task);

    await db.add<Task>({ id: TasksKeys.ActiveTask, value: task });
  };

  const getNewActiveTask = (newTasks: Task[], dbActiveTask?: Task): Task | null => {
    // if loaded from DB - onMount only
    if (dbActiveTask)
      return dbActiveTask;

    const updatedActiveTask = newTasks.find(newTask => newTask.id === activeTask?.id);

    // no active tasks or invalid activeTask or activeTask deleted or activeTask forced Done
    if (!activeTask || activeTask.isDone || !updatedActiveTask || updatedActiveTask.isDone) {

      // no active tasks and at least one notDone task
      const notDoneTask = newTasks.find(newTask => !newTask.isDone);
      if (notDoneTask)
        return notDoneTask;

      // no active tasks and no notDone tasks
      return null;
    }

    // active task valid
    if (!updatedActiveTask.isDone)
      return updatedActiveTask;

    // active task outdated
    return null;
  };

  const getDonePomodoros = () => tasks.reduce((acc, curr) => acc + curr.pomodorosDone, 0);

  const getTotalLeftPomodoros = () => tasks.reduce((acc, task) => {
    if (!task.isDone)
      return acc + (task.pomodoros - task.pomodorosDone);

    return acc;
  }, 0);

  return (
    <TasksContext.Provider value={{
      tasks,
      activeTask,
      createTask,
      updateTask,
      getDonePomodoros,
      handleSetTasks,
      processDoneTasks,
      getTotalLeftPomodoros,
      handleSetActiveTask,
      handleRemoveTask,
      handleRemoveTasks,
      processOnRoundEnd
    }}>
      {children}
    </TasksContext.Provider>
  );
};

const useTasksContext = () => useContext(TasksContext);

export { useTasksContext, TasksProvider };
