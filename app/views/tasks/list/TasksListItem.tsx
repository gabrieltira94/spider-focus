import { useState, MouseEvent } from 'react';
import { Box, ListItemAvatar, useTheme } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Edit } from '@mui/icons-material';

import { Task } from '@/app/dto/task.dto';
import { useTasksContext } from '@/app/hooks/TasksContext';
import CreateTask from '@/app/views/tasks/task/CreateTask';
import { StyledTaskListItem } from '@/app/styling/tasks/StyledTaskListItem';
import { StyledTaskListItemText } from '@/app/styling/tasks/StyledTaskListItemText';
import { Draggable } from '@hello-pangea/dnd';

interface Props {
  task: Task;
  index: number;
};

export default function TaskListItem(props: Props) {
  const { task: { id, title, pomodoros, isDone, pomodorosDone }, index } = props;
  const { handleSetActiveTask, processDoneTasks, activeTask } = useTasksContext();
  const { palette } = useTheme();
  const [isEdit, setIsEdit] = useState(false);

  const handleEditClick = (event: MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();
    setIsEdit(!isEdit);
  };

  const handleSetDone = (event: MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();
    processDoneTasks(isDone, index);
  };

  const isActiveTask = () => activeTask?.id === id;

  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided, snapshot) => (


        isEdit ?
          <Box ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}>
            <CreateTask task={props.task} onAction={() => setIsEdit(!isEdit)} />
          </Box>
          :

          <StyledTaskListItem
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`${isDone && 'done'} my-2 ${isActiveTask() && 'active'}`}
            onClick={() => handleSetActiveTask(props.task)}
          >
            <ListItemAvatar>
              <TaskAltIcon
                sx={{ color: isDone ? palette.success.main : palette.text.actionIcons, cursor: 'pointer' }}
                onClick={handleSetDone}
              />
            </ListItemAvatar>

            <StyledTaskListItemText
              primary={title}
              secondary={`Pomodoro's: ${pomodorosDone} / ${pomodoros}`}
            />

            <Edit onClick={handleEditClick} sx={{ cursor: 'pointer', color: palette.text.actionIcons }} />
          </StyledTaskListItem>



      )}
    </Draggable>
  );
};
