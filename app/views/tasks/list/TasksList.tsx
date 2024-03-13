import { memo } from 'react';
import TaskListItem from '@/app/views/tasks/list/TasksListItem';
import { Task } from '@/app/dto/task.dto';
import { Box } from '@mui/material';
import { OnDragEndResponder, DragDropContext, Droppable } from '@hello-pangea/dnd';

interface Props {
  tasks: Task[];
  onDragEnd: OnDragEndResponder;
};

const TasksList = memo(({ tasks, onDragEnd }: Props) => {
  return (
    <Box width='100%'>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-list" >
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {tasks.map((task, index) => (
                <TaskListItem key={task.id} index={index} task={task} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
});

TasksList.displayName = 'TasksList';

export default TasksList;
