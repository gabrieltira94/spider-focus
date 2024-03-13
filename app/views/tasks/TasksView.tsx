import { Box, Typography, useTheme } from "@mui/material";

import { mapPositionByIndex, reorder } from "@/app/utils/listHelper";
import AddTaskView from "@/app/views/tasks/AddTaskView";
import TasksList from "@/app/views/tasks/list/TasksList";
import TasksMenu from "@/app/views/tasks/menu/TasksMenu";
import { useTasksContext } from "@/app/hooks/TasksContext";
import { StyledTasksContainer } from "@/app/styling/tasks/StyledTasksContainer";
import { DropResult } from "@hello-pangea/dnd";


export default function TasksView() {
  const { tasks, handleSetTasks } = useTasksContext();
  const { palette } = useTheme();

  const onDragEnd = ({ destination, source }: DropResult) => {
    // dropped outside the list
    if (!destination) return;

    const newItems = reorder(tasks, source.index, destination.index);

    handleSetTasks(mapPositionByIndex(newItems));
  };

  const getNotHiddenTasks = () => tasks.filter(task => !task.isHidden);

  return (
    <StyledTasksContainer>
      {tasks.length > 0 &&
        <>
          <Box display='flex' justifyContent='space-between' width='100%'>
            <Typography variant="h6" color={palette.secondary.main}>Tasks</Typography>
            <TasksMenu />
          </Box>

          <TasksList tasks={getNotHiddenTasks()} onDragEnd={onDragEnd} />
        </>
      }

      <AddTaskView />

    </StyledTasksContainer >
  );
}