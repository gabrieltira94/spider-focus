import { StyledAboutModalContainer } from "@/app/styling/header/StyledAboutModalContainer";
import { Box, Link, Modal, Typography } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import Image from 'next/image';

interface Props {
  onAction: () => void;
}


export default function AboutModal(props: Props) {
  const { onAction } = props;

  return (
    <Modal open onClose={onAction} sx={{ overflowY: 'auto' }}>
      <StyledAboutModalContainer onClick={onAction}>
        <Box>
          <Typography variant="h5">Pomodoro Technique</Typography>
          <Typography variant="subtitle1" mb={2} ml={1}>Efficiency Through Focused Sprints</Typography>

          <Typography variant="body2" mb={1} sx={{ textIndent: '20px' }}>🍅 The Pomodoro Technique, named after the Italian word for 'tomato,' is all about efficiency. Just like slicing a tomato, work is divided into short, focused sprints – typically 25 minutes.</Typography>
          <Typography variant="body2" mb={1} sx={{ textIndent: '20px' }}>After each 'Pomodoro', you reward yourself with a short break. It's a simple method designed to keep your focus sharp, enhance productivity, and maintain your mental well-being.</Typography>
          <Typography variant="body2" sx={{ textIndent: '20px' }}>When you become a Pomodoro pro, you'll be ready to explore our Spider Theme! 🕷️</Typography>
        </Box>

        <Box mt={4}>
          <Typography variant="h5">Spider Theme</Typography>
          <Typography variant="subtitle1" mb={2}>Unleash Your Inner Spider 🕷️ </Typography>

          <Typography variant="body2" mb={1} sx={{ textIndent: '20px' }}>Why spiders 🕸️ ? Well, they are the ultimate masters of focus and precision. Spiders concentrate on their prey, weaving intricate webs, and embody laser-sharp focus.</Typography>
          <Typography variant="body2" mb={1} sx={{ textIndent: '20px' }}>When you embrace the Spider Theme, you tap into the spider's essence. You become a weaving master, building your projects step by step, and catching your goals with skill.</Typography>
          <Typography variant="body2" sx={{ textIndent: '20px' }}>So, get ready to unleash your inner spider, and weave your path to success with precision and flair!</Typography>
        </Box>

        <Box my={5} display='flex' flexDirection='column' alignItems='center'>
          <Typography variant="body2" sx={{ textIndent: '10px' }}>No Cookies, Trackers, or Ads used.</Typography>
          <Typography variant="body2" mb={2} sx={{ textIndent: '10px' }}>It's 100% Free, just enjoy it!</Typography>

          <Typography variant="body1" mb={1}>Find me on</Typography>

          <Box onClick={e => e.stopPropagation()} display="flex" gap={3}>
            <Link display='flex' href='https://linkedin.com/in/gabrieltira' target="_blank" rel='noreferrer'>
              <LinkedInIcon color="primary" fontSize="large" />
              {/* <Typography ml={0.5}>Gabriel Tira</Typography> */}
            </Link>
            <Link display='flex' href='https://instagram.com/gabriel.tira' target="_blank" rel='noreferrer'>
              <InstagramIcon color="primary" fontSize="large" />
              {/* <Typography ml={0.5}>Gabriel Tira</Typography> */}
            </Link>
            <Link display='flex' href='https://x.com/TiraGabriel' target="_blank" rel='noreferrer'>
              <TwitterIcon color="primary" fontSize="large" />
              {/* <Typography ml={0.5}>Gabriel Tira</Typography> */}
            </Link>
          </Box>
        </Box>

        <Box my={5}>
          <Typography textAlign="center" mb={1}>Other Projects</Typography>

          <Box display="flex" flexDirection="row" gap={3}>
            {Projects.map((project, index) => (
              <Box key={index} display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={1}>
                <img src={`${project.href}/favicon.ico`} alt={project.name} width={50} height={50} />

                <Link href={project.href} textAlign="center">
                  <Typography variant="caption" color='secondary' sx={{ mb: 1 }}>
                    {project.label}
                  </Typography>

                </Link>
              </Box>
            ))}
          </Box>
        </Box>

        <Box mt={5} display='flex' flexDirection='column' alignItems='center'>
          <Typography variant="body1" color='secondary' sx={{ mb: 1 }} textAlign='center'>Get more with focus sounds</Typography>

          <Box onClick={e => e.stopPropagation()}>
            <Link display='flex' alignItems='center' href='https://bat-focus.vercel.app/' target="_blank" rel='noreferrer'>
              <Image
                src='/bat-focus.png'
                alt='Bat Focus'
                width={40}
                height={40}
                priority
              />
              <Typography ml={1} color="secondary" textAlign='center' fontWeight={900}>Bat Focus</Typography>
            </Link>
          </Box>
        </Box>

      </StyledAboutModalContainer>
    </Modal >
  );
}


const Projects = [
  {
    name: "GT Website",
    label: "Mind Opening Letters",
    href: "https://gabrieltira.com"
  },
  {
    name: "Just Overload",
    label: "Get Everything from Fitness",
    href: "https://justoverload.com"
  },
  {
    name: "Balance Battle",
    label: "Gamified Habits Tracker",
    href: "https://balancebattle.com"
  }
];