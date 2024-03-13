import MoreVertIcon from '@mui/icons-material/MoreVert';
import Divider from '@mui/material/Divider';
import { Box, IconButton, Menu, Tooltip, useTheme } from '@mui/material';
import { useState } from 'react';

import { useTasksContext } from '@/app/hooks/TasksContext';
import { TasksKeys } from '@/app/dto/task.dto';
import MenuSetting from '@/app/views/tasks/menu/MenuSetting';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DoneAllIcon from '@mui/icons-material/DoneAll';

export default function TasksMenu() {
  const { tasks, activeTask, handleSetTasks, handleRemoveTasks } = useTasksContext();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { palette } = useTheme();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleMarkAllCompleted = () => {
    const tasksCompleted = tasks.map(task => {
      task.isDone = true;
      return task;
    });

    handleSetTasks(tasksCompleted);
    handleCloseUserMenu();
  };

  const handleRemoveCompleted = () => {
    const finishedTasks = tasks.filter(task => task.isDone);

    handleRemoveTasks(finishedTasks);
    handleCloseUserMenu();
  };

  const handleResetProgress = () => {
    const resetTasks = tasks.map(task => {
      task.pomodorosDone = 0;
      task.isDone = false;

      return task;
    });

    handleSetTasks(resetTasks);
    handleCloseUserMenu();
  };

  const handleClearAll = async () => {
    const allTasks = Array.from(tasks);

    if (activeTask)
      allTasks.push({ ...activeTask, id: TasksKeys.ActiveTask });

    await handleRemoveTasks(allTasks);
    handleCloseUserMenu();
  };

  const handleHideCompleted = async () => {
    const updatedTasks = tasks.map(task => {
      if (task.isDone)
        task.isHidden = true;

      return task;
    });

    await handleSetTasks(updatedTasks);
    handleCloseUserMenu();
  };

  const handleShowCompleted = async () => {
    const updatedTasks = tasks.map(task => {
      task.isHidden = false;

      return task;
    });

    await handleSetTasks(updatedTasks);
    handleCloseUserMenu();
  };

  const areCompletedTasksHidden = () => tasks.some(task => task.isHidden);

  const getHideIcon = () => {
    if (areCompletedTasksHidden())
      return <VisibilityIcon fontSize='small' sx={{ mr: 1 }} />;

    return <VisibilityOffIcon fontSize='small' sx={{ mr: 1 }} />;
  };

  return (
    <Box>
      <Tooltip title="Tasks actions">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <MoreVertIcon color='info' />
        </IconButton>
      </Tooltip>

      <Menu
        sx={{ mt: '30px' }}
        anchorEl={anchorElUser}
        keepMounted
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        MenuListProps={{ sx: { width: 'max-content', backgroundColor: palette.background.secondaryContainers } }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuSetting
          label={`${areCompletedTasksHidden() ? 'Show' : 'Hide'} completed tasks`}
          icon={getHideIcon()}
          onClick={areCompletedTasksHidden() ? handleShowCompleted : handleHideCompleted}
          color='grey'
        />
        <Divider />
        <MenuSetting
          label="Mark all as completed"
          icon={<DoneAllIcon fontSize='small' sx={{ mr: 1 }} />}
          onClick={handleMarkAllCompleted}
        />
        <Divider />
        <MenuSetting
          label="Reset tasks progress"
          icon={<RestartAltIcon fontSize='small' sx={{ mr: 1 }} />}
          onClick={handleResetProgress}
        />
        <Divider />
        <MenuSetting
          label="Remove completed tasks"
          onClick={handleRemoveCompleted}
          icon={<ClearIcon fontSize='small' sx={{ mr: 1 }} />}
        />
        <Divider />
        <MenuSetting
          label="Delete all tasks"
          icon={<DeleteIcon fontSize='small' sx={{ mr: 1 }} />}
          onClick={handleClearAll}
          color='red'
        />
      </Menu>
    </Box>
  );
}
