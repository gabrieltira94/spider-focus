import AboutModal from "@/app/views/header/AboutModal";
import { Box, Tooltip, IconButton } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useState } from "react";

export default function About() {
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = () => setIsOpen(!isOpen);

  return (
    <Box>
      <Tooltip title="Application information">
        <IconButton onClick={handleAction}>
          <HelpOutlineIcon color='primary' />
        </IconButton>
      </Tooltip>

      {isOpen &&
        <AboutModal onAction={handleAction} />
      }
    </Box>
  );
}