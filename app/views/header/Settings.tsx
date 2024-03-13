import { useState } from 'react';
import { Settings as SettingsIcon } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';
import SettingsModal from '@/app/views/header/SettingsModal';

export default function Settings() {
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = () => setIsOpen(!isOpen);

  return (
    <Box>
      <Tooltip title="General settings">
        <IconButton onClick={handleAction}>
          <SettingsIcon color='info' />
        </IconButton>
      </Tooltip>

      {isOpen &&
        <SettingsModal onAction={handleAction} />
      }
    </Box>
  );
}
