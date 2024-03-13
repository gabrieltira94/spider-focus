import { useEffect, useState } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { isMobile } from '@/app/utils/browserHelper';

export default function InstallPWA() {
  const [installed, setInstalled] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    });

    window.addEventListener('appinstalled', () => setInstalled(true));

    if (window.matchMedia('(display-mode: standalone)').matches)
      setInstalled(true);

  }, []);

  const renderMobileToast = () => (
    <>
      <Box display='flex' flexDirection='column' alignItems='center'>
        <Typography>On Phone browsers, go to</Typography>
        <Typography>Page Settings → Add to Home Screen</Typography>
      </Box>
    </>
  );

  const handleInstall = async () => {
    if (isMobile())
      return toast(renderMobileToast());

    if (installed)
      return toast('App already installed!');

    await (installPrompt as any).prompt();

    setInstallPrompt(null);
  };

  if (!installPrompt)
    return null;

  return (
    <Tooltip title="Install the App offline">
      <IconButton onClick={handleInstall}>
        <DownloadIcon color='secondary' />
      </IconButton>
    </Tooltip>
  );
}