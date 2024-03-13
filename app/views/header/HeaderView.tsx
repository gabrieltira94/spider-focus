import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Settings from "@/app/views/header/Settings";
import Image from "next/image";
import About from "@/app/views/header/About";
import InstallPWA from "@/app/views/header/InstallPWA";

export default function HeaderView() {
  const { breakpoints, palette } = useTheme();

  const getLogoWidth = () => useMediaQuery(breakpoints.down("md")) ? 25 : 60;

  const getLogoHeight = () => useMediaQuery(breakpoints.down('md')) ? 40 : 80;

  return (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      width='100%'
    >
      <Box display='flex' alignItems='center'>
        <Image src='/logo.png' alt='Spider Focus' width={getLogoWidth()} height={getLogoHeight()} priority blurDataURL='/logo.png' />
        <Typography variant="h5" display={{ xs: 'none', md: 'block' }} ml={0.5} color={palette.primary.main}>Spider Focus</Typography>
      </Box>

      <Box display='flex'>
        <InstallPWA />
        <About />
        <Settings />
      </Box>
    </Box>
  );
}