import { useState } from "react";
import { AddTask } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

import CreateTask from "@/app/views/tasks/task/CreateTask";
import { StyledAddTaskArea } from "@/app/styling/tasks/StyledAddTaskArea";

export default function AddTaskView() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(!isOpen);

  return (
    <Box width='100%'>
      {isOpen ?
        <CreateTask onAction={handleClick} />
        :
        <StyledAddTaskArea onClick={handleClick}>
          <AddTask />
          <Typography ml={1} variant="h5"> Add Task</Typography>
        </StyledAddTaskArea>
      }
    </Box>
  );
}