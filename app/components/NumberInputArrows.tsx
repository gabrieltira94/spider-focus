import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box, useTheme } from '@mui/material';

interface Props {
  field: string;
  value: number;
  setFieldValue: (field: string, value: number) => void;
}

export default function NumberInputArrows(props: Props) {
  const { palette } = useTheme();
  const { field, value, setFieldValue } = props;

  const handleArrowUp = () => {
    setFieldValue(field, value + 1);
  };

  const handleArrowDown = () => {
    setFieldValue(field, value - 1);
  };

  return (
    <Box display='flex' flexDirection='column' mx={2}>
      <ArrowDropUpIcon
        onClick={handleArrowUp}
        fontSize="large"
        color="info"
        sx={{ cursor: 'pointer', ':active': { borderRadius: '50%', backgroundColor: palette.background.tooltip } }}
      />
      <ArrowDropDownIcon
        onClick={handleArrowDown}
        fontSize="large"
        color="info"
        sx={{ cursor: 'pointer' }}
      />
    </Box>
  );
}